"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/Supabase-client'
import { redditAPI, RedditPost } from '@/lib/reddit-api'


interface PostWithRedditData {
  id: number
  reddit_url: string
  created_at: string
  reddit_post?: RedditPost | null
  loading?: boolean
  error?: string
}

export default function RedditPostPage() {
  const [posts, setPosts] = useState<PostWithRedditData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPostsFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching posts from Supabase:', error)
      throw error
    }
  }

  const fetchRedditData = async (url: string): Promise<RedditPost | null> => {
    try {
      return await redditAPI.fetchPostByUrl(url)
    } catch (error) {
      console.error('Error fetching Reddit data for URL:', url, error)
      return null
    }
  }

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch posts from Supabase
      const supabasePosts = await fetchPostsFromSupabase()
      
      // Initialize posts with loading state
      const postsWithLoading: PostWithRedditData[] = supabasePosts.map(post => ({
        ...post,
        loading: true
      }))

      setPosts(postsWithLoading)

      // Fetch Reddit data for each post
      const postsWithRedditData = await Promise.all(
        supabasePosts.map(async (post) => {
          try {
            const redditPost = await fetchRedditData(post.reddit_url)
            return {
              ...post,
              reddit_post: redditPost,
              loading: false,
              error: redditPost ? undefined : 'Failed to fetch Reddit data'
            }
          } catch (error) {
            return {
              ...post,
              loading: false,
              error: 'Failed to fetch Reddit data'
            }
          }
        })
      )

      setPosts(postsWithRedditData)
    } catch (error) {
      console.error('Error loading posts:', error)
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const refreshPost = async (postId: number, url: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, loading: true, error: undefined }
        : post
    ))

    try {
      const redditPost = await fetchRedditData(url)
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              reddit_post: redditPost, 
              loading: false,
              error: redditPost ? undefined : 'Failed to fetch Reddit data'
            }
          : post
      ))
    } catch (error) {
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, loading: false, error: 'Failed to fetch Reddit data' }
          : post
      ))
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  useEffect(() => {
    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Reddit posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Posts</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={loadPosts} className="bg-orange-500 hover:bg-orange-600">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Reddit Posts
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Discover and explore Reddit posts from your saved collection
          </p>
          <Button 
            onClick={() => {
              setRefreshing(true)
              loadPosts().finally(() => setRefreshing(false))
            }}
            disabled={refreshing}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {refreshing ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Refreshing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh All Posts</span>
              </div>
            )}
          </Button>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <Card className="text-center py-16 max-w-md mx-auto">
            <CardContent>
              <div className="text-gray-300 mb-6">
                <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Posts Found</h3>
              <p className="text-gray-600 mb-6">Start by adding some Reddit URLs to see them here!</p>
              <Button 
                onClick={() => window.location.href = '/reddit-form'}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Add Reddit URL
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-lg">
                                  {post.loading ? (
                   <div className="p-6">
                     <div className="animate-pulse space-y-4">
                       {/* Header skeleton */}
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                         <div className="flex-1 space-y-2">
                           <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                           <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                         </div>
                       </div>
                       {/* Title skeleton */}
                       <div className="space-y-2">
                         <div className="h-6 bg-gray-200 rounded w-full"></div>
                         <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                       </div>
                       {/* Content skeleton */}
                       <div className="space-y-2">
                         <div className="h-4 bg-gray-200 rounded w-full"></div>
                         <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                         <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                       </div>
                       {/* Image skeleton */}
                       <div className="h-48 bg-gray-200 rounded-lg"></div>
                       {/* Stats skeleton */}
                       <div className="flex gap-4">
                         <div className="w-16 h-8 bg-gray-200 rounded"></div>
                         <div className="w-16 h-8 bg-gray-200 rounded"></div>
                       </div>
                     </div>
                   </div>
                                ) : post.error ? (
                   <div className="p-6 text-center">
                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <h4 className="text-sm font-medium text-gray-900 mb-2">Failed to Load Post</h4>
                     <p className="text-xs text-gray-600 mb-4">{post.error}</p>
                     <Button 
                       onClick={() => refreshPost(post.id, post.reddit_url)}
                       className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm px-4 py-2 rounded-lg"
                     >
                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                       </svg>
                       Try Again
                     </Button>
                   </div>
                                 ) : post.reddit_post ? (
                   <div className="p-6">
                     {/* Header with subreddit info */}
                     <div className="flex items-center gap-2 mb-4">
                       <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                         </svg>
                       </div>
                       <div className="flex-1">
                         <div className="text-sm font-medium text-gray-900">r/{post.reddit_post.subreddit}</div>
                         <div className="text-xs text-gray-500">Posted by u/{post.reddit_post.author}</div>
                       </div>
                       <div className="text-xs text-gray-400">
                         {formatDate(post.reddit_post.created_utc)}
                       </div>
                     </div>

                     {/* Post title */}
                     <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                       {post.reddit_post.title}
                     </h3>

                     {/* Post content */}
                     {post.reddit_post.selftext && (
                       <div className="mb-6">
                         <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                           {post.reddit_post.selftext}
                         </p>
                         {post.reddit_post.selftext.length > 200 && (
                           <button className="text-orange-600 text-xs font-medium mt-2 hover:text-orange-700">
                             Read more
                           </button>
                         )}
                       </div>
                     )}

                     {/* Post image/thumbnail */}
                     {post.reddit_post.preview?.images?.[0]?.source?.url ? (
                       <div className="mb-6">
                         <div className="relative overflow-hidden rounded-lg bg-gray-100">
                           <img 
                             src={post.reddit_post.preview.images[0].source.url.replace(/&amp;/g, '&')}
                             alt={post.reddit_post.title}
                             className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                             onError={(e) => {
                               e.currentTarget.style.display = 'none';
                             }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                         </div>
                       </div>
                     ) : post.reddit_post.thumbnail && post.reddit_post.thumbnail !== 'self' && post.reddit_post.thumbnail !== 'default' && (
                       <div className="mb-6">
                         <div className="relative overflow-hidden rounded-lg bg-gray-100">
                           <img 
                             src={post.reddit_post.thumbnail.startsWith('http') ? post.reddit_post.thumbnail : `https://reddit.com${post.reddit_post.thumbnail}`}
                             alt={post.reddit_post.title}
                             className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                             onError={(e) => {
                               e.currentTarget.style.display = 'none';
                             }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                         </div>
                       </div>
                     )}

                     {/* Video indicator */}
                     {post.reddit_post.is_video && (
                       <div className="mb-6">
                         <div className="relative overflow-hidden rounded-lg bg-gray-100 h-48 flex items-center justify-center">
                           <div className="text-center">
                             <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="text-sm font-medium text-gray-700">Video Post</div>
                             <div className="text-xs text-gray-500">Click to view on Reddit</div>
                           </div>
                         </div>
                       </div>
                     )}

                     {/* Post URL preview (for link posts) */}
                     {post.reddit_post.url && !post.reddit_post.url.includes('reddit.com') && !post.reddit_post.is_video && (
                       <div className="mb-6">
                         <a 
                           href={post.reddit_post.url} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="block p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                         >
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                               </svg>
                             </div>
                             <div className="flex-1 min-w-0">
                               <div className="text-sm font-medium text-gray-900 truncate">
                                 {post.reddit_post.domain || 'External Link'}
                               </div>
                               <div className="text-xs text-gray-500 truncate">
                                 {new URL(post.reddit_post.url).hostname}
                               </div>
                             </div>
                             <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                             </svg>
                           </div>
                         </a>
                       </div>
                     )}

                     {/* Engagement stats */}
                     <div className="flex items-center gap-6 mb-6 p-3 bg-gray-50 rounded-lg">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                           <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                           </svg>
                         </div>
                         <div>
                           <div className="text-sm font-semibold text-gray-900">{formatNumber(post.reddit_post.score)}</div>
                           <div className="text-xs text-gray-500">upvotes</div>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                           <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                           </svg>
                         </div>
                         <div>
                           <div className="text-sm font-semibold text-gray-900">{formatNumber(post.reddit_post.num_comments)}</div>
                           <div className="text-xs text-gray-500">comments</div>
                         </div>
                       </div>
                     </div>

                     {/* Action buttons */}
                     <div className="flex gap-3">
                       <Button 
                         onClick={() => window.open(`https://reddit.com${post.reddit_post!.permalink}`, '_blank')}
                         className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105"
                       >
                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                         View on Reddit
                       </Button>
                       
                       <Button 
                         onClick={() => refreshPost(post.id, post.reddit_url)}
                         variant="outline"
                         className="px-4 py-2.5 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-all duration-200"
                       >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                         </svg>
                       </Button>
                     </div>
                   </div>
                 ) : null}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
