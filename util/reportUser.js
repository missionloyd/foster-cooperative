import { firestore, auth, getUserWithUid, increment } from '../firebase/firebase';
  
export async function reportUser(uid) {
  const userRef = firestore.collection('users').doc(uid);

  // decrement karma (firebase)
  const batch = firestore.batch();
  batch.update(userRef, { karma: increment(-1) });
  await batch.commit();
}