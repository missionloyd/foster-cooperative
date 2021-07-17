import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid,
  Button
} from '@material-ui/core';
import { firestore, postToJSON } from '../firebase/firebase';

import Pagination from '@material-ui/lab/Pagination';
import Post from '../components/people/ProfileCard';
import Page from '../components/shared/Page';
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import PublicUserProfile from '../components/user/profile/PublicUserProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  button: {
    width: '10rem',
    backgroundColor: '#03b0b5',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#03b0b5',
    },
  },
}));

// Max post to query per page
const LIMIT = 9;

export async function getServerSideProps(context) {
  const usersQuery = firestore
    .collectionGroup('users')
    //.where('published', '==', true)
    //.orderBy('karma', 'desc')
    .limit(LIMIT);

  const users = (await usersQuery.get()).docs.map(postToJSON);

  return {
    props: { users }, // will be passed to the page component as props
  };
}

const People = ({ users }) => {
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
      width="100vw"
      maxWidth="100%"
    >
      <Container maxWidth={false}>
        <div>
          <h1>People 👋</h1>
        </div>
        <Grid container spacing={4}>
        {users?.map((user, key) => {
          return(
            <Grid item xs={12} sm= {6} md={4} align="center" key={key}>
              <PublicUserProfile user={user} />
            </Grid>
          );
        })}
        </Grid>
        <Box
        mt={3}
        display="flex"
        justifyContent="center"
        >
          <Button onClick={e => console.log("Get more users!")} variant="contained" className={classes.button}>Load more</Button>
        </Box>
      </Container>
      </Box>
    </Page>
  );
}

People.layout = Dashboard;

export default People;