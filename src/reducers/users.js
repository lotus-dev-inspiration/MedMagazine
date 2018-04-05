import {
    userActionTypes
} from 'actionTypes';

export const user = (state = {}, {type, payload}) => {
    if( type === userActionTypes.DEFINE_USER_SUCCESS || 
        type === userActionTypes.DEFINE_USER_FAILURE ||
        type === userActionTypes.LOGOUT_USER
    ) {
        return payload; 
    }
    return state;
}

