import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    mainProps: null
};

const fetchMainActive = (state, action) => {
    return updateObject(state, { mainProps: action.mainProps })
};

const defaultMainActive = (state, action) => {
    return updateObject(state, { mainProps: action.mainProps })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_MAINACTIVE:
            return fetchMainActive(state, action);
        case actionTypes.DEFAULT_MAINACTIVE:
            return defaultMainActive(state, action);
        default: return state
    }
};

export default reducer;