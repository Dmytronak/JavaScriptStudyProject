import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './header.component.scss';
import { LocalStorageService } from '../../services/local-storage.service';
import { Link } from 'react-router-dom';
import { AuthConstants } from '../../constants/auth.constant';
import { SharedConstants } from '../../constants/shared.constant';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { history } from '../../configurations/browser-history.config'
import { ShopingCartRootStateReducer, CartShopingCartReducer } from '../../interfaces/reducers/shoping-cart-root-state-reducer.view';
import { useSelector } from 'react-redux';
import { AuthService } from '../../services/auth.service';

const localStorageService = new LocalStorageService();
const authService = new AuthService();

const HeaderComponent: React.FC<any> = () => {
    const cartState: CartShopingCartReducer = useSelector((cartState: ShopingCartRootStateReducer) => cartState.ShopingCartReducer);
    const [state, setState] = React.useState<any>({
        showUser: false,
        adminMenuIsToggle: false,
        expandMenu:false,
        user: SharedConstants.EMPTY_VALUE
    });

    useEffect(() => {
        const token = localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
        if (token) {
            const decode: string = JSON.stringify(jwt_decode(token));
            const user = JSON.parse(decode);
            setState({
                ...state,
                showUser: true,
                user: user.email
            });
        }
    }, []);

    const redierctToShoppingCart = (): void => {
        history.push('/shoppingCart');
    }
    const logout = (): void => {
        setState({
            ...state,
            showUser: false
        });
        authService.signOut();
    }
    const showAdminMenu = () => {
        setState({
            ...state,
            adminMenuIsToggle: state.adminMenuIsToggle ? false : true,
        });
    };
    const expandMenu = ()=>{
        setState({
            ...state,
            expandMenu: state.expandMenu ? false : true,
        });
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img src={`${process.env.PUBLIC_URL}/react-icon-png-4.png`} className="nav-logo" alt="logo" />
                {
                    state.showUser
                        ?
                        <h2>
                            <Link to="/home">React Study</Link>
                        </h2>
                        :
                        <h2>
                            <Link to="/books">React Study</Link>
                        </h2>
                }
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation" onClick={expandMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ml-auto ${state.expandMenu ?'show':''}`}>
                    {
                        state.showUser
                            ?
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item-shopping-cart">
                                    {
                                        cartState.shopingCart && cartState.shopingCart.quantity ?
                                            <div className="cart" onClick={() => { redierctToShoppingCart() }}>
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                                <span className="badge badge-secondary-notification">{cartState.shopingCart.quantity}</span>
                                            </div>
                                            : SharedConstants.EMPTY_VALUE
                                    }
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" >{state.user}</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={showAdminMenu}>
                                        Admin
                                        </a>
                                    <div className={state.adminMenuIsToggle ? 'dropdown-menu show' : 'dropdown-menu'} aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to='/admin/users'>Users</Link>
                                        <Link className="dropdown-item" to='/admin/books'>Books</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="btn btn-outline-primary" onClick={() => logout()}>Sign Out</a>
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
export default HeaderComponent;