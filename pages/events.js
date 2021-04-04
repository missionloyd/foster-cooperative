import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid
} from '@material-ui/core';
import Calendar from '../components/events/Calendar';
import Page from '../components/shared/Page';
import TypesOfEvents from '../components/events/TypesOfEvents';
import Dashboard from "../layouts/DashboardLayout/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    width: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  }
}));

const Events = () => {
  const classes = useStyles();

  return (
    <Page
    className={classes.root}
    title="Events"
    >
        <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item md={9}>
                <Calendar />
              </Grid>
              <Grid item md={3}>
                <TypesOfEvents/>
              </Grid>
            </Grid>
            <Box
            mt={2}
            display="flex"
            justifyContent="center"
            >
            </Box>
          </Container>
        </Box>
    </Page>
  );
}

Events.layout = Dashboard;

export default Events;