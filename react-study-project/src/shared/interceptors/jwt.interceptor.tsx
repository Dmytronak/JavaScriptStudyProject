import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastMessagesSerivce } from '../services/toast-messages.service';
import { AuthService } from '../services/auth.service';
import { AuthConstants } from '../constants/auth.constant';

const localStorageService = new LocalStorageService();
const authService = new AuthService();
const toastMessagesSerivce = new ToastMessagesSerivce();

export const JwtInterceptor = () => {
    axios.interceptors.request.use(function (config:AxiosRequestConfig) {
        const token: string = localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response: AxiosResponse<any>) {
        return response.data;
    }, 
    function (error) {
        if(!error.response){
            toastMessagesSerivce.error(error.message);
            return Promise.reject(error);  
        }
        if (error.response.status === AuthConstants.ERROR_CODE_UNAUTHORIZE) {
            authService.signOut();
            toastMessagesSerivce.error(AuthConstants.ERROR_MESSAGE_UNAUTHORIZE);
        }
        if (error.response.status === AuthConstants.ERROR_CODE_HANDLED_ERROR) {
            toastMessagesSerivce.error(error.response.data.message);
        }
        return Promise.reject(error.response);
    });
};

export default JwtInterceptor;