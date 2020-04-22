import { AuthConstants } from "../constants/auth.constant";

export const PasswordValidator = (value: string):boolean =>{
    const regexp = new RegExp(AuthConstants.REGEX_PASSWORD);
    if (!regexp.test(value)) {
        return true;
    }
    return false;
}
