import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import History from './History';
import Customers from './Customers';
import Actions from './Actions';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />            
            <Route exact path="/history" component={History} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/actions" component={Actions} />
            <Route component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default Router;