import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    trends: null,
    show: false
};

const fetchTrds = (state, action) => {
    return updateObject(state, { trends: action.trd })
};

const showTrd = (state, action) => {
    return updateObject(state, { show: true })
};
const defaultTrd = (state, action) => {
    return updateObject(state, { show: false })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_TRD:
            return fetchTrds(state, action);
        case actionTypes.SHOW_TRD:
            return showTrd(state, action);
        case actionTypes.DEFAULT_TRD:
            return defaultTrd(state, action);
        default: return state
    }
};

export default reducer;