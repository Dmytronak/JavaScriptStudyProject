import axios from 'axios';
import { ILoginAuthView } from '../interfaces/auth/login-auth.view';
import { IRegisterAuthView } from '../interfaces/auth/register-auth.view';
import { ToastMessagesSerivce } from './toast-messages.service';
import { IResponseLoginAuthView } from '../interfaces/auth/response-login-auth.view';
import { LocalStorageService } from './local-storage.service';

const toastMessagesSerivce = new ToastMessagesSerivce();
const localStorageService = new LocalStorageService();

export class AuthService {
    public async register(register: IRegisterAuthView): Promise<void> {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, register)
            .then(response => {
                toastMessagesSerivce.success('Your register was successfull');
                window.location.href = '/auth/login';
            })
            .catch(error => {
                toastMessagesSerivce.error(error.response.data.message);
            });
    }

    public async login(login: ILoginAuthView): Promise<IResponseLoginAuthView> {
        let response: IResponseLoginAuthView = { access_token: '', errorMessage: '', errorStatusCode: 0 };
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, login)
            .then(result => {
                response = result.data
            })
            .catch(error => {
                response.errorMessage = error.response.data.message;
                response.errorStatusCode = error.response.data.statusCode;
            });
        return response;
    }

    public signOut():void{
        localStorageService.removeItem('token');
     }
    public isAuth():boolean{
       return(!!localStorageService.getItem('token'))
    }
}