import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import "./SignIn.css";
import Spinner from 'components/spinner/Spinner';
import { userAuthenticate } from 'services/user-service';
import {setCookie} from 'services/cookie-service';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
        this.state = {
            isUserLoggingIn: false
        }
    }

    loginUser(e) {
        e.preventDefault();
        this.setState({
            isUserLoggingIn: true
        });

        const userCreds = {
            username: this.username.value,
            password: this.password.value 
        }

        userAuthenticate(userCreds).then((response) => {
            return response.json();
        }).then((data) => {
            if(!data.non_field_errors) {
                this.props.onDefineUser(data.user);
                setCookie("Authorization", "JWT " + data.token, data.exp_time);
                setCookie("isUser", true);
                this.props.history.replace("/article-creation");
            }
            this.setState({
                isUserLoggingIn: false
            });
        }).catch((error) => {
            this.setState({
                isUserLoggingIn: false
            });
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
                                className="input-field started"
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
                                className="input-field started"
                                type="password"
                                name="password"
                                ref={(input) => this.password = input}
                                required />
                        </div>
                    </div>

                    <input className="btn-submit" type="submit" value="Sign in"/>
                </form>
                {
                    this.state.isUserLoggingIn ? <Spinner /> : null                   
                }
            </div>
        )
    }
}

export default withRouter(SignIn);


