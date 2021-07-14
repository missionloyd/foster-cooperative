import React, { useState, useContext } from 'react';
import { firestore, auth, increment, serverTimestamp } from '../../../firebase/firebase';
import { Button } from '@material-ui/core';
import { useDocument } from 'react-firebase-hooks/firestore';
import toast, { Toaster } from 'react-hot-toast';

// allows users to be "friends" on platform
export default function ConnectButton({ user }) {
  const currentUserUid = auth?.currentUser.uid;
  const userUid = user?.uid;
  const currentUserRef = firestore.collection('users').doc(currentUserUid);
  const userRef = firestore.collection('users').doc(userUid);
  const currentConnectRef = firestore.collection('users').doc(currentUserUid).collection('connections').doc(userUid);
  const connectRef = firestore.collection('users').doc(userUid).collection('connections').doc(currentUserUid);
  const [currentUserDoc] = useDocument(currentConnectRef);
  const [userDoc] = useDocument(connectRef);

  const sendRequest = async (e) => {
    e.preventDefault();
    let data = null;

    data = {
      uid: currentUserUid,
      requestAt: serverTimestamp(),
    };

    await connectRef.set(data);
    await toast.success('Request Sent!');
  };

  const acceptRequest = async (e) => {
    e.preventDefault();
    const batch = firestore.batch();
    let data = null;

    data = {
      uid: currentUserUid,
      acceptedAt: serverTimestamp(),
    };

    await connectRef.set(data);
    batch.update(currentUserRef, {connections: increment(1) });
    batch.update(userRef, {connections: increment(1) });
    await batch.commit();
    await toast.success('New Connection!');
  };

  const removeConnection = async (e) => {
    e.preventDefault();
    const batch = firestore.batch();
    batch.delete(currentConnectRef);
    batch.delete(connectRef);
    batch.update(currentUserRef, {connections: increment(-1) });
    batch.update(userRef, {connections: increment(-1) });
    await batch.commit();
    await toast.success('Connection Removed!');
  }

  return (
    <>
      <Toaster />
      {(userDoc?.exists && currentUserDoc?.exists) ? (
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={e => removeConnection(e)}
        >
          Remove Connection
        </Button>
      ) : (!userDoc?.exists && currentUserDoc?.exists) && (
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={e => acceptRequest(e)}
        >
          Accept Connection
        </Button>
      ) ||
      <Button
        color="primary"
        fullWidth
        variant="text"
        disabled={userDoc?.exists}
        onClick={e => sendRequest(e)}
      >
        {!userDoc?.exists && `Connect` || `Request Sent`}
      </Button>
      }
    </>
  );
}