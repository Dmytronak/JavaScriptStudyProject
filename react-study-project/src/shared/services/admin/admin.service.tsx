import axios from 'axios';
import { IGetAllBooksAdminView } from "../../interfaces/admin/book/get-all-books.admin.view";
import { IGetAllAuthorsAdminView } from '../../interfaces/admin/author/get-all-authors.admin.view';
import { IUpdateBookAdminView } from '../../interfaces/admin/book/update-book.admin.view';

export class AdminService {
    public async getAllBooks():Promise<IGetAllBooksAdminView>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/getAllBooks`);
    }
    public async updateBook(book:IUpdateBookAdminView){
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/updateBook`,book);
    }
    public async getAllAuthors():Promise<IGetAllAuthorsAdminView>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/getAllAuthors`);
    }
}