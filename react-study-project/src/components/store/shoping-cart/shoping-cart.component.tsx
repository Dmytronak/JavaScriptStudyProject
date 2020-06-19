import React, { useEffect } from "react";
import { IShoppingCartView, IBookIShoppingCartViewItem } from "../../../shared/interfaces/book/shopping-cart.view";
import { ShoppingCartService } from "../../../shared/services/shopping-cart.service";
import "./shoping-cart.component.scss";
import { BookConstants } from "../../../shared/constants/book.constants";
import { useDispatch, useSelector } from "react-redux";
import { ShopingCartRootStateReducer, CartShopingCartReducer } from "../../../shared/interfaces/reducers/shoping-cart-root-state-reducer.view";
import { ShoppingActionConstant } from "../../../shared/actions/constants/shopping-action.constant";

const shoppingCartService: ShoppingCartService = new ShoppingCartService();

const ShoppingCartComponent: React.FC = () => {
    const dispatch = useDispatch();
    const cartState: CartShopingCartReducer = useSelector((cartState: ShopingCartRootStateReducer) => cartState.ShopingCartReducer);
    useEffect(() => {
        const cart: IShoppingCartView = shoppingCartService.getFromCart();
        dispatch({
            type: ShoppingActionConstant.SHOPPING_ACTION_CART_SET,
            payload: cart
        });
    }, [])
    const clearCart = () => {
        shoppingCartService.clearCart();
        dispatch({ type: ShoppingActionConstant.SHOPPING_ACTION_CART_CLEAR });
    }
    return (
        <div className="shopping-cart-gropup">
            {
                cartState.shopingCart && cartState.shopingCart.quantity ?
                    <div>
                        <div className="shopping-cart-header">
                            Shopping cart
                        </div>
                        <div className="shopping-cart-table">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                    <tr className="header">
                                        <th>Code</th>
                                        <th>Title</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartState.shopingCart.books.map((book: IBookIShoppingCartViewItem) => {
                                            return <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td>{book.title}</td>
                                                <td>{book.quantity}</td>
                                                <td>{book.price}$</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr className="header">
                                        <th>Total</th>
                                        <th></th>
                                        <th>{cartState.shopingCart.quantity}</th>
                                        <th>{cartState.shopingCart.totalPrice}$</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="shopping-cart-footer">
                            <button className="btn btn-outline-danger" onClick={clearCart}>Clear cart</button>
                        </div>
                    </div>
                    :
                    <div className="shopping-cart-header">
                        <span><img src= {`${process.env.PUBLIC_URL}/images/search--v2.png`} /></span>
                        <span>{BookConstants.EMPTY_SHOPING_CART}</span>

                    </div>
            }
        </div>
    );
}
export default ShoppingCartComponent;