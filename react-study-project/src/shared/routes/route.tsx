import React from "react";
import Header from "../components/header/header";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "../../components/home/home.component";
import LoginComponent from "../../components/auth/login/login.component";
import RegisterComponent from "../../components/auth/register/register.component";
import AdminMainComponent from "../../components/admin/main.component";
import AdminUserComponent from "../../components/admin/users/user.component";
import AdminBookComponent from "../../components/admin/books/book.component";
import OnlyLoggedInPrivateRoute from "../guards/only-logged-in-private-route.guard";
import OnlyLoggedOutPrivateRoute from "../guards/only-logged-out-private-route.guard";

const Routes: React.FC = () => {
  return (
    <main>
      <Header/>
      <Switch>
        <Route path='/' component={HomeComponent} exact />
        <OnlyLoggedOutPrivateRoute path='/auth/login' component={LoginComponent} />
        <OnlyLoggedOutPrivateRoute path='/auth/register' component={RegisterComponent} />
        <OnlyLoggedInPrivateRoute path='/home' exact={true} component={HomeComponent} />
        <OnlyLoggedInPrivateRoute path='/admin' exact={true} component={AdminMainComponent} />
        <OnlyLoggedInPrivateRoute path='/admin/user' exact={true} component={AdminUserComponent} />
        <OnlyLoggedInPrivateRoute path='/admin/books' exact={true} component={AdminBookComponent} />
      </Switch>
    </main>
  );
}

export default Routes;
