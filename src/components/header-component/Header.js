//import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import logo from '../icons/logo.png';
import search_icon from '../icons/search_icon.svg';
import profile from '../icons/empty-profile.webp';
import Searchbar from '../searchbar-component/Searchbar';
import './Header.css';

function Header() {

  //const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);

  return (
    <header>
        <div className = "header-container">
            <div className = "logo-container">
                <img src={logo} alt= "" width = '80' height = '80'/>
            </div>
              <div className = "search-container">
                  <div className = "icon">
                    <img src={search_icon} alt="" classname = "icon" width = '20' height = '20'></img>
                  </div>
                  <Searchbar/>
            </div>
        </div>
        <div className = "profile-container">
                    <img src={profile} alt="" width = '60' height = '60'/>
            </div>
    </header>
  );
}

export default Header;
