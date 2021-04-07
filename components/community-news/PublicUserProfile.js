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
import PropTypes from 'prop-types';
//import clsx from 'clsx';
import moment from 'moment';
// import ProfileView from '../../components/user/profile/ProfileView';
// import ProfileDetails from '../../components/user/profile/ProfileDetails';
// import Dashboard from '../../layouts/DashboardLayout/Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
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

const PublicUserProfile = ({ user }) => {
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
            src={user.photoURL}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.displayName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Tempe, Arizona
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {/* {`${moment().format('hh:mm A')} ${user.timezone}`} */}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Connect
        </Button>
      </CardActions>
    </Card>
  );
};

// PublicUserProfile.propTypes = {
//   className: PropTypes.string
// };

export default PublicUserProfile;
