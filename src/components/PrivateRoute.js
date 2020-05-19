import React from "react";
import { Route, Redirect } from "react-router-dom";

// <PrivateRoute exact path={"/resorts/add"} isLoggedIn={isLoggedIn} component={AddResort} />
function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
