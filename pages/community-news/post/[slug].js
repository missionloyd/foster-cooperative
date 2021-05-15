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

function PostForm({ defaultValues, postRef, preview }){
  const classes = useStyles();
  const router = useRouter();
  const { register, handleSubmit, reset, setValue, watch, formState } = useForm({ defaultValues, mode: 'onChange' });
  const { isValid, isDirty } = formState;

  const success = () => toast.success('Post updated successfully!');

  const updatePost = async ({ content, photoURL, published }) => {
    await postRef.update({
      content,
      photoURL,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, photoURL, published });

    console.log(published);

    await toast.success('Post updated successfully!');
    await router.back();
  };

  // content 
  const { ref: contentRef, ...contentProps} = register("content", {
    required: { value: true, message: 'Content is required'},
    maxLength: { value: 500, message: 'Content is too long' },
    minLength: { value: 10, message: 'Content is too short' }
  });

  // photoURL
  const { ref, ...photoProps } = register("photoURL");
  const photoRef = useRef(null);

  // publish
  const { ref: publishedRef, ...publishedProps} = register("published");

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(updatePost)}
    >
      <Toaster />
      <Card>
        <CardHeader
          title="New Post 📩"
          // titleTypographyProps={{variant:'h1' }}
        />
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
                label="Post"
                variant="outlined"
                defaultValue=""
                multiline
                rows={2}
                rowsMax={10}
                inputRef={contentRef}
                {...contentProps}
                error={!!formState.content}
                helperText={formState?.content?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUploader post={defaultValues} {...photoProps} name="photoURL" photoRef={(e) => {
                ref(e)
                photoRef.current = e?.src;
                setValue("photoURL", e?.src);
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
           <Checkbox color="primary" ref={publishedRef} {...publishedProps} onChange={(e) => {
                setValue("published", e.target.checked);
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