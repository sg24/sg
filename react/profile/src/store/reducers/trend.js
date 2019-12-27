import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    trends: null
};

const fetchTrds = (state, action) => {
    return updateObject(state, { trends: action.trd })
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_TRD:
            return fetchTrds(state, action);
        default: return state
    }
};

export default reducer;