# Reddit Integration Setup

This project now includes Reddit post fetching functionality that saves URLs to Supabase and displays the posts.

## Features

- **Reddit Form Page** (`/reddit-form`): Submit Reddit post URLs to save in Supabase
- **Reddit Posts Page** (`/reddit-post`): Display all saved Reddit posts with live data
- **Server-side API**: Secure Reddit API calls using your credentials

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Reddit API Configuration
NEXT_PUBLIC_REDDIT_CLIENT_ID=FsyEpyWwe0FEv6l-xH_NDg
REDDIT_CLIENT_SECRET=HL5HO2v2ybiteTJGtvd_Sb1dRRmHtw
```

## Supabase Database Setup

### Fix Foreign Key Constraint Error

If you're getting a foreign key constraint error, run the SQL script in `database-setup.sql` in your Supabase SQL editor. This will create the proper table structure.

### Manual Setup

Make sure you have a `posts` table in your Supabase database with the following structure:

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  reddit_url TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Important**: The `posts` table must have a `user_id` field that references the `Users` table, as posts are associated with specific users.

## How It Works

1. **Wallet Connection**: Users must connect their Solana wallet first
2. **URL Submission**: Users can submit Reddit post URLs through the form at `/reddit-form`
3. **URL Storage**: URLs are saved to Supabase with the user's ID and duplicate prevention
4. **Post Display**: The `/reddit-post` page fetches all saved URLs and displays the actual Reddit post data
5. **Live Data**: Each post shows real-time data from Reddit including:
   - Post title and content
   - Author and subreddit
   - Upvotes and comment count
   - Creation date
   - Direct link to the original post

## API Security

- Reddit API credentials are kept secure on the server-side
- Client-side code only communicates with your own API routes
- Access tokens are managed server-side with automatic refresh

## Usage

1. Start your development server: `npm run dev`
2. Navigate to `/reddit-form` to submit Reddit URLs
3. Navigate to `/reddit-post` to view all saved posts
4. Use the refresh buttons to update individual posts or all posts

## Error Handling

The system includes comprehensive error handling:
- Invalid Reddit URLs are rejected
- Failed API calls show retry options
- Loading states provide user feedback
- Network errors are gracefully handled 