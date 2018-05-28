import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import {user} from 'reducers/users';
import {articles} from 'reducers/articles';
import {stages} from 'reducers/stages';

export default combineReducers({
    router: routerReducer,
    user,
    articles,
    stages
})