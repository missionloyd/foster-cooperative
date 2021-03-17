import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Post from './Post';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ResizableIconButton from '../../shared/FormElements/ResizableIconButton';
import './community-news.css';

function News() {

  const styles = {
    padding: "auto",
    marginBottom: 0
  };

  return (
    <div className = "news-container">
      <div className="header-container">
        <h1>Community News 👋</h1>
        <div className="newpost-container">
          <h1>New Post</h1>
          <ResizableIconButton size='large' href="/communities/community-news/new-post" style={styles}>
            <AddCircleRoundedIcon />
          </ResizableIconButton>
        </div>
      </div>
      <Grid container spacing={4} style={styles}>
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
    </div>
  );
}
export default News;