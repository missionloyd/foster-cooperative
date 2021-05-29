import React, { useCallback, useContext, useEffect, useState } from "react";
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

export default function PostCommentSection({ post, postRef, comments, onCommentUpdate }) {
  const router = useRouter();
  const classes = useStyles();
  const { username } = useContext(UserContext);
  const ref = firestore.collection('users').doc(post.uid).collection('posts').doc(post.slug).collection('comments').doc(auth.currentUser.uid);  
  const commentRef = postRef.collection('comments').doc(auth.currentUser.uid);
  const [commentDoc] = useDocument(commentRef);
  const [comment, setComment] = useState('');
  const [tempComment, setTempComment] = useState([]);
  const [modifiedComments, setModifiedComments] = useState([]);
  const [value, setValue] = useState([]);

  const createMarkup = html => {
    return { __html: html }
  }

  // create a user-to-post relationship
  const addComment = async (e) => {
    e.preventDefault();

    if(commentDoc?.exists) {
      commentRef.update({
        uid: auth.currentUser.uid,
        comment: firebase.firestore.FieldValue.arrayUnion(comment),
        updatedAt: serverTimestamp(),
        snapshots: firebase.firestore.FieldValue.arrayUnion((await firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString())),
      });
    } else {
      // create new field of type string array
      const data = {
        comment: [comment],
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        snapshots: [(await firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString())],
        karma: 0
      };

      await ref.set(data);
      await toast.success('Comment posted!');
    }

    // increment commentCount (firebase)
    const batch = firestore.batch();
    batch.update(postRef, { commentCount: increment(1) });
    await batch.commit();

    handleCommentCountIncrease();

    await setTempComment(tempComment => [...tempComment, comment]);
    await setComment("");
  };

  // increment commentCount locally
  const handleCommentCountIncrease = useCallback(e => {
    onCommentUpdate(prev => prev + 1)
  }, [onCommentUpdate]);

  const handleCommentCountDecrease = useCallback(e => {
    onCommentUpdate(prev => prev - 1)
  }, [onCommentUpdate]);
  

  // remove a user-to-post relationship
  const removeComment = async () => {
    e.preventDefault();

    if(commentDoc?.exists) {
      commentRef.update({
        //update
        comments: firebase.firestore.FieldRemove.arrayUnion([comment]),
      });
    } 

    handleCommentCountDecrease();

    await setComment("");
    await toast.success('Comment Removed!');
  }

  // validate length
  const isValid = comment.length > 3 && comment.length < 100;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        <MenuItem style={{color: '#f44336'}} onClick={e => console.log("DELETE!")}>
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
    comments?.map(async (c) => {
      const user = await handleCommentInfo(c.uid)
      setModifiedComments(prev =>
        [
          {
            comment: c,
            user: user || null
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
        return c.comment.comment.map((j, key) => {
      if(karmaCheck(c.comment.karma)) {

        return (      
            <Card className={classes.card} key={key} >
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
                    <IconButton 
                    aria-label="options"
                    aria-controls={menuId}
                    onClick={handleMenuOpen}
                    aria-haspopup="true"
                    >
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card> 
        );  
      }})
    })
    || "No comments yet!"}
      {tempComment?.map((c, key) => {
       return (      
          <Card className={classes.card} key={key}>
            <CardContent>
              <div className={classes.commentCard}>
                <div className={classes.commentContent}>
                  <Link href={`/users/${joinUserName(auth.currentUser.displayName)}`} >
                    <Avatar 
                      className={classes.avatar} 
                      src={auth.currentUser.photoURL || '/static/images/avatar_6.png'}
                    />
                  </Link>
                  <div>
                    <div className={classes.titleContainer}>
                      <Link href={`/users/${joinUserName(auth.currentUser.displayName)}`}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          dangerouslySetInnerHTML={createMarkup(auth.currentUser.displayName)}
                          className={classes.titleText}
                        />
                      </Link>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {timeSince(Date.now()) || '...'}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      gutterBottom
                      dangerouslySetInnerHTML={createMarkup(c)}
                      className={classes.commentText}
                    />
                  </div>
                  {console.log(c)}
                </div>
                  <IconButton 
                  aria-label="options"
                  aria-controls={menuId}
                  onClick={handleMenuOpen}
                  aria-haspopup="true"
                  >
                  <MoreVertIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card> 
        )})
      }
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
  </>
  );
}