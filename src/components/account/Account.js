import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Account.css';
import photo from '../../assets/img/account/user.png';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {}
        }
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            ...this.state,
            currentUser: { ...nextprops.userInfo }
        })
    }

    render() {
        console.log(this.props);
        return (
            <div className="Account">
                {this.props.userInfo !== null ?
                    <React.Fragment>
                        <h1 className="content-header">Account</h1>
                        <div className="content-wrapper">
                            <div className="left-block">
                                <div className="photo-wrapper">
                                    <img className="photo-user" src={photo} />
                                    <h3 className="name-user">{this.props.userInfo.first_name} {this.props.userInfo.last_name}</h3>
                                    <p className="username">Username: <em>{this.props.userInfo.username}</em></p>
                                    <p className="username">Email: <em>{this.props.userInfo.email}</em></p>
                                    <p className="username">Phone: <em>{this.props.userInfo.profile.phone}</em></p>

                                </div>
                            </div>
                            <div className="right-block">
                                <h4 className="profile-info-header">Profile Info</h4>
                                <div className="row">
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">First name</span>
                                        <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="first_name"
                                                value={this.props.userInfo.first_name} />
                                        </div>
                                    </div>
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">Last name</span>
                                        <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="last_name"
                                                value={this.props.userInfo.last_name} />
                                        </div>
                                    </div>
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">Patronymic</span>
                                        <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="patronymic"
                                                value={this.props.userInfo.profile.patronymic} />
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field-wrapper">
                                            <span className="input-heading">Username</span>
                                            <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="username"
                                                value={this.props.userInfo.username} />
                                            </div>
                                        </div>
                                        <div className="input-field-wrapper">
                                            <span className="input-heading">Email</span>
                                            <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="email"
                                                name="username"
                                                value={this.props.userInfo.email} />
                                        </div>
                                    </div>
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">Phone</span>
                                        <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="username"
                                                value={this.props.userInfo.profile.phone} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                        <div className="input-field-wrapper">
                                            <span className="input-heading">Company</span>
                                            <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="company"
                                                value={this.props.userInfo.profile.company} />
                                            </div>
                                        </div>
                                        <div className="input-field-wrapper">
                                            <span className="input-heading">Grade</span>
                                            <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="grade"
                                                value={this.props.userInfo.profile.grade} />
                                        </div>
                                    </div>
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">Position</span>
                                        <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="position"
                                                value={this.props.userInfo.profile.position} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    : null}
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