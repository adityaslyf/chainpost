-- -- Database setup for Reddit integration
-- -- Run this in your Supabase SQL editor

-- -- First, let's check if the posts table exists and drop it if needed
-- DROP TABLE IF EXISTS posts;

-- -- Create the posts table with proper foreign key constraint
-- CREATE TABLE posts (
--   id SERIAL PRIMARY KEY,
--   reddit_url TEXT NOT NULL UNIQUE,
--   user_id UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Create an index on user_id for better performance
-- CREATE INDEX idx_posts_user_id ON posts(user_id);

-- -- Create an index on reddit_url for faster lookups
-- CREATE INDEX idx_posts_reddit_url ON posts(reddit_url);

-- -- Add RLS (Row Level Security) policies if needed
-- ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- -- Policy to allow users to see all posts (public)
-- CREATE POLICY "Allow public read access" ON posts
--   FOR SELECT USING (true);

-- -- Policy to allow users to insert their own posts
-- CREATE POLICY "Allow users to insert their own posts" ON posts
--   FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- -- Policy to allow users to update their own posts
-- CREATE POLICY "Allow users to update their own posts" ON posts
--   FOR UPDATE USING (auth.uid()::text = user_id::text);

-- -- Policy to allow users to delete their own posts
-- CREATE POLICY "Allow users to delete their own posts" ON posts
--   FOR DELETE USING (auth.uid()::text = user_id::text);

-- -- Grant necessary permissions
-- GRANT ALL ON posts TO authenticated;
-- GRANT USAGE ON SEQUENCE posts_id_seq TO authenticated; 