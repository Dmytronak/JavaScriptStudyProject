import React, { useState, useEffect, SyntheticEvent } from "react";
import { BookConstants } from "../../../shared/constants/book.constants";
import { IBookIGetAllBooksAdminViewItem, IAuthorBookIGetAllBooksAdminViewItem } from "../../../shared/interfaces/admin/book/get-all-books.admin.view";
import { SharedConstants } from "../../../shared/constants/shared.constant";
import { AdminService } from "../../../shared/services/admin/admin.service";
import { BookType } from "../../../shared/enums/book-type.enum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import '../book/book.component.scss';
import UpdateBookAdminComponent from "../../../shared/modals/admin/update-book/update-book-admin.component";
import { IGetAllAuthorsAdminView, IAuthorIGetAllAuthorsAdminViewItem } from "../../../shared/interfaces/admin/author/get-all-authors.admin.view";
import { EnumToArrayHelper } from "../../../shared/helpers/enum-to-array.helper";
import { ICreateBookAdminView, IAuthorICreateBookAdminViewItem } from "../../../shared/interfaces/admin/book/create-book.admin.view";
import { ToastMessagesSerivce } from "../../../shared/services/toast-messages.service";
import { IUpdateBookAdminView, IAuthorIUpdateBookAdminViewItem } from "../../../shared/interfaces/admin/book/update-book.admin.view";
import { PaginationCongfig } from "../../../shared/configurations/pagination.config";
import { IGetFilteredBooksAdminView, IBookIGetFilteredBooksAdminViewItem, IAuthorIBookIGetFilteredBooksAdminViewItem } from "../../../shared/interfaces/admin/book/get-filtered-books.admin.view";
import Pagination from "react-js-pagination";
import { FilterCriteriasAdminView } from "../../../shared/interfaces/admin/filter/filter-criterias-admin.view";
import { AdminConstants } from "../../../shared/constants/admin.constant";

const adminService = new AdminService();
const toastMessagesSerivce = new ToastMessagesSerivce();

const AdminBookComponent: React.FC = () => {
    const [criterias, setCriterias] = React.useState<FilterCriteriasAdminView>({
        page: PaginationCongfig.pageNumber,
        searchString: SharedConstants.EMPTY_VALUE,
    });
    const [filteredBooks, setBooks] = useState<IGetFilteredBooksAdminView>({
        books: [],
        quantity: SharedConstants.ONE_VALUE
    });
    const [updatingBook, setUpdatingBook] = useState<IBookIGetAllBooksAdminViewItem>({
        id: SharedConstants.EMPTY_VALUE,
        title: SharedConstants.EMPTY_VALUE,
        type: BookType.None,
        price: SharedConstants.ZERO_VALUE,
        authors: []
    });
    const [addedBook, setAddedBook] = useState<ICreateBookAdminView>({
        title: SharedConstants.EMPTY_VALUE,
        type: BookType.None,
        price: SharedConstants.ZERO_VALUE,
        authors: []
    });
    const [pageState, setPageState] = useState<any>({
        isAddBookShow: false,
        openEditModal: false
    });
    const [authors, setAuthors] = React.useState<IGetAllAuthorsAdminView>({
        allAuthors: []
    });
    useEffect(() => {
        adminService.filteredBooks(criterias)
            .then((resposne: IGetFilteredBooksAdminView) => {
                debugger
                setBooks(resposne);
            });
        adminService.getAllAuthors()
            .then((response: IGetAllAuthorsAdminView) => {
                setAuthors(response);
            });
    }, []);
    const bookTypes = EnumToArrayHelper(BookType);
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
        });
    };
    const showUpdateBook = (book: IBookIGetAllBooksAdminViewItem): void => {
        setUpdatingBook(book);
        setPageState({
            ...pageState,
            openEditModal: true
        });
    };
    const closeUpdateBook = (state: boolean): void => {
        setPageState({
            ...pageState,
            openEditModal: state
        });
    };
    const handleChangesInput = (event: React.SyntheticEvent<any>): void => {
        const fieldName = event.currentTarget.name;
        const fieldValue = event.currentTarget.value;
        const type = event.currentTarget.type;

        if (type === BookConstants.BOOK_SELECT_ONE_TYPE) {
            setAddedBook({
                ...addedBook,
                ['type']: fieldValue
            });
            return;
        }
        if (type === BookConstants.BOOK_SELECT_MULTIPLE_TYPE) {
            const selectedOptions = event.currentTarget.selectedOptions;
            const authorsOfBook: IAuthorICreateBookAdminViewItem[] = [];
            for (let index = SharedConstants.ZERO_VALUE; index < selectedOptions.length; index++) {
                const authorId = selectedOptions[index].value;
                const author: IAuthorIGetAllAuthorsAdminViewItem = authors.allAuthors.find(x => x.id === authorId)!;
                const result: IAuthorICreateBookAdminViewItem = {
                    authorId: author.id
                };
                authorsOfBook.push(result);
            }
            setAddedBook({
                ...addedBook,
                ['authors']: authorsOfBook
            });
            return;
        }

        setAddedBook({
            ...addedBook,
            [fieldName]: fieldValue
        });
    };
    const handleSubmitChanges = (event: React.SyntheticEvent<HTMLFormElement>): void => {
        event.preventDefault();
        adminService.createBook(addedBook)
            .then((response: string) => {
                const addedResponseBook: IBookIGetFilteredBooksAdminViewItem = {
                    id: response,
                    title: addedBook.title,
                    type: addedBook.type,
                    price: addedBook.price,
                    authors: addedBook.authors.map((addedAuthor: IAuthorICreateBookAdminViewItem) => {
                        const author = authors.allAuthors.find(x => x.id === addedAuthor.authorId)!;
                        const responseAuthor: IAuthorIBookIGetFilteredBooksAdminViewItem = {
                            id: author.id,
                            firstName: author.firstName,
                            lastName: author.lastName,
                            fullName: author.fullName,
                        };
                        return responseAuthor;
                    })
                }
                setBooks({
                    ...filteredBooks.books,
                    quantity: filteredBooks.quantity += SharedConstants.ONE_VALUE,
                    books: [...filteredBooks.books, addedResponseBook]
                });
                toastMessagesSerivce.success(AdminConstants.ADD_BOOK_SUCCESSFULLY);
                closeAddBook();
            });
    };
    const removeBook = (bookId: string): void => {
        adminService.deleteBook(bookId)
            .then((response) => {
                const removedBookIndex: number = filteredBooks.books.findIndex(x => x.id === bookId);
                filteredBooks.books.splice(removedBookIndex, SharedConstants.ONE_VALUE);
                filteredBooks.quantity -= SharedConstants.ONE_VALUE;
                setBooks({
                    ...filteredBooks.books,
                    quantity: filteredBooks.quantity,
                    books: filteredBooks.books
                });
                toastMessagesSerivce.warning(AdminConstants.REMOVE_BOOK_SUCCESSFULLY);
            });
    };
    const handleUpdatedBook = (book: IUpdateBookAdminView) => {
        const updatedBookIndex: number = filteredBooks.books.findIndex(x => x.id === book.id);
        const updatedAuthors = book.authors.map((author: IAuthorIUpdateBookAdminViewItem) => {
            const authorFinded: IAuthorBookIGetAllBooksAdminViewItem = authors.allAuthors.find(x => x.id === author.authorId)!;
            return authorFinded;
        });
        filteredBooks.books[updatedBookIndex].price = book.price;
        filteredBooks.books[updatedBookIndex].title = book.title;
        filteredBooks.books[updatedBookIndex].type = book.type;
        filteredBooks.books[updatedBookIndex].authors = updatedAuthors
    };
    const handlePageChange = (page: number): void => {
        criterias.page = page;
        adminService.filteredBooks(criterias)
            .then((resposne: IGetFilteredBooksAdminView) => {
                setBooks(resposne);
            });
    };
    const searchBookByNames = (event: SyntheticEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        criterias.searchString = value;
        adminService.filteredBooks(criterias)
            .then((resposne: IGetFilteredBooksAdminView) => {
                setBooks(resposne);
            });
    };
    const itemsPerPage: number = PaginationCongfig.maxSize;

    return (
        <div className="admin-book-group">
            <div className="admin-book-header">
                <span className="admin-book-header-search">Books</span>
                <input type="text" className="admin-book-header-search-input" placeholder="Search by title or author" onChange={searchBookByNames}></input>
            </div>
            {
            filteredBooks.quantity > SharedConstants.ZERO_VALUE ?
                <div className="admin-book-group">
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
                                    filteredBooks.books.map((book: IBookIGetAllBooksAdminViewItem) => {
                                        return <tr key={book.id}>
                                            <td>{book.id}</td>
                                            <td>{book.title}</td>
                                            <td>{BookType[book.type]}</td>
                                            <td>{book.price}$</td>
                                            <td>
                                                <div className="admin-book-table-authors">
                                                    {
                                                        book.authors.map((author: IAuthorBookIGetAllBooksAdminViewItem) => {
                                                            return <span key={author.id}>{author.fullName}</span>
                                                        })
                                                    }
                                                </div>

                                            </td>

                                            <td><button className="btn btn-outline-info" onClick={() => showUpdateBook(book)}><FontAwesomeIcon icon={faPencilAlt} /></button></td>
                                            <td><button className="btn btn-outline-danger" onClick={() => removeBook(book.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="admin-book-table-pagination">
                        <Pagination
                            activePage={criterias.page}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={filteredBooks.quantity}
                            onChange={(page) => handlePageChange(page)}
                            itemClass="page-item"
                            linkClass="page-link" />
                    </div>

                    <div>
                        Add new book <button className="btn btn-outline-success" onClick={showAddBook}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    {
                        pageState.isAddBookShow ?
                            <form onSubmit={handleSubmitChanges}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" name="title" placeholder="Book title" onChange={handleChangesInput}></input>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select className="form-control" value={addedBook.type} onChange={handleChangesInput}>
                                        {
                                            bookTypes.map((type: number) => {
                                                return <option value={type} key={type}>{BookType[type]}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" className="form-control" name="price" placeholder="Input book price in $" onChange={handleChangesInput}></input>
                                </div>
                                <div className="form-group">
                                    <label>Authors</label>
                                    <select className="form-control" value={addedBook.authors.map(x => x.authorId)} multiple size={3} onChange={handleChangesInput}>
                                        {
                                            authors.allAuthors.map((author: IAuthorIGetAllAuthorsAdminViewItem) => {
                                                return <option value={author.id} key={author.id}>{author.fullName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="admin-book-add-footer">
                                    <button type="submit" className="btn btn-outline-secondary" onClick={closeAddBook}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                            : SharedConstants.EMPTY_VALUE
                    }
                    <UpdateBookAdminComponent inputUpdatedBook={updatingBook} inputBookPageState={pageState} outputBookPageState={closeUpdateBook} outputUpdatedBook={handleUpdatedBook} />
                </div>
                :
                <div className="admin-book-group">
                    <span>{BookConstants.EMPTY_ADMIN_BOOK_EMPTY}</span>
                    <span>
                        Add book <button className="btn btn-outline-success" onClick={showAddBook}><FontAwesomeIcon icon={faPlus} /></button>
                    </span>
                    {
                        pageState.isAddBookShow ?
                            <form onSubmit={handleSubmitChanges}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" name="title" placeholder="Book title" onChange={handleChangesInput}></input>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select className="form-control" value={addedBook.type} onChange={handleChangesInput}>
                                        {
                                            bookTypes.map((type: number) => {
                                                return <option value={type} key={type}>{BookType[type]}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" className="form-control" name="price" placeholder="Input book price in $" onChange={handleChangesInput}></input>
                                </div>
                                <div className="form-group">
                                    <label>Authors</label>
                                    <select className="form-control" value={addedBook.authors.map(x => x.authorId)} multiple size={3} onChange={handleChangesInput}>
                                        {
                                            authors.allAuthors.map((author: IAuthorIGetAllAuthorsAdminViewItem) => {
                                                return <option value={author.id} key={author.id}>{author.fullName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="admin-book-add-footer">
                                    <button type="submit" className="btn btn-outline-secondary" onClick={closeAddBook}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                            : SharedConstants.EMPTY_VALUE
                    }
                </div>
            }
        </div>

    );
}

export default AdminBookComponent;