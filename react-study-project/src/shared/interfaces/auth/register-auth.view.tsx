export interface IRegisterAuthView {
    email: string;
    firstName: string;
    lastName: string;  
    fullName: string;
    password: string;
    confirmPassword: string;
    age: number;
    profileImage: string;
    errors:ErrorIRegisterAuthView;
}

export interface ErrorIRegisterAuthView{
    emailNotValidText: string;
    firstNameNotValidText: string;
    lastNameNotValidText: string;  
    passwordNotValidText: string;
    confirmPasswordNotValidText: string;
    ageNotValidText: string;
}