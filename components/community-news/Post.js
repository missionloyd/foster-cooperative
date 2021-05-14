import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/ModeComment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import { Badge, Button, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import moment from 'moment';
import { getUserWithUsername } from '../../firebase/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '35rem',
    marginBottom: '2rem'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  postTitle: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  spacer: {
    marginRight: '0.5rem',
  },
  color: {
    primary: theme.primary,
    warn: theme.error
  }
}));

export default function Post({ post, admin = false }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const url = (post?.photoURL);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClick={handleMenuClose}
    >
      <a>
        <Link href={`/community-news/post/${post.slug}`}>
          <MenuItem style={{color: '#03b0b5'}}>
            <EditOutlinedIcon />
            <span className={classes.spacer}></span>
            <p>Edit Post</p>
          </MenuItem>
        </Link>

        <Link href='/user/profile'>
          <MenuItem style={{color: '#515fa8'}}>
            <AccountTreeOutlinedIcon />
            <span className={classes.spacer}></span>
            <p>Connect</p>
          </MenuItem>
        </Link>

        <Link href='/chat'>
        <MenuItem style={{color: '#f44336'}}>
          <FlagOutlinedIcon />
          <span className={classes.spacer}></span>
          <p>Flag Post</p>
        </MenuItem>
        </Link>
      </a>
    </Menu>
  );

  return (
    <React.Fragment>
      <Card className={classes.root}>
      <CardHeader
          avatar={
            <Link href={`/users/${post.username}`}>
              <Avatar   
                aria-label="user" 
                className={classes.avatar}
                src={post?.photoURL || '/static/images/anonymous'}
              >
              </Avatar>
            </Link>
          }
          action={
          <IconButton 
            aria-label="options"
            aria-controls={menuId}
            onClick={handleMenuOpen}
            aria-haspopup="true"
          >
              <MoreVertIcon />
          </IconButton>
          }
          title={
            <Link href={`/users/${post.username}`}>
              <a className={classes.postTitle}>{post?.user || 'Anonymous User'} - Foster Parent since 2015</a>
            </Link>
          }
          subheader={post.updatedAt ? moment(post.updatedAt).format('LLL') : '...'}
      />
      {post?.photoURL && (<CardMedia
          className={classes.media}
          image={url}
          title="post-image"
      />)}
      <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          {post.content || ''}
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <IconButton aria-label="heart">
            <FavoriteIcon />
          </IconButton>
          <span style={{marginRight: '0.5rem'}}>
            {post.heartCount || 0}
          </span>
          <IconButton aria-label="comments" onClick={handleExpandClick}>
            <CommentIcon />
          </IconButton>
          <span>
            {post.commentsNumber || 0}
          </span>
          <IconButton
          className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
          </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <Typography paragraph>
              {post?.comments || "No comments yet!"}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Add a nice comment right here..."
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
          >
            Post
          </Button>
          </CardContent>
      </Collapse>
      </Card>
      {renderMenu}
    </React.Fragment>
  );
}
