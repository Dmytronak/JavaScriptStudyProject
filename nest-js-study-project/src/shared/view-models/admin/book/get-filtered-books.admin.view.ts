import { BookType } from "src/shared/enums/book-type.enum";

export class GetFilteredBooksAdminView {
    books: BookGetFilteredBooksAdminViewItem[] = [];
    quantity:number;
}
export class BookGetFilteredBooksAdminViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: AuthorBookGetFilteredBooksAdminViewItem[] = []
}

export class AuthorBookGetFilteredBooksAdminViewItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}