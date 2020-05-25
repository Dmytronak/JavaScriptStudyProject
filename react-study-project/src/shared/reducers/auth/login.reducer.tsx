import { ToastMessagesSerivce } from '../../services/toast-messages.service';
import { history } from '../../configurations/browser-history.config';
import { LocalStorageService } from "../../services/local-storage.service";
import { AuthConstants } from '../../constants/auth.constant';
import { AuthActionConstants } from '../../actions/constants/auth-action.constant';

const toastMessagesSerivce = new ToastMessagesSerivce();
const localStorageService = new LocalStorageService();

export const LoginReducer = (state: any, action: any) => {
    switch(action.type) {        
        case AuthActionConstants.AUTH_ACTION_LOGIN_ERROR:
            {
                if (action.error.errorStatusCode === 404 || action.error.errorStatusCode === 403) {
                    toastMessagesSerivce.error(action.error.errorMessage);
                };

                return state;
            }

        case AuthActionConstants.AUTH_ACTION_LOGIN_RECIVED: 
            {
                localStorageService.setItem(AuthConstants.AUTH_TOKEN_KEY, action.token);
                return state;
            }   
            
        case AuthActionConstants.AUTH_ACTION_LOGIN_SUCCESS: 
            { 
                history.push(AuthConstants.PAGE_BOOKS_HOME);
                return window.location.reload();
            }     
        default:
            return null; 
    }
}