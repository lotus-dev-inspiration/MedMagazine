import React, {Component} from 'react';
import "./SignIn.css";

class SignIn extends Component {
    submitUser() {
        fetch("http://127.0.0.1:8000/users", {
            method: 'post',
            body: JSON.stringify({name: "ValiK"})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        })
            
    }
   render(){
       return(
           <div className="SignIn">
               <h1 className="content-heading">Sign In</h1>
               {/* <form> */}
               <div className="input-field-wrapper">
                      <span className="input-heading">Username</span>
                      <div className="input-wrapper">
                          <input className="input-field" type="text" name="firstName"  />
                      </div>
                  </div>

                   <div className="input-field-wrapper">
                      <span className="input-heading">Password</span>
                      <div className="input-wrapper">
                          <input className="input-field" type="password" name="firstName"  />
                      </div>
                  </div>
                 
                  <button className="btn-submit" onClick={this.submitUser.bind(this)}>Sign in</button>
                 
                  {/* <input type="submit" value="Sign up" />     */}
               {/* </form>  */}
           </div>
       )
   }
}

export default SignIn;