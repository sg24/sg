import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null,
    skipCnt: null,
    cntTotal: null,
    changedFav: [],
    favChange: null,
    postVideo: {id: null},
    videoErr: null,
    filterDet: null,
    changeCnt: false,
    changeCntErr: null,
    changeCntStart: null
}

const fetchCnt = (state, action) => {
    let cnts = !state.cnts ? action.cnt : state.cnts.concat(...action.cnt);
    return updateObject(state, {cnts, skipCnt: action.skipCnt, cntTotal: action.cntTotal})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, skipCnt: null, cntTotal: null})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {cntErr: action.err})
};

const changeCntStart = (state, action) => {
    return updateObject(state, {changeCntStart: {title: action.title, id: action.id, det: action.det}, changeCntErr: null})
};

const changeCntCancel = (state, action) => {
    return updateObject(state, {changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntReset = (state, action) => {
    let cnts = [...state.cnts];
    let updateCnt = cnts.filter(cnt => cnt._id !== state.changeCntStart.id);
    return updateObject(state, {cnts: updateCnt, changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntFail = (state, action) => {
    return updateObject(state, {changeCntErr: action.err})
};

const changeCnt = (state, action) => {
    return updateObject(state, {changeCnt: true})
};

const fetchVideoStart = (state, action) => {
    if (state.postVideo.url) {
        window.URL.revokeObjectURL(state.postVideo.url);
    }
    return updateObject(state, {postVideo: {id: action.ptVideoID}, videoErr: null})
};

const fetchVideoFail = (state, action) => {
    return updateObject(state, {videoErr: {id: state.postVideo.id, err: action.err}})
};

const fetchVideo = (state, action) => {
    return updateObject(state, {postVideo: {id: state.postVideo.id, url: action.url}})
};

const changeFavPtStart = (state, action) => {
    return updateObject(state, {favChange: {id:action.id, isLiked: action.isLiked}})
};

const changeFavPtFail = (state, action) => {
    return updateObject(state, {favChange: null })
};

const changeFav = (state, action) => {
    return updateObject(state, {changedFav: action.changedFav, favChange: null})
};

const filterPost = (state, action) => {
    return updateObject(state, {filterDet: action.filterDet})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        case actionTypes.FETCH_CNT_RESET:
            return fetchCntReset(state, action);
        case actionTypes.FETCH_CNT_FAIL:
            return fetchPostFail(state, action);
        case actionTypes.CHANGE_CNT_START:
            return changeCntStart(state, action);
        case actionTypes.CHANGE_CNT_CANCEL:
            return changeCntCancel(state, action);
        case actionTypes.CHANGE_CNT_RESET:
            return changeCntReset(state, action);
        case actionTypes.CHANGE_CNT_FAIL:
            return changeCntFail(state, action);
        case actionTypes.CHANGE_CNT:
            return changeCnt(state, action);
        case actionTypes.FETCH_VIDEO_START:
            return fetchVideoStart(state, action);
        case actionTypes.FETCH_VIDEO_FAIL:
            return fetchVideoFail(state, action);
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
        default: return state
    }
};

export default reducer