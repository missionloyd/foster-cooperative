import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import App from "next/app";
import Router, { useRouter } from "next/router";
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import * as gtag from '../lib/gtag';
import { UserContext } from '../lib/context';
import PageChange from "../components/shared/PageChange.js";
import { useUserData } from '../lib/hooks/auth-hook';

Router.events.on("routeChangeStart", (url) => {
  //document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url}/>,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", (url) => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  //document.body.classList.remove("body-page-transition");
  gtag.pageview(url);
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  //document.body.classList.remove("body-page-transition");
});

export default function MyApp(props){
  const { Component, pageProps } = props;
  const Layout = Component.layout || (({children}) => <>{children}</>);
  const userData = useUserData();
  const router = useRouter();

  // scroll to top when route changes
  useEffect(() => {
    const hashId = 'anchor';
    const element = document.getElementById(hashId);
    if (element) {
      element.scrollIntoView({
        block: 'end',
        inline: 'nearest',
        // behavior: 'smooth',
      });
    }
  }, [router.route]);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <title>Foster Cooperative</title>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserContext.Provider value={ userData }>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
