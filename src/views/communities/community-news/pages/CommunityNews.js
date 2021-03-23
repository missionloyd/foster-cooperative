import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid
} from '@material-ui/core';
import Post from '../components/Post';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ResizableIconButton from '../../../../components/shared/FormElements/ResizableIconButton';
import Page from '../../../../components/Page';
import './CommunityNews.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
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
          <div className="header-container">
            <h1>Community News 👋</h1>
            <div className="newpost-container">
              <h1>New Post</h1>
              <ResizableIconButton size='large' href="/communities/community-news/new-post" >
                <AddCircleRoundedIcon />
              </ResizableIconButton>
            </div>
          </div>
          <Grid container spacing={4} >
            <Grid item xs={12} sm= {6} md={4}>
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4}>
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4}>
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4}>
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4}>
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4}>
              <Post/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
export default News;