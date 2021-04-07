import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Container,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from '../components/shared/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 25,
    display: 'inline-block',
    maxWidth: '100%',
    width: 400
  }
}));

const NotFound = () => {
    const router = useRouter();
    const classes = useStyles();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 10000)
    }, [])

    return (
        <Page
          className={classes.root}
          title="404"
        >
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Container maxWidth="md">
              <Typography
                align="center"
                color="textPrimary"
                variant="h2"
              >
                404: The page you are looking for isn’t here
              </Typography>
              <Typography
                align="center"
                color="textPrimary"
                variant="subtitle2"
              >
                You either tried some shady route or you came here by mistake.
                Whichever it is, try using the navigation
              </Typography>
              <Box textAlign="center">
                <img
                  alt="Under development"
                  className={classes.image}
                  //src="/static/images/undraw_page_not_found_su7k.svg"
                  src="/static/images/spock.gif"
                />
              </Box>
            </Container>
          </Box>
        </Page>
      );
};

export default NotFound;