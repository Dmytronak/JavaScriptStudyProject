import { Route, Redirect } from "react-router-dom";
import React from "react";
import { ProtectedRouteProps } from "../interfaces/routes/protected-route-props.view";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

const OnlyAdminPrivateRoute = (props: ProtectedRouteProps) => {
    const { component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                authService.isAdmin() ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: process.env.REACT_APP_LOGIN_PAGE,
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default OnlyAdminPrivateRoute;