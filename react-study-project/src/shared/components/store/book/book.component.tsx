import React from "react";
import "./book.component.scss"
import {IBookGetAllBookResponseViewItem, IAuthorBookGetAllBookResponseViewItem } from "../../../interfaces/responses/book/get-all-book-response.view";
import { BookType } from "../../../enums/book-type.enum";
import { BookConstants } from "../../../constants/book.constants";
import { ShoppingCartService } from "../../../services/shopping-cart.service";
import { useDispatch } from "react-redux";
import { IShoppingCartView } from "../../../interfaces/book/shopping-cart.view";
import { ShoppingActionConstant } from "../../../actions/constants/shopping-action.constant";

const shoppingCartService = new ShoppingCartService();

const BookComponent: React.FC<IBookGetAllBookResponseViewItem> = (book:IBookGetAllBookResponseViewItem) => {
    const dispatch = useDispatch();
    const getBookType = (bookType: BookType): string => {
        return BookType[bookType];
    };
    const setBookToCart = (book:IBookGetAllBookResponseViewItem): void => {
        const shopingCart:IShoppingCartView = shoppingCartService.setToCart(book);
        dispatch({
            type:ShoppingActionConstant.SHOPPING_ACTION_CART_SET,
            payload: shopingCart 
        });
    };
    return (
        <div className="card-book">
            <img className="book-card-img" src={BookConstants.BOOK_LINK} alt="book-image" />
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                {
                    book.authors.map((author: IAuthorBookGetAllBookResponseViewItem) => {
                        return (
                            <p className="card-text" key={author.id}>{author.fullName}</p>
                        )
                    })
                }
                <p className="card-text">{getBookType(book.type)}</p>
                <p className="card-text">{book.price} $</p>
                <button onClick={()=>setBookToCart(book)} className="btn btn-outline-success">Add</button>
            </div>
        </div>

    );
}

export default BookComponent;