import React, { useEffect, useState, useCallback, useContext } from 'react';
import { auth, firestore, googleAuthProvider } from '../firebase/firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { ContactsOutlined } from '@material-ui/icons';
import { joinUserName } from '../util/join-user-name';


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
  nameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  spacer: {
    margin: theme.spacing(1)
  }
}));

export default function SignInSide(props) {
  //const { user, username } = useContext(UserContext);

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <UsernameForm />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
  );
}

// Sign in with Google button
function SignInButton() {

  const { user, username } = useContext(UserContext);
  const classes = useStyles();
  const router = useRouter();

  const signInwithGoogle = async (e) => {
    await auth.signInWithPopup(googleAuthProvider);

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${joinUserName(user.displayName)}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, { 
      username: `${joinUserName(user.displayName)}`,
      displayName: user.displayName, 
      email: user.email, 
      photoURL: user.photoURL, 
      uid: user.uid });

    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();

    router.push('/home');
  };  

  return (
    <Button 
      className={classes.btnGoogle} 
      fullWidth
      onClick={signInwithGoogle} 
    >
      <img src={'/google.png'} width="20rem" style={{marginRight: "0.5rem"}}/> Sign up with Google
    </Button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}

// Username form
function UsernameForm() {

  const classes = useStyles();
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  const intialValues = { firstName: "", lastName: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);



  const onSubmit = async () => {
    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${joinUserName((formValues.firstName +" "+ formValues.lastName).toString())}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    //batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName, uid: user.uid });
    batch.set(userDoc, { 
      displayName: joinUserName((formValues.firstName +" "+ formValues.lastName).toString()), 
      email: formValues.email, 
      uid: user.uid 
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();

    router.push('/home');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setFormValues({...formValues, [name]: value});
  }

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName = true;
    } else if (values.firstName.length < 2) {
      errors.firstName = true;
      alert("Firstname must be more than 2 characters");
    }

    if (!values.lastName) {
      errors.lastName = true;
    } else if (values.lastName.length < 2) {
      errors.lastName = true; 
      alert("Password must be more than 2 characters");
    }

    if (!values.email) {
      errors.email = true;
    } else if (!regex.test(values.email)) {
      errors.email = true;
      alert("Invalid email format");
    } else if (!isValid) {
        errors.email = true;
        alert("Email Already Exists");
    }
    
    if (!values.password) {
      errors.password = true;
    } else if (values.password.length < 5) {
      errors.password = true;
      alert("Password must be more than 5 characters");
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      onSubmit();
    }
  }, [formErrors]);

  useEffect(() => {
    checkEmail(formValues.email);
  }, [formValues.email]);


  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkEmail = useCallback(
    debounce(async (email) => {
      if (email.length >= 3) {
        setLoading(true);
        const ref = firestore.doc(`emails/${email}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    (
      <section>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <div className={classes.nameContainer}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstName"
              autoComplete="firstname"
              value={formValues.firstName} 
              error={formErrors.firstName}
              onChange={handleChange}
            />
            <span className={classes.spacer}></span>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastName"
                autoComplete="lastname"
                value={formValues.lastName} 
                error={formErrors.lastName}
                onChange={handleChange}
              />
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formValues.email} 
            error={formErrors.email}
            onChange={handleChange}
          />
          {/* <UsernameMessage username={formValues.email} isValid={isValid} loading={loading} /> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formValues.password}
            error={formErrors.password}
            onChange={handleChange}
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
            //disabled={!isValid}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <SignInButton />
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Validating Email...</p>;
  } 
  else if (isValid) {
    return <p className="text-success">The email "{username}" is available!</p>;
  } 
  else if (username && !isValid) {
    return <p className="text-danger">That email is already taken!</p>;
  } 
  else {
    return <p></p>;
  }
}