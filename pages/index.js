import React from "react";
import Router from "next/router";
import AuthCheck from "../components/auth/AuthCheck";

export default function Index() {
  React.useEffect(() => {
    const { pathname } = Router
    if(pathname == '/') {
      Router.push("/home")
    }
  })
  return (
    <div />
  );
}