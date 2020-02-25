import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    shareActive: null
};

const fetchShareActive = (state, action) => {
    return updateObject(state, {shareActive: action.shareActive})
};

const resetActive = (state, action) => {
    let reset = action.curTab === 'post' ? { ptActive: null} : {shareActive: null };
    return updateObject(state,  {...reset} )
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SHARE_ACTIVE:
            return fetchShareActive(state, action);
        case actionTypes.RESET_ACTIVE:
            return resetActive(state, action);
        default: return state
    }
};

export default reducer;