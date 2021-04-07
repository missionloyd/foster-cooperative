import { createContext } from 'react';
import LoadingScreen from 'react-loading-skeleton';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = AuthContext();
  if (isLoading || (!isAuthenticated && window.location.pathname !== '/auth')){
    return <LoadingScreen />; 
  }
  return children;
};
