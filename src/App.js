import "./App.css";
import Signup from "../src/layout/Signup";
import Navbar from "./layout/Navbar";
import SignIn from "./layout/Signin";
import Home from "./layout/Home";
import { Route, Switch } from "react-router-dom";
import ActivateAccount from "./layout/ActivateAccount";
import Private from "./auth/Private";
import Admin from "./auth/Admin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import ForgotPassword from "./layout/ForgotPassword";
import ResetPassword from "./layout/ResetPassword";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/auth/password/forgot" component={ForgotPassword} />
        <Route exact path="/auth/activate/:token" component={ActivateAccount} />
        <Route
          exact
          path="/auth/password/reset/:token"
          component={ResetPassword}
        />
        <PrivateRoute exact path="/private" component={Private} />
        <AdminRoute exact path="/admin" component={Admin} />
      </Switch>
    </div>
  );
};

export default App;
