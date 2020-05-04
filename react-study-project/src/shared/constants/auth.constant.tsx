export const AuthConstants = {
    AUTH_TOKEN_KEY:'token',
    EMPTY_VALUE:'',
    EMPTY_PAST_VALUE:' ',
    ZERO_VALUE:0,
    ONE_VALUE:1,
    
    REGISTER_EMAIL_FIELD:'email',
    REGISTER_FIRST_NAME_FIELD:'firstName',
    REGISTER_LAST_NAME_FIELD:'lastName',
    REGISTER_PASSWORD_FIELD:'password',
    REGISTER_CONFIRM_PASSWORD_FIELD:'confirmPassword',
    REGISTER_AGE_FIELD:'age',

    REGEX_EMAIL:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    REGEX_PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
    PAGE_BOOKS_HOME:'/books',

    NOT_VALID_REQUIRED_FIELD:'Required field',
    NOT_VALID_EMAIL:'Email is not valid',
    NOT_VALID_PASSWORD:'Password is not valid',
    NOT_VALID_MUST_MATCH_PASSWORD:'Confirm password must be the same as password',

    ERROR_MESSAGE_UNAUTHORIZE:'Sorry but your account is no authorize',

    ERROR_CODE_UNAUTHORIZE:401
}