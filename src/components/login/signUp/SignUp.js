import React, { Component } from 'react';
import { Redirect } from "react-router";
import { withRouter } from 'react-router-dom';

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
                groups: [2]
            },
            userFieldsValid: {
                patronymic: null,
                company: null,
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
            this.setState({
                ...this.state,
                userNames: data.results.map(el => el.username),
                userEmails: data.results.map(el => el.email)
            })
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
                        this.props.history.replace("/articles");
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
        return (
            <div className="SignIn">
                <h1 className="content-heading">Sign Up</h1>
                <form onSubmit={this.submitUser}>
                    <div className="input-field-wrapper">
                        <span className="input-heading">First Name</span>
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
                            <span className="hint-error">The field must be at least 3 characters long</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Last Name</span>
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
                            <span className="hint-error">The field must be at least 3 characters long</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Patronymic</span>
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
                            <span className="hint-error">The field must be at least 3 characters long</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Username</span>
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
                            <span className="hint-error">This username already exists or you use forbidden symbol @</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Email</span>
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
                            <span className="hint-error">Wrong email or already exists</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Company</span>
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
                            <span className="hint-error">The field must be at least 3 characters long</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Phone (example: 0950562394)</span>
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
                            <span className="hint-error">Expected number</span> : null
                        }
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Password</span>
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
                        <span className="input-heading">Repeat password</span>
                        <div className="input-wrapper">
                            <input
                                className="input-field started"
                                type="password"
                                name="repeat-password"
                                ref={(input) => this.repeatPassword = input}
                                required />
                        </div>
                        {this.state.isVerified === false ?
                            <span className="hint-error">Password not verified</span> : null
                        }
                    </div>

                    <div>
                        <select value={this.state.user.groups[0]} onChange={this.handleChangeUserStatus}>
                            <option value="2">Author</option>
                            <option value="1">Reviewer</option>
                        </select>
                    </div>

                    <input type="submit" className="btn-submit" value="Sign up" />

                </form>
                {
                    this.state.isUserCreating ? <Spinner /> : null
                }
            </div>
        )
    }
}

export default withRouter(SignUp);