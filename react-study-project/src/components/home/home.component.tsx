import React from "react";
import { Link } from 'react-router-dom';
import '../home/home.style.scss';
const HomeComponent: React.FC = () => {
  return (
    <div className="home">
      <div className="jumbotron">
        <h1 className="display-4">React Study Project</h1>
        <p className="lead">This project create for learning React framework. Welcome on main page</p>
        <hr className="my-4"></hr>
        <p>Register or login, first usefull for your login button</p>
        <input type="button" className="btn btn-primary">Login</input>
        <input type="button" className="btn btn-primary">Login</input>
        <Link to="/auth/login">Login Page</Link>
      </div>
    </div>
  );
}

export default HomeComponent;