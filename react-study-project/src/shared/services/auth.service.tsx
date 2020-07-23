import axios from 'axios';
import { ILoginAuthView } from '../interfaces/auth/login-auth.view';
import { IRegisterAuthView } from '../interfaces/auth/register-auth.view';
import { ToastMessagesSerivce } from './toast-messages.service';
import { IResponseLoginAuthView } from '../interfaces/auth/response-login-auth.view';
import { LocalStorageService } from './local-storage.service';
import { SharedConstants } from '../constants/shared.constant';
import { AuthConstants } from '../constants/auth.constant';
import jwtDecode from "jwt-decode";
import jwt_decode from 'jwt-decode';
import { AdminConstants } from '../constants/admin.constant';
import { ImageUploadService } from './image-upload.service';
import { GetImageUrlHelper } from '../helpers/get-image-url.helper';

const toastMessagesSerivce = new ToastMessagesSerivce();
const localStorageService = new LocalStorageService();
const imageUploadService = new ImageUploadService();

export class AuthService {
    public async register(register: IRegisterAuthView): Promise<void> {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, register)
            .then(response => {
                toastMessagesSerivce.success('Your register was successfull');
                window.location.href = '/auth/login';
            })
            .catch(error => {
                toastMessagesSerivce.error(error.data.message);
            });
    }

    public async login(login: ILoginAuthView): Promise<IResponseLoginAuthView> {
        let result: IResponseLoginAuthView = { access_token: SharedConstants.EMPTY_VALUE, errorMessage: SharedConstants.EMPTY_VALUE, errorStatusCode: SharedConstants.ZERO_VALUE };
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, login)
            .then((response: any) => {
                result = response
            })
            .catch(error => {
                result.errorMessage = error.data.message;
                result.errorStatusCode = error.data.statusCode;
            });
        return result;
    }
    public async loginAsUser(accessToken: string): Promise<void> {
        localStorageService.setItem(AuthConstants.AUTH_TOKEN_KEY, accessToken);
        toastMessagesSerivce.success(AdminConstants.LOGIN_AS_USER_SUCCESSFULLY)
        setTimeout(() => {
            window.location.reload();
        }, 7000);

    }
    public signOut(): void {
        localStorageService.removeItem(AuthConstants.AUTH_TOKEN_KEY);
        window.location.reload();
    }
    public isAuth(): boolean {
        const result: boolean = !!localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
        return result;
    }
    public isAdmin(): boolean {
        let result: boolean = false;
        const token = localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
        if (token) {
            const decodeToken = JSON.parse(JSON.stringify(jwtDecode(token)));
            const userRoles: [] = decodeToken[AuthConstants.AUTH_ROLE_ROLES_KEY];

            userRoles.forEach((element: string) => {
                if (element === AuthConstants.AUTH_ROLE_ADMIN) {
                    result = true;
                }
            });
        }
        return result;
    }
    public getUserEmail(): string {
        let result: string = AuthConstants.EMPTY_VALUE;
        const token = localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
        if (token) {
            const decode: string = JSON.stringify(jwt_decode(token));
            result = JSON.parse(decode).email;
        }
        return result;
    }
    public getUserProfileImageUrl(): string {
        let result: string = AuthConstants.EMPTY_VALUE;
        const token = localStorageService.getItem(AuthConstants.AUTH_TOKEN_KEY);
        if (token) {
            const decode: string = JSON.stringify(jwt_decode(token));
            result = GetImageUrlHelper(JSON.parse(decode).profileImage);
        }
        return result;
    }
}