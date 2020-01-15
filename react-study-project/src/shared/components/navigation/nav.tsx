// Vendors
import React from "react"

// Style
import "./nav.scss"

interface iNav {
    showNav: boolean,
    showAuth: boolean,
    showAdminBuns: boolean
}

export default class Navigation extends React.Component<{}, iNav> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showNav: false,
            showAuth: true,
            showAdminBuns: false
        }      
    }

    private showNavMenu(): void {
        let user: any = JSON.parse(localStorage.getItem("currentUser") as any)

        if (user) {
            this.setState({
                showAuth: false
            })

            if (user.userRole === "Администратор") {
                this.setState({
                    showAdminBuns: true
                })
            }
        }

        if (this.state.showNav) {
            this.setState({
                showNav: false
            })
        } else {
            this.setState({
                showNav: true
            })
        }
    }

    public render() {
        return(
            <nav>
                <div className="nav" onClick={()=>this.showNavMenu()}>
                    <span className="nav__line"></span>
                </div>
                {
                this.state.showNav ?
                    <div className="nav__menu nMenu">
                        <ul className="nMenu__list list">
                            <li className="list"><a href="all-books">Книги</a></li>
                        </ul>
                        <div className="bag">
                            <a href="/Shopping-bag" className="bag__link">Корзина</a>
                        </div>
                        {
                            this.state.showAuth ?
                            <div className="nav__authorization nAuth">
                                <a href="/Login">Войти</a>
                                <a href="/Registration">Регистрация</a>
                            </div> : null
                        }
                        {
                            this.state.showAdminBuns ? 
                            <div className="adminBuns">
                                <ul className="adminBuns__ul ABList">
                                <li className="ABList__el">
                                    <a href="/adminBuns/Users">Пользователи</a>
                                </li>
                                <li className="ABList__el">
                                    <a href="/adminBuns/Books">Книги</a>
                                </li>
                                <li className="ABList__el">
                                    <a href="/adminBuns/Authors">Авторы</a>
                                </li>
                                </ul>
                            </div> : null
                        }
                    </div>
                : null
                }
            </nav>
        );
    }
} 