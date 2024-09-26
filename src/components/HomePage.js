import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./DashboardPage";
import SalesPage from "./DisplaySales";
import ReportsData from "./ProductShop";
import MakeSaleForm from "./Buyers";

const HomePage = () => {
    return (
        <Router>
            <div className="bg-dark-400">
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/sales" component={SalesPage} />
                    <Route path="/customers" component={MakeSaleForm} />
                    <Route path="/reportForm" component={ReportsData} />
                </Switch>
            </div>
        </Router>
    );
};

export default HomePage;
