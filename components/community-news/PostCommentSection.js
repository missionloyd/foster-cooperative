import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp, getUserWithUid, increment } from '../../firebase/firebase';
import firebase from 'firebase/app'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Badge, Button, Grid, TextField } from '@material-ui/core';
import { useDocument } from 'react-firebase-hooks/firestore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import toast, {Toaster} from 'react-hot-toast';
import Link from 'next/link';
import { karmaCheck } from "../../util/karmaCheck";
import moment from 'moment';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import { timeSince } from '../../util/timeSince';
import Divider from '@material-ui/core/Divider';
import { joinUserName } from "../../util/join-user-name";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '1rem',
  },
  commentCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  commentContent: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  commentText: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '0.8rem',
  },
  commentPrompt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '0.8rem',
    marginRight: '0.2rem',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  divider: {
    marginTop: '-1rem',
    marginBottom: '1rem'
  }
}))

export default function PostCommentSection({ post, postRef, comments, onCommentUpdate, commentCount }) {
  const router = useRouter();
  const classes = useStyles();
  const { username } = useContext(UserContext);
  const commentUid = uuidv4();
  const ref = firestore.collection('users').doc(post.uid).collection('posts').doc(post.slug).collection('comments').doc(commentUid);  
  // const commentRef = postRef.collection('comments').doc(selected);
  // const [commentDoc] = useDocument(commentRef);
  const [comment, setComment] = useState('');
  const [modifiedComments, setModifiedComments] = useState([]);
  const [value, setValue] = useState(comments);
  const commentCardRef = useRef();
  const [selected, setSelected] = useState(null);
  const [delComment, setDelComment] = useState(null);
  const [offset, setOffset] = useState(0);
  const [commentsRoot, setCommentsRoot] = useState(comments);
  const [count, setCount] = useState(commentCount);

  const createMarkup = html => {
    return { __html: html }
  }

  // create a user-to-post relationship
  const addComment = async (e) => {
    e.preventDefault();
    let data = null;

    // create new field of type string array
    data = {
      comment: comment,
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      //snapshots: [(await firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString())],
      key: commentUid,
      karma: 0
    };

    await ref.set(data);
    

    // increment commentCount (firebase)
    const batch = firestore.batch();
    batch.update(postRef, { commentCount: increment(1) });
    await batch.commit();

    handleCommentCountIncrease();
    let tempArray = modifiedComments;
    const user = await handleCommentInfo(auth.currentUser.uid);

    tempArray.push({
      admin: true,
      comment: data,
      user: user || null
    });

    await setCommentsRoot(tempArray);
    //console.log(modifiedComments);

    await setComment("");
    await toast.success('Comment posted!');
  };

  // increment commentCount locally
  const handleCommentCountIncrease = useCallback(e => {
    onCommentUpdate(prev => prev + 1);
    setCount(prev => prev + 1);
    setOffset(prev => prev - 1);
  }, [onCommentUpdate]);

  const handleCommentCountDecrease = useCallback(e => {
    onCommentUpdate(prev => prev - 1);
    setCount(prev => prev - 1);
    setOffset(prev => prev + 1);
  }, [onCommentUpdate]);
  

  // remove a user-to-post relationship
  const removeComment = async (e) => {
    e.preventDefault();

    // delete comment doc
    const batch = firestore.batch();
    const delRef = postRef.collection('comments').doc(selected);
    batch.delete(delRef);
    
    // increment commentCount
    batch.update(postRef, { commentCount: increment(-1) });
    await batch.commit();

    handleCommentCountDecrease();

    // find index of selected comment
    modifiedComments?.map((c, key) => {
      if(c.comment.key === selected) {
        modifiedComments.splice(key, 1);
      }
    });

    await setModifiedComments(modifiedComments);
    await setComment("");
    await toast.success('Comment Removed!');
  };

  const flagComment = async (e) => {
    e.preventDefault();

    // flagged comment doc
    const batch = firestore.batch();
    const flagRef = postRef.collection('comments').doc(selected);

    // decrement karma
    batch.update(flagRef, { karma: increment(-1) });
    await batch.commit();
    await toast('Comment Flagged!', {
      icon: '🚩',
    });
  };

  // validate length
  const isValid = comment.length > 0 && comment.length < 100;

  // menu handlers
  const handleMenuOpen = (event, key) => {
    setAnchorEl(event.currentTarget);
    setSelected(key);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAdminAnchorEl(null);
    setSelected(null);
    setDelComment(null);
    setModifiedComments(prev => [...prev]);
  };

  const handleAdminMenuOpen = (e, key) => {
    setAdminAnchorEl(e.currentTarget);
    setSelected(key);
  };

  const connect = (e) => {
    e.preventDefault();
    let userName = modifiedComments.map((c, key) => {
      if(c.comment.key === selected) {
        console.log(c.user.username);
        return c.user.username;
      }
    }).join('');
    router.push(`/users/${userName}`);
  };

  const menuId = 'menu';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
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
          <MenuItem style={{color: '#515fa8'}} onClick={e => connect(e)}>
            <AccountTreeOutlinedIcon />
            <span className={classes.spacer}></span>
            <p>Connect</p>
          </MenuItem>
        </Link>

        <Link href='/chat'>
        <MenuItem style={{color: '#f44336'}} onClick={e => flagComment(e)}>
          <FlagOutlinedIcon />
          <span className={classes.spacer}></span>
          <p>Flag Post</p>
        </MenuItem>
      </Link>
      </a>
    </Menu>
  );

  const adminMenuId = 'adminMenu';
  const [adminAnchorEl, setAdminAnchorEl] = React.useState(null);
  const isAdminMenuOpen = Boolean(adminAnchorEl);
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
        <MenuItem style={{color: '#f44336'}} onClick={e => removeComment(e)}>
          <DeleteForeverOutlinedIcon />
          <span className={classes.spacer}></span>
          <p>Delete</p>
        </MenuItem>
      </a>
    </Menu>
  );

  const handleCommentInfo = async (uid) => {
    const userDoc =  await getUserWithUid(uid);
  
    if(userDoc) {
      const user = userDoc.data();
        return {
          displayName: user.displayName,
          photoURL: user.photoURL,
          username: user.username,
          uid: uid
        } 
    } else {
      return null;
    }
  }

  useEffect(() => {
    commentsRoot?.map(async (c) => {

      let user = null;
      let admin = null;

      user = await handleCommentInfo(c.uid);

      if(c.uid === auth.currentUser.uid){
        admin = true;
      }
      else {
        admin = false;
      }
      

      setModifiedComments(prev =>
        [
          {
            comment: c,
            user: user,
            admin: admin,         
          },
          ...prev
        ]
      );
    });
  }, [value]);


  return (
    <>  
    <Toaster /> 
    <Divider variant="middle" className={classes.divider} />
    {modifiedComments?.map((c, key) => {
        if(karmaCheck(c.comment.karma)) {
        return (      
            <Card className={classes.card} key={key} ref={commentCardRef}>
              <CardContent>
                <div className={classes.commentCard}>
                  <div className={classes.commentContent}>
                    <Link href={`/users/${c.user?.username || '/home'}`} >
                      <Avatar 
                        className={classes.avatar} 
                        src={c.user?.photoURL || '/static/images/avatar_6.png'}
                      />
                    </Link>
                    <div>
                      <div className={classes.titleContainer}>
                        <Link href={`/users/${c.user?.username || '/home'}`}>
                          <Typography
                            variant="body2"
                            gutterBottom
                            dangerouslySetInnerHTML={createMarkup(c.user?.displayName || null)}
                            className={classes.titleText}
                          />
                        </Link>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {c.comment.createdAt ? timeSince(c.comment.createdAt) : '...' }
                        </Typography>
                      </div>
                      <Typography
                        variant="body2"
                        gutterBottom
                        dangerouslySetInnerHTML={createMarkup(c.comment.comment)}
                        className={classes.commentText}
                      />
                    </div>
                  </div>
                  {c.admin && (
                   <IconButton 
                      aria-label="options"
                      aria-controls={adminMenuId}
                      onClick={e => handleAdminMenuOpen(e, c.comment.key)}
                      aria-haspopup="true"
                      >
                      <MoreVertIcon />
                    </IconButton>
                  ) || (
                    <IconButton 
                      aria-label="options"
                      aria-controls={menuId}
                      onClick={e => handleMenuOpen(e, c.comment.key)}
                      aria-haspopup="true"
                      >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </div>
              </CardContent>
            </Card> 
        )
      };  
    })}
    {modifiedComments.length <= 0 && (
      <Typography
      variant="body1"
      gutterBottom
      className={classes.commentPrompt}>
        No comments yet!
      </Typography>
    )}
    <form onSubmit={addComment}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Add a nice comment right here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isValid}
      >
        Post Comment
      </Button>
    </form>
    {renderMenu}
    {renderAdminMenu}
  </>
  );
}