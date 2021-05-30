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
  const ref = firestore.collection('users').doc(post.uid).collection('posts').doc(post.slug).collection('comments').doc(auth.currentUser.uid);  
  const commentRef = postRef.collection('comments').doc(auth.currentUser.uid);
  const [commentDoc] = useDocument(commentRef);
  const [comment, setComment] = useState('');
  const [modifiedComments, setModifiedComments] = useState([]);
  const [value, setValue] = useState([]);
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

    if(commentDoc?.exists) {
      data = {
        uid: auth.currentUser.uid,
        comment: firebase.firestore.FieldValue.arrayUnion(comment),
        updatedAt: serverTimestamp(),
        snapshots: firebase.firestore.FieldValue.arrayUnion((await firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString())),
      }

      await commentRef.update(data);
    } else {
      // create new field of type string array
      data = {
        comment: [comment],
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        snapshots: [(await firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString())],
        karma: 0
      };

      await ref.set(data);
    }

    // increment commentCount (firebase)
    const batch = firestore.batch();
    batch.update(postRef, { commentCount: increment(1) });
    await batch.commit();

    handleCommentCountIncrease();

    if(commentDoc?.exists) {
      let key1,key2 = null;
      const keyArray = await modifiedComments?.map((c, k) => {
        console.log(c);
        if(username === c.user.username) {
          key1 = k;
          console.log(key1);

          return c.comment.comment.map((j, key) => {
            console.log("j:" + j);

            if(j[key === null]) {
              key2 = key;
              return key;
            }
          });
        }
      });
      let tempArray = modifiedComments;
      let del1 = tempArray[key1].comment.comment.push(comment);
      let del2 = tempArray[key1].comment.snapshots.push(Date.now());
      await setModifiedComments(tempArray);
    } else {
      let tempArray = [];
      // create new field of type string array
      data = {
        admin: true,
        comment: 
          {
            comment: [comment],
            createdAt: serverTimestamp(),
            karma: 0,
            snapshots: [(await firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString())],
            uid: auth.currentUser.uid,
            updatedAt: serverTimestamp(),
          },
        user: await handleCommentInfo(auth.currentUser.uid) 
      };
      tempArray.push(data);
      await setModifiedComments(tempArray);
    }

    // console.log(await comments)
    // console.log(await modifiedComments)
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
    console.log(commentCardRef);

    //remove comment and snapchot from array
    if(commentDoc?.exists && await delComment.length - offset > 1) {
      commentRef.update({
        //update
        comment: firebase.firestore.FieldValue.arrayRemove(await delComment?.comment),
        snapshots: firebase.firestore.FieldValue.arrayRemove(await delComment?.snapshot)
      });
    } // remove a user-to-comment relationship 
    else {
      const batch = firestore.batch();
      batch.delete(commentRef);
      await batch.commit();
    }

    // increment commentCount (firebase)
    const batch = firestore.batch();
    batch.update(postRef, { commentCount: increment(-1) });
    await batch.commit();

    handleCommentCountDecrease();

    await setComment("");

    let key1,key2 = null;
    const keyArray = await modifiedComments?.map((c, k) => {
      key1 = k;
      return c.comment.comment.map((j, key) => {
        if(j === delComment.comment) {
          key2 = key;
          return key;
        }
      });
    });
    //console.log('key1: ' + key1 + ' key2: '+ key2)
    //console.log(modifiedComments[key1].comment.comment[key2]);

    let tempArray = modifiedComments;
    let del1 = tempArray[key1].comment.comment.splice(key2,1);
    let del2 = tempArray[key1].comment.snapshots.splice(key2,1);
    await setModifiedComments(tempArray);

    await toast.success('Comment Removed!');
  }

  // validate length
  const isValid = comment.length > 3 && comment.length < 100;

  // menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAdminAnchorEl(null);
    setSelected(null);
    setDelComment(null);
    setModifiedComments(prev => [...prev]);
  };

  const handleAdminMenuOpen = (e, comment, snapshot, length) => {
    setAdminAnchorEl(e.currentTarget);
    setSelected(commentCardRef.current);
    setDelComment({comment, snapshot, length});
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
        <MenuItem style={{color: '#f44336'}} onClick={removeComment}>
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
          username: user.username
        } 
    } else {
      return null;
    }
  }

  useEffect(() => {
    commentsRoot?.map(async (c) => {
      const user = await handleCommentInfo(c.uid);
      let admin = null;

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
            user: user || null,
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
    {modifiedComments?.map(c => {
      //{console.log(modifiedComments)}
        return c.comment.comment.map((j, key) => {
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
                          {c.comment.createdAt ? timeSince(c.comment.snapshots[key]) : '...' }
                        </Typography>
                      </div>
                      <Typography
                        variant="body2"
                        gutterBottom
                        dangerouslySetInnerHTML={createMarkup(j)}
                        className={classes.commentText}
                      />
                    </div>
                  </div>
                  {c.admin && (
                   <IconButton 
                      aria-label="options"
                      aria-controls={adminMenuId}
                      onClick={e => handleAdminMenuOpen(e, j, c.comment.snapshots[key], c.comment.comment.length)}
                      aria-haspopup="true"
                      >
                      <MoreVertIcon />
                    </IconButton>
                  ) || (
                    <IconButton 
                      aria-label="options"
                      aria-controls={menuId}
                      onClick={handleMenuOpen}
                      aria-haspopup="true"
                      >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </div>
              </CardContent>
            </Card> 
        );  
      }})
    })
    || "No comments yet!"}
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