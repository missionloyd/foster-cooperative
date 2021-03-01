import React from 'react';
//import Navbar from './components/navigation/navbar-component/Navbar';
//import Header from './components/header-component/Header';
//import PrimarySearchAppBar from './components/navigation/app-bar-component/AppBar';
import Dashboard from './components/navigation/dashboard/Dashboard';
import Home from './components/home-component/Home';
import Communities from './components/communities/communities-component/Communities';
import News from './components/communities/community-news-component/community-news';
import Alerts from './components/additional/alerts-component/Alerts.js';
//import Footer from './components/home-component/Footer';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <div className = 'menu-container'>
        <Router>
        <Dashboard/>
          <Switch>
            <div className= 'body-container'>
            <Route path = '/home' exact component = {Home}/>
            <Route path = '/communities' exact component={Communities}/>
            <Route path = '/communities/community-news' exact component={News}/>
            <Route path = '/alerts' exact component={Alerts} />
            <Redirect to="/home" />
            </div>
          </Switch>
        </Router>
      </div>
      {/* <Footer title="Foster Cooperative" description="We're glad you're here!" /> */}
    </>
  );
}

export default App;
