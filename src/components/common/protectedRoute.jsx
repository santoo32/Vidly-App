import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode"; // import dependency

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  var user = null;
  try {
    const jwt = localStorage.getItem("loginToken");
    user = jwtDecode(jwt);
  } catch (ex) {}

  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        console.log("Protected: " + props);
        if (!user) {
          //Keeps the previous location to redirect te user after logins
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
