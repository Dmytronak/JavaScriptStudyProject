import axios from 'axios';
import { IGetAllBookResponseView } from "../interfaces/responses/book/get-all-book-response.view";
import { IFilteredBookResponseView } from '../interfaces/responses/book/filtered-book-response.view';
import { FilterCriteriasBookView } from '../interfaces/book/filter-criterias-book.view';

export class BookService {
    public async getAllBooks():Promise<IGetAllBookResponseView>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/book/getAllBooks`);
    } 
    public async filteredBooks(criterias:FilterCriteriasBookView):Promise<IFilteredBookResponseView>{
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/book/filteredBooks`,criterias);
    }
}