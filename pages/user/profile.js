import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import ProfileView from '../../components/user/profile/ProfileView';
import ProfileDetails from '../../components/user/profile/ProfileDetails';
import Dashboard from '../../layouts/DashboardLayout/Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Profile"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <ProfileView />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

Profile.layout = Dashboard;

export default Profile;
