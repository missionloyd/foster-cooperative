import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Router } from 'next/router';
import { useForm } from 'react-hook-form';
import { serverTimestamp } from '../../firebase/firebase';
import toast from 'react-hot-toast';

const useStyles = makeStyles(() => ({
  root: {}
}));

function PostForm({ defaultValues, postRef, className, ...rest }){
  const classes = useStyles();
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

  const updatePost = async ({ content }) => {
    await postRef.update({
      content,
      updatedAt: serverTimestamp(),
    });

    reset({ content });

    toast.success('Post updated successfully!')
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(updatePost)}
      // className={clsx(classes.root, className)}
      // {...rest}
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
              md={12}
            >
              <TextField
                fullWidth
                helperText="at least 5 characters"
                label="Post"
                name='content'
                variant="outlined"
                {...register('content', {required: true})}
              />
            </Grid>
            <Grid
              item
              md={6}
            >
            {/* <ImageUpload
              id="image"
              //onInput={inputHandler}
              //errorText="Please provide an image."
            /> */}
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
          >
            Save Post
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default PostForm;
