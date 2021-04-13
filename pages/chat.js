import React from "react";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import Page from "../components/shared/Page";
import AuthCheck from "../components/auth/AuthCheck.js"

const Chat = () => {
  return(
      <Page
      title="Chat"
      >   
        <h1>Tesing Authentication Here!</h1>
        
        <AuthCheck>
          <h1>You are signed in</h1>
        </AuthCheck>
      </Page>
  )
}

Chat.layout = Dashboard;

export default Chat;