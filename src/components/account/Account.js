import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
        const { t } = this.props

        return (
            <div className="Account">
                {this.props.userInfo !== null ?
                    <React.Fragment>
                        <h1 className="content-header">{t('account.account')}</h1>
                        <div className="content-wrapper">
                            <div className="left-block">
                                <div className="photo-wrapper">
                                    <img className="photo-user" src={photo} />
                                    <h3 className="name-user">{this.props.userInfo.first_name} {this.props.userInfo.last_name}</h3>
                                    <p className="username">{t('account.username')}: <em>{this.props.userInfo.username}</em></p>
                                    <p className="username">{t('account.email')}: <em>{this.props.userInfo.email}</em></p>
                                    <p className="username">{t('account.phone')}: <em>{this.props.userInfo.profile.phone}</em></p>

                                </div>
                            </div>
                            <div className="right-block">
                                <h4 className="profile-info-header">{t('account.profile')}</h4>
                                <div className="row">
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">{t('account.fname')}</span>
                                        <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="first_name"
                                                value={this.props.userInfo.first_name} />
                                        </div>
                                    </div>
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">{t('account.lname')}</span>
                                        <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="last_name"
                                                value={this.props.userInfo.last_name} />
                                        </div>
                                    </div>
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">{t('account.patronymic')}</span>
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
                                        <span className="input-heading">{t('account.username')}</span>
                                            <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="username"
                                                value={this.props.userInfo.username} />
                                            </div>
                                        </div>
                                        <div className="input-field-wrapper">
                                        <span className="input-heading">{t('account.email')}</span>
                                            <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="email"
                                                name="username"
                                                value={this.props.userInfo.email} />
                                        </div>
                                    </div>
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">{t('account.phone')}</span>
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
                                        <span className="input-heading">{t('account.company')}</span>
                                            <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="company"
                                                value={this.props.userInfo.profile.company} />
                                            </div>
                                        </div>
                                        <div className="input-field-wrapper">
                                        <span className="input-heading">{t('account.grade')}</span>
                                            <div className="input-wrapper">
                                            <input
                                                className="input-field started"
                                                type="text"
                                                name="grade"
                                                value={this.props.userInfo.profile.grade} />
                                        </div>
                                    </div>
                                    <div className="input-field-wrapper">
                                        <span className="input-heading">{t('account.position')}</span>
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

export default translate('translations')(withRouter(connect(mapStateToProps, null)(Account)));