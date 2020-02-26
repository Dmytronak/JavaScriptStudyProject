import { BookType } from "../../enums/book-type.enum";

export interface IGetAllBookView {
    collectionSize: number;
    books: IBookGetAllBookViewItem[];
}
export interface IBookGetAllBookViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: IAuthorBookGetAllBookViewItem[];
}
export interface IAuthorBookGetAllBookViewItem {
    id: string;
    fullName: string;
}