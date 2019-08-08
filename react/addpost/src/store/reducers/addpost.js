import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ptCateg: null,
    newPtCateg: null
};

const fetchPtCateg = (state, action) => {
    return updateObject(state, {ptCateg: action.ptCateg})
};

const addPtCateg = (state, action) => {
    return updateObject(state, {newPtCateg: action.ptCateg})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PT_CATEG:
            return fetchPtCateg(state, action);
        case actionTypes.ADD_PT_CATEG:
            return addPtCateg(state, action);
        default: return state
    };
};

export default reducer;