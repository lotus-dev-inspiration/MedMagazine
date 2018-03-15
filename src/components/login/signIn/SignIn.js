import React, {Component} from 'react';
import "./SignIn.css";

class SignIn extends Component {
   render(){
       return(
           <div>
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
                 
                  <button className="btn-submit">Sign in</button>
                 
                  {/* <input type="submit" value="Sign up" />     */}
               {/* </form>  */}
           </div>
       )
   }
}

export default SignIn;