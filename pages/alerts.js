import React from "react";
import dynamic from "next/dynamic";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import Page from "../components/Page";

const Alerts = () => {
    const MapWithNoSSR = dynamic(() => import("../components/alerts/Map"), {
        ssr: false
    });

    return(
        <Page
        title="Alerts"
        >
            <h1>Alerts</h1>
            <MapWithNoSSR />
        </Page>
    )
}

Alerts.layout = Dashboard;

export default Alerts;