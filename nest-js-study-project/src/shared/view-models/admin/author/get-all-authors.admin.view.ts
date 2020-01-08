import { ObjectID } from "typeorm";

export class GetAllAuthorsAdminView {
    allAuthors: AuthorGetAllAuthorsAdminViewItem[] = [];
}
export class AuthorGetAllAuthorsAdminViewItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}