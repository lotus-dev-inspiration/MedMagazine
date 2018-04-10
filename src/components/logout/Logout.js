import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from 'actions/index';
import { deleteCookie } from 'services/cookie-service';

class Logout extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        deleteCookie("Authorization");
        this.props.logoutUser(null);
        this.props.history.replace("/login");
    }

    render() {
        return null;
    }
    
}

const mapDispatchToProps = state => ({
    logoutUser: logoutUser(state)
});

export default withRouter(connect(
    null,
    mapDispatchToProps
)(Logout));