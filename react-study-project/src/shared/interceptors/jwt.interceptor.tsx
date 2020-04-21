import axios from 'axios';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastMessagesSerivce } from '../services/toast-messages.service';
import { AuthService } from '../services/auth.service';

const localStorageService = new LocalStorageService();
const authService = new AuthService();
const toastMessagesSerivce = new ToastMessagesSerivce();

export const JwtInterceptor = () => {
    axios.interceptors.request.use(function (config) {
        const token: string = localStorageService.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }, 
    function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        if (response.status === 401) {
            authService.signOut();
            toastMessagesSerivce.error('Sorry but your account is no authorize');
        }
        return response;
    }, 
    function (error) {
        return Promise.reject(error);
    });
};

export default JwtInterceptor;