import { BookType } from "../../enums/book-type.enum";

export interface FilterCriteriasBookView {
    searchString: string;
    priceMin: number;
    priceMax: number;
    type: BookType; 
    page:number;
}