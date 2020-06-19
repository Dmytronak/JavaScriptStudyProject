export interface IGetFilteredAuthorsAdminView {
    authors: IAuthorIGetFilteredAuthorsAdminViewItem[];
    quantity:number;
}
export interface IAuthorIGetFilteredAuthorsAdminViewItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}