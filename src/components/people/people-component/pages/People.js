import React from 'react';
import { Grid } from '@material-ui/core';
import Post from '../ProfileCard';
import './People.css';

function People() {

  const styles = {
    padding: "auto",
    marginBottom: 0
  };

  return (
    <div className = "main-container">
      <div className="header-container">
        <h1>People 👋</h1>
        <div className="spacer">TEST</div>
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
export default People;