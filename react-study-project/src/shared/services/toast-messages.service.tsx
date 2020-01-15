import { toast } from 'react-toastify';
import { toastConfigure } from '../configurations/toast.config';

toast.configure();
export class ToastMessagesSerivce {
    public success(message: string): React.ReactText {
        return toast.success(message, toastConfigure);
    }
    public warning(message: string): React.ReactText {
        return toast.warn(message, toastConfigure)
    }
    public info(message: string): React.ReactText {
        return toast.info(message, toastConfigure)
    }
    public error(message: string): React.ReactText {
        return toast.error(message, toastConfigure)
    }
}