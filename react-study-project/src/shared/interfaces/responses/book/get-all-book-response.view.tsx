import { BookType } from "../../../enums/book-type.enum";

export interface IGetAllBookResponseView {
    collectionSize: number;
    books: IBookGetAllBookResponseViewItem[];
}
export interface IBookGetAllBookResponseViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: IAuthorBookGetAllBookResponseViewItem[];
}
export interface IAuthorBookGetAllBookResponseViewItem {
    id: string;
    fullName: string;
}