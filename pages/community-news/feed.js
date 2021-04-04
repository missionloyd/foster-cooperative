import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Post from '../../components/community-news/Post';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ResizableIconButton from '../../components/community-news/ResizableIconButton';
import Page from '../../components/shared/Page';
import Dashboard from '../../layouts/DashboardLayout/Dashboard';
import Link from '../../components/shared/Link';

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

const News = () => {
  const classes = useStyles();

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
              <Grid item xs={12} sm= {6} md={4} align="center">
                <Post/>
              </Grid>
              <Grid item xs={12} sm= {6} md={4} align="center">
                <Post/>
              </Grid>
              <Grid item xs={12} sm= {6} md={4} align="center">
                <Post/>
              </Grid>
              <Grid item xs={12} sm= {6} md={4} align="center">
                <Post/>
              </Grid>
              <Grid item xs={12} sm= {6} md={4} align="center">
                <Post/>
              </Grid>
              <Grid item xs={12} sm= {6} md={4} align="center">
                <Post/>
              </Grid>
            </Grid>
          <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="large"
          />
        </Box>
        </Container>
      </Box>
    </Page>
  );
}

News.layout = Dashboard;

export default News;