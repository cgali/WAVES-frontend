import React from "react";
import { Route, Redirect } from "react-router-dom";

function AnonRoute({ children, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default AnonRoute;
