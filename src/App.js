import React from 'react';
import Navbar from './components/navigation/navbar-component/Navbar';
//import Header from './components/header-component/Header';
import PrimarySearchAppBar from './components/navigation/app-bar-component/AppBar';
import Home from './components/home-component/Home';
import Communities from './components/communities/communities-component/Communities';
import NewsExport from './components/communities/community-news-component/community-news';
import Alerts from './components/additional/alerts-component/Alerts.js';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <PrimarySearchAppBar/>
      <div className = 'menu-container'>
        <Router>
          <Navbar/>
          <Switch>
            <Route path = '/' exact component = {Home}/>
            <Route path = '/communities' exact component={Communities}/>
            <Route path = '/communities/community-news' exact component={NewsExport}/>
            <Route path = '/alerts' exact component={Alerts} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
