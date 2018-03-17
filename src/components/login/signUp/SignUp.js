import React, { Component } from 'react';
import "./SignUp.css";

class SignUp extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     user: {
        //         profile: {
        //             patronymic: "",
        //             company: "",
        //             phone: ""
        //         },
        //         username: "",
        //         first_name: "",
        //         last_name: "",
        //         email: "",
        //         is_staff: false,
        //         is_active: false
        //     }
        // };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
       let user = {
           profile: {
              patronymic: this.patronymic.value,
              company: this.company.value,
              phone: this.phone.value
           },
           username: this.username.value,
           first_name: this.firstName.value,
           last_name: this.lastName.value,
           email: this.email.value,
           is_staff: false,
           is_active: false
       }
       console.log(user);
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
                            <input 
                            className="input-field" 
                            type="text" 
                            name="firstName"
                            ref={(input) => {this.firstName = input;}} 
                            required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Last Name</span>
                        <div className="input-wrapper">
                            <input 
                            className="input-field" 
                            type="text" 
                            name="lastName"
                             
                            required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper"> 
                        <span className="input-heading">Patronymic</span>
                        <div className="input-wrapper">
                            <input 
                            className="input-field" 
                            type="text" 
                            name="patronymic"
                            ref={(input) => {this.patronymic = input;}} 
                            required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Username</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="text" name="userNmae" required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Email</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="email" name="email" required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Company</span>
                        <div className="input-wrapper">
                            <input 
                            className="input-field" 
                            type="text" 
                            name="company"
                            ref={(input) => {this.company = input;}} 
                            required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Phone</span>
                        <div className="input-wrapper">
                            <input 
                            className="input-field"
                            type="text" 
                            name="phone"
                            ref={(input) => {this.phone = input;}} 
                            required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Password</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="password" name="password" required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Repeat password</span>
                        <div className="input-wrapper">
                            <input className="input-field" type="password" name="repeat-password" required/>
                        </div>
                    </div>

                    <input type="submit" className="btn-submit" value="Sign up"/>

                </form>
            </div>
        )
    }
}

export default SignUp;