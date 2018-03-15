import React, { Component } from 'react';
import './Login.css';
import SignUp from './signUp/SignUp';
import SignIn from './signIn/SignIn';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: true
        }
    }
    handlePass() {
        this.setState({
            isUser: !this.state.isUser
        })
    }
    submitUser() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + "http://api.thequestion.ru/api/search/answers?q=%D0%9F%D0%BE%D1%87%D0%B5%D0%BC%D1%83&limit=1")
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then((data) => {
                        console.log(data);
                    })
                }
            )
    }
    render() {
        return (
            <div>
                <div className="login-wrapper">
                    <div className="login-image-wrapper">

                    </div>
                    <div className="login-content-wrapper">
                        <div className="login-content-main-wrapper">
                            {this.state.isUser ? <SignUp /> : <SignIn />}
                            <div className="login-button-wrapper">

                                <div className="btn-pass-wrapper">
                                    <a href="#" className="btn-pass" onClick={this.handlePass.bind(this)}>{this.state.isUser ? "Sign in ->" : "Sign up ->"}</a>
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