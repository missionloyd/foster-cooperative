import Link from 'next/link';
import React, { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { firestore, serverTimestamp, auth } from '../../firebase/firebase';
import { UserContext } from '../../lib/context';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ResizableIconButton from '../../components/community-news/ResizableIconButton';
import kebabCase from 'lodash.kebabcase';
import { v4 as uuidv4 } from 'uuid';
import randomize from 'randomatic';

export default function CreateNewPost(){
  const router = useRouter();
  const { username } = useContext(UserContext);
  
  // Ensure slug is URL safe
  const uid = randomize('0', 12);
  const userUid = auth.currentUser.uid;
  const slug = encodeURI(kebabCase(uid));

  // validate uid
  const isValid = slug.length > 3 && slug.length < 20;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const ref = firestore.collection('users').doc(userUid).collection('posts').doc(slug);

    const data = {
      slug,
      username,
      uid: userUid,
      content: "",
      photoURL: "",
      published: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
      commentCount: 0,
      karma: 0
    };

    await ref.set(data);

    toast.success('Post created!');

    // Imperative navigation after doc is set
    router.push(`/community-news/post/${slug}`);
  };
  
  return (
    <div onClick={e => {createPost(e)}}>
      <ResizableIconButton size='large'>
        <AddCircleRoundedIcon />
      </ResizableIconButton>
    </div>
  );
};