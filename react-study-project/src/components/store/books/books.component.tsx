import React, { useEffect } from "react";
import "./books.component.scss"
import { BookService } from "../../../shared/services/book.service";
import { SharedConstants } from "../../../shared/constants/shared.constant";
import { BookType } from "../../../shared/enums/book-type.enum";
import BookComponent from "../../../shared/components/store/book/book.component";
import Pagination from "react-js-pagination";
import { IGetAllBookResponseView, IBookGetAllBookResponseViewItem } from "../../../shared/interfaces/responses/book/get-all-book-response.view";
import { FilterBookView } from "../../../shared/interfaces/book/filter-book.view";
import { PaginationCongfig } from "../../../shared/configurations/pagination.config";

const bookService: BookService = new BookService();
const BooksComponent: React.FC = () => {
    const [criterias,setCriterias] = React.useState<FilterBookView>({
        page:PaginationCongfig.pageNumber,
        priceMin:SharedConstants.ZERO_VALUE,
        priceMax:SharedConstants.ZERO_VALUE,
        searchString:SharedConstants.EMPTY_VALUE,
        type:BookType.None
    });
debugger
    const [store, setBooksToModel] = React.useState<IGetAllBookResponseView>({
        collectionSize: SharedConstants.ZERO_VALUE,
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
    useEffect(() => {
        bookService.filteredBooks(criterias)
            .then((response: IGetAllBookResponseView) => {
                setBooksToModel(response);
            });

    }, []);

    const BookList = (): JSX.Element => {
        const listItems: JSX.Element[] = store.books
            .map((book: IBookGetAllBookResponseViewItem) => {
                return (
                    <BookComponent id={book.id} authors={book.authors} title={book.title} type={book.type} price={book.price} />
                );
            });
        return (
            <div className="books-items">{listItems}</div>
        );

    };

    const handlePageChange = (pageNumber: number): void => {
        criterias.page = pageNumber;
        bookService.filteredBooks(criterias)
        .then((response: IGetAllBookResponseView) => {
            setBooksToModel(response);
        });
    };

    const itemsPerPage:number = PaginationCongfig.maxSize;
    return (
        <div className="books-group">
            <BookList />
            <div className="books-pagination">
                <Pagination
                    activePage={criterias.page}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={store.collectionSize}
                    onChange={(x) => handlePageChange(x)}
                    itemClass="page-item"
                    linkClass="page-link" />
            </div>

        </div>
    );
}

export default BooksComponent;