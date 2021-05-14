import React, { useState } from 'react';
import {
  Container,
  makeStyles
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
import Page from '../../../components/shared/Page';
import { useForm } from 'react-hook-form';
import Dashboard from '../../../layouts/DashboardLayout/Dashboard';
import AuthCheck from '../../../components/auth/AuthCheck';
import { useRouter } from 'next/router';
import { auth, firestore } from '../../../firebase/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ImageUploader from '../../../components/shared/FormElements/ImageUploader';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1
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
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues, mode: 'onChange' });

  const updatePost = async ({ content }) => {
    await postRef.update({
      content,
      updatedAt: serverTimestamp(),
    });

    reset({ content });

    toast.success('Post updated successfully!')
  };

  const { ref, ...contentProps} = register("content", {
    required: { value: true, message: 'Content is required'},
    maxLength: { value: 500, message: 'Content is too long' },
    minLength: { value: 10, message: 'Content is too short' }
  });

  //console.log(errors)
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(updatePost)}
    >
      <Card>
        <CardHeader
          title="New Post 📩"
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
                inputRef={ref}
                {...contentProps}
                error={!!errors.content}
                helperText={errors?.content?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUploader post={defaultValues}/>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={errors?.content?.message != null}
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