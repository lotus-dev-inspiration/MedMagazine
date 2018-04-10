import { connect } from 'react-redux';
import { defineUser } from 'actions/index';
import {withRouter} from 'react-router-dom';
import Main from 'components/layout/main/Main';

const mapStateToProps = state => {
    
    const user = state.user;
    
    return {
        user
    }
};

const mapDispatchToProps = state => ({
    defineUser: defineUser(state)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main));

