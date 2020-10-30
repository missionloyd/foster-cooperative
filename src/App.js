import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import Communities from './components/Communities';
import Alerts from './components/Alerts';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Header/>
      <div className = 'menu-container'>
        <Router>
          <Navbar/>
          <Switch>
            <Route path = '/' exact component = {Home}/>
            <Route path = '/communities' exact component={Communities} />
            <Route path = '/alerts' exact component={Alerts} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
