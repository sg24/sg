import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ptCateg: null
}

const fetchPostCateg = (state, action) => {
    return updateObject(state, {ptCateg: action.categ})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PTCATEG:
            return fetchPostCateg(state, action);
        default: return state
    }
};

export default reducer