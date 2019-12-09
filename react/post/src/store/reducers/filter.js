import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ptCateg: null,
    filterStart: false,
    totalFound: null,
    filterErr: null,
    cnt: 0
}

const fetchPostCateg = (state, action) => {
    return updateObject(state, {ptCateg: action.categ})
};

const fetchTotal = (state, action) => {
    return updateObject(state, {cnt: action.total})
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
        case actionTypes.FETCH_PTCATEG:
            return fetchPostCateg(state, action);
        case actionTypes.FETCH_TOTAL:
            return fetchTotal(state, action);
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