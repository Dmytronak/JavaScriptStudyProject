import React from "react";
import '../home/home.component.scss';

const HomeComponent: React.FC = () => {
  return (
    <div className="home">
      <div className="jumbotron">
        <h1 className="display-4">React Study Project</h1>
        <p className="lead">This project create for learning React framework. Welcome on main page</p>
        <hr className="my-4"></hr>
        <p>Register or login, first useful for your login button</p>
        <a className="btn btn-primary btn-lg margin-button" href="/auth/login" role="button">Login</a>
        <a className="btn btn-primary btn-lg" href="/auth/register" role="button">Register</a>
      </div>
    </div>
  );
}

export default HomeComponent;