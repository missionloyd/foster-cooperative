import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Post from '../components/people/ProfileCard';
import Page from '../components/shared/Page';
import Dashboard from "../layouts/DashboardLayout/Dashboard";

// import './People.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  }
}));

const People = () => {
  const classes = useStyles();

  return (
    <Page
    className={classes.root}
    title="People"
  >
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth={false}>
        <div>
          <h1>People 👋</h1>
        </div>
          <Grid container spacing={4}>
            <Grid item xs={12} sm= {6} md={4} align="center">
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4} align="center">
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4} align="center">
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4} align="center">
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4} align="center">
              <Post/>
            </Grid>
            <Grid item xs={12} sm= {6} md={4} align="center">
              <Post/>
            </Grid>
          </Grid>
          <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="large"
          />
        </Box>
        </Container>
      </Box>
    </Page>
  );
}

People.layout = Dashboard;

export default People;