import PublicUserProfile from '../../../components/community-news/PublicUserProfile';
import PostFeed from '../../../components/community-news/PostFeed';
import { getUserWithUsername, postToJSON } from '../../../firebase/firebase';
import Dashboard from '../../../layouts/DashboardLayout/Dashboard';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
}

function PublicUserProfilePage({ user, posts }) {
  return (
    <main>
      <PublicUserProfile user={user}/>
      <PostFeed posts={posts}/>
    </main>
  )
}

PublicUserProfile.layout = Dashboard;

export default PublicUserProfile;