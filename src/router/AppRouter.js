import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateExpense from "../components/CreateExpense/CreateExpense";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import LoginPage from "../components/LoginPage/LoginPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Dashboard} exact={true} />
        <Route path="/create" component={CreateExpense} />
        <Route path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
