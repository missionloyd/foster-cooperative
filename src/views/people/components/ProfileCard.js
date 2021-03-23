import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minwidth: 450,
    maxWidth: 400,
    marginTop: 20,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 125,
    height: 125,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 0,
  },
  bio: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10
  },
  button: {
    display: 'flex',
    background: '#03b0b5',
    width: '7rem',
    color: 'white',
    justifyContent: 'center',
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <Card className={classes.root}>
        <CardHeader
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            subheader="Name - Foster Parent since 2015"
        />
        <CardContent className={classes.content}>
          <div className={classes.center}>
            <Avatar aria-label="profile" className={classes.avatar}>
                U
            </Avatar>
          </div>
          <div className={classes.bio}>
            <Typography variant="body2" color="textSecondary" component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </div>
          <div className={classes.center}>
            <Button variant="contained" className={classes.button}>
              Connect
            </Button>
          </div>
        </CardContent>
        </Card>
    </React.Fragment>
  );
}
