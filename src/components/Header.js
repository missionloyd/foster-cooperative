import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import logo from './icons/logo.png';
import search_icon from './icons/search_icon.svg';
import profile from './icons/empty-profile.webp';
import Searchbar from './Searchbar';
import '../App.css';

function Header() {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <header>
        <div className = "header-container">
            <div className = "logo-container">
                <img src={logo} width = '80' height = '80'/>
            </div>
              <div className = "search-container">
                  <div className = "icon">
                    <img src={search_icon} classname = "icon" width = '20' height = '20'></img>
                  </div>
                  <Searchbar/>
            </div>
        </div>
        <div className = "profile-container">
                    <img src={profile} width = '60' height = '60'/>
            </div>
    </header>
  );
}

export default Header;
