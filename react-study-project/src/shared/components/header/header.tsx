// Vendors
import React from 'react'
// Style
import "./header.scss"
// Components
import { LocalStorageService } from '../../services/local-storage.service';

const localStorageService = new LocalStorageService();

export default class Header extends React.Component<any, any> {
    constructor(props: null) {
        super(props)
        this.state = {
            showUser: false,
            user: null
        }
    }

    componentDidMount(): void {
        let activeUser = localStorageService.getItem("currentUser");
        debugger
        if (activeUser) {
            this.setState({
                showUser: true,
                user: activeUser
            })
        }
    }

    private logout(): void {
        this.setState({
            showUSer: false
        })
        localStorageService.removeItem("currentUser");
        window.location.reload();
    }

    public render() {
        let user = this.state.user;
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
                                        <a className="nav-link" href="admin">{user?.email}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="btn btn-outline-primary" onClick={() => this.logout()} href="auth/login">Sigh Out</a>
                                    </li>
                                </ul>
                                :
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="btn btn-outline-primary" href="auth/login">Sigh In</a>
                                    </li>
                                </ul>
                        }
                    </div>
                </nav>
            </header>
        );
    }
}