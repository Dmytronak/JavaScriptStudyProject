import { BookType } from "src/shared/enums/book-type.enum";

export class GetAllBookView {
    collectionSize: number;
    books: BookGetAllBookViewItem[] = [];
}
export class BookGetAllBookViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: AuthorBookGetAllBookViewItem[] = [];
}
export class AuthorBookGetAllBookViewItem {
    id: string;
    fullName: string;
}