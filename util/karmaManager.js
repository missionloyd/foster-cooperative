import { firestore, auth, getUserWithUid, increment } from '../firebase/firebase';
  
export async function karmaManager(uid, option) {
  const userRef = firestore.collection('users').doc(uid);
  const batch = firestore.batch();

  if(option === 1) {
    // increment karma
    batch.update(userRef, { karma: increment(1) });
  } else {
    // decrement karma
    batch.update(userRef, { karma: increment(-1) });
  }
  await batch.commit();
}