import {combineReducers} from 'redux';
import sessionReducer from './session';
import pageReducer from './page';
import blogReducer from "./blog";

export default combineReducers({
    sessionState: sessionReducer,
    pageState: pageReducer,
    blogState: blogReducer
})