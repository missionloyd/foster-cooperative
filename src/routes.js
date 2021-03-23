import React from 'react';
import { Navigate } from 'react-router';
import Dashboard from './layouts/DashboardLayout/Dashboard';
import Home from './views/home/pages/Home';
import Communities from './views/communities/communities-main/pages/Communities';
import News from './views/communities/community-news/pages/CommunityNews';
import NewPost from './views/communities/community-news/pages/NewPlace';
import People from './views/people/pages/People';
import Alerts from './views/alerts/pages/Alerts';
import NotFoundView from './views/errors/NotFoundView';

const routes = [
    {
        path: '/',
        element: <Dashboard/>,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'communities', element: <Communities /> },
            { path: 'communities/community-news', element: <News />},
            { path: 'communities/community-news/new-post', element: <NewPost />},
            { path: 'people', element: <People/> },
            { path: 'alerts', element: <Alerts />},
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
        path: '/',
        element: <Dashboard />,
        children: [
            { path: '/', element: <Navigate to="/home" />},
            { path: '404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
]

export default routes;