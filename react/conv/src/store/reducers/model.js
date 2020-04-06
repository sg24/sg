import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null,
    skipCnt: null,
    showLoader: false,
    changedFav: [],
    filterCnt: null,
    favChange: null,
    filterDet: null,
    startSearch: false
}

const fetchCnt = (state, action) => {
    let cnts = !state.cnts ? action.cnt : state.cnts.concat(...action.cnt);
    return updateObject(state, {cnts, skipCnt: action.skipCnt, cntTotal: action.cntTotal, showLoader: false})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, skipCnt: null, cntTotal: null, showLoader: false, filterCnt: null})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, showLoader: false})
};

const changeFavPtStart = (state, action) => {
    return updateObject(state, {favChange: {id:action.id, isLiked: action.isLiked}})
};

const changeFavPtFail = (state, action) => {
    return updateObject(state, {favChange: null, cntErr: null })
};

const changeFav = (state, action) => {
    return updateObject(state, {changedFav: action.changedFav, favChange: null})
};

const filterCnt = (state, action) => {
    let cnts = state.cnts;
    let filterCnt = []
    if (cnts) {
        filterCnt =  action.curTab === 'private' ? cnts.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1)
            : cnts.filter(grp => grp.title.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
    }
    return updateObject(state, {filterCnt})
};

const startSearch = (state, action) => {
    return updateObject(state, {startSearch: true})
};

const closeSearch = (state, action) => {
    return updateObject(state, {startSearch: false, filterCnt: null})
};

const resetModel = (state, action) => {
    return updateObject(state, { filterCnt: null, cntErr: null,changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        case actionTypes.FETCH_CNT_START:
            return fetchCntStart(state, action);
        case actionTypes.FETCH_CNT_RESET:
            return fetchCntReset(state, action);
        case actionTypes.FETCH_CNT_FAIL:
            return fetchPostFail(state, action);
        case actionTypes.CHANGE_FAVORITE:
            return changeFav(state, action);
        case actionTypes.CHANGE_FAVORITE_PT_START:
            return changeFavPtStart(state, action);
        case actionTypes.CHANGE_FAVORITE_PT_FAIL:
            return changeFavPtFail(state, action);
        case actionTypes.FILTER_CNT:
            return filterCnt(state, action);
        case actionTypes.RESET_MODEL:
            return resetModel(state, action);
        case actionTypes.START_SEARCH:
            return startSearch(state, action);
        case actionTypes.CLOSE_SEARCH:
            return closeSearch(state, action);
        default: return state
    }
};

export default reducer