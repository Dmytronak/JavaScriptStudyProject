import { Route, Redirect} from "react-router-dom";
import React from "react";
import { AuthService } from "../services/auth.service";
import { ProtectedRouteProps } from "../interfaces/routes/protected-route-props.view";
const authService = new AuthService();

const OnlyLoggedInPrivateRoute = (props: ProtectedRouteProps) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authService.isAuth() ? (
          <Component {...routeProps} />
        ) : (
            <Redirect
              to={{
                pathname: process.env.REACT_APP_HOME_PAGE,
                state: { from: routeProps.location }
              }}
            />
          )
      }
    />
  );
};

export default OnlyLoggedInPrivateRoute;