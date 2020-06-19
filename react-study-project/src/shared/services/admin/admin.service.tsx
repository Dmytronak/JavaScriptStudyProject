import axios from 'axios';
import { IGetAllBooksAdminView } from "../../interfaces/admin/book/get-all-books.admin.view";
import { IGetAllAuthorsAdminView } from '../../interfaces/admin/author/get-all-authors.admin.view';
import { IUpdateBookAdminView } from '../../interfaces/admin/book/update-book.admin.view';
import { ICreateBookAdminView } from '../../interfaces/admin/book/create-book.admin.view';
import { FilterCriteriasAdminView } from '../../interfaces/admin/filter/filter-criterias-admin.view';
import { IGetFilteredBooksAdminView } from '../../interfaces/admin/book/get-filtered-books.admin.view';
import { IGetFilteredUsersAdminView } from '../../interfaces/admin/user/get-filtered-users-admin.view';
import { IUpdateUserAdminView } from '../../interfaces/admin/user/update-user.admin.view';
import { IUpdatePasswordAdminView } from '../../interfaces/admin/user/update-password-user.admin.view';
import { ILoginAsUserAdminView } from '../../interfaces/admin/user/login-as-user.admin.view';
import { IResponseLoginAuthView } from '../../interfaces/auth/response-login-auth.view';
import { IGetFilteredAuthorsAdminView } from '../../interfaces/admin/author/get-filtered-authors-admin.view';
import { ICreateAuthorAdminView } from '../../interfaces/admin/author/create-author.admin.view';
import { IUpdateAuthorAdminView } from '../../interfaces/admin/author/update-author.admin.view';

export class AdminService {
    //#region Book
    public async createBook(book: ICreateBookAdminView): Promise<string> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/createBook`, book);
    }
    public async getAllBooks(): Promise<IGetAllBooksAdminView> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/getAllBooks`);
    }
    public async updateBook(book: IUpdateBookAdminView): Promise<void> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/updateBook`, book);
    }
    public async deleteBook(bookId: string): Promise<void> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/deleteBook/${bookId}`);
    }
    public async filteredBooks(criterias: FilterCriteriasAdminView): Promise<IGetFilteredBooksAdminView> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/filteredBooks`, criterias);
    }
    //#endregion Book

    //#region Authors
    public async createAuthor(author: ICreateAuthorAdminView): Promise<string> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/createAuthor`, author);
    }
    public async getAllAuthors(): Promise<IGetAllAuthorsAdminView> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/getAllAuthors`);
    }
    public async updateAuthor(author: IUpdateAuthorAdminView): Promise<void> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/updateAuthor`, author);
    }
    public async deleteAuthor(authorId: string): Promise<void> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/deleteAuthor/${authorId}`);
    }
    public async filteredAuthors(criterias: FilterCriteriasAdminView): Promise<IGetFilteredAuthorsAdminView> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/filteredAuthors`, criterias);
    }
    //#endregion Authors

    //#region User
    public async filteredUsers(criterias: FilterCriteriasAdminView): Promise<IGetFilteredUsersAdminView> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/filteredUsers`, criterias);
    }
    public async deleteUser(userId: string): Promise<void> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/deleteUser/${userId}`);
    }
    public async updateUser(user: IUpdateUserAdminView): Promise<void> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/updateUser`, user);
    }
    public async updatePasswordUser(user: IUpdatePasswordAdminView): Promise<void> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/updatePasswordUser`, user);
    }
    public async loginAsUser(user: ILoginAsUserAdminView): Promise<IResponseLoginAuthView> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/loginAsUser`, user);
    }
    //#endregion User


}