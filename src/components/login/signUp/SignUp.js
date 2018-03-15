import React, { Component } from 'react';
import "./SignUp.css";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
       e.preventDefault();

    }
    render() {
        return (
            <div>
                <h1 className="content-heading">Sign Up</h1>
                <form onSubmit = {this.handleSubmit}>
                    <div className="input-field-wrapper">
                        <span className="input-heading">First Name</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="text" name="firstName" />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Last Name</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="text" name="firstName" />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Patronymic</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="text" name="firstName" />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Username</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="text" name="firstName" />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Email</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="text" name="firstName" />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Company</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="text" name="firstName" />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Password</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="password" name="firstName" />
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Repeat password</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="password" name="firstName" />
                        </div>
                    </div>

                    <button className="btn-submit">Sign up</button>

                </form>
            </div>
        )
    }
}

export default SignUp;