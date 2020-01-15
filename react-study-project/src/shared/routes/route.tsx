import React from "react";
import Header from "../components/header/header";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "../../components/home/home.component";
import LoginComponent from "../../components/auth/login/login.component";
import RegisterComponent from "../../components/auth/register/register.component";
import AdminMainComponent from "../../components/admin/main.component";
import AdminUserComponent from "../../components/admin/users/user.component";
import AdminBookComponent from "../../components/admin/books/book.component";

const Routes: React.FC = () => {
  return (
    <main>
      <Header/>
      <Switch>
        <Route path='/' component={HomeComponent} exact />
        <Route path='/auth/login' component={LoginComponent} />
        <Route path='/auth/register' component={RegisterComponent} />
        <Route path='/admin' component={AdminMainComponent} />
        <Route path='/admin/user' component={AdminUserComponent} />
        <Route path='/admin/books' component={AdminBookComponent} />
        <Route path='*' component={HomeComponent} />
      </Switch>
    </main>
  );
}

export default Routes;
