import { connect } from 'react-redux';
import { createNewUser } from 'actions/index';
import Login from 'components/login/Login';


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => ({
    createNewUser: user => dispatch(createNewUser(user))
})
 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

