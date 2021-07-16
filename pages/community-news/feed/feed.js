import React, { useState } from 'react';
import Page from '../../../components/shared/Page';
import Dashboard from '../../../layouts/DashboardLayout/Dashboard';
import Link from '../../../components/shared/Link';
import PostFeed from '../../../components/community-news/PostFeed';
import { firestore, fromMillis, postToJSON, getUserWithUid } from '../../../firebase/firebase';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import CreateNewPost from '../../../components/community-news/CreateNewPost';
import {
  Box,
  Container,
  makeStyles,
  Grid,
  Button,
  Hidden
} from '@material-ui/core';
import AuthCheck from '../../../components/auth/AuthCheck';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    width: '100vw',
    maxWidth: '100%',
    paddingTop: theme.spacing(1)
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  feed: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    width: '35rem',
  },
  helpers: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    background: '#03b0b5',
    width: '10rem',
    color: 'white',
  }
}));

// Max post to query per page
const LIMIT = 5;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  // update where for community id
  const commentsQuery = firestore
    .collectionGroup('comments')
    //.where('karma', '>=', 0)
    .orderBy('createdAt', 'desc')
    // .limit(LIMIT);

  const comments = (await commentsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts, comments }, // will be passed to the page component as props
  };
}

function Feed(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState(props.posts);
  const [comments, setComments] = useState(props.comments)
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  const refreshData = () => {
    router.replace(router.asPath);
  }

  return (
    <Page
      className={classes.root}
      title="Community News"
    >
      {/* <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      > */}
        <AuthCheck>
        <Container maxWidth='xl'>
          <div className={classes.container}>
            <h1>Community News 👋</h1>
            <div className={classes.headerContainer}>
              <Hidden xsDown implementation="css">
                <h1>New Post</h1>
              </Hidden>
              <CreateNewPost />
            </div>
          </div>
          <Grid container justifyContent="center">
            <div className={classes.feed}>
              <PostFeed posts={posts} comments={comments} />
            </div>
          </Grid>
          <div className={classes.helpers}>
            {!loading && !postsEnd && 
              <Button onClick={getMorePosts} variant="contained" className={classes.button}>Load more</Button>
            }
            <LoadingSpinner show={loading} />
            {postsEnd && 'Sorry, you have reached the end of the feed...'}
          </div>
        </Container>
        </AuthCheck>
      {/* </Box> */}
    </Page>
  );
}

Feed.layout = Dashboard;

export default Feed;