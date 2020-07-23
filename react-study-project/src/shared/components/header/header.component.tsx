import React, { useEffect, useRef, SyntheticEvent } from 'react';
import './header.component.scss';
import { Link } from 'react-router-dom';
import { SharedConstants } from '../../constants/shared.constant';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { history } from '../../configurations/browser-history.config'
import { ShopingCartRootStateReducer, CartShopingCartReducer } from '../../interfaces/reducers/shoping-cart-root-state-reducer.view';
import { useSelector } from 'react-redux';
import { AuthService } from '../../services/auth.service';
import { ImageUploadService } from '../../services/image-upload.service';

const authService = new AuthService();
const imageUploadService = new ImageUploadService();

const HeaderComponent: React.FC<any> = () => {
    const cartState: CartShopingCartReducer = useSelector((cartState: ShopingCartRootStateReducer) => cartState.ShopingCartReducer);
    const [state, setState] = React.useState<any>({
        showUser: true,
        isUserAdmin: false,
        expandMenu: false,
        user: SharedConstants.EMPTY_VALUE,
        profileImage: SharedConstants.EMPTY_VALUE
    });
    const [dropDownState, setDropDownState] = React.useState<any>({
        adminMenuIsToggle: false,
    });

    useEffect(() => {
        if (authService.isAuth()) {
            setState({
                ...state,
                showUser: true,
                isUserAdmin: authService.isAdmin(),
                user: authService.getUserEmail(),
                profileImage:authService.getUserProfileImageUrl()
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
        setDropDownState({
            ...dropDownState,
            adminMenuIsToggle: dropDownState.adminMenuIsToggle ? false : true,
        });
    };
    const expandMenu = () => {
        setState({
            ...state,
            expandMenu: state.expandMenu ? false : true,
        });
    };
    const useOutsideAlerter = (ref: React.MutableRefObject<any>): void => {
        useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (ref.current && !ref.current.contains(event.target) && !dropDownState.adminMenuIsToggle) {
                    setDropDownState({
                        ...dropDownState,
                        adminMenuIsToggle: false
                    });
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef: React.MutableRefObject<any> = useRef(null);
    useOutsideAlerter(wrapperRef);
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

                <div className={`collapse navbar-collapse ml-auto ${state.expandMenu ? 'show' : ''}`}>
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
                                <li className="nav-item-avatar">
                                    <div className="avatar-container">
                                        <img className="avatar-image" src={state.profileImage}/>
                                        <a className="nav-link" >{state.user}</a>
                                    </div>
                                </li>
                                {
                                    state.isUserAdmin ?
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={showAdminMenu}>Admin</a>
                                            <div className={dropDownState.adminMenuIsToggle ? 'dropdown-menu show' : 'dropdown-menu'} aria-labelledby="navbarDropdown" ref={wrapperRef}>
                                                <Link className="dropdown-item" to='/admin/users'>Users</Link>
                                                <Link className="dropdown-item" to='/admin/authors'>Authors</Link>
                                                <Link className="dropdown-item" to='/admin/books'>Books</Link>
                                            </div>
                                        </li> : SharedConstants.EMPTY_VALUE
                                }
                                <li className="nav-item">
                                    <a className="btn btn-outline-primary" onClick={() => logout()}>Sign Out</a>
                                </li>
                            </ul>
                            :
                            <ul className="nav navbar-nav ml-auto">
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