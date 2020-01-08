export class ResponseFilterBookView {
    quantity:number;
    books: BookResponseFilterBookViewItem[] = []
}

export class BookResponseFilterBookViewItem {
    id: string;
    title: string;
}