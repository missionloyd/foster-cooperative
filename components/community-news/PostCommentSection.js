import React, { useContext, useState } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp, getUserWithUid, postToJSON } from '../../firebase/firebase';
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
    marginLeft: '0.5rem'
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}))

export default function PostCommentSection({ post, postRef, comments }) {
  const router = useRouter();
  const classes = useStyles();
  const { username } = useContext(UserContext);
  const ref = firestore.collection('users').doc(post.uid).collection('posts').doc(post.slug).collection('comments').doc(auth.currentUser.uid);  
  const commentRef = postRef.collection('comments').doc(auth.currentUser.uid);
  const [commentDoc] = useDocument(commentRef);
  const [comment, setComment] = useState('');
  const [query, setQuery] = useState('');

  const createMarkup = html => {
    return { __html: html }
  }

  // create a user-to-post relationship
  const addComment = async (e) => {
    e.preventDefault();

    if(commentDoc?.exists) {
      commentRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment),
      });
    } else {
      // create new field of type string array
      const data = {
        comment: comment,
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        karma: 0
      };

      await ref.set(data);
      await toast.success('Comment posted!');
    }

    await setComment("");
  };

  // remove a user-to-post relationship
  const removeComment = async () => {
    e.preventDefault();

    if(commentDoc?.exists) {
      commentRef.update({
        //update
        comments: firebase.firestore.FieldRemove.arrayUnion(comment),
      });
    } 

    await setComment("");
    await toast.success('Comment Removed!');
  }

  const handleCommentInfo = async (uid) => {
    const userDoc =  await getUserWithUid(uid);

    if(userDoc) {
      const user = userDoc.data();
        return {
          displayName: user.displayName,
          photoURL: user.photoURL,
          username: user.username
        } 
    }
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

  return (
    <>  
    <Toaster />   
    {comments?.map((c, key) => {
      // const test = handleCommentInfo(c.uid);
      // setQuery(test);
      return (      
          <Card className={classes.card} key={key} >
            <CardContent>
              <div className={classes.commentCard}>
                <div className={classes.commentContent}>
                  <Avatar 
                    className={classes.small} 
                    src={'/static/images/avatar_6.png'}
                  />
                  <div>
                    <Typography
                      variant="body2"
                      gutterBottom
                      dangerouslySetInnerHTML={createMarkup(query)}
                      className={classes.commentText}
                    />
                    <Typography
                      variant="body2"
                      gutterBottom
                      dangerouslySetInnerHTML={createMarkup(c.comment)}
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
  </>
  );
}