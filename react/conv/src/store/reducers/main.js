import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    showBackdrop: false,
    privateActive: null,
    groupActive: null,
    navActive: null,
    reqActive: null
};

const fetchPrivateActive = (state, action) => {
    return updateObject(state, { privateActive: action.privateActive })
};

const fetchShareActive = (state, action) => {
    return updateObject(state, {shareActive: action.shareActive})
};

const fetchNavActive = (state, action) => {
    return updateObject(state, {navActive: action.active })
};

const fetchGroupActive = (state, action) => {
    return updateObject(state, {groupActive: action.groupActive})
};


const showMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: true })
};

const hideMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: false })
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PRIVATE_ACTIVE:
            return fetchPrivateActive(state, action);
        case actionTypes.FETCH_GROUP_ACTIVE:
            return fetchGroupActive(state, action);
        case actionTypes.FETCH_SHARE_ACTIVE:
            return fetchShareActive(state, action);
        case actionTypes.FETCH_NAV_ACTIVE:
            return fetchNavActive(state, action);
        case actionTypes.SHOW_MAIN_BACKDROP:
            return showMainBackdrop(state, action);
        case actionTypes.HIDE_MAIN_BACKDROP:
            return hideMainBackdrop(state, action);
        default: return state
    }
};

export default reducer;