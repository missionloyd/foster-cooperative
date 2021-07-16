import PublicUserProfile from '../../../components/user/profile/PublicUserProfile';
import PostFeed from '../../../components/community-news/PostFeed';
import { firestore, getUserWithUsername, postToJSON } from '../../../firebase/firebase';
import Dashboard from '../../../layouts/DashboardLayout/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
    marginBottom: '2rem',
    //maxWidth: '35rem'
    //width: '100%',
  },
  feedContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    width: '35rem',
  }
}));


export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;
  let comments = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    
    posts = (await postsQuery.get()).docs.map(postToJSON);

    // update where for community id
    const commentsQuery = firestore
    .collectionGroup('comments')
    //.where('karma', '>=', 0)
    .orderBy('createdAt', 'desc')
    // .limit(LIMIT);

    comments = (await commentsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts, comments },
  };
}

function PublicUserProfilePage({ user, posts, comments }) {
  const classes = useStyles();
  return (
    <main>
      <Container>
        <div className={classes.profileContainer}>
          <PublicUserProfile user={user} />
        </div>
      </Container>
      <Grid container justify="center">
        <div className={classes.feedContainer}>      
          <PostFeed posts={posts} comments={comments} />
        </div>
      </Grid>
    </main>
  )
}

PublicUserProfilePage.layout = Dashboard;

export default PublicUserProfilePage;