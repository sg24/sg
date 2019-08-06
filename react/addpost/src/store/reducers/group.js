import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    groups: null,
    filteredGrp: null
};

const fetchGroup = (state, action) => {
    return updateObject(state, {groups: action.groups})
};

const filterGrp = (state, action) => {
    return updateObject(state, {filteredGrp: action.filteredGrp})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GRP:
            return fetchGroup(state, action);
        case actionTypes.FILTER_GRP:
            return filterGrp(state, action);
        default: return state
    };
};

export default reducer;