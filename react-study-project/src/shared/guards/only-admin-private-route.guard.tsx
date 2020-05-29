import { Route, Redirect } from "react-router-dom";
import React from "react";
import jwtDecode from "jwt-decode"
import { ProtectedRouteProps } from "../interfaces/routes/protected-route-props.view";
import { LocalStorageService } from "../services/local-storage.service";
import { AuthConstants } from "../constants/auth.constant";
const localStorageService = new LocalStorageService();

const OnlyAdminPrivateRoute = (props: ProtectedRouteProps) => {
    let isAdmin = false;
    const { component: Component, ...rest } = props;
    const token = localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
    if(token){
        const decodeToken = JSON.parse(JSON.stringify(jwtDecode(token)));
        const userRoles:[] = decodeToken[AuthConstants.AUTH_ROLE_ROLES_KEY];
    
        userRoles.forEach((element: string) => {
            if (element === AuthConstants.AUTH_ROLE_ADMIN) {
                isAdmin = true;
            }
        });
    }
  
    
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAdmin ? (
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