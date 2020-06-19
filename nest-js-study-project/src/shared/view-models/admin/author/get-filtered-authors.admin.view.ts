export class GetFilteredAuthorsAdminView {
    authors: AuthorGetFilteredAuthorsAdminViewItem[] = [];
    quantity:number;
}
export class AuthorGetFilteredAuthorsAdminViewItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}