import { useContext } from 'react';
import { firestore, auth, increment } from '../../firebase/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from 'react';
import { karmaManager } from '../../util/karmaManager';
import { UserContext } from '../../lib/context';

// allows user to heart/like a post
export default function Heart({ post, postRef }) {
  // listen to heart doc for currently logged in user
  const { user } = useContext(UserContext);
  const heartRef = postRef.collection('hearts').doc(user?.uid);
  const [heartDoc] = useDocument(heartRef);
  const [heartCount, setHeartCount] = useState(post?.heartCount);

  // create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
    await setHeartCount(heartCount+1);

    //update karma
    await karmaManager(post.uid, 1);
  };

  // remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
    await setHeartCount(heartCount-1);

    //update karma
    await karmaManager(post.uid, -1);
  }


  return heartDoc?.exists ? (
    <>
      <IconButton onClick={removeHeart} aria-label="heart">
        <FavoriteIcon style={{fill: 'red'}} />
      </IconButton>
      <span style={{marginRight: '0.2rem'}}>
        {heartCount || 0}
      </span>
    </>
    ) : (
    <>
      <IconButton onClick={addHeart} aria-label="heart">
        <FavoriteIcon />
      </IconButton>
      <span style={{marginRight: '0.2rem'}}>
        {heartCount || 0}
      </span>
    </>
  );
}