import React, { useEffect, useState, useCallback, useContext } from 'react';
import { auth, firestore, getUserWithUsernameID, storage, STATE_CHANGED } from '../../firebase/firebase';
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
import Copyright from '../../components/shared/Copyright';
import { UserContext } from '../../lib/context';
//import { useForm } from '../lib/hooks/form-hook';
import { useHttpClient } from '../../lib/hooks/http-hook';
// import InputField from '../components/shared/FormElements/InputField';
import fetcher from '../../lib/fetcher';
import useSWR from 'swr';
import Router from 'next/router';
import { Container, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import LinearDeterminate from '../../components/shared/FormElements/LinearDeterminate';
import statesData from '../../data/states-array.json';
import { avatarGenerator } from '../../util/avatarGenerator';
import toast, { Toaster } from 'react-hot-toast';
import AdminCheck from '../../components/auth/AdminCheck';
import Loader from '../../components/shared/LoadingSpinner.js';

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
    height: '6rem',
    width: '6rem'
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

export async function getServerSideProps({ query }) {
  const username = query.user;
  const id  = query.id;

  const userDoc = await getUserWithUsernameID(username, id);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;

  if (userDoc) {
    user = userDoc.data();
  }

  return {
    props: { user },
  };
}

// Username form
export default function NextSteps({ user }) {
  //const { user } = useContext(UserContext);
  const classes = useStyles();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [newRole, setNewRole] = useState(false);
  const [customRole, setCustomRole] = useState('');
  const [state, setState] = useState('');
  const [formState, setformState] = useState(25);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL);

  // background image
  // const { backgroundData } = useSWR('/api/unsplash', fetcher);
  // const backgroundUrl = (backgroundData?.result.response.urls.regular || 'https://source.unsplash.com/random');
  const backgroundUrl = '';

  // random avatar generator
  const avatarUrl = avatarGenerator(user?.uid);

  const authSubmitHandler = async (e) => {     
    e.preventDefault();
    Router.push('/');
  }

  const handleRoleChange = (e) => {
    const val = e.target.value;
    if(val !== 'Other...') {
      if((role === '' || role === 'Other...') && customRole === '') {
        setformState(formState + 25);
      }
      setCustomRole('');
      setRole(val);
      setNewRole(false);
    } else {
      setRole('Other...');
      setNewRole(true);
      if(formState !== 25) {
        setformState(formState - 25);
      }
    }
  };

  const handleCustomRoleChange = (e) => {
    const val = e.target.value;
    setCustomRole(val);
    if (customRole === '') {
      setformState(formState + 25);
      
    } else if(val.length === 0){
      setformState(formState - 25);
    }
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    if (state === '') {
      setformState(formState + 25);
    }
  };

  const handleCityChange = (e) => {
    const val = e.target.value;
    setCity(val);
    if (city === '') {
      setformState(formState + 25);
      
    } else if(val.length === 0){
      setformState(formState - 25);
    }
  };

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(`profilePictures/${auth.currentUser.uid}/${Date.now()}.${extension}`);
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(pct);

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setPhotoUrl(url);
          setUploading(false);
        });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRef = firestore.collection('users').doc(user?.uid);
    const batch = firestore.batch();

    batch.update(userRef, {
      role: role !== 'Other...' ? role : customRole,
      city: city,
      state: state,
      photoURL: photoUrl
    });

    await batch.commit();

    await toast.success('Profile Updated!');
    await Router.push('/home');
  }

  return (
    (
      <AdminCheck user={user}>
        <Toaster />
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} style={{ backgroundImage: `url(${backgroundUrl})` }}/>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Loader show={uploading} />
              {!uploading && (
                <>
                  <input 
                    type="file" 
                    onChange={uploadFile} 
                    accept="image/x-png,image/gif,image/jpeg" 
                    hidden 
                    id="profile-picture"
                    multiple
                  />
                  <label htmlFor="profile-picture">
                    <IconButton component="span">
                      <Avatar   
                        className={classes.avatar}
                        src={(downloadURL && !uploading) ? downloadURL : user?.photoURL || avatarUrl}
                        //src={avatarUrl}
                        //onClick={uploadFile}
                        //id="profile-picture"
                      >
                      </Avatar>
                    </IconButton>
                  </label>
                </>
              )}
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
                          onChange={e => handleRoleChange(e)}
                          label="Role"
                        >
                          {/* <MenuItem value="Other" onClick={e => handleRoleChange(e, 'Other...')}>
                            <em>Other...</em>
                          </MenuItem> */}
                          <MenuItem value={'Foster Parent'}>Foster Parent</MenuItem>
                          <MenuItem value={'Caregiver'}>Caregiver</MenuItem>
                          <MenuItem value={'Birth Parent'}>Birth Parent</MenuItem>
                          <MenuItem value={'Case Worker'}>Case Worker</MenuItem>
                          <MenuItem value={'Other...'}>Other...</MenuItem>
                        </Select>
                      </FormControl>
                  </Grid>
                  {newRole && (
                          <TextField 
                            variant="outlined"
                            margin="normal"
                            id="custom-role"
                            label="Custom Role"
                            name="role"
                            fullWidth
                            required
                            onChange={e => handleCustomRoleChange(e)}
                          />
                      )}
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
                          //validators={[VALIDATOR_REQUIRE()]}
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
                      onClick={e => handleSubmit(e)} 
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
      </AdminCheck>
    )
  );
}