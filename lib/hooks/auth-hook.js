import { useState, useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { set } from 'react-hook-form';
import { auth, firestore } from '../../firebase/firebase';

let logoutTimer;

export function useUserData() {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  // firebase
  const [user] = useAuthState(auth);
  const [uid, setUid] = useState(null);
  const [username, setUsername] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [connections, setConnections] = useState(null);
  const [karma, setKarma] = useState(null);
  const [role, setRole] = useState(null);
  const [communities, setCommunities] = useState(null);
  const [bio, setBio] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [id, setId] = useState(null);
  
  // mongo
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  // mongo
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  // mongo
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // mongo
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  // firebase
  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        const data = doc.data();
        setUsername(data?.username);
        setUid(user?.uid);
        setPhotoURL(data?.photoURL);
        setConnections(data?.connections);
        setKarma(data?.karma);
        setRole(data?.role);
        setCommunities(data?.communities);
        setBio(data?.bio);
        setCity(data?.city);
        setState(data?.state);
        setId(doc?.id);
      });
    } else {
      setUsername(null);
      setUid(null);
      setPhotoURL(null);
      setConnections(null);
      setKarma(null);
      setRole(null);
      setCommunities(null);
      setBio(null);
      setCity(null);
      setState(null);
      setId(null);
    }

    return unsubscribe;
  }, [user]);

  return { 
    token, 
    login, 
    logout, 
    userId, 
    user, 
    username,
    uid,
    photoURL,
    connections,
    karma,
    role,
    communities,
    bio,
    city,
    state,
    id
  };
};