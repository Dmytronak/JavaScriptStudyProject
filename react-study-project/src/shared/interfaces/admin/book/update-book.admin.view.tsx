import { BookType } from "../../../enums/book-type.enum";

export interface IUpdateBookAdminView {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: IAuthorIUpdateBookAdminViewItem[];
}
export interface IAuthorIUpdateBookAdminViewItem {
    authorId: string;
}