import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { isAuth, signout } from "../auth/Helper";

const useStyles = makeStyles({
  navDisplayFlex: {
    display: `flex`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  navbarDisplayFlex: {
    display: `flex`,
  },
});

const Navbar = ({ children, match, history }) => {
  const classes = useStyles();
  const nav = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="md" className={classes.navbarDisplayFlex}>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {!isAuth() && (
                <ListItem button>
                  <Link to="/login" className={classes.linkText}>
                    <ListItemText primary="Login"></ListItemText>
                  </Link>
                </ListItem>
              )}

              {!isAuth() && (
                <ListItem button>
                  <Link to="/signup" className={classes.linkText}>
                    <ListItemText primary="Signup"></ListItemText>
                  </Link>
                </ListItem>
              )}
              {isAuth() && isAuth().role === "subscriber" && (
                <ListItem button>
                  <Link to="/private" className={classes.linkText}>
                    <ListItemText primary={isAuth().name}></ListItemText>
                  </Link>
                </ListItem>
              )}
              {isAuth() && isAuth().role === "admin" && (
                <ListItem button>
                  <Link to="/admin" className={classes.linkText}>
                    <ListItemText primary={isAuth().name}></ListItemText>
                  </Link>
                </ListItem>
              )}
              {isAuth() && (
                <ListItem
                  button
                  onClick={() => {
                    signout(() => {
                      console.log("User Logged Out");
                      history.push("/login");
                    });
                  }}
                >
                  <ListItemText primary="SIGNOUT"></ListItemText>
                </ListItem>
              )}
            </List>
          </Container>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <div className={classes.navDisplayFlex}>
      {" "}
      {nav()}
      <div className="container">{children}</div>
    </div>
  );
};

export default withRouter(Navbar);
