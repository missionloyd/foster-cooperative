import React, { useEffect, useState, useCallback, useContext } from 'react';
import { auth, firestore, googleAuthProvider } from '../firebase/firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../components/shared/Copyright';
import { UserContext } from '../lib/context';
import { useForm } from '../lib/hooks/form-hook';
import GoogleSignIn from '../components/auth/GoogleSignIn';
import { useHttpClient } from '../lib/hooks/http-hook';
import InputField from '../components/shared/FormElements/InputField';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../components/shared/util/validators';

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
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  },
  spacer: {
    margin: theme.spacing(1)
  }
}));


// Username form
export default function Auth() {
  const defaultAuth = useContext(UserContext);
  const classes = useStyles();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };


  const authSubmitHandler = async (e) => {     
    e.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        defaultAuth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } 
    else if (!isLoginMode) {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );
        defaultAuth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  }

  return (
    (
      <section>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {isLoginMode ? 'Log In' : 'Sign Up' }
              </Typography>
              <h1>{error}</h1>
                <form className={classes.form} noValidate onSubmit={authSubmitHandler}>
                  {!isLoginMode && (
                    <InputField 
                      element="input"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="name"
                      label="Full Name"
                      name="name"
                      autoComplete="name"
                      errorText="Please provide your name"
                      validators={[VALIDATOR_REQUIRE()]}
                      onChange={inputHandler}   
                    />
                  )}
                  <InputField
                    element="input"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    errorText="Please enter a valid email address."
                    validators={[VALIDATOR_EMAIL()]}
                    onChange={inputHandler}
                  />
                  <InputField
                    element="input"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    errorText="Please enter a valid password, at least 6 characters."
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    onChange={inputHandler}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!formState.isValid}
                    className={classes.submit}
                  >
                    {isLoginMode ? "Login" : "Sign Up"}
                  </Button> 
                  <GoogleSignIn text={isLoginMode ? "Login with Google" : "Sign up with Google"}/>
                </form>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <a className={classes.btnSwitchView} variant="body2" onClick={switchModeHandler}>
                      {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                    </a>
                  </Grid>
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