// UI component for user profile
import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
//import PropTypes from 'prop-types';
//import clsx from 'clsx';
import moment from 'moment';
import ConnectButton from './ConnectButton';
import { auth } from '../../../firebase/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    //width: '58%',
    width: '35rem',
  },
  avatar: {
    height: 100,
    width: 100
  },
  button: {
    background: 'white',
    color: '#03b0b5',
  },
  spacer: {
    margin: '0.4rem',
  }
}));

const user = {
  avatar: '/static/images/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export default function PublicUserProfile({ user }){
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user?.photoURL || "/static/images/spock.gif"}
          />
          <span className={classes.spacer}></span>
          <Typography
            color="primary"
            //gutterBottom
            variant="h4"
          >
            {user?.displayName || 'Anonymous User'}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
            //gutterBottom
          >
            {(user?.city && user?.state) && (
              `${user?.city + `, ` + user?.state}`
            )}
          </Typography>
          <Typography
            color="textSecondary"
            //gutterBottom
            variant="body1"
          >
            {user?.role || ''}
          </Typography>
          {user?.bio && (
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {/* {`${moment().format('hh:mm A')} ${user.timezone}`} */}
              {user?.bio || ''}
            </Typography>
          )}
        </Box>
      </CardContent>
      {auth?.currentUser.uid !== user?.uid && (
        <>
          <Divider />
          <CardActions>
            <ConnectButton user={user}/>
          </CardActions>
        </>
      )}
    </Card>
  );
};
