import Link from 'next/link';
import Post from './Post';

export default function PostFeed({ posts, admin }) {
  return posts ? posts.map((post) => 
    <Post 
        post={post} 
        key={post.slug}
        admin={admin}
    />) : null;
}
