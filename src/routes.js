import React from 'react';
import { Navigate } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout/Dashboard';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './views/home/pages/Home';
import Account from './views/account/pages/Account';
import Communities from './views/communities/communities-main/pages/Communities';
import News from './views/communities/community-news/pages/CommunityNews';
import NewPost from './views/communities/community-news/pages/NewPlace';
import People from './views/people/pages/People';
import Events from './views/events/pages/Events';
import Alerts from './views/alerts/pages/Alerts';
import NotFoundView from './views/errors/NotFoundView';
import Auth from './views/auth/pages/DemoAuth';

const routes = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'account', element: <Account /> },
            { path: 'communities', element: <Communities /> },
            { path: 'communities/community-news', element: <News />},
            { path: 'communities/community-news/new-post', element: <NewPost />},
            { path: 'people', element: <People /> },
            { path: 'events', element: <Events /> },
            { path: 'alerts', element: <Alerts />},
            { path: '*', element: <NotFoundView /> },
            { path: '/', element: <Navigate to="home" /> },
        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'auth', element: <Auth /> }
        ]
    }
]

export default routes;