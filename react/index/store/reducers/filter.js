import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export const initialFilterState = {
    cntCateg: null,
    filterStart: false,
    totalFound: null,
    filterErr: null
}

const fetchCntCateg = (state, action) => {
    return updateObject(state, {cntCateg: action.categ})
};

const filterContentStart = (state, action) => {
    return updateObject(state, {filterStart: true, filterErr: null})
};

const filterContentFail = (state, action) => {
    return updateObject(state, {filterErr: action.err})
};

const filterContent = (state, action) => {
    return updateObject(state, {totalFound: action.totalFound})
};

const resetFilter  = (state, action) => {
    return updateObject(state, {totalFound: null, filterErr: null})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CNTCATEG:
            return fetchCntCateg(state, action);
        case actionTypes.FILTER_CONTENT_START:
            return filterContentStart(state, action);
        case actionTypes.FILTER_CONTENT_FAIL:
            return filterContentFail(state, action);
        case actionTypes.FILTER_CONTENT:
            return filterContent(state, action);
        case actionTypes.RESET_FILTER:
            return resetFilter(state, action);
        default: return state
    }
};

export default reducer