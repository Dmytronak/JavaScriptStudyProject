import { BookType } from "../../../enums/book-type.enum";

export interface ICreateBookAdminView {
    title: string;
    price: number;
    type: BookType;
    authors: IAuthorICreateBookAdminViewItem[];
}
export interface IAuthorICreateBookAdminViewItem { 
    authorId: string;
}