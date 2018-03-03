import React, {Component} from 'react';
import './Login.css';
import SignUp from './signUp/SignUp';
import SignIn from './signIn/SignIn';

class Login extends Component {
    render(){
        return (
            <div>
                <div className="login-wrapper">
                   <div className="login-image-wrapper">
                      Image
                   </div>
                   <div className="login-main-field-wrapper">
                     <SignUp />
                   </div>
                </div>
            </div>
        )
    }
}

export default Login;