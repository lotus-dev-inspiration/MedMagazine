import {
    stagesActionTypes
} from 'actionTypes';

const initialState = {
    data: []
};

export const stages = (state = initialState, {type, payload}) => {
    if( type === stagesActionTypes.GET_STAGES) {
        return {
            data: payload
        }; 
    }
    return state;
}