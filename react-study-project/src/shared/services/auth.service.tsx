import axios from 'axios';
import { ILoginAuthView } from '../interfaces/auth/login-auth.view';
import { IRegisterAuthView } from '../interfaces/auth/register-auth.view';
import { ToastMessagesSerivce } from './toast-messages.service';
import { IResponseLoginAuthView } from '../interfaces/auth/response-login-auth.view';
import { LocalStorageService } from './local-storage.service';
import { SharedConstants } from '../constants/shared.constant';
import { AuthConstants } from '../constants/auth.constant';

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
        let result: IResponseLoginAuthView = { access_token: SharedConstants.EMPTY_VALUE, errorMessage: SharedConstants.EMPTY_VALUE, errorStatusCode: SharedConstants.ZERO_VALUE };
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, login)
            .then(response => {
                result = response.data
            })
            .catch(error => {
                result.errorMessage = error.response.data.message;
                result.errorStatusCode = error.response.data.statusCode;
            });
        return result;
    }

    public signOut(): void {
        localStorageService.removeItem(AuthConstants.AUTH_TOKEN_KEY);
        window.location.reload();
    }
    public isAuth(): boolean {
        const result:boolean = !!localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
        return result;
    }
}