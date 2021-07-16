import React from "react";
import Router from "next/router";
import { useContext } from 'react';
// import AuthCheck from "../components/auth/AuthCheck";
import { UserContext } from '../lib/context';

export default function Index() {
  const { user } = useContext(UserContext);
  React.useEffect(() => {
    const { pathname } = Router
    if(pathname == '/') {
      if(user) {
        Router.push("/home");
      } else {
        Router.push("/auth");
      }
    }
  })
  return (
    <div />
  );
}