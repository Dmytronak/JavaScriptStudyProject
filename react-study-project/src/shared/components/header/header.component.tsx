import React from 'react';
import jwt_decode from 'jwt-decode';
import './header.component.scss';
import { LocalStorageService } from '../../services/local-storage.service';
import { Link } from 'react-router-dom';
import { AuthConstants } from '../../constants/auth.constant';


const localStorageService = new LocalStorageService();

export default class Header extends React.Component<any, any> {
    constructor(props: null) {
        super(props)
        this.state = {
            showUser: false,
            token: null
        }
    }

    componentDidMount(): void {
        const token = localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
        if (token) {
            const decode:string = JSON.stringify(jwt_decode(token));
            const user = JSON.parse(decode);
            this.setState({
                showUser: true,
                user: user.email
            })
        }
    }

    private logout(): void {
        this.setState({
            showUSer: false
        })
        localStorageService.removeItem(AuthConstants.AUTH_TOKEN_KEY);
        window.location.reload();
    }

    public render() {
        const user = this.state.user;
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <img src={`${process.env.PUBLIC_URL}/react-icon-png-4.png`} className="nav-logo" alt="logo" />
                    {
                        this.state.showUser
                            ? 
                            <h1>
                                <Link to="/home">React Study</Link>
                            </h1>
                            :
                            <h1>
                                <Link to="/books">React Study</Link>
                            </h1>
                    }


                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                        {
                            this.state.showUser
                                ?
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">{user}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="btn btn-outline-primary" onClick={() => this.logout()}>Sign Out</a>
                                    </li>
                                </ul>
                                :
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-primary" to="/auth/login">Sign In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-primary" to="/auth/register">Sign Up</Link>
                                    </li>
                                </ul>
                        }
                    </div>
                </nav>
            </header>
        );
    }
}