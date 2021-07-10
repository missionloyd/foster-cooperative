import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router'
import {
  Container,
  makeStyles,
  Typography
} from '@material-ui/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import Page from '../../../components/shared/Page';
import { useForm } from 'react-hook-form';
import Dashboard from '../../../layouts/DashboardLayout/Dashboard';
import AuthCheck from '../../../components/auth/AuthCheck';
import { auth, firestore, serverTimestamp } from '../../../firebase/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ImageUploader from '../../../components/shared/FormElements/ImageUploader';
import toast, { Toaster } from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '10rem'
  }
}));

const NewPost = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Post"
    >
      <AuthCheck>
        <Container maxWidth="md">
          <PostManager />
        </Container>
      </AuthCheck>
    </Page>
  );
};

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
  const [post] = useDocumentData(postRef);

  return (
    <>
    {post && (
      <PostForm postRef={postRef} defaultValues={post} preview={preview} />
    )}
    </>
  );
}

function PostForm({ postRef, defaultValues, preview }){
  const classes = useStyles();
  const router = useRouter();
  const { register, handleSubmit, reset, setValue, watch, formState } = useForm({ defaultValues, mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const [ photoURL, setPhotoURL ] = useState('');
  const [ mode, setMode ] = useState(false);

  const updatePost = async ({ content, photoURL, published }) => {
    await postRef.update({
      content,
      photoURL,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, photoURL, published });

    await toast.success('Post updated successfully!');
    await router.back();
  };
  
  // watch
  const currentPublished = watch("published");

  // content 
  const { ref: contentRef, ...contentProps} = register("content", {
    required: { value: true, message: 'Content is required'},
    maxLength: { value: 500, message: 'Content is too long' },
    minLength: { value: 10, message: 'Content is too short' }
  });

  // photoURL
  const { ref: photoRef, ...photoProps } = register("photoURL");
  //const photoRef = useRef(null);

  // publish
  const { ref: publishedRef, ...publishedProps} = register("published");

  if(defaultValues?.content === '' && !mode) {
    setMode(true);
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(updatePost)}
    >
      <Toaster />
      <Card>
        {/* <CardHeader
          title={defaultValues?.exists ? "New Post 📩" : "Edit Post 📩"}
          // titleTypographyProps={{variant:'h1' }}
        /> */}
        <Container>
          {mode && (
            <h1>Create Post 📩</h1>
          ) ||
            <h1>Edit Post 📩</h1>
          }
        </Container>
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Content"
                variant="outlined"
                defaultValue=""
                multiline
                maxRows={10}
                //rowsMin={2}
                id="content"
                name="content"
                inputRef={contentRef}
                {...contentProps}
                error={!!formState.content}
                helperText={formState?.content?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUploader post={defaultValues} {...photoProps} name="photoURL" photoRef={(e) => {
                photoRef(e)
                photoRef.current = e?.src;
                setPhotoURL(e?.src);
                setValue("photoURL", photoURL, {
                  shouldDirty: true
                });
              }} />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          p={2}
        >
          <Box
            display="flex"
            alignItems="center"
          >
           <Checkbox color="primary" checked={currentPublished} ref={publishedRef} {...publishedProps} onChange={(e) => {
                setValue("published", e.target.checked, {
                  shouldValidate: true,
                  shouldDirty: true
                });
              }}/>
           <Typography>Publish Post</Typography>
          </Box>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={(!isValid || !isDirty)}
          >
            Save Post
          </Button>
        </Box>
      </Card>
    </form>
  );
};

NewPost.layout = Dashboard;

export default NewPost;