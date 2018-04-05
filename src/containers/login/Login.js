import { connect } from 'react-redux';
import { defineUser } from 'actions/index';
import Login from 'components/login/Login';


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = state => ({
    defineUser: defineUser(state)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

