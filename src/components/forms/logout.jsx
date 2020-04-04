import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("loginToken");
  return (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  );
};

export default Logout;
