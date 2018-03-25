import React, { Component } from 'react';
import "../signIn/SignIn";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
       e.preventDefault();
       let user = {
           profile: {
            patronymic: this.patronymic.value,
            company: this.company.value,
            phone: this.phone.value,
            articles: []
           },
           password: this.password.value,
           username: this.username.value,
           first_name: this.firstName.value,
           last_name: this.lastName.value,
           email: this.email.value,
           is_staff: false,
           is_active: true,
           groups: []
       }
       fetch("http://127.0.0.1:8000/users/", {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
          },
            method: 'post',
            body: JSON.stringify(user)
        }).then((response) => {
            return response;
        }).then((data) => {
            console.log(data);
        })
      
    }
    
    render() {
        return (
            <div className="SignIn">
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
                            ref={(input) => {this.lastName = input;}} 
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
                            <input 
                            className="input-field" 
                            type="text" 
                            name="userName"
                            ref={(input) => {this.username = input;}} 
                            required/>
                        </div>
                    </div>

                    <div className="input-field-wrapper">
                        <span className="input-heading">Email</span>
                        <div className="input-wrapper">
                            <input 
                            className="input-field" 
                            type="email" 
                            name="email"
                            ref={(input) => {this.email = input;}} 
                            required/>
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
                            <input 
                            className="input-field" 
                            type="password" 
                            name="password"
                            ref={(input) => {this.password = input;}} 
                            required/>
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