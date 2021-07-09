import React, { useEffect, useState } from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import moment from 'moment';
import { firestore, getUserWithUid, auth } from '../../firebase/firebase';
import { useDocumentData, useDocument } from 'react-firebase-hooks/firestore';
import HeartButton from '../../components/community-news/HeartButton';
import PostCommentSection from './PostCommentSection';
import { karmaCheck } from '../../util/karmaCheck';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

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
    marginRight: '0.2rem',
  },
  color: {
    primary: theme.primary,
    warn: theme.error
  }
}));

function PostPhotoManager({post}) {
  const classes = useStyles();
  const userRef = firestore.collection('users').doc(post.uid);
  const [user] = useDocumentData(userRef);

  return (
    <>
    {user && (
      <Avatar   
      aria-label="user" 
      className={classes.avatar}
      src={user?.photoURL || '/static/images/anonymous'}
      >
      </Avatar>
    )}
    </>
  );
}

function PostHeartManager({ post, postRef }) {
  return (
    <>
    {postRef && (
      <div>
      <HeartButton 
        post={post}
        postRef={postRef}
      />
      </div>
    )}
    </>
  );
}
function PostCommentManager({ post, postRef, comments, onCommentUpdate, commentCount }) {
  return (
    <>
    {postRef && (
      <div>
      <PostCommentSection 
        post={post}
        postRef={postRef}
        comments={comments}
        onCommentUpdate={onCommentUpdate}
        commentCount={commentCount}
      />
      </div>
    )}
    </>
  );
}

export default function Post({ post, comments, owner }) {
  const classes = useStyles();
  const postRef = firestore.collection('users').doc(post?.uid).collection('posts').doc(post?.slug);
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const isMenuOpen = Boolean(anchorEl);
  const isAdminMenuOpen = Boolean(adminAnchorEl);
  const url = (post?.photoURL);
  const admin = auth.currentUser.uid;
  
  const userRef = firestore.collection('users').doc(post.uid);
  const [user] = useDocumentData(userRef);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (e, key) => {
    setAnchorEl(e.currentTarget);
    setSelected(key);
  };

  const handleAdminMenuOpen = (e, key) => {
    setAdminAnchorEl(e.currentTarget);
    setSelected(key);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAdminAnchorEl(null);
    setSelected(null);
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

  const adminMenuId = 'adminMenu';
  const renderAdminMenu = (
    <Menu
      anchorEl={adminAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={adminMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isAdminMenuOpen}
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
        <MenuItem style={{color: '#f44336'}} onClick={e => deletePost(e, postRef)}>
          <DeleteForeverOutlinedIcon />
          <span className={classes.spacer}></span>
          <p>Delete</p>
        </MenuItem>
      </a>
    </Menu>
  );

  return (karmaCheck(post.karma) && (
    <React.Fragment>
      <Toaster />
      <Card className={classes.root}>
      <CardHeader
          avatar={
            <Link href={`/users/${post.username}`}>
              <a>
                <PostPhotoManager post={post} />
              </a>
            </Link>
          }
          action={admin === owner && (
          <IconButton 
            aria-label="options"
            aria-controls={adminMenuId}
            onClick={e => handleAdminMenuOpen(e, post.slug)}
            aria-haspopup="true"
          >
              <MoreVertIcon />
          </IconButton>
          ) || (
          <IconButton 
            aria-label="options"
            aria-controls={menuId}
            onClick={e => handleMenuOpen(e, post.slug)}
            aria-haspopup="true"
          >
              <MoreVertIcon />
          </IconButton>
          )}
          title={
            <Link href={`/users/${post.username}`}>
              <a className={classes.postTitle}>{user?.displayName || 'Anonymous User'} - Foster Parent since 2015</a>
            </Link>
          }
          subheader={post.updatedAt ? moment(post.updatedAt).format('LLL') : '...'}
      />
      {post?.photoURL && (
        <CardMedia
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
          <PostHeartManager post={post} postRef={postRef} />
          <IconButton aria-label="comments" onClick={handleExpandClick}>
            <CommentIcon />
          </IconButton>
          <span>
            {commentCount || 0}
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
            <PostCommentManager post={post} postRef= {postRef} comments={comments} onCommentUpdate={setCommentCount} commentCount={commentCount} />
          </CardContent>
      </Collapse>
      </Card>
      {renderMenu}
      {renderAdminMenu}
    </React.Fragment>
    )
  );
}

const deletePost = async (e, { postRef }) => {
  e.preventDefault();
  //const router = useRouter();
  const doIt = confirm('Are you sure?');
  
  if (doIt) {
    await postRef.delete();
    router.basePath('community-news');
    toast('Comment Removed!', {
      icon: '🗑️'
    });
    console.log("yes");
  }
};