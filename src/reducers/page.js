import {HIDE_SIGN_IN_DIALOGUE, SHOW_SIGN_IN_DIALOGUE, SHOW_LOADING, HIDE_LOADING, CHANGE_QUERY} from "../actions/page";

const INITIAL_STATE = {
    showSignInDialogue: false,
    searchQuery: ''
};

export default function pageReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_SIGN_IN_DIALOGUE:
            return {
                ...state,
                showSignInDialogue: true
            };
        case HIDE_SIGN_IN_DIALOGUE:
            return {
                ...state,
                showSignInDialogue: false
            };
        case SHOW_LOADING:
            return {
                ...state,
                showLoading: true
            };
        case HIDE_LOADING:
            return {
                ...state,
                showLoading: false
            };
        case CHANGE_QUERY:
            return {
                ...state,
                searchQuery: action.searchValue
            }
        default: return state
    }
}
