import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null,
    skipCnt: null,
    cntTotal: 0,
    showLoader: false,
    changedFav: [],
    favChange: null,
    postVideo: {id: null},
    videoErr: null,
    filterDet: null,
    modelType: null,
    changeCnt: false,
    changeCntErr: null,
    changeCntStart: null
}

const fetchCnt = (state, action) => {
    let cnts = state.cnts ? {...state.cnts} : null
    if (cnts) {
        let cnt = {...action.cnt}
        cnts.post.push(...cnt.post);
        cnts.question.push(...cnt.question);
        cnts.poet.push(...cnt.poet);
        cnts.post = [...cnts.post];
        cnts.question = [...cnts.question];
        cnts.poet = [...cnts.poet];
    }
   
    let newCnts = !state.cnts ? action.cnt : cnts;
    return updateObject(state, {cnts: newCnts, skipCnt: action.skipCnt, cntTotal: action.cntTotal, showLoader: false})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, skipCnt: null, cntTotal: null, curTab: null, showLoader: false})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, showLoader: false})
};

const changeCntStart = (state, action) => {
    return updateObject(state, {changeCntStart: {title: action.title, id: action.id, det: action.det, modelType: action.modelType}, changeCntErr: null})
};

const changeCntCancel = (state, action) => {
    return updateObject(state, {changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntReset = (state, action) => {
    let cnts = {...state.cnts};
    let modelCnt = cnts[state.changeCntStart.modelType];
    let updateModel = [...modelCnt].filter(model => model._id !== state.changeCntStart.id);
    cnts[state.changeCntStart.modelType] = updateModel;
    return updateObject(state, {cnts : action.changed ? cnts : state.cnts, cntTotal: action.changed ?  state.cntTotal-1 : state.cntTotal,changeCntStart: null, changeCntErr: null, changeCnt: false})
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
        case actionTypes.FETCH_CNT_START:
            return fetchCntStart(state, action);
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