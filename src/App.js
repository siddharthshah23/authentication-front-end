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

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/auth/activate/:token" component={ActivateAccount} />
        <PrivateRoute exact path="/private" component={Private} />
        <AdminRoute exact path="/admin" component={Admin} />
      </Switch>
    </div>
  );
};

export default App;
