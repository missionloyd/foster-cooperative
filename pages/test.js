import React from "react";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import Page from "../components/Page";

function Communities() {
    return(
        <Page
        title="Communities"
        >
            <h1>Welcome to the Communities Page</h1>
        </Page>
    )
}

Communities.layout = Dashboard;

export default Communities;