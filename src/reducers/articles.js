import {
    articleActionTypes
} from 'actionTypes';

const initialState = {
    data: [],
    currentArticle: {},
    comments: []
};

export const articles = (state = initialState, {type, payload}) => {
    if( type === articleActionTypes.GET_ARTICLES) {
        return {
            ...state,
            data: payload
        }; 
    }
    if( type === articleActionTypes.GET_CURRENT_ARTICLE){
        return {
            ...state,
            currentArticle: payload
        }
    }
    if( type === articleActionTypes.GET_COMMENTS){
        return {
            ...state,
            comments: payload
        }
    }
    return state;
}