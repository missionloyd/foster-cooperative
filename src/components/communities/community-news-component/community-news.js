import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Post from './Post';

function News() {

  return (
    <div className = "news-container">
      <div className="header">
        <h1>Community News 👋</h1>
          <Button variant="contained" color="primary" href="/communities/community-news/new-post">New Post</Button>
      </div>
      <Grid container spacing={4} style={{
        marginBottom: 0
      }}>
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