// Vendors
import React from 'react';
import jwt_decode from 'jwt-decode';
// Style
import "./header.component.scss"
// Components
import { LocalStorageService } from '../../services/local-storage.service';


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
        const token = localStorageService.getItem("token");
        if (token) {
            const decode = JSON.stringify(jwt_decode(token));
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
        localStorageService.removeItem("token");
        window.location.reload();
    }

    public render() {
        const user = this.state.user;               
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <img src={`${process.env.PUBLIC_URL}/react-icon-png-4.png`} className="nav-logo" alt="logo" />
                    <h1>
                        <a href="/">React Study</a>
                    </h1>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                        {
                            this.state.showUser
                                ?
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="nav-link" href="admin">{user}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="btn btn-outline-primary" onClick={() => this.logout()} href="auth/login">Sign Out</a>
                                    </li>
                                </ul>
                                :
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="btn btn-outline-primary" href="auth/login">Sign In</a>
                                    </li>
                                </ul>
                        }
                    </div>
                </nav>
            </header>
        );
    }
}