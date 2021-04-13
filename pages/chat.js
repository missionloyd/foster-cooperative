import React from "react";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import Page from "../components/shared/Page";
import AuthCheck from "../components/auth/AuthCheck.js"


const Chat = () => {
    return(
        <AuthCheck>
        <Page
        title="Chat"
        >   
            <h1>Welcome to the Communities Page</h1>
        </Page>
        </AuthCheck>
    )
}

Chat.layout = Dashboard;

export default Chat;