import React from "react";
import '../register/register.component.scss'
import { Link } from "react-router-dom";
import { AuthService } from "../../../shared/services/auth.service";
const authService = new AuthService();
const RegisterComponent: React.FC = () => {
    return (
        <div className="card register-card-center">
            <article className="card-body">
                <Link to="/auth/login" className="float-right btn btn-outline-primary">Sign in</Link>
                <h4 className="card-title mb-4 mt-1">Sign up</h4>
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" placeholder="Email" type="email" />
                    </div>
                    <div className="form-group">            
                        <label>First Name</label>
                        <input className="form-control" placeholder="First Name" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" placeholder="Last Name" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input className="form-control" placeholder="Age" type="number" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" placeholder="Password " type="password" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input className="form-control" placeholder="Confirm Password " type="password" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </div>
                </form>
            </article>
        </div>
    );
}
export default RegisterComponent;