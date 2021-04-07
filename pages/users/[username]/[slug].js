import PublicUserProfile from '../../../components/community-news/PublicUserProfile';
import PostFeed from '../../../components/community-news/PostFeed';

export default function UserProfilePage({ user, posts }) {
    return (
        <main>
            <PublicUserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
    );
}