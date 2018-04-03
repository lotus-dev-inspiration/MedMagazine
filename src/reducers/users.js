import {
    CREATE_NEW_USER,
    GET_USERS,
    LOGIN_USER
} from 'actionTypes';

export const user = (state = {}, action) => {
    if(action.type === CREATE_NEW_USER) {
        return action.type; 
    }
    return state;
}

