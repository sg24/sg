import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    showBackdrop: false,
    shareActive: null
};

const fetchShareActive = (state, action) => {
    return updateObject(state, {shareActive: action.shareActive})
};

const resetActive = (state, action) => {
    return updateObject(state,  {...state} )
};

const showMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: true })
};

const hideMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: false })
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SHARE_ACTIVE:
            return fetchShareActive(state, action);
        case actionTypes.RESET_ACTIVE:
            return resetActive(state, action);
        case actionTypes.SHOW_MAIN_BACKDROP:
            return showMainBackdrop(state, action);
        case actionTypes.HIDE_MAIN_BACKDROP:
            return hideMainBackdrop(state, action);
        default: return state
    }
};

export default reducer;