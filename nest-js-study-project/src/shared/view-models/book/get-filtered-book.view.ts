import { BookType } from "src/shared/enums/book-type.enum";

export class GetFilteredBookView {
    collectionSize: number;
    books: BookGetFilteredBookViewItem[] = [];
}
export class BookGetFilteredBookViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: AuthorBookGetFilteredBookViewItem[] = [];
}
export class AuthorBookGetFilteredBookViewItem {
    id: string;
    fullName: string;
}