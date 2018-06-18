import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';


import "../signIn/SignIn";
import Spinner from 'components/spinner/Spinner';
import { createUser, userAuthenticate, getUsers } from 'services/user-service';
import { setCookie } from 'services/cookie-service';
import { userNameValidation, fieldLengthValidation, emailValidation } from 'services/validation-service';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                profile: {
                    patronymic: '',
                    company: '',
                    position: '',
                    grade: '',
                    phone: 0,
                    articles: []
                },
                password: '',
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                is_staff: false,
                is_active: true,
                groups: []
            },
            userFieldsValid: {
                patronymic: null,
                company: null,
                position: null,
                grade: null,
                phone: null,
                password: null,
                username: null,
                first_name: null,
                last_name: null,
                email: null
            },
            userNames: [],
            userEmails: [],
            isVerified: null,
            isUserCreating: false
        }

        this.submitUser = this.submitUser.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangePatronymic = this.handleChangePatronymic.bind(this);
        this.handleChangeCompany = this.handleChangeCompany.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.comparePassword = this.comparePassword.bind(this);
        this.handleChangeUserStatus = this.handleChangeUserStatus.bind(this);
    }

    componentDidMount() {
        getUsers().then(response => {
            return response.json();
        }).then(data => {
        })
    }

    submitUser(e) {
        e.preventDefault();

        this.comparePassword(this.state.user.password, this.repeatPassword.value);
        if (this.state.user.password === this.repeatPassword.value) {

            let valid = true;
            for (let key in this.state.userFieldsValid) {
                if (this.state.userFieldsValid[key] === true) {
                    valid = true;
                } else {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                const user = this.state.user;
                createUser(user).then((response) => {
                    return response.json();
                }).then(() => {
                    const creds = {
                        username: user.username,
                        password: user.password
                    }
                    userAuthenticate(creds).then((response) => {
                        return response.json();
                    }).then((data) => {
                        this.props.onDefineUser(data.user);
                        setCookie("Authorization", "JWT " + data.token, data.exp_time);
                        setCookie("isUser", true);
                        this.setState({
                            isUserCreationg: false
                        });
                        this.props.history.replace("/article-creation");
                    }).catch((error) => {
                        this.setState({
                            isUserCreationg: false
                        });
                        console.log(error);
                    })
                })
            }
        }
    }

    handleChangeUsername = (event) => {
        if (fieldLengthValidation(event.target.value)) {
            if (userNameValidation(event.target.value)) {
                if (!this.state.userNames.includes(event.target.value)) {
                    this.setState({
                        ...this.state,
                        user: { ...this.state.user, username: event.target.value },
                        userFieldsValid: { ...this.state.userFieldsValid, username: true }
                    });
                } else {
                    this.setState({
                        ...this.state,
                        user: { ...this.state.user, username: event.target.value },
                        userFieldsValid: { ...this.state.userFieldsValid, username: false }
                    });
                }
            } else {
                this.setState({
                    ...this.state,
                    user: { ...this.state.user, username: event.target.value },
                    userFieldsValid: { ...this.state.userFieldsValid, username: false }
                });
            }
        } else {
            this.setState({
                ...this.state,
                user: { ...this.state.user, username: event.target.value },
                userFieldsValid: { ...this.state.userFieldsValid, username: false }
            });
        }
    }

    handleChangeName = (event) => {
        if (fieldLengthValidation(event.target.value)) {
            this.setState({
                ...this.state,
                user: { ...this.state.user, first_name: event.target.value },
                userFieldsValid: { ...this.state.userFieldsValid, first_name: true }
            });
        } else {
            this.setState({
                ...this.state,
                user: { ...this.state.user, first_name: event.target.value },
                userFieldsValid: { ...this.state.userFieldsValid, first_name: false }
            });
        }
    }

    handleChangeSurname = (event) => {
        if (fieldLengthValidation(event.target.value)) {
            this.setState({
                ...this.state,
                user: { ...this.state.user, last_name: event.target.value },
                userFieldsValid: { ...this.state.userFieldsValid, last_name: true }
            });
        } else {
            this.setState({
                ...this.state,
                user: { ...this.state.user, last_name: event.target.value },
                userFieldsValid: { ...this.state.userFieldsValid, last_name: false }
            });
        }
    }

    handleChangePatronymic = (event) => {
        if (fieldLengthValidation(event.target.value)) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        patronymic: event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, patronymic: true }
            });
        } else {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        patronymic: event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, patronymic: false }
            });
        }
    }

    handleChangeCompany = (event) => {
        if (fieldLengthValidation(event.target.value)) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        company: event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, company: true }
            });
        } else {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        company: event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, company: false }
            });
        }
    }

    handleChangePosition = (event) => {
        if (fieldLengthValidation(event.target.value)) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        position: event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, position: true }
            });
        } else {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        position: event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, position: false }
            });
        }
    }

    handleChangeGrade = (event) => {
        if (fieldLengthValidation(event.target.value)) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        grade: event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, grade: true }
            });
        } else {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        grade: event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, grade: false }
            });
        }
    }

    handleChangeEmail = (event) => {
        if (emailValidation(event.target.value)) {
            if (!this.state.userEmails.includes(event.target.value)) {
                this.setState({
                    ...this.state,
                    user: { ...this.state.user, email: event.target.value },
                    userFieldsValid: { ...this.state.userFieldsValid, email: true }
                });
            } else {
                this.setState({
                    ...this.state,
                    user: { ...this.state.user, email: event.target.value },
                    userFieldsValid: { ...this.state.userFieldsValid, email: false }
                });
            }
        } else {
            this.setState({
                ...this.state,
                user: { ...this.state.user, email: event.target.value },
                userFieldsValid: { ...this.state.userFieldsValid, email: false }
            });
        }
    }

    handleChangePhone = (event) => {
        if (/[^[0-9]/.test(event.target.value)) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        phone: +event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, phone: false }
            });
        } else {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user, profile: {
                        ...this.state.user.profile,
                        phone: +event.target.value
                    }
                },
                userFieldsValid: { ...this.state.userFieldsValid, phone: true }
            });
        }
    }

    handleChangePassword = (event) => {
        if (fieldLengthValidation(event.target.value)) {
            this.setState({
                ...this.state,
                user: { ...this.state.user, password: event.target.value },
                userFieldsValid: { ...this.state.userFieldsValid, password: true }
            });
        } else {
            this.setState({
                ...this.state,
                user: { ...this.state.user, password: event.target.value },
                userFieldsValid: { ...this.state.userFieldsValid, password: false }
            });
        }
    }

    comparePassword = (newPass, repeat) => {
        if (newPass === repeat) {
            this.setState({ ...this.state, isVerified: true });
        } else {
            this.setState({ ...this.state, isVerified: false });
        }
    }

    handleChangeUserStatus = (event) => {
        this.setState({
            ...this.state,
            user: { ...this.state.user, groups: [+event.target.value] }
        })
    }

    render() {
        const { t } = this.props

        return (
            <div className="SignIn">
                <h1 className="content-heading">{t('signup.signUp')}</h1>
                <form onSubmit={this.submitUser}>
                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.fname')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.first_name === null ?
                                    'input-field started' : this.state.userFieldsValid.first_name === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="text"
                                name="firstName"
                                onChange={this.handleChangeName}
                                required />
                        </div>
                        {this.state.userFieldsValid.first_name === false ?
                            <span className="hint-error">{t('signup.fieldMust')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.lname')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.last_name === null ?
                                    'input-field started' : this.state.userFieldsValid.last_name === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="text"
                                name="lastName"
                                onChange={this.handleChangeSurname}
                                required />
                        </div>
                        {this.state.userFieldsValid.last_name === false ?
                            <span className="hint-error">{t('signup.fieldMust')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.patronymic')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.patronymic === null ?
                                    'input-field started' : this.state.userFieldsValid.patronymic === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="text"
                                name="patronymic"
                                onChange={this.handleChangePatronymic}
                                required />
                        </div>
                        {this.state.userFieldsValid.patronymic === false ?
                            <span className="hint-error">{t('signup.fieldMust')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.username')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.username === null ?
                                    'input-field started' : this.state.userFieldsValid.username === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="text"
                                name="username"
                                onChange={this.handleChangeUsername}
                                required />
                        </div>
                        {this.state.userFieldsValid.username === false ?
                            <span className="hint-error">{t('signup.usernameExists')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.email')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.email === null ?
                                    'input-field started' : this.state.userFieldsValid.email === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="email"
                                name="email"
                                onChange={this.handleChangeEmail}
                                required />
                        </div>
                        {this.state.userFieldsValid.email === false ?
                            <span className="hint-error">{t('signup.emailWrong')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.company')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.company === null ?
                                    'input-field started' : this.state.userFieldsValid.company === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="text"
                                name="company"
                                onChange={this.handleChangeCompany}
                                required />
                        </div>
                        {this.state.userFieldsValid.company === false ?
                            <span className="hint-error">{t('signup.fieldMust')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.position')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.position === null ?
                                    'input-field started' : this.state.userFieldsValid.position === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="text"
                                name="position"
                                onChange={this.handleChangePosition}
                                required />
                        </div>
                        {this.state.userFieldsValid.position === false ?
                            <span className="hint-error">{t('signup.fieldMust')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.grade')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.grade === null ?
                                    'input-field started' : this.state.userFieldsValid.grade === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="text"
                                name="grade"
                                onChange={this.handleChangeGrade}
                                required />
                        </div>
                        {this.state.userFieldsValid.grade === false ?
                            <span className="hint-error">{t('signup.fieldMust')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.phoneExample')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.phone === null ?
                                    'input-field started' : this.state.userFieldsValid.phone === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="tel"
                                name="phone"
                                onChange={this.handleChangePhone}
                                required />
                        </div>
                        {this.state.userFieldsValid.phone === false ?
                            <span className="hint-error">{t('signup.expectedNumber')}</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.password')}</span>
                        <div className="input-wrapper">
                            <input
                                className={this.state.userFieldsValid.password === null ?
                                    'input-field started' : this.state.userFieldsValid.password === false ?
                                        'input-field invalid' : 'input-field valid'}
                                type="password"
                                name="password"
                                onChange={this.handleChangePassword}
                                required />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">{t('signup.passwordRepeat')}</span>
                        <div className="input-wrapper">
                            <input
                                className="input-field started"
                                type="password"
                                name="repeat-password"
                                ref={(input) => this.repeatPassword = input}
                                required />
                        </div>
                        {this.state.isVerified === false ?
                            <span className="hint-error">{t('signup.passwordNotVerified')}</span> : null
                        }
                    </div>

                    <input type="submit" className="btn-submit" value={t('signup.signupNow')} />

                </form>
                {
                    this.state.isUserCreating ? <Spinner /> : null
                }
            </div>
        )
    }
}

export default translate('translations')(withRouter(SignUp));