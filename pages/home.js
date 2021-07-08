import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WebIcon from '@material-ui/icons/Web';
import InstagramIcon from '@material-ui/icons/Instagram';

import MainFeaturedPost from '../components/home/MainFeaturedPost.js';
import FeaturedPost from '../components/home/FeaturedPost.js';
import Main from '../components/home/Main.js';
import Sidebar from '../components/home/Sidebar';

import post1 from '../data/demo-data/blog-post.1.md.js';
import post2 from '../data/demo-data/blog-post.2.md.js';
import post3 from '../data/demo-data/blog-post.3.md.js';
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import Page from "../components/shared/Page";
import fetcher from '../lib/fetcher';
import useSWR from 'swr';


//import './Home.css';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0)
  },
}));

const mainFeaturedPost = {
  title: 'Welcome to Foster Cooperative',
  description:
    "Our mission is to empower champions of at-risk children to positively impact the children they love and care for.",
  image: '',
  imgText: 'main image description',
  //linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: '',
    imageText: 'Image Text',
    link: "",
    action: 'Continue reading...'
  },
  {
    title: 'Explore Community News',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: '',
    imageText: 'Image Text',
    link: "/community-news/feed",
    action: 'Explore...'
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Foster Arizona was established in 2013 by foster/adoptive mom and creative, Kimberly Vehon, in response to the increasing number of children needing homes and the urgent need for Arizonans to get involved in the foster care crisis.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'Facebook', icon: FacebookIcon, link: "https://www.facebook.com/FosterAZ/" },
    { name: 'Twitter', icon: TwitterIcon, link: "https://twitter.com/fosterarizona" },
    { name: 'Instagram', icon: InstagramIcon, link: "https://www.instagram.com/fosterarizona/" },
    { name: 'Foster AZ', icon: WebIcon, link: "https://fosterarizona.org/" },
    { name: 'GitHub', icon: GitHubIcon, link: "https://github.com/missionloyd/foster-cooperative" }
  ],
};

const Home = (props) => {
  const classes = useStyles();

  const { data } = useSWR('/api/unsplash', fetcher);

  const url = (data?.result.response.urls.regular || 'https://source.unsplash.com/random');

  return (
    <Page
      title="Home"
    >
      <CssBaseline />
      <Container maxWidth="xl">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} url={url} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} url={url} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="From the Phoenix Community" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      {props.image}
    </Page>
  );
}

Home.layout = Dashboard;

export default Home;