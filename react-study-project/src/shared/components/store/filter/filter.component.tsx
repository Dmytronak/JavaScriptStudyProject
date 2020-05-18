import React, { SyntheticEvent, useEffect } from "react";
import { PaginationCongfig } from "../../../configurations/pagination.config";
import { FilterBookView } from "../../../interfaces/book/filter-book.view";
import { SharedConstants } from "../../../constants/shared.constant";
import { BookType } from "../../../enums/book-type.enum";
import { BookService } from "../../../services/book.service";
import { Range, createSliderWithTooltip } from "rc-slider";
import { IFilteredBookResponseView } from "../../../interfaces/responses/book/filtered-book-response.view";
import "./filter.component.scss"
import { EnumToArrayHelper } from "../../../helpers/enum-to-array.helper";

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
    useEffect(() => {
        bookService.filteredBooks(criterias)
            .then((response: IFilteredBookResponseView) => {
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
    const searchBooksBytType = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        const value = parseInt(event.currentTarget.value);
        criterias.type = value;
        getBookData(criterias);
    }
    const bookTypes = EnumToArrayHelper(BookType);
    const getTypeName = (number:number):string =>{
        if(number === BookType.None){
            return SharedConstants.ENUM_NONE_ALL_NAME;
        }
        return BookType[number];
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
                    defaultValue={[0,0]}
                    onChange={priceRangeChange}
                    tipFormatter={(value: {}) => `${value}$`}
                />
            </div>
            <button className="btn btn-outline-success" onClick={searchBooksByPriceRange}>Ok</button>
            <div className="filter-type">
                <p>Book type</p>
                <select onChange={searchBooksBytType}>
                {
                    bookTypes.map(x=>{
                        return <option value={x} key={x}>{getTypeName(x)}</option>
                    })
                }
                </select>
            </div>
        </div>
    )
}
export default FilterComponent;