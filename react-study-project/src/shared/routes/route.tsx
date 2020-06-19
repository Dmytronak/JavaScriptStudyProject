import React from "react";
import Header from "../components/header/header.component";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import HomeComponent from "../../components/home/home.component";
import LoginComponent from "../../components/auth/login/login.component";
import RegisterComponent from "../../components/auth/register/register.component";
import AdminUserComponent from "../../components/admin/user/user.component";
import AdminBookComponent from "../../components/admin/book/book.component";
import OnlyLoggedOutPrivateRoute from "../guards/only-logged-out-private-route.guard";
import OnlyLoggedInPrivateRoute from "../guards/only-logged-in-private-route.guard";
import OnlyAdminPrivateRoute from "../guards/only-admin-private-route.guard";
import BooksComponent from "../../components/store/books/books.component";
import ShopingCartComponent from "../../components/store/shoping-cart/shoping-cart.component";
import AdminAuthorComponent from "../../components/admin/author/author.component";

const Routes: React.FC<any> = (props:any) => {
  return (
    <Router history={props.history}>
      <Header />
      <Switch>
        <Route path='/' component={()=><Redirect to='/books' />} exact />
        <OnlyLoggedOutPrivateRoute path='/auth/login' component={LoginComponent} />
        <OnlyLoggedOutPrivateRoute path='/auth/register' component={RegisterComponent} />
        <OnlyLoggedOutPrivateRoute path='/home' exact={true} component={HomeComponent} />
        <OnlyLoggedInPrivateRoute path='/books' exact={true} component={BooksComponent} />
        <OnlyLoggedInPrivateRoute path='/shoppingCart' exact={true} component={ShopingCartComponent} />
        <OnlyAdminPrivateRoute path='/admin/users' exact={true} component={AdminUserComponent} />
        <OnlyAdminPrivateRoute path='/admin/authors' exact={true} component={AdminAuthorComponent} />
        <OnlyAdminPrivateRoute path='/admin/books' exact={true} component={AdminBookComponent} />
      </Switch>
    </Router>
    
  );
}

export default Routes;
