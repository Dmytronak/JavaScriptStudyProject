import React from "react";
import "./book.component.scss"
import {IBookGetAllBookResponseViewItem, IAuthorBookGetAllBookResponseViewItem } from "../../../interfaces/responses/book/get-all-book-response.view";
import { BookType } from "../../../enums/book-type.enum";
import { BookConstants } from "../../../constants/book.constants";

const BookComponent: React.FC<IBookGetAllBookResponseViewItem> = (book:IBookGetAllBookResponseViewItem) => {
    const getBookType = (bookType: BookType): string => {
        return BookType[bookType];
    };
    return (
        <div className="card-book" key={book.id}>
            <img className="card-img-top" src={BookConstants.BOOK_LINK} alt="book-image" />
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
            </div>
        </div>

    );
}

export default BookComponent;