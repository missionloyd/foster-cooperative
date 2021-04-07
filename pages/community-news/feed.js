import React, { useState } from 'react';
//import Pagination from '@material-ui/lab/Pagination';
//import Post from '../../components/community-news/Post';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ResizableIconButton from '../../components/community-news/ResizableIconButton';
import Page from '../../components/shared/Page';
import Dashboard from '../../layouts/DashboardLayout/Dashboard';
import Link from '../../components/shared/Link';
import PostsFeed from '../../components/community-news/PostFeed';
import { firestore, fromMillis, postToJSON } from '../../firebase/firebase';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import {
  Box,
  Container,
  makeStyles,
  Grid,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  feed: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

function Feed(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);


  };


  return (
    <Page
      className={classes.root}
      title="Community News"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth={false}>
          <div className={classes.container}>
            <h1>Community News 👋</h1>
            <div className={classes.headerContainer}>
              <h1>New Post</h1>
              <Link href="/community-news/new-post" passHref>
                <ResizableIconButton size='large'>
                  <AddCircleRoundedIcon />
                </ResizableIconButton>
              </Link>
            </div>
          </div>
            <Grid container spacing={4} >

              <PostsFeed posts={posts} />

              {!loading && !postsEnd && <Button onClick={getMorePosts}>Load more</Button>}

              <LoadingSpinner show={loading} />
              {postsEnd && 'Sorry, you have reached the end of the feed...'}
              {/* <Grid item xs={12} sm= {6} md={4} align="center">
                <Post/>
              </Grid> */}
            </Grid>
        </Container>
      </Box>
    </Page>
  );
}

Feed.layout = Dashboard;

export default Feed;