import React, { SyntheticEvent, useEffect } from "react";
import { PaginationCongfig } from "../../../configurations/pagination.config";
import { FilterCriteriasBookView } from "../../../interfaces/book/filter-criterias-book.view";
import { SharedConstants } from "../../../constants/shared.constant";
import { BookType } from "../../../enums/book-type.enum";
import { BookService } from "../../../services/book.service";
import { Range, createSliderWithTooltip } from "rc-slider";
import { IFilteredBookResponseView } from "../../../interfaces/responses/book/filtered-book-response.view";
import "./filter.component.scss"
import { EnumToArrayHelper } from "../../../helpers/enum-to-array.helper";

const bookService: BookService = new BookService();
const RangeWithTooltip = createSliderWithTooltip(Range);

const FilterComponent: React.FC<any> = ({ outputFilteredBooks,outputCriteriasBooks }) => {
    const [priceRange, setPriceRange] = React.useState<any>({
        min: SharedConstants.ZERO_VALUE,
        max: SharedConstants.ONE_HUNDRED
    });
    let [priceRangeMarksValue, setPriceRangeMarksValue] = React.useState<any>({
        0: <strong>0$</strong>,
        100: <strong>100$</strong>
    });
    const [criterias, setCriterias] = React.useState<FilterCriteriasBookView>({
        page: PaginationCongfig.pageNumber,
        priceMin: SharedConstants.ZERO_VALUE,
        priceMax: SharedConstants.ZERO_VALUE,
        searchString: SharedConstants.EMPTY_VALUE,
        type: BookType.None
    });
    useEffect(() => {
        getBookData(criterias);

    }, []);

    const getBookData = (criterias: FilterCriteriasBookView) => {
        bookService.filteredBooks(criterias)
            .then((response: IFilteredBookResponseView) => {
                outputFilteredBooks(response);
                outputCriteriasBooks(criterias);
                const priceRange = {
                    min: response.minPrice,
                    max: response.maxPrice
                };
                const priceRangeMarks = {
                    min: <strong>{response.minPrice}$</strong>,
                    max: <strong>{response.maxPrice}$</strong>
                }
                const priceRangeMarksReplace = Object.keys(priceRangeMarks)
                    .map((key) => {
                        if (key === 'min') {
                            const newKey = response.minPrice || key;
                            return { [newKey]: priceRangeMarks[key] };
                        }
                        if (key === 'max') {
                            const newKey = response.maxPrice || key;
                            return { [newKey]: priceRangeMarks[key] };
                        }
                    });
                const priceRangeMarksReplaced = priceRangeMarksReplace.reduce((a, b) => Object.assign({}, a, b));
                setPriceRange(priceRange);
                setPriceRangeMarksValue(priceRangeMarksReplaced);
            });
    }
    const searchBookByNames = (event: SyntheticEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setCriterias({
            ...criterias,
            searchString:value
        });
        getBookData(criterias);
    }
    const priceRangeChange = (value: number[]) => {
        setCriterias({
            ...criterias,
            priceMin:value[0],
            priceMax:value[1]
        });
    }
    const searchBooksByPriceRange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        getBookData(criterias);
    }
    const searchBooksByType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.currentTarget.value);
        setCriterias({
            ...criterias,
            type:value
        });
        getBookData(criterias);
    }
    const bookTypes = EnumToArrayHelper(BookType);
    const getTypeName = (number: number): string => {
        if (number === BookType.None) {
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
                <input type="text" className="form-control" onChange={searchBookByNames} placeholder="Write book title or authors" />
            </div>
            <div className="filter-range">
                <p>Price range</p>
                <RangeWithTooltip
                    allowCross={false}
                    min={priceRange.min}
                    max={priceRange.max}
                    marks={priceRangeMarksValue}
                    defaultValue={[priceRange.min, priceRange.max]}
                    onChange={priceRangeChange}
                    tipFormatter={(value: {}) => `${value}$`}
                />
            </div>
            <button className="btn btn-outline-success" onClick={searchBooksByPriceRange}>Ok</button>
            <div className="filter-type">
                <p>Book type</p>
                <select className="form-control" onChange={searchBooksByType}>
                    {
                        bookTypes.map(x => {
                            return <option value={x} key={x}>{getTypeName(x)}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}
export default FilterComponent;