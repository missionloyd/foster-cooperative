import React, { useContext } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '../../components/shared/Link';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MainListItems, SecondaryListItems } from './navItems';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GlobalSearchBar from './GlobalSearchBar/GlobalSearchBar';
import Copyright from '../../components/shared/Copyright';
import { UserContext } from '../../lib/context';
import AuthCheck from '../../components/auth/AuthCheck';
import { Avatar, Hidden } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#515fa8',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 3,
  },
  menuButtonHidden: {
    display: 'none',
  },
  appBarLink: {
    textDecoration:'none', 
    color: '#000'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
    flexGrow: 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    //backgroundColor: '#515fa8',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  drawerClose: {
    //backgroundColor: '#515fa8',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  drawerCloseMobile: {
    // backgroundColor: '#515fa8',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      display: 'block'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '38ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  menuItems: {
    alignItems: 'center'
  },
  drawerColor: {
    background: '#515fa8'
  }
}));

export default function Dashboard({ children }) {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const drawerRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
    //drawerRef.current.getBoundingClientRect().top
  };
  const handleDrawerClose = () => {
    setOpen(false);
    //drawerRef.current.getBoundingClientRect().top
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleCloseMenuClick = (event) => {
    handleDrawerClose();
  }

  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const menuId = 'menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <Link href='/user/profile' onClick={handleMenuClose} style={{textDecoration: 'none', color: 'black'}}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>

      <Link href='/user/account' onClick={handleMenuClose} style={{textDecoration: 'none', color: 'black'}}>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>

      <Link href='/auth' onClick={handleMenuClose} style={{textDecoration: 'none', color: 'black'}}>
        <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
      </Link>

    </Menu>
  );
  const mobileMenuId = 'menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClick={handleMobileMenuClose}
    >
      <Link href='/chat' style={{textDecoration: 'none', color: 'black'}}>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      </Link>

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      
      <Link href='/user/profile' style={{textDecoration: 'none', color: 'black'}}>
        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls="account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            {/* <AccountCircle /> */}
            <Avatar className={classes.small} src={user?.photoURL || '/static/images/avatar_6.png'}/>
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Link>
    </Menu>
  );

  return (
    // <AuthCheck>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, !mobile || (open && classes.appBarShift))}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            className={clsx(classes.menuButton, !open && classes.menuButtonHidden)}
          >
            <MenuOpenIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Foster Cooperative
          </Typography>
          {/* <div className = "logo-container">
              <img src={logo} alt= "" width = '70' height = '70'/>
          </div> */}
          <Hidden smDown>
            {mobile}
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
              <GlobalSearchBar classes={{root: classes.inputRoot, input: classes.inputInput}}/>
            </div>
          </Hidden>
          <div className={classes.sectionDesktop}>

          {renderMenu}
          {renderMobileMenu}

          <div className={classes.menuItems}>
            <Link href='/chat' style={{textDecoration: 'none', color: 'white'}}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Link>

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <Avatar className={classes.small} src={user?.photoURL || '/static/images/avatar_6.png'}/>
            </IconButton>
          </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div ref={drawerRef}></div>
      <Hidden smUp>
        {/* {setMobile} */}
        <Drawer
          variant="temporary"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerCloseMobile]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerCloseMobile]: !open,
              [classes.drawerColor]: open || !open,
            }),
          }}
          ModalProps={{
            keepMounted: true   // Better open performance on mobile.
          }}
          open={open}
          onClick={e => handleCloseMenuClick(e)}
          >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MainListItems/>
          <Divider />
          <SecondaryListItems/>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
      <Drawer
        variant="permanent"
        open={open}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.drawerColor]: open || !open,
          }),
        }}
        >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MainListItems />
        <Divider />
        <SecondaryListItems />
      </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          {/* Where the pages are being routed to */}
          {children}
          <Box pt={5}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
    // </AuthCheck> 
  );
}