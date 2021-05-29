import React from 'react';
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
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import moment from 'moment';
import { firestore } from '../../firebase/firebase';
import { useDocumentData, useDocument } from 'react-firebase-hooks/firestore';
import HeartButton from '../../components/community-news/HeartButton';
import PostCommentSection from './PostCommentSection';

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

function PostHeartManager({ post }) {
  const postRef = firestore.collection('users').doc(post?.uid).collection('posts').doc(post?.slug);
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
function PostCommentManager({ post, comments, onCommentUpdate }) {
  const postRef = firestore.collection('users').doc(post?.uid).collection('posts').doc(post?.slug);
  // const commentsRef = postRef.collection('comments').doc('comments');
  // const [commentsDoc] = useDocument(commentsRef);

  return (
    <>
    {postRef && (
      <div>
      <PostCommentSection 
        post={post}
        postRef={postRef}
        comments={comments}
        onCommentUpdate={onCommentUpdate}
      />
      </div>
    )}
    </>
  );
}

export default function Post({ post, comments, admin = false }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [commentCount, setCommentCount] = React.useState(post.commentCount);
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
              <a>
                <PostPhotoManager post={post} />
              </a>
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
              <a className={classes.postTitle}>{post?.owner || 'Anonymous User'} - Foster Parent since 2015</a>
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
          <PostHeartManager post={post} />
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
            <PostCommentManager post={post} comments={comments} onCommentUpdate={setCommentCount} />
          </CardContent>
      </Collapse>
      </Card>
      {renderMenu}
    </React.Fragment>
  );
}
