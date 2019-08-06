import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ptCateg: null
};

const fetchPtCateg = (state, action) => {
    return updateObject(state, {ptCateg: action.ptCateg})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PT_CATEG:
            return fetchPtCateg(state, action);
        default: return state
    };
};

export default reducer;