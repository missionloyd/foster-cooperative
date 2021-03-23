import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import './Navbar.css';

function Navbar() {

  const [click] = useState(false);
  //const handleClick = () => setClick(!click);

  return (
    <nav>
      <div className = "navbar-container">
        <ul className = {click ? 'nav-menu-active' : 'nav-menu'}>
          <li className = 'nav-item'/>
            <NavLink to='/communities' className = 'nav-links' activeClassName = 'nav-links-active-header'>
            <AccountTreeOutlinedIcon/>
            <span class="spacer"></span>
              Communities
            </NavLink>
          <ul>
            <li className = 'nav-item'/>
              <NavLink to='/communities/community-news' className = 'nav-links' activeClassName = 'nav-links-active'>
                Community News
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/communities/new-foster-parents' className = 'nav-links' activeClassName = 'nav-links-active'>
                New Foster Parents
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/communities/north-phx-families' className = 'nav-links' activeClassName = 'nav-links-active'>
                North PHX Families
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/communities/special-needs-families' className = 'nav-links' activeClassName = 'nav-links-active'>
                Special Needs Families
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/communities/create-private-community' className = 'nav-links' activeClassName = 'nav-links-active'>
                Create Private Community
              </NavLink>
          </ul>
          <li className = 'nav-item'/>
            <NavLink to='/people' className = 'nav-links' activeClassName = 'nav-links-active-header'>
              <PeopleAltOutlinedIcon/>
              <span class="spacer"></span>
              People
            </NavLink>
          <ul>  
            <li className = 'nav-item'/>
              <NavLink to='/people/location' className = 'nav-links' activeClassName = 'nav-links-active'>
                Location
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/people/young-kids' className = 'nav-links' activeClassName = 'nav-links-active'>
                Young Kids (0-4)
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/people/new-parents' className = 'nav-links' activeClassName = 'nav-links-active'>
                New Parents
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/people/looking-for-playdate' className = 'nav-links' activeClassName = 'nav-links-active'>
                Looking for Playdate
              </NavLink>
          </ul> 
          <li className = 'nav-item'/>
            <NavLink to='/resources' className = 'nav-links' activeClassName = 'nav-links-active-header'>
              <CommentOutlinedIcon/>
              <span class="spacer"></span>
              Resources
            </NavLink>
          <ul>
            <li className = 'nav-item'/>
              <NavLink to='/resources/programs' className = 'nav-links' activeClassName = 'nav-links-active'>
                Programs
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/resources/trainings' className = 'nav-links' activeClassName = 'nav-links-active'>
                Trainings
              </NavLink>
            <li className = 'nav-item'/>
              <NavLink to='/resources/contacts' className = 'nav-links' activeClassName = 'nav-links-active'>
                Contacts
              </NavLink>
          </ul>
          <li className = 'nav-item'/>
            <NavLink to='/events' className = 'nav-links' activeClassName = 'nav-links-active-header'>
              <DateRangeOutlinedIcon/>
              <span class="spacer"></span>
              Events
            </NavLink>
          <li className = 'nav-item'/>
            <NavLink to='/alerts' className = 'nav-links' activeClassName = 'nav-links-active-header'>
              <NotificationsOutlinedIcon/>
              <span class="spacer"></span>
              Alerts
            </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
