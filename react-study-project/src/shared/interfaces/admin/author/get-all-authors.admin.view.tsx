
export interface IGetAllAuthorsAdminView {
    allAuthors: IAuthorIGetAllAuthorsAdminViewItem[];
}
export interface IAuthorIGetAllAuthorsAdminViewItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}