import React, { useContext } from "react";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import Page from "../components/shared/Page";
import { AuthContext } from '../components/shared/context/auth-context';
import { useHttpClient } from '../lib/hooks/http-hook';


const Communities = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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