import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '2rem'
  },
});

export default function LinearDeterminate(props) {
  const classes = useStyles();

  // MIN = Minimum expected value
  const MIN = 0;
  // MAX = Maximium expected value
  const MAX = 100;
  // Function to normalise the values (MIN / MAX could be integrated)
  const normalise = value => (value - MIN) * 100 / (MAX - MIN);

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </div>
  );
}