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
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { useRouter } from "next/router";
import { List } from '@material-ui/core';
import { HowToVoteRounded } from '@material-ui/icons';


const useStyles = makeStyles({
  inactive: {
    color: '#fafafa',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#465394' 
    },
  },  
  active: {
    color: '#03b0b5',
    backgroundColor: '#465394'
  },
  icon: {
    color: '#fafafa'
  }
})

export const MainListItems = () => {
  const classes = useStyles();
  const router = useRouter();

  return(
  <List>
    <div className={router.pathname == "/home" ? classes.active : classes.inactive}>
      <Link href='/home' passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <HomeOutlinedIcon className={router.pathname == "/home" ? classes.active : classes.inactive} />
          </ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItem>
      </Link>
    </div>
    <div>  
      <Link href='/' passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <AccountTreeOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Communities" />
        </ListItem>
      </Link>
    </div>
      <div className={router.pathname == "/people" ? classes.active : classes.inactive}>
      <Link href='/people' passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <PeopleAltOutlinedIcon className={router.pathname == "/people" ? classes.active : classes.inactive}/>
          </ListItemIcon>
          <ListItemText primary="People" />
        </ListItem>
      </Link>
    </div>
    <Link href='/resources' passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <CommentOutlinedIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="Resources" />
      </ListItem>
    </Link>
    <div className={router.pathname == "/events" ? classes.active : classes.inactive}>
      <Link href='/events' passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <DateRangeOutlinedIcon className={router.pathname == "/events" ? classes.active : classes.inactive}/>
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
      </Link>
    </div>
    <div className={router.pathname == "/alerts" ? classes.active : classes.inactive}>
    <Link href='/alerts' passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <NotificationsOutlinedIcon className={router.pathname == "/alerts" ? classes.active : classes.inactive}/>
        </ListItemIcon>
        <ListItemText primary="Alerts" />
      </ListItem>
    </Link>
    </div>
  </List>
);
}

export const SecondaryListItems = () => {
  const classes = useStyles();
  const router = useRouter();

return (
  <List>
    <ListSubheader inset>Your Saved Pages</ListSubheader>
    <div className={router.pathname == "/community-news" ? classes.active : classes.inactive}>
      <Link href='/community-news/feed' passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <LinkIcon className={router.pathname == "/community-news/feed" ? classes.active : classes.inactive}/>
          </ListItemIcon>
          <ListItemText primary="Community News" />
        </ListItem>
      </Link>
    </div>
    <Link href='/communities/new-foster-parents' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="New Foster Parents" />
      </ListItem>
    </Link>
    <Link href='/communities/north-phx-families' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="North PHX Families" />
      </ListItem>
    </Link>  
    <Link href='/communities/special-needs-families' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="Special Needs" />
      </ListItem>
    </Link> 
    <Link href='/communities/create-private-community' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="Create a Community" />
      </ListItem>
    </Link>
    <Link href='/people/young-kids' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="Young Kids (0-4)" />
      </ListItem>
    </Link>
    <Link href='/people/new-parents' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="New Parents" />
      </ListItem>
    </Link>
    <Link href='/people/looking-for-playdate' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="Playdates" />
      </ListItem>
    </Link>
    <Link href='/resources/programs' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="Programs" />
      </ListItem>
    </Link>  
    <Link href='/resources/trainings' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="Trainings" />
      </ListItem>
    </Link> 
    <Link href='/resources/contacts' activeClassName="active" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <LinkIcon className="icon"/>
        </ListItemIcon>
        <ListItemText primary="Contacts" />
      </ListItem>
    </Link>  
  </List>
);
}