import React, { Component } from 'react';
import './Login.css';
import SignUp from './signUp/SignUp';
import SignIn from './signIn/SignIn';
import { getCookie } from 'services/cookie-service';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: getCookie("isUser") ? true : false
        }
    }
    
    handlePass() {
        this.setState({
            isUser: !this.state.isUser
        })
    }
    
    render() {
        return (
            <div className="Login">
                <div className="login-wrapper">
                    <div className="login-image-wrapper">

                    </div>
                    <div className="login-content-wrapper">
                        <div className="login-content-main-wrapper">
                            {this.state.isUser ? <SignIn onDefineUser={this.props.defineUser} /> : <SignUp onDefineUser={this.props.defineUser} />}
                            <div className="login-button-wrapper">

                                <div className="btn-pass-wrapper">
                                    <a href="#" className="btn-pass" onClick={this.handlePass.bind(this)}>{this.state.isUser ? "Sign up ->" : "Sign in ->"}</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;