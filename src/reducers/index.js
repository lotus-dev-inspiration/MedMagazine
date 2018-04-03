import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import {user} from 'reducers/users';

export default combineReducers({
    router: routerReducer,
    user
})