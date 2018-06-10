import {
    userActionTypes,
    articleActionTypes,
    stagesActionTypes
} from 'actionTypes';

export const defineUser = dispatch => user => {

    if(user) {
        dispatch({
            type: userActionTypes.DEFINE_USER_SUCCESS,
            payload: {
                model: user,
                isLoggedIn: true,
                isInitialState: false
            }
        })
    } else {
        dispatch({
            type: userActionTypes.DEFINE_USER_FAILURE,
            payload: {
                model: null,
                isLoggedIn: false,
                isInitialState: false
            }
        })
    }
};

export const logoutUser = dispatch => state => {
    dispatch({ 
        type: userActionTypes.LOGOUT_USER,
        payload: {
            model: state,
            isLoggedIn: false,
            isInitialState: true
        }
    })
};

export const getReviewArticles = dispatch => state => {
    dispatch({
        type: articleActionTypes.GET_ARTICLES,
        payload: state
    })
}

export const getStages = dispatch => state => {
    dispatch({
        type: stagesActionTypes.GET_STAGES,
        payload: state
    })
}

export const getCurrentArticle = dispatch => state => {
    dispatch({
        type: articleActionTypes.GET_CURRENT_ARTICLE,
        payload: state
    })
}

export const getComments = dispatch => state => {
    dispatch({
        type: articleActionTypes.GET_COMMENTS,
        payload: state
    })
}
