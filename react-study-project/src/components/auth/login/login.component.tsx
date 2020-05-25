import React from 'react'
import '../login/login.component.scss'
import { connect } from 'react-redux';
import { ILoginAuthView } from '../../../shared/interfaces/auth/login-auth.view';
import { Link } from 'react-router-dom';
import { SharedConstants } from '../../../shared/constants/shared.constant';
import { AuthActionConstants } from '../../../shared/actions/constants/auth-action.constant';

export class LoginComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            loginFields: {
                email: '',
                password: ''
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    private handleInputChange(event: React.SyntheticEvent<HTMLInputElement>): void {
        const target:EventTarget & HTMLInputElement = event.currentTarget;
        const value:string | boolean = target.type === SharedConstants.CHECKBOX_TYPE ? target.checked : target.value;
        const name:string = target.name;

        this.setState((prevState: {
            loginFields: {
                email: string,
                password: string
            }
        }) => ({
            loginFields: {
                ...prevState.loginFields,
                [name]: value,
            },
        }));
    };

    private login(): void {
        this.props.login(this.state.loginFields);
    };

    public render() {
        return (
            <div className="card login-card-center">
                <article className="card-body">
                    <Link to="/auth/register" className="float-right btn btn-outline-primary">Sign up</Link>
                    <h4 className="card-title mb-4 mt-1">Sign in</h4>
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" placeholder="Email" name="email" value={this.state.loginFields.email || ""} onChange={this.handleInputChange} type="email" />
                        </div>
                        <div className="form-group">
                            <a className="float-right" href="/*">Forgot?</a>
                            <label>Password</label>
                            <input className="form-control" placeholder="Password " name="password" value={this.state.loginFields.password} onChange={this.handleInputChange} type="password" />
                        </div>
                        <div className="form-group">
                            <button type="button" onClick={()=>this.login()} className="btn btn-primary btn-block">Login</button>
                        </div>
                    </form>
                </article>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => ({
    value: state
});
const mapDispatchToProps = (dispath: any) => ({
    login: (loginData: ILoginAuthView) => {
        dispath({
            type: AuthActionConstants.AUTH_ACTION_LOGIN_MAIN,
            loginData: loginData
        })
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)