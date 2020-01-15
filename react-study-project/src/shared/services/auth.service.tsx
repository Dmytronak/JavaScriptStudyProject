import axios from 'axios';
import { ILoginAuthView } from '../entities/auth/login-auth.view';
import { IRegisterAuthView } from '../entities/auth/register-auth.view';
import { ToastMessagesSerivce } from './toast-messages.service';

export class AuthService {
    constructor (private readonly toastMessagesSerivce:ToastMessagesSerivce){}

    public async register(register: IRegisterAuthView): Promise<void> {
        return axios.post(`${process.env.PUBLIC_URL}/auth/register`, register)
            .then(response => {
                this.toastMessagesSerivce.success('Your register was successfull')
                window.location.href = '/auth/login';
            })
            .catch(error => {
                this.toastMessagesSerivce.error(error.response);
                console.log(error.response);
            });
    }

    public async login(login: ILoginAuthView): Promise<void> {
        return axios.post(`${process.env.PUBLIC_URL}/auth/login`, login);
    }
}