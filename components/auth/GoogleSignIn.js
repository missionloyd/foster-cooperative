import React, { useContext } from 'react';
import { auth, firestore, googleAuthProvider, serverTimestamp } from '../../firebase/firebase';
import { useRouter } from 'next/router';
import { UserContext } from '../../lib/context';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { userNameGenerator } from '../../util/userNameGenerator';
import { useHttpClient } from '../../lib/hooks/http-hook';
import { queries } from '../../util/queries';
import randomize from 'randomatic';

const useStyles = makeStyles((theme) => ({
  btnGoogle: {
    marginBottom: '1rem',
    backgroundColor: '#fafafa',
  },
}));

// Sign in with Google button
export default function SignInButton({text}) {

  const { sendRequest } = useHttpClient();
  const classes = useStyles();
  const router = useRouter();
  const { user, username, photoURL, connections, karma } = useContext(UserContext);

  const signInwithGoogle = async (e) => {
    e.preventDefault();
    await auth.signInWithPopup(googleAuthProvider).then(async () => {
      // Create refs for both documents
      const userDoc = firestore.doc(`users/${auth?.currentUser.uid}`);
      //const userName = userNameGenerator(auth?.currentUser.displayName);
      // const usernameDoc = firestore.doc(`usernames/${userName}`);
      //const emailDoc = firestore.doc(`emails/${user.email}`); 

      // Commit both docs together as a batch write.
      if(!userDoc) {
        const batch = firestore.batch();
        batch.set(userDoc, { 
          displayName: auth?.currentUser.displayName, 
          email: auth?.currentUser.email, 
          uid: auth?.currentUser.uid,
          //lastSeen: serverTimestamp()
        });
  
        await batch.commit();
      }

      // translate values into mongo
      try {
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('name', user.displayName);
        formData.append('password', 'super_secret_dont_share');
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );
      } catch (err) {console.log(err)}

      if(userDoc) {
        await router.push('/home');
      } else {
        await router.push('/nextsteps');
      }

});
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

function defaultSignOut() {
  return <button onClick={() => firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  })
  }></button>
}