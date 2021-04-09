import React from "react";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import Page from "../components/shared/Page";
import AuthCheck from "../components/auth/AuthCheck.js"


const Communities = () => {
    return(
        <AuthCheck>
        <Page
        title="Communities"
        >   
            <h1>Welcome to the Communities Page</h1>
        </Page>
        </AuthCheck>
    )
}

Communities.layout = Dashboard;

export default Communities;