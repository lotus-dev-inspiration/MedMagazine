import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Account.css';
import photo from '../../assets/img/account/user.png';

class Account extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: {}
        }
    }

    componentWillReceiveProps(nextprops){
        this.setState({
            ...this.state,
            currentUser: {...nextprops.userInfo}
        })
    }

    render(){
        console.log(this.state.currentUser);
        return (
            <div className="Account">
                <h1 className="content-header">Account</h1>
                <div className="content-wrapper">
                    <div className="left-block">
                        <div className="photo-wrapper">
                            <img className="photo-user" src={photo} />
                            <h3 className="name-user">{this.state.currentUser.first_name} {this.state.currentUser.last_name}</h3>
                            <p className="username">Username: <em>{this.state.currentUser.username}</em></p>
                            <p className="username">Email: <em>{this.state.currentUser.email}</em></p>
                            {/* <p className="username">Phone: <em>{this.state.currentUser.profile.phone}</em></p> */}

                        </div>
                    </div>
                    <div className="right-block">
                    <h4 className="profile-info-header">Profile Info</h4>
                    <div className="row">
                      <div className="input-field-wrapper">
                        <span className="input-heading">Username</span>
                        <div className="input-wrapper">
                            <input
                                className="input-field started"
                                type="text"
                                name="username"
                                value={this.state.currentUser.username} />
                        </div>
                       </div>
                       <div className="input-field-wrapper">
                        <span className="input-heading">Email</span>
                        <div className="input-wrapper">
                            <input
                                className="input-field started"
                                type="text"
                                name="username"
                                value={this.state.currentUser.email} />
                        </div>
                       </div>
                       <div className="input-field-wrapper">
                        <span className="input-heading">Email</span>
                        <div className="input-wrapper">
                            <input
                                className="input-field started"
                                type="text"
                                name="username"
                                value={this.state.currentUser.email} />
                        </div>
                       </div>
                    </div>  
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    
    return {
        userInfo: state.user.model
    };
};

export default withRouter(connect(mapStateToProps, null)(Account));