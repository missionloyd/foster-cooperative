import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/shared/Page';
import NewPostView from '../../components/community-news/new-post/NewPostView';
import Dashboard from '../../layouts/DashboardLayout/Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const NewPost = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="New Post"
    >
      <Container maxWidth="md">
        <NewPostView />
      </Container>
    </Page>
  );
};

NewPost.layout = Dashboard;

export default NewPost;
