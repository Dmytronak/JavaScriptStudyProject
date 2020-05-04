import { BookType } from "../../enums/book-type.enum";

export interface FilterBookView {
    searchString: string;
    priceMin: number;
    priceMax: number;
    type: BookType; 
    page:number;
}