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
import { useHttpClient } from '../../../lib/hooks/http-hook';
import { useForm } from '../../../lib/hooks/form-hook'
import ImageUpload from '../../shared/FormElements/ImageUpload';
import { Router } from 'next/router';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
    const classes = useStyles();
    //const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
        },
        false
    );

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };

    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
        const formData = new FormData();
        formData.append('title', formState.inputs.title.value);
        formData.append('description', formState.inputs.description.value);
        formData.append('address', formState.inputs.address.value);
        formData.append('creator', auth.userId);
        formData.append('image', formState.inputs.image.value);
        await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
            Authorization: 'Bearer ' + auth.token
        });
        Router.push('/');
        } catch (err) {}
    };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
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
                name="post-content"
                onChange={inputHandler}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
            >
            <ImageUpload
              id="image"
              onInput={inputHandler}
              //errorText="Please provide an image."
            />
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
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
