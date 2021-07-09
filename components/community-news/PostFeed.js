import Link from 'next/link';
import Post from './Post';

export default function PostFeed({ posts, comments, admin }) {
  return posts ? posts.map((post) => 
    <Post
        post={post} 
        comments={comments}
        key={post.slug}
        owner={post.uid}
    />) : null;
}
