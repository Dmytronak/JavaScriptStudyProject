// Vendors
import jwt_decode from "jwt-decode";

// Services
import { ToastMessagesSerivce } from '../../services/toast-messages.service';
// History
import { history } from '../../configurations/browser-history.config';
import { LocalStorageService } from "../../services/local-storage.service";

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
                const decode = jwt_decode(action.token)
                localStorageService.setItem("currentUser", decode);
                return;
            }   
            
        case "@@AUTH/LOGIN_SUCCESS": 
            { 
                history.goBack();
               
                return  window.location.reload();
            }     
        default:
            return null; 
    }
}