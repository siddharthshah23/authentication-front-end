import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { Container, Button } from "@material-ui/core";

const ActivateAccount = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACCOUNT ACTIVATION", response);
        setValues({ ...values, show: false });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATION ERROR", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };
  const activationLink = () => {
    return (
      <Container style={{ textAlign: "center" }}>
        <h1> Hey {name}, Ready to activate the account</h1>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={clickSubmit}
        >
          Activate Account
        </Button>
      </Container>
    );
  };
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      {activationLink()}
    </div>
  );
};

export default ActivateAccount;
