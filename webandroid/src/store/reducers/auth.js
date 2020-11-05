import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    isLoggedIn: false,
    isAuthChecked: false,
    authErr: null,
    img: null,
    username: null,
    userID: null
};

const checkAuth = (state, action) => {
    return updateObject(state, { isAuthChecked: true })
};

const checkAuthFail = (state, action) => {
    return updateObject(state, {authErr: action.err})
};

const checkUserImg = (state, action) => {
    return updateObject(state, {img: action.img})
};

const checkUserName = (state, action) => {
    return updateObject(state, {username: action.name})
};

const loggedIn = (state, action) => {
    return updateObject(state, {isAuthChecked: true, isLoggedIn: true, userID: action.userID})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHECK_AUTH:
            return checkAuth(state, action);
        case actionTypes.CHECK_AUTH_FAIL:
            return checkAuthFail(state, action);
        case actionTypes.CHECK_USERIMG:
            return checkUserImg(state, action);
        case actionTypes.CHECK_USERNAME:
            return checkUserName(state, action);
        case actionTypes.LOGGED_IN:
            return loggedIn(state, action);
        default: return state
    }
};

export default reducer;