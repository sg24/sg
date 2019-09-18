import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    mainProps: null,
    showBackdrop: false
};

const fetchMainActive = (state, action) => {
    return updateObject(state, { mainProps: action.mainProps })
};

const defaultMainActive = (state, action) => {
    return updateObject(state, { mainProps: action.mainProps })
};

const showMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: true })
};

const hideMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: false })
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_MAINACTIVE:
            return fetchMainActive(state, action);
        case actionTypes.DEFAULT_MAINACTIVE:
            return defaultMainActive(state, action);
        case actionTypes.SHOW_MAIN_BACKDROP:
            return showMainBackdrop(state, action);
        case actionTypes.HIDE_MAIN_BACKDROP:
            return hideMainBackdrop(state, action);
        default: return state
    }
};

export default reducer;