import { BookType } from "src/shared/enums/book-type.enum";

export class GetAllBooksAdminView {
    allBooks: BookGetAllBooksAdminViewItem[] = [];
}
export class BookGetAllBooksAdminViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: AuthorBookGetAllBooksAdminViewItem[] = []
}

export class AuthorBookGetAllBooksAdminViewItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}