import React, { useState, useEffect } from "react";
import { BookConstants } from "../../../shared/constants/book.constants";
import { IGetAllBooksAdminView, IBookIGetAllBooksAdminViewItem, IAuthorBookIGetAllBooksAdminViewItem } from "../../../shared/interfaces/admin/book/get-all-books.admin.view";
import { SharedConstants } from "../../../shared/constants/shared.constant";
import { AdminService } from "../../../shared/services/admin/admin.service";
import { BookType } from "../../../shared/enums/book-type.enum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import '../book/book.component.scss';
import UpdateBookAdminComponent from "../../../shared/modals/admin/update-book/update-book-admin.component";
const adminService = new AdminService();

const AdminBookComponent: React.FC = () => {
    const [bookState, setBooks] = useState<IGetAllBooksAdminView>({
        allBooks: []
    });
    const [updatingBookState, setUpdatingBook] = useState<IBookIGetAllBooksAdminViewItem>({
        id: SharedConstants.EMPTY_VALUE,
        title: SharedConstants.EMPTY_VALUE,
        type: BookType.None,
        price: SharedConstants.ZERO_VALUE,
        authors: []
    });
    const [pageState, setPageState] = useState<any>({
        isAddBookShow: false
    });
    useEffect(() => {
        adminService.getAllBooks()
            .then((resposne: IGetAllBooksAdminView) => {
                setBooks(resposne);
            });
    }, []);

    const showAddBook = (): void => {
        setPageState({
            ...pageState,
            isAddBookShow: true
        })
    };
    const closeAddBook = (): void => {
        setPageState({
            ...pageState,
            isAddBookShow: false
        })
    };
    const showUpdateBook = (book: IBookIGetAllBooksAdminViewItem): void => {
        setUpdatingBook(book);
    }
    return (
        bookState.allBooks.length > SharedConstants.ZERO_VALUE ?
            <div className="admin-book-gropup">
                <div className="admin-book-header">
                    Books
                        </div>
                <div className="admin-book-table">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr className="header">
                                <th>Code</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Authors</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookState.allBooks.map((book: IBookIGetAllBooksAdminViewItem) => {
                                    return <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{BookType[book.type]}</td>
                                        <td>{book.price}$</td>
                                        <td>
                                            {
                                                book.authors.map((author: IAuthorBookIGetAllBooksAdminViewItem) => {
                                                    return author.fullName
                                                })
                                            }
                                        </td>

                                        <td><button className="btn btn-outline-info" onClick={() => showUpdateBook(book)}><FontAwesomeIcon icon={faPencilAlt} /></button></td>
                                        <td><button className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrash} /></button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                        Add new Book <button className="btn btn-outline-success" onClick={showAddBook}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    {
                        pageState.isAddBookShow ?
                            <form>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <input type="text" className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Perice</label>
                                    <input type="text" className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Authors</label>
                                    <input type="text" className="form-control"></input>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-secondary" onClick={closeAddBook}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                            : SharedConstants.EMPTY_VALUE
                    }
                <UpdateBookAdminComponent inputUpdatedBook={updatingBookState} />
            </div>
            :
            <div className="admin-book-gropup">
                <span>{BookConstants.EMPTY_ADMIN_BOOK_EMPTY}</span>
                <span>
                    Add book <button className="btn btn-outline-success"><FontAwesomeIcon icon={faPlus} /></button>
                </span>
            </div>
    );
}

export default AdminBookComponent;