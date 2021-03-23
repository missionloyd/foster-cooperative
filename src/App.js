import React from 'react';
import { BrowserRouter as Router, useRoutes,} from "react-router-dom";
import routes from './routes'
import './App.css';

const Routes = () => {
  const routing = useRoutes(routes);
  return routing;
};

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App;