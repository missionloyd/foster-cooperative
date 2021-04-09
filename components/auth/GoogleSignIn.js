import React, { useContext } from 'react';
import { auth, firestore, googleAuthProvider } from '../../firebase/firebase';
import { useRouter } from 'next/router';
import { UserContext } from '../../lib/context';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { joinUserName } from '../../util/join-user-name';

const useStyles = makeStyles((theme) => ({
  btnGoogle: {
    marginBottom: '1rem',
    backgroundColor: '#fafafa',
  },
}));

// Sign in with Google button
export default function SignInButton({text}) {

  const { user, username } = useContext(UserContext);
  const classes = useStyles();
  const router = useRouter();

  const signInwithGoogle = async (e) => {
    await auth.signInWithPopup(googleAuthProvider);

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${joinUserName(user.displayName)}`);
    //const emailDoc = firestore.doc(`emails/${user.email}`); 

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, { 
      username: `${joinUserName(user.displayName)}`,
      displayName: user.displayName, 
      email: user.email, 
      photoURL: user.photoURL, 
      uid: user.uid 
    });

    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();

    router.push('/home');
  };  

  return (
    <Button 
      className={classes.btnGoogle} 
      fullWidth
      onClick={signInwithGoogle} 
    >
      <img src={'/google.png'} width="20rem" style={{marginRight: "0.5rem"}}/> 
    {text}
    </Button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}