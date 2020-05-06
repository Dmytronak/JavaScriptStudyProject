import React, { useEffect } from "react";
import "./books.component.scss"
import { BookService } from "../../../shared/services/book.service";
import { SharedConstants } from "../../../shared/constants/shared.constant";
import { BookType } from "../../../shared/enums/book-type.enum";
import BookComponent from "../../../shared/components/store/book/book.component";
import Pagination from "react-js-pagination";
import { IBookGetAllBookResponseViewItem } from "../../../shared/interfaces/responses/book/get-all-book-response.view";
import { FilterBookView } from "../../../shared/interfaces/book/filter-book.view";
import { PaginationCongfig } from "../../../shared/configurations/pagination.config";
import FilterComponent from "../../../shared/components/store/filter/filter.component";
import { IFilteredBookResponseView } from "../../../shared/interfaces/responses/book/filtered-book-response.view";

const bookService: BookService = new BookService();
const BooksComponent: React.FC = () => {
    const [criterias, setCriterias] = React.useState<FilterBookView>({
        page: PaginationCongfig.pageNumber,
        priceMin: SharedConstants.ZERO_VALUE,
        priceMax: SharedConstants.ZERO_VALUE,
        searchString: SharedConstants.EMPTY_VALUE,
        type: BookType.None
    });

    const [store, setBooksToModel] = React.useState<IFilteredBookResponseView>({
        collectionSize: SharedConstants.ZERO_VALUE,
        minPrice: SharedConstants.ZERO_VALUE,
        maxPrice: SharedConstants.ONE_VALUE,
        books: [{
            id: SharedConstants.EMPTY_VALUE,
            title: SharedConstants.EMPTY_VALUE,
            type: BookType.None,
            price: SharedConstants.ZERO_VALUE,
            authors: [{
                id: SharedConstants.EMPTY_VALUE,
                fullName: SharedConstants.EMPTY_VALUE,
            }]
        }],

    });



    const BookList = (): JSX.Element => {
        const listItems: JSX.Element[] = store.books
            .map((book: IBookGetAllBookResponseViewItem) => {
                return (
                    <BookComponent id={book.id} authors={book.authors} title={book.title} type={book.type} price={book.price} key={book.id} />
                );
            });
        return (
            <div className="books-items">{listItems}</div>
        );

    };

    const handlePageChange = (page: number): void => {
        criterias.page = page;
        bookService.filteredBooks(criterias)
            .then((response: IFilteredBookResponseView) => {
                setBooksToModel(response);
            });
    };
    const getFilteredBooks = (books: IFilteredBookResponseView) => {
        setBooksToModel(books);
    }
    const itemsPerPage: number = PaginationCongfig.maxSize;
    return (
        <div className="main-content">
            <FilterComponent outputFilteredBooks={getFilteredBooks} />
            <div className="books-group">
                <BookList />
                <div className="books-pagination">
                    {
                        store.collectionSize > SharedConstants.ZERO_VALUE ? <Pagination
                            activePage={criterias.page}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={store.collectionSize}
                            onChange={(page) => handlePageChange(page)}
                            itemClass="page-item"
                            linkClass="page-link" /> : ''
                    }

                </div>
            </div>
        </div>


    );
}

export default BooksComponent;