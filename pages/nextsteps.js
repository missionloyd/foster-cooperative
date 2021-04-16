
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { auth, firestore, googleAuthProvider } from '../firebase/firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../components/shared/Copyright';
import { UserContext } from '../lib/context';
//import { useForm } from '../lib/hooks/form-hook';
import { useHttpClient } from '../lib/hooks/http-hook';
// import InputField from '../components/shared/FormElements/InputField';
import fetcher from '../lib/fetcher';
import useSWR from 'swr';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../components/shared/util/validators';
import Router from 'next/router';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import LinearDeterminate from '../components/shared/FormElements/LinearDeterminate';
import statesData from '../data/states-array.json';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer'
    },
    height: '4rem',
    width: '4rem'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGoogle: {
    marginBottom: '1rem',
    backgroundColor: '#fafafa',
  },
  btnSwitchView: {
    color: '#515fa8',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 4
  },
  spacer: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
  stateformControl: {
    marginTop: theme.spacing(2),
    //minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    background: '#03b0b5',
    width: '6rem',
    color: 'white',
  },
  link: {
    color: '#515fa8',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
}));


// Username form
export default function NextSteps() {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [formState, setformState] = useState(25);

  const { data } = useSWR('/api/unsplash', fetcher);
  const url = (data?.result.response.urls.regular || 'https://source.unsplash.com/random');

  const authSubmitHandler = async (e) => {     
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', formState.inputs.email.value);
      formData.append('name', formState.inputs.fname.value + " " + formState.inputs.lname.value);
      formData.append('password', formState.inputs.password.value);
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/signup',
        'POST',
        formData
      );
      defaultAuth.login(responseData.userId, responseData.token);
      Router.push('/');
    } catch (err) {}
    
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (role == '') {
      setformState(formState + 25);
    }
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    if (state == '') {
      setformState(formState + 25);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    if (city == '') {
      setformState(formState + 25);
    }
  };

  const handleSubmit = () => {
    console.log(
      "Role: " + role + 
      " City: " + city + 
      " State: " + state
    );
    Router.push('/');
  }

  return (
    (
      <section>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} style={{ backgroundImage: `url(${url})` }}/>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar   
                  aria-label="user" 
                  className={classes.avatar}
                  src={user?.photoURL || '/static/images/anonymous.png'}
                >
                </Avatar>
              <Typography component="h1" variant="h5">
                Next Steps
              </Typography>
              <h1>{error}</h1>
              <Typography variant="body2" color="textSecondary" gutterBottom align={'center'} style={{ marginBottom: '2rem' }}>
                Tell us about yourself so we can create the best possible experience for you.
              </Typography>
                <form className={classes.form} noValidate onSubmit={authSubmitHandler}>
                  <Grid container spacing={2}>
                    <FormControl variant="filled" className={classes.formControl} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Select your Role...</InputLabel>
                        <Select
                          labelId="outlined-label"
                          id="role"
                          value={role}
                          onChange={handleRoleChange}
                          label="Role"
                        >
                          <MenuItem value="">
                            <em>Other...</em>
                          </MenuItem>
                          <MenuItem value={'Caregiver'}>Caregiver</MenuItem>
                          <MenuItem value={'Foster Parent'}>Foster Parent</MenuItem>
                          <MenuItem value={'Birth Parent'}>Birth Parent</MenuItem>
                          <MenuItem value={'Case Worker'}>Case Worker</MenuItem>
                        </Select>
                      </FormControl>
                  </Grid>
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="city"
                          label="City"
                          value={city}
                          helperText="Please enter a valid city"
                          validators={[VALIDATOR_REQUIRE()]}
                          onChange={handleCityChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <FormControl variant="filled" className={classes.stateformControl} fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                          <Select
                            labelId="outlined-label"
                            id="state"
                            value={state}
                            onChange={handleStateChange}
                            label="Role"
                          >
                            {statesData.map((states) => {
                              return <MenuItem value={states.name} key={states.code}>{states.name}</MenuItem>
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                  </Grid>
                </form>
                <Grid container style={ {marginTop: '1rem'} }>
                  <Grid item xs>
                    <Link href="/home" variant="body2">
                      <a className={classes.link}>Skip for now...</a>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button 
                      onClick={handleSubmit} 
                      variant="contained" 
                      className={classes.button}
                      disabled={formState != 100 || city == ''}
                    >
                      Join
                    </Button>
                  </Grid>
                  <LinearDeterminate value={formState} />
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
            </div>
          </Grid>
        </Grid>
      </section>
    )
  );
}