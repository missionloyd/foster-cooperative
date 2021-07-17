import React, { useContext, useEffect, useState } from 'react';
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
import { firestore, getUserWithUid, auth, increment } from '../../firebase/firebase';
import { useDocumentData, useDocument } from 'react-firebase-hooks/firestore';
import HeartButton from '../../components/community-news/HeartButton';
import PostCommentSection from './PostCommentSection';
import { karmaCheck } from '../../util/karmaCheck';
import Router, { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { timeSince } from '../../util/timeSince';
import { karmaManager } from '../../util/karmaManager';
import { queries } from '../../util/queries';
import { UserContext } from '../../lib/context';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '2rem',
    maxWidth: '35rem',
    width: '100%'
    //display: 'inline-block'
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
    marginRight: '0.1rem',
  },
  color: {
    primary: theme.primary,
    warn: theme.error
  },
  grid: {

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
  const router = useRouter();
  const { uid } = useContext(UserContext);
  const postRef = firestore.collection('users').doc(post?.uid).collection('posts').doc(post?.slug);
  const [flag, setFlag] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const isMenuOpen = Boolean(anchorEl);
  const isAdminMenuOpen = Boolean(adminAnchorEl);
  const url = (post?.photoURL);
  
  const userRef = firestore.collection('users').doc(post.uid);
  const [user] = useDocumentData(userRef);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (e, key) => {
    setAnchorEl(e.currentTarget);
  };

  const handleAdminMenuOpen = (e, key) => {
    setAdminAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAdminAnchorEl(null);
  };

  function dateCheck() {
    let output = '';
    
    if(post.updatedAt) {
      const date = timeSince(post.updatedAt);

      // if(post.createdAt !== post.updatedAt) {
      //   output = 'Edited ';
      // } else {
      //   output = ''
      // }

      if(date.includes('y') || date.includes('mo') || date.includes('d')) {
        output += moment(post.updatedAt).format('LL');
      } else {
        output += timeSince(post.updatedAt);
      }
    }

    return output;
  }

  // create a user-to-post relationship
  const flagPost = async (e, selected) => {
    e.preventDefault();

    // flagged post doc
    const uid = admin.uid;
    const batch = firestore.batch();
    const flagRef = postRef.collection('flags').doc(auth.currentUser.uid);

    // work-around for useDocument
    const docExists = await flagRef.get()
      .then((snapshot) => {
        if(snapshot.exists){
          return true;
        } else {
          return false;
        }
      });

    if(!docExists) {
      // decrement karma
      batch.update(postRef, { karma: increment(-1) });
      batch.set(flagRef, { uid });
      await batch.commit();

      await toast('Post Reported!', {
        icon: '🚩',
      });
      // exit 
      setFlag(true);
      karmaManager(post.uid, -1);
    } else {
      await toast.error('Comment Already Reported!');
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    //const router = useRouter();
    const doIt = confirm('Are you sure?');
    
    if (doIt) {
      await postRef.delete();
      Router.reload(window.location.pathname);
      toast('Post Removed!', {
        icon: '🗑️'
      });
    }
  };

  const connect = (e) => {
    e.preventDefault();
    router.push(`/${post.userName}`);
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
        <MenuItem style={{color: '#515fa8'}} onClick={e => connect(e)}>
          <AccountTreeOutlinedIcon />
          <span className={classes.spacer}></span>
          <p>Connect</p>
        </MenuItem>

        <MenuItem style={{color: '#f44336'}} onClick={e => flagPost(e, post.slug)}>
          <FlagOutlinedIcon />
          <span className={classes.spacer}></span>
          <p>Report</p>
        </MenuItem>
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

        <MenuItem style={{color: '#f44336'}} onClick={e => deletePost(e)}>
          <DeleteForeverOutlinedIcon />
          <span className={classes.spacer}></span>
          <p>Delete</p>
        </MenuItem>
      </a>
    </Menu>
  );

  //const profileLink = queries({user: user?.username, id: user?.id}, 0);

  return (karmaCheck(post.karma) && !flag && (
    <React.Fragment>
      <Toaster />
      <Card className={classes.root}>
      <CardHeader
          avatar={
            <Link href={`/${post.username}`}>
              <a>
                <PostPhotoManager post={post} />
              </a>
            </Link>
          }
          action={uid === owner && (
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
            <Link href={`/${post.username}`}>
              <a className={classes.postTitle}>{user?.displayName || 'Anonymous User'} - {user?.role || 'Unknown Role'}</a>
            </Link>
          }
          subheader={dateCheck()}
          //subheader={post.updatedAt ? timeSince(post.updatedAt) : '...'}
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
      <Collapse in={expanded} timeout="auto">
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