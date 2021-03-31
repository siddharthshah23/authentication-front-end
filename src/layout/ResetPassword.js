import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import {
  Container,
  Button,
  CssBaseline,
  makeStyles,
  Typography,
  TextField,
  Grid,
  Avatar,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset password",
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, newPassword: "", buttonText: "Done" });
        setTimeout(() => history.push("/login"), 2000);
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, newPassword: "", buttonText: "Reset password" });
      });
  };
  const ResetPasswordLink = () => {
    return (
      <Container component="main" maxWidth="xs">
        <ToastContainer position="top-center" autoClose={3000} />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ready to reset the password
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Password"
              type="password"
              id="newPassword"
              autoComplete="current-password"
              value={newPassword}
              onChange={handleChange("newPassword")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={clickSubmit}
            >
              {buttonText}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Login
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  };
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      {ResetPasswordLink()}
    </div>
  );
};

export default ResetPassword;
