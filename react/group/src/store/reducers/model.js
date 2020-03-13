import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null,
    skipCnt: null,
    showLoader: false,
    joined: [],
    joinStartID: [],
    changedFav: [],
    favChange: null,
    postVideo: {id: null},
    videoErr: null,
    filterDet: null,
}

const fetchCnt = (state, action) => {
    let cnts = !state.cnts ? action.cnt : state.cnts.concat(...action.cnt);
    return updateObject(state, {cnts, skipCnt: action.skipCnt, cntTotal: action.cntTotal, showLoader: false})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, skipCnt: null, cntTotal: null, showLoader: false})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, showLoader: false})
};

const joinGrpStart = (state, action) => {
    let joinStartID = [...state.joinStartID]
    joinStartID.push(action.id);
    return updateObject(state, {joinStartID})
};

const joinGrpFail = (state, action) => {
    let joinStartID = state.joinStartID.filter(id => id !== action.id);
    return updateObject(state, {joinErr: true, joinStartID})
};

const joinGrp = (state, action) => {
    let joined = [...state.joined];
    if (action.categ === 'join') {
        let joinStartID = state.joinStartID.filter(id => id !== action.id);
        joined.push(action.id)
        return updateObject(state, {joined, joinStartID})
    }
    if (action.categ === 'cancel') {
        let joinStartID = state.joinStartID.filter(id => id !== action.id);
        let removeGroup = joined.filter(id => id !== action.id)
        let grp = state.cnts.filter(grpdet => grpdet._id === action.id);
        let updateGrp = [...state.cnts]
        if (grp && grp.length > 0) {
            grp[0].request = false;
            let updateGrp = state.cnts.filter(grpdet => grpdet._id !== action.id);
            updateGrp.push(grp[0]);
        }
        return updateObject(state, {cnts: updateGrp, joined: removeGroup, joinStartID})
    }
};

const fetchVideo = (state, action) => {
    return updateObject(state, {postVideo: {id: action.id, url: action.url}})
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

const filterPost = (state, action) => {
    return updateObject(state, {filterDet: action.filterDet})
};

const resetModel = (state, action) => {
    return updateObject(state, {cntErr: null,changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const removeRequest = (state, action) => {
    let group = [...state.cnts];
    let indexPos = 0;
    let updateGrp = group.filter((grp, index) => {
        if (grp._id === action.id) {
            indexPos = index;
            return true
        }
        return false
    });
    if (updateGrp.length > 0) {
        updateGrp[0].requestTotal = updateGrp[0].requestTotal - 1;
    }
    group[indexPos] = updateGrp[0]
    return updateObject(state, {cnts: group, cntErr: null,changeCntStart: null, changeCntErr: null, changeCnt: false})
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
        case actionTypes.JOIN_GRP_START:
            return joinGrpStart(state, action);
        case actionTypes.JOIN_GRP_FAIL:
            return joinGrpFail(state, action);
        case actionTypes.JOIN_GRP:
            return joinGrp(state, action);
        case actionTypes.FETCH_VIDEO:
            return fetchVideo(state, action);
        case actionTypes.CHANGE_FAVORITE:
            return changeFav(state, action);
        case actionTypes.CHANGE_FAVORITE_PT_START:
            return changeFavPtStart(state, action);
        case actionTypes.CHANGE_FAVORITE_PT_FAIL:
            return changeFavPtFail(state, action);
        case actionTypes.FILTER_POST:
            return filterPost(state, action);
        case actionTypes.RESET_MODEL:
            return resetModel(state, action);
        case actionTypes.REMOVE_REQUEST:
            return removeRequest(state, action);
        default: return state
    }
};

export default reducer