import { BookType } from "../../../enums/book-type.enum";

export interface IGetFilteredBooksAdminView {
    books: IBookIGetFilteredBooksAdminViewItem[];
    quantity:number;
}
export interface IBookIGetFilteredBooksAdminViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: IAuthorIBookIGetFilteredBooksAdminViewItem[];
}

export interface IAuthorIBookIGetFilteredBooksAdminViewItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}