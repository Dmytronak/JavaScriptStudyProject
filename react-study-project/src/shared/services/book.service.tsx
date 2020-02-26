import axios from 'axios';
import { IGetAllBookView } from "../interfaces/book/get-all-book.view";
import { ToastMessagesSerivce } from './toast-messages.service';
import { LocalStorageService } from './local-storage.service';

const toastMessagesSerivce = new ToastMessagesSerivce();
const localStorageService = new LocalStorageService();

export class BookService {
    public async getAllBooks():Promise<IGetAllBookView>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/book/getAllBooks`)
        .then(result=>{
            return result.data;
        })
        .catch(error=>{
            toastMessagesSerivce.error(error.response.data.message);
        });
    } 
}