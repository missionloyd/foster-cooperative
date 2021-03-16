import React from 'react';
//import Navbar from './components/navigation/navbar-component/Navbar';
//import Header from './components/header-component/Header';
//import PrimarySearchAppBar from './components/navigation/app-bar-component/AppBar';
import Dashboard from './components/navigation/dashboard/Dashboard';
import Home from './components/home-component/Home';
import Communities from './components/communities/communities-component/Communities';
import News from './components/communities/community-news-component/community-news';
import NewPost from './components/communities/community-news-component/pages/NewPlace.js';
import People from './components/people/people-component/pages/People';
import Alerts from './components/additional/alerts-component/Alerts.js';
//import Footer from './components/home-component/Footer';
//import Auth from './components/auth/pages/Auth';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

const App = () => {

  let routes;
  routes = (
    <Switch>
      <div className="body-container">
        <Route path = '/home' exact component = {Home}/>
        <Route path = '/communities' exact component={Communities}/>
        <Route path = '/communities/community-news' exact component={News}/>
        <Route path = '/communities/community-news/new-post' exact component={NewPost} />
        <Route path = '/people' exact component={People} />
        <Route path = '/alerts' exact component={Alerts} />
        {/* <Redirect to="/home" /> */}
      </div>
    </Switch>
  );

  return (
    <div className="main-container">
      <Router>
        <Dashboard />
          {routes}
      </Router>
    </div>
  )
}

export default App;