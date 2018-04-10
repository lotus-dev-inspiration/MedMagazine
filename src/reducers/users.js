import {
    userActionTypes
} from 'actionTypes';

const initialState = {model: null, isLoggedIn: false};

export const user = (state = initialState, {type, payload}) => {
    if( type === userActionTypes.DEFINE_USER_SUCCESS || 
        type === userActionTypes.DEFINE_USER_FAILURE ||
        type === userActionTypes.LOGOUT_USER
    ) {
        return payload; 
    }
    return state;
}

