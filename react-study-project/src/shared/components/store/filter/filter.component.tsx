import React, { SyntheticEvent, useEffect } from "react";
import { PaginationCongfig } from "../../../configurations/pagination.config";
import { FilterBookView } from "../../../interfaces/book/filter-book.view";
import { SharedConstants } from "../../../constants/shared.constant";
import { BookType } from "../../../enums/book-type.enum";
import { BookService } from "../../../services/book.service";
import { Range, createSliderWithTooltip } from "rc-slider";
import { IFilteredBookResponseView } from "../../../interfaces/responses/book/filtered-book-response.view";
import "./filter.component.scss"

const bookService: BookService = new BookService();
const RangeWithTooltip = createSliderWithTooltip(Range);

const FilterComponent: React.FC<any> = ({ outputFilteredBooks }) => {

    const [criterias, setCriterias] = React.useState<FilterBookView>({
        page: PaginationCongfig.pageNumber,
        priceMin: SharedConstants.ZERO_VALUE,
        priceMax: SharedConstants.ZERO_VALUE,
        searchString: SharedConstants.EMPTY_VALUE,
        type: BookType.None
    });
    const [store, setBooksToModel] = React.useState<IFilteredBookResponseView>({
        collectionSize: SharedConstants.ZERO_VALUE,
        minPrice:SharedConstants.ZERO_VALUE,
        maxPrice:SharedConstants.ONE_VALUE,
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
            .then((response: IFilteredBookResponseView) => {
                criterias.priceMin = response.minPrice;
                criterias.priceMax = response.maxPrice;
                outputFilteredBooks(response);
            });

    }, []);

    const priceRangeMarks = {
        0: <strong>0$</strong>,
        100: <strong>100$</strong>
    };
    const getBookData = (criterias: FilterBookView) => {
        bookService.filteredBooks(criterias)
            .then((response: IFilteredBookResponseView) => {
                outputFilteredBooks(response);
            });
    }
    const searchBookByNames = (event: SyntheticEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        criterias.searchString = value;
        getBookData(criterias);
    }
    const priceRangeChange = (value: number[]) => {
        criterias.priceMin = value[0];
        criterias.priceMax = value[1];
    }
    const searchBooksByPriceRange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        getBookData(criterias);
    }

    return (
        <div className="filter-group">
            <div className="filter-search">
                <p>
                    Search
                </p>
                <input type="text" onChange={searchBookByNames} placeholder="Write book title or authors" />
            </div>
            <div className="filter-range">
                <p>Price range</p>
                <RangeWithTooltip
                    allowCross={false}
                    marks={priceRangeMarks}
                    defaultValue={[1,14]}
                    tipProps={{align:{
                        offset: [0, -5]
                    }}}
                 
                    onChange={priceRangeChange}
                    tipFormatter={(value: {}) => `${value}$`}
                />
            </div>
            <button className="btn btn-outline-success" onClick={searchBooksByPriceRange}>Ok</button>
        </div>
    )
}
export default FilterComponent;