import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export const initialAuthState = {
    status: false,
    img: null,
    username: null
};

const checkAuth = (state, action) => {
    return updateObject(state, { status: action.status })
};

const checkUserImg = (state, action) => {
    return updateObject(state, {img: action.img})
};

const checkUserName = (state, action) => {
    return updateObject(state, {username: action.name})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHECK_AUTH:
            return checkAuth(state, action);
        case actionTypes.CHECK_USERIMG:
            return checkUserImg(state, action);
        case actionTypes.CHECK_USERNAME:
            return checkUserName(state, action);
        default: return state
    }
};

export default reducer;