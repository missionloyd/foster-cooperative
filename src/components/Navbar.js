import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import '../App.css';

function Navbar() {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <nav>
      <div className = "navbar-container">
        <img src={logo} width = '200' height = '200'/>
        <hr></hr>
        <ul className = {click ? 'nav-menu-active' : 'nav-menu'}>
          <li className = 'nav-item'>
            <Link to='/communities' className = 'nav-links'>
              Communities
            </Link>
          </li>
          <ul>
            <li className = 'nav-item'/>
              <Link to='/communities/community-news' className = 'nav-links'>
                Community News
              </Link>
            <li className = 'nav-item'/>
              <Link to='/communities/new-foster-parents' className = 'nav-links'>
                New Foster Parents
              </Link>
            <li className = 'nav-item'/>
              <Link to='/communities/north-phx-families' className = 'nav-links'>
                North PHX Families
              </Link>
            <li className = 'nav-item'/>
              <Link to='/communities/special-needs-families' className = 'nav-links'>
                Special Needs Families
              </Link>
            <li className = 'nav-item'/>
              <Link to='/communities/create-private-community' className = 'nav-links'>
                Create Private Community
              </Link>
          </ul>
          <li className = 'nav-item'/>
              <Link to='/people' className = 'nav-links'>
                People
              </Link> 
            <ul>
              <li className = 'nav-item'/>
                <Link to='/people/location' className = 'nav-links'>
                  Location
                </Link>
              <li className = 'nav-item'/>
                <Link to='/people/young-kids' className = 'nav-links'>
                  Young Kids (0-4)
                </Link>
              <li className = 'nav-item'/>
                <Link to='/people/new-parents' className = 'nav-links'>
                  New Parents
                </Link>
              <li className = 'nav-item'/>
                <Link to='/people/looking-for-playdate' className = 'nav-links'>
                  Looking for Playdate
                </Link>
            </ul>
          <li className = 'nav-item'/>
              <Link to='/resources' className = 'nav-links'>
                Resources
              </Link>
            <ul>
              <li className = 'nav-item'/>
                  <Link to='/resources/programs' className = 'nav-links'>
                    Programs
                  </Link>
              <li className = 'nav-item'/>
                <Link to='/resources/trainings' className = 'nav-links'>
                  Trainings
                </Link>
              <li className = 'nav-item'/>
                <Link to='/resources/contacts' className = 'nav-links'>
                  Contacts
                </Link>
            </ul>
          <li className = 'nav-item'/>
            <Link to='/calendar' className = 'nav-links'>
              Calendar
            </Link>
          <li className = 'nav-item'/>
            <Link to='/alerts' className = 'nav-links'>
              Alerts
            </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
