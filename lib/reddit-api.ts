import axios from 'axios';

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
  preview?: {
    images: Array<{
      source: {
        url: string;
        width: number;
        height: number;
      };
      resolutions: Array<{
        url: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  post_hint?: string;
  domain?: string;
}

interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

class RedditAPI {
  constructor() {
    // Client-side API now uses server-side route
  }

  async fetchPostByUrl(url: string): Promise<RedditPost | null> {
    try {
      const response = await axios.post('/api/reddit', { url });

      return response.data.post;
    } catch (error: unknown) {
      console.error('Error fetching Reddit post:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to fetch post');
      }
      throw error;
    }
  }

  async fetchMultiplePosts(urls: string[]): Promise<(RedditPost | null)[]> {
    const promises = urls.map(url => this.fetchPostByUrl(url));
    return Promise.all(promises);
  }
}

export const redditAPI = new RedditAPI();
export type { RedditPost }; 