import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';


import "./SignIn.css";
import Spinner from 'components/spinner/Spinner';
import { userAuthenticate } from 'services/user-service';
import { setCookie } from 'services/cookie-service';
import NotificationSystem from 'react-notification-system';

let _notificationSystem = null;

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
        this.state = {
            isUserLoggingIn: false,
           
        }
    }

  _addNotification = (message, status) => {
    
    this._notificationSystem.addNotification({
      message: message,
      level: status,
      autoDismiss: 20
    });
  };

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  };

    loginUser(e) {
        e.preventDefault();
        // this.setState({
        //     isUserLoggingIn: true
        // });

        const userCreds = {
            username: this.username.value,
            password: this.password.value
        }

        userAuthenticate(userCreds).then((response) => {
            return response.json();
        }).then((data) => {
            // this._addNotification('hello', 'success');
            if (!data.non_field_errors) {
                this.props.onDefineUser(data.user);
                setCookie("Authorization", "JWT " + data.token, data.exp_time);
                setCookie("isUser", true);
                this.props.history.replace("/articles-review");
            }
            this.setState({
                isUserLoggingIn: false
            });
        }).then((error) => this._addNotification('Username or password is not valid', 'error'))
        .catch((error) => {  
            this.setState({
                isUserLoggingIn: false
            });
            
            console.log(error);
        })
    }

    render() {
        const { t } = this.props

        return (
            <div className="SignIn">
                <h1 className="content-heading">{t('signin.signIn')}</h1>
                <form onSubmit={this.loginUser}>
                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signin.username')}</span>
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
                        <span className="input-heading">{t('signin.password')}</span>
                        <div className="input-wrapper">
                            <input
                                className="input-field started"
                                type="password"
                                name="password"
                                ref={(input) => this.password = input}
                                required />
                        </div>
                    </div>

                    <input className="btn-submit" type="submit" value={t('signin.signinNow')} />
                </form>
                <NotificationSystem ref="notificationSystem" />
                {
                    this.state.isUserLoggingIn ? <Spinner /> : null
                }
            </div>
        )
    }
}

export default translate('translations')(withRouter(SignIn));


