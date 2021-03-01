import React from 'react';
import Post from './Post';

function News() {

  return (
    <div className = "post-container">
      <h1>Community News</h1>
      <Post/>
      <Post/>
    </div>
  );
}
export default News;