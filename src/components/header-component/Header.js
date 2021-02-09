//import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
// import search_icon from '../icons/search_icon.svg';
// import profile from '../icons/empty-profile.webp';
// import Searchbar from '../searchbar-component/Searchbar';
import PrimarySearchAppBar from '../app-bar-component/AppBar';

import './Header.css';

function Header() {

  //const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);

  return (
    <header>
        <div className = "header-container">
          <PrimarySearchAppBar/>
        </div>
    </header>
  );
}

export default Header;
