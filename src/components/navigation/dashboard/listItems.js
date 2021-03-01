import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import LinkIcon from '@material-ui/icons/Link';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const mainListItems = (
  <div>
    <NavLink to='/home' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <HomeOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </NavLink>    
    <NavLink to='/communities' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <AccountTreeOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Communities" />
      </ListItem>
    </NavLink>
    <NavLink to='/people' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <PeopleAltOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="People" />
      </ListItem>
    </NavLink>
    <NavLink to='/resources' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <CommentOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Resources" />
      </ListItem>
    </NavLink>
    <NavLink to='/events' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <DateRangeOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
    </NavLink>
    <NavLink to='/alerts' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <NotificationsOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Alerts" />
      </ListItem>
    </NavLink>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Your Saved Pages</ListSubheader>
    <NavLink to='/communities/community-news' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="Community News" />
      </ListItem>
    </NavLink>
    <NavLink to='/communities/new-foster-parents' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="New Foster Parents" />
      </ListItem>
    </NavLink>
    <NavLink to='/communities/north-phx-families' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="North PHX Families" />
      </ListItem>
    </NavLink>  
    <NavLink to='/communities/special-needs-families' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="Special Needs" />
      </ListItem>
    </NavLink> 
    <NavLink to='/communities/create-private-community' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="Create a Community" />
      </ListItem>
    </NavLink>
    <NavLink to='/people/young-kids' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="Young Kids (0-4)" />
      </ListItem>
    </NavLink>
    <NavLink to='/people/new-parents' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="New Parents" />
      </ListItem>
    </NavLink>
    <NavLink to='/people/looking-for-playdate' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="Playdates" />
      </ListItem>
    </NavLink>
    <NavLink to='/resources/programs' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="Programs" />
      </ListItem>
    </NavLink>  
    <NavLink to='/resources/trainings' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="Trainings" />
      </ListItem>
    </NavLink> 
    <NavLink to='/resources/contacts' className = 'nav-links' activeClassName = 'nav-links-active-header'>
      <ListItem button>
        <ListItemIcon>
          <LinkIcon/>
        </ListItemIcon>
        <ListItemText primary="Contacts" />
      </ListItem>
    </NavLink>  
  </div>
);