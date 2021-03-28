import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import SignIn from "./Signin";
import Signup from "./Signup";
import ActivateAccount from "./ActivateAccount";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/auth/activate/:token" component={ActivateAccount} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
