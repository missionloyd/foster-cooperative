import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import './Home.css';
import pic from './icons/pic.jpg';

function Home() {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <home>
      <div className = "home-container">
        <h1>Welcome to the Home Page</h1>
        <img src = {pic}></img>
      </div>
    </home>
  );
}

export default Home;