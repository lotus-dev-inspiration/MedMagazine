import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Authentication extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.isLoggedIn && this.props.isInitialState) {
            this.props.history.replace("/login");
        } 
    }

    render() {
        if(this.props.isLoggedIn) {
            return this.props.children;
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {

    const isLoggedIn = state.user.isLoggedIn;
    const isInitialState = state.user.isInitialState;

    return {
        isLoggedIn,
        isInitialState
    };
};

export default withRouter(connect(mapStateToProps, null)(Authentication));