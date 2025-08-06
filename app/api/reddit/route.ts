import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

interface RedditPost {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  url: string;
  selftext: string;
  score: number;
  num_comments: number;
  created_utc: number;
  permalink: string;
  thumbnail: string;
  is_video: boolean;
  media?: any;
}

class RedditAPI {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.REDDIT_CLIENT_ID||"";
    this.clientSecret = process.env.REDDIT_CLIENT_SECRET || "";
  }

  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post('https://www.reddit.com/api/v1/access_token', 
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'RedCircle/1.0.0'
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // Expire 1 minute early

      if (!this.accessToken) {
        throw new Error('No access token received from Reddit API');
      }

      return this.accessToken;
    } catch (error) {
      console.error('Error getting Reddit access token:', error);
      throw error;
    }
  }

  private extractPostIdFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      
      // Reddit URL format: /r/subreddit/comments/post_id/title/
      const commentsIndex = pathParts.indexOf('comments');
      if (commentsIndex !== -1 && pathParts[commentsIndex + 1]) {
        return pathParts[commentsIndex + 1];
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing Reddit URL:', error);
      return null;
    }
  }

  async fetchPostByUrl(url: string): Promise<RedditPost | null> {
    try {
      const postId = this.extractPostIdFromUrl(url);
      if (!postId) {
        throw new Error('Invalid Reddit URL format');
      }

      const accessToken = await this.getAccessToken();
      
      const response = await axios.get(`https://oauth.reddit.com/comments/${postId}.json`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'RedCircle/1.0.0'
        }
      });

      const data = response.data;
      
      // The first element contains the post data
      if (data && data[0] && data[0].data && data[0].data.children && data[0].data.children[0]) {
        return data[0].data.children[0].data;
      }

      return null;
    } catch (error) {
      console.error('Error fetching Reddit post:', error);
      throw error;
    }
  }
}

const redditAPI = new RedditAPI();

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const post = await redditAPI.fetchPostByUrl(url);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error in Reddit API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Reddit post' }, 
      { status: 500 }
    );
  }
} 