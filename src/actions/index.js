import {
    CREATE_NEW_USER
} from 'actionTypes';

export const createNewUser = user => ({
    type: CREATE_NEW_USER,
    payload: user
});