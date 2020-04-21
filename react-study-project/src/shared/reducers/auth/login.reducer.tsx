// Services
import { ToastMessagesSerivce } from '../../services/toast-messages.service';
// History
import { history } from '../../configurations/browser-history.config';
import { LocalStorageService } from "../../services/local-storage.service";
import { AuthConstants } from '../../constants/auth.constant';

const toastMessagesSerivce = new ToastMessagesSerivce();
const localStorageService = new LocalStorageService();

export function LoginReducer(state: any, action: any) {
    switch(action.type) {        
        case "@@AUTH/LOGIN_ERROR":
            {
                if (action.error.errorStatusCode === 404 || action.error.errorStatusCode === 403) {
                    toastMessagesSerivce.error(action.error.errorMessage);
                };

                return;
            }

        case "@@AUTH/LOGIN_RECIVED": 
            {
                localStorageService.setItem(AuthConstants.AUTH_TOKEN_KEY, action.token);
                return;
            }   
            
        case "@@AUTH/LOGIN_SUCCESS": 
            { 
                history.push(AuthConstants.PAGE_BOOKS_HOME);
                return window.location.reload();
            }     
        default:
            return null; 
    }
}