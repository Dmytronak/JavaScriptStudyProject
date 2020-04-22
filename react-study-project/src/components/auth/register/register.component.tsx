import React, { useState } from "react";
import '../register/register.component.scss'
import { Link } from "react-router-dom";
import { AuthService } from "../../../shared/services/auth.service";
import { IRegisterAuthView } from "../../../shared/interfaces/auth/register-auth.view";
import { AuthConstants } from "../../../shared/constants/auth.constant";
import {  MustMatchValidator } from "../../../shared/validators/must-match.validator";
import { PasswordValidator } from "../../../shared/validators/password.validator";

const authService = new AuthService();
const RegisterComponent: React.FC = () => {
    const [register, setFieldForm] = React.useState<IRegisterAuthView>({
        email: AuthConstants.EMPTY_VALUE,
        firstName: AuthConstants.EMPTY_VALUE,
        lastName: AuthConstants.EMPTY_VALUE,
        fullName: AuthConstants.EMPTY_VALUE,
        password: AuthConstants.EMPTY_VALUE,
        confirmPassword: AuthConstants.EMPTY_VALUE,
        age: 0,
        errors: {
            emailNotValidText: AuthConstants.EMPTY_PAST_VALUE,
            firstNameNotValidText: AuthConstants.EMPTY_PAST_VALUE,
            lastNameNotValidText: AuthConstants.EMPTY_PAST_VALUE,
            passwordNotValidText: AuthConstants.EMPTY_PAST_VALUE,
            confirmPasswordNotValidText: AuthConstants.EMPTY_PAST_VALUE,
            ageNotValidText: AuthConstants.EMPTY_PAST_VALUE,
        }
    });
    const onInputChange = (field: string) => (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const fieldValue = event.currentTarget.value;
        setFieldForm({
            ...register,
            [field]: fieldValue
        });
        valideteForm(field, fieldValue);
    }
    const onSubmitForm = (event: React.SyntheticEvent<HTMLFormElement>): void => {
        event.preventDefault();
        authService.register(register);
    }
    const valideteForm = (field: string, value: string): void => {
        if (field === AuthConstants.REGISTER_EMAIL_FIELD) {
            register.errors.emailNotValidText = AuthConstants.EMPTY_VALUE;
        }
        if (field === AuthConstants.REGISTER_FIRST_NAME_FIELD) {
            register.errors.firstNameNotValidText = AuthConstants.EMPTY_VALUE;
        }
        if (field === AuthConstants.REGISTER_LAST_NAME_FIELD) {
            register.errors.lastNameNotValidText = AuthConstants.EMPTY_VALUE;
        }
        if (field === AuthConstants.REGISTER_AGE_FIELD) {
            register.errors.ageNotValidText = AuthConstants.EMPTY_VALUE;
        }
        if (field === AuthConstants.REGISTER_PASSWORD_FIELD) {
            register.errors.passwordNotValidText = AuthConstants.EMPTY_VALUE;
        }
        if (field === AuthConstants.REGISTER_CONFIRM_PASSWORD_FIELD) {
            register.errors.confirmPasswordNotValidText = AuthConstants.EMPTY_VALUE;
        }
        if (field === AuthConstants.REGISTER_EMAIL_FIELD && value === AuthConstants.EMPTY_VALUE) {
            register.errors.emailNotValidText = AuthConstants.NOT_VALID_REQUIRED_FIELD;
            return;
        }
        if (field === AuthConstants.REGISTER_EMAIL_FIELD && !value.match(AuthConstants.REGEX_EMAIL)) {
            register.errors.emailNotValidText = AuthConstants.NOT_VALID_EMAIL;
            return;
        }
        if (field === AuthConstants.REGISTER_FIRST_NAME_FIELD && value === AuthConstants.EMPTY_VALUE) {
            register.errors.firstNameNotValidText = AuthConstants.NOT_VALID_REQUIRED_FIELD;
            return;
        }
        if (field === AuthConstants.REGISTER_LAST_NAME_FIELD && value === AuthConstants.EMPTY_VALUE) {
            register.errors.lastNameNotValidText = AuthConstants.NOT_VALID_REQUIRED_FIELD;
            return;
        }
        if (field === AuthConstants.REGISTER_AGE_FIELD && value === AuthConstants.EMPTY_VALUE) {
            register.errors.ageNotValidText = AuthConstants.NOT_VALID_REQUIRED_FIELD;
            return;
        }
        
        if (field === AuthConstants.REGISTER_PASSWORD_FIELD && value === AuthConstants.EMPTY_VALUE) {
            register.errors.passwordNotValidText = AuthConstants.NOT_VALID_REQUIRED_FIELD;
            return;
        }
        if (field === AuthConstants.REGISTER_PASSWORD_FIELD && PasswordValidator(value)) {
            register.errors.passwordNotValidText = AuthConstants.NOT_VALID_PASSWORD;
            return;
        }
        if (field === AuthConstants.REGISTER_CONFIRM_PASSWORD_FIELD && value === AuthConstants.EMPTY_VALUE) {
            register.errors.confirmPasswordNotValidText = AuthConstants.NOT_VALID_REQUIRED_FIELD;
            return;
        }
        if (field === AuthConstants.REGISTER_CONFIRM_PASSWORD_FIELD && PasswordValidator(value)) {
            register.errors.confirmPasswordNotValidText = AuthConstants.NOT_VALID_PASSWORD;
            return;
        }
        if (field === AuthConstants.REGISTER_CONFIRM_PASSWORD_FIELD && !MustMatchValidator(register.password,value)) {
            register.errors.confirmPasswordNotValidText = AuthConstants.NOT_VALID_MUST_MATCH_PASSWORD;
            return;
        }
    }
    const isValidForm = (): boolean => {
        if (register.errors.emailNotValidText === AuthConstants.EMPTY_VALUE && register.errors.firstNameNotValidText === AuthConstants.EMPTY_VALUE &&
            register.errors.lastNameNotValidText === AuthConstants.EMPTY_VALUE && register.errors.ageNotValidText === AuthConstants.EMPTY_VALUE && 
            register.errors.passwordNotValidText === AuthConstants.EMPTY_VALUE && register.errors.confirmPasswordNotValidText === AuthConstants.EMPTY_VALUE) {
            return false;
        }
        return true;
    }

    return (
        <div className="card register-card-center">
            <article className="card-body">
                <Link to="/auth/login" className="float-right btn btn-outline-primary">Sign in</Link>
                <h4 className="card-title mb-4 mt-1">Sign up</h4>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" placeholder="Email" type="email" value={register.email} onChange={onInputChange('email')} />
                        {
                            register.errors.emailNotValidText ?
                                <span className="error-message">{register.errors.emailNotValidText}</span>
                                : ''
                        }
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input className="form-control" placeholder="First Name" type="text" value={register.firstName} onChange={onInputChange('firstName')} />
                        {
                            register.errors.firstNameNotValidText ?
                                <span className="error-message"> {register.errors.firstNameNotValidText}</span>
                                : ''
                        }
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" placeholder="Last Name" type="text" value={register.lastName} onChange={onInputChange('lastName')} />
                        {
                            register.errors.lastNameNotValidText ?
                                <span className="error-message"> {register.errors.lastNameNotValidText}</span>
                                : ''
                        }
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input className="form-control" placeholder="Age" type="number" value={register.age} onChange={onInputChange('age')} />
                        {
                            register.errors.ageNotValidText ?
                                <span className="error-message"> {register.errors.ageNotValidText}</span>
                                : ''
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" placeholder="Password " type="password" value={register.password} onChange={onInputChange('password')} />
                        {
                            register.errors.passwordNotValidText ?
                                <span className="error-message"> {register.errors.passwordNotValidText}</span>
                                : ''
                        }
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input className="form-control" placeholder="Confirm Password " type="password" value={register.confirmPassword} onChange={onInputChange('confirmPassword')} />
                        {
                            register.errors.confirmPasswordNotValidText ?
                                <span className="error-message"> {register.errors.confirmPasswordNotValidText}</span>
                                : ''
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={isValidForm()}>Register</button>
                    </div>
                </form>
            </article>
        </div>
    );
}
export default RegisterComponent;