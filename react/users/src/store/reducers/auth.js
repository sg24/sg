import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    status: false
};

const checkAuth = (state, action) => {
    return updateObject(state, { status: action.status })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHECK_AUTH:
            return checkAuth(state, action);
        default: return state
    }
};

export default reducer;