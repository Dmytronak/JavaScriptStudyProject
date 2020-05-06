import { IGetAllBookResponseView } from "./get-all-book-response.view";


export interface IFilteredBookResponseView extends IGetAllBookResponseView {
    minPrice:number;
    maxPrice:number;
}