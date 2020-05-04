import axios from 'axios';
import { IGetAllBookResponseView } from "../interfaces/responses/book/get-all-book-response.view";
import { ToastMessagesSerivce } from './toast-messages.service';
import { IFilteredBookResponseView } from '../interfaces/responses/book/filtered-book-response.view';
import { FilterBookView } from '../interfaces/book/filter-book.view';

const toastMessagesSerivce = new ToastMessagesSerivce();

export class BookService {
    public async getAllBooks():Promise<IGetAllBookResponseView>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/book/getAllBooks`)
        .then(result=>{
            return result.data;
        })
        .catch(error=>{
            toastMessagesSerivce.error(error.response.data.message);
        });
    } 
    public async filteredBooks(criterias:FilterBookView):Promise<IFilteredBookResponseView>{
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/book/filteredBooks`,criterias)
        .then(result=>{
            return result.data;
        })
        .catch(error=>{
            toastMessagesSerivce.error(error.response.data.message);
        });
    }
}