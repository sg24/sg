import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    conv: null
};

const fetchConv = (state, action) => {
    return updateObject(state, { conv: action.conv })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CONV:
            return fetchConv(state, action);
        default: return state
    }
};

export default reducer;