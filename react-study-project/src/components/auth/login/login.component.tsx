import React from 'react'
import '../login/login.component.scss'
import { connect } from 'react-redux';
import { ILoginAuthView } from '../../../shared/interfaces/auth/login-auth.view';
import { Link } from 'react-router-dom';

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

    private handleInputChange(event: any): void {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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
                            <input className="form-control"
                                placeholder="Email"
                                name="email"
                                value={this.state.loginFields.email || ""}
                                onChange={this.handleInputChange}
                                type="email" />
                        </div>
                        <div className="form-group">
                            <a className="float-right" href="/*">Forgot?</a>
                            <label>Password</label>
                            <input className="form-control"
                                placeholder="Password "
                                name="password"
                                value={this.state.loginFields.password}
                                onChange={this.handleInputChange}
                                type="password" />
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
            type: `@@AUTH/LOGIN`,
            loginData: loginData
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)