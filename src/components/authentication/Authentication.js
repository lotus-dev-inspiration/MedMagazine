import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Authentication extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            if(!this.props.isLoggedIn) {
                this.props.history.replace("/login");
            }
        }, 1000);
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

    return {
        isLoggedIn
    };
};

export default withRouter(connect(mapStateToProps, null)(Authentication));