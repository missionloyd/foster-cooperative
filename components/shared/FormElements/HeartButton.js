import { firestore, auth, increment } from '../../../firebase/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

// allows user to heart/like a post
export default function Heart({ postRef }) {
  // listen to heart doc for currently logged in user
  //console.log(postRef);
  const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  // create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  // remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  }


  return heartDoc?.exists ? (
    <IconButton onClick={removeHeart} aria-label="heart" style={{fill: 'red'}}>
      <FavoriteIcon />
    </IconButton>
    ) : (
    <IconButton onClick={addHeart} aria-label="heart">
      <FavoriteIcon />
    </IconButton>
  );
}