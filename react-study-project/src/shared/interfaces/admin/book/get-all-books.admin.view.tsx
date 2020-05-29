import { BookType } from "../../../enums/book-type.enum";

export interface IGetAllBooksAdminView {
    allBooks: IBookIGetAllBooksAdminViewItem[];
}
export interface IBookIGetAllBooksAdminViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: IAuthorBookIGetAllBooksAdminViewItem[]
}

export interface IAuthorBookIGetAllBooksAdminViewItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}