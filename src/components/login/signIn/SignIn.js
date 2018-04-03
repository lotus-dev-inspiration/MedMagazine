import React, { Component } from 'react';
import "./SignIn.css";
import { userAuthenticate } from 'services/user-service';
import {setCookie} from 'services/cookie-service';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(e) {
        e.preventDefault();

        const userCreds = {
            username: this.username.value,
            password: this.password.value 
        }

        userAuthenticate(userCreds).then((response) => {
            return response.json();
        }).then((data) => {
            // setCookie("Authorization", "JWT " + data.token, data.expires);
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="SignIn">
                <h1 className="content-heading">Sign In</h1>
                <form onSubmit={this.loginUser}>
                    <div className="input-field-wrapper">
                        <span className="input-heading">Username</span>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                type="text"
                                name="username"
                                ref={(input) => this.username = input}
                                required />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Password</span>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                type="password"
                                name="password"
                                ref={(input) => this.password = input}
                                required />
                        </div>
                    </div>

                    <input className="btn-submit" type="submit" value="Sign in"/>
                </form>
            </div>
        )
    }
}

export default SignIn;