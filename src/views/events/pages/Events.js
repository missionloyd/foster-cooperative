import React from 'react';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import Calendar from '../components/Calendar';
import Page from '../../../components/Page';
import TypesOfEvents from '../components/TypesOfEvents';

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
                <Calendar />
                <TypesOfEvents/>
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
export default Events;