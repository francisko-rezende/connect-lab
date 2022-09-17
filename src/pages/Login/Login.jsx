import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Login = (props) => {
  return (
    <>
      <h1>Login</h1>
      <Link to={"/cadastro"}>Cadastro</Link>
    </>
  );
};

Login.propTypes = {};
