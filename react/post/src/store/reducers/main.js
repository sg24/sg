import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    mainProps: null,
    showBackdrop: false,
    ptActive: null,
    shareActive: null
};

const fetchPtActive = (state, action) => {
    return updateObject(state, { ptActive: action.ptActive })
};

const fetchShareActive = (state, action) => {
    return updateObject(state, {shareActive: action.shareActive})
};

const resetActive = (state, action) => {
    let reset = action.curTab === 'post' ? { ptActive: null} : {shareActive: null };
    return updateObject(state,  {...reset} )
};

const showMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: true })
};

const hideMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: false })
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PT_ACTIVE:
            return fetchPtActive(state, action);
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