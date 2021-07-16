import { firestore, increment } from '../firebase/firebase';
  
export const karmaManager = async (uid, option) => {
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