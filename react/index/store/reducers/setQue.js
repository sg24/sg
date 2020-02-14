import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export const initialSetqueState = {
    categ: null
};

const fetchCateg = (state, action) => {
    return updateObject(state, { categ: action.categ })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CATEG:
            return fetchCateg(state, action);
        default: return state
    }
};

export default reducer;