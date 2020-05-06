import { BookType } from "src/shared/enums/book-type.enum";

export class ResponseFilterBookView {
    quantity:number;
    minPrice:number;
    maxPrice:number;
    books: BookResponseFilterBookViewItem[] = []
}

export class BookResponseFilterBookViewItem {
    id: string;
    title: string;
    type: BookType;
    price: number;
    authors: AuthorBookResponseFilterBookViewItem[] = [];
}
export class AuthorBookResponseFilterBookViewItem {
    id: string;
    fullName: string;
}