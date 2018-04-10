import {
    userActionTypes
} from 'actionTypes';

export const defineUser = dispatch => user => {
    dispatch({ type: userActionTypes.DEFINE_USER_REQUEST})

    if(user) {
        dispatch({
            type: userActionTypes.DEFINE_USER_SUCCESS,
            payload: {
                model: user,
                isLoggedIn: true
            }
        })
    } else {
        dispatch({
            type: userActionTypes.DEFINE_USER_FAILURE,
            payload: {
                model: null,
                isLoggedIn: false
            }
        })
    }
};

export const logoutUser = dispatch => state => {
    dispatch({ 
        type: userActionTypes.LOGOUT_USER,
        payload: {
            model: state,
            isLoggedIn: false
        }
    })
};