import * as actionTypes from '../actions/actionTypes';
import { updateObject, changeMode } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null,
    skipCnt: null,
    cntTotal: null,
    changedFav: [],
    favChange: null,
    filterDet: null,
    changeCnt: false,
    changeCntErr: null,
    changeCntStart: null,
    showLoader: false
}

const fetchCnt = (state, action) => {
    let cnts = !state.cnts ? action.cnt : state.cnts.concat(...action.cnt);
    return updateObject(state, {cnts, skipCnt: action.skipCnt, cntTotal: action.cntTotal, showLoader: false})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, skipCnt: null, cntTotal: null, showLoader: false})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, showLoader: false})
};

const changeCntStart = (state, action) => {
    return updateObject(state, {changeCntStart: {title: action.title, id: action.id, det: action.det}, changeCntErr: null})
};

const changeCntCancel = (state, action) => {
    return updateObject(state, {changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntReset = (state, action) => {
    let cnts = [...state.cnts]

     if (action.changed) {
         if (state.changeCntStart.det === 'addUser') {
             let updateCnts = changeMode(cnts, state.changeCntStart, 'pending', true);
             return updateObject(state, {cnts: updateCnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
         }
     
         if (state.changeCntStart.det === 'acceptUser') {
             let updateCnts = changeMode(cnts, state.changeCntStart, 'accept', true);
             return updateObject(state, {cnts: updateCnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
         }
     
         if (state.changeCntStart.det === 'rejUser') {
             let updateCnts = changeMode(cnts, state.changeCntStart, 'request', false);
             return updateObject(state, {cnts: updateCnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
         }
          
         if (state.changeCntStart.det === 'cancelReq') {
             let updateCnts = changeMode(cnts, state.changeCntStart, 'pending', false);
             return updateObject(state, {cnts: updateCnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
         }
     
         if (state.changeCntStart.det === 'unfriend') {
             let updateCnts = changeMode(cnts, state.changeCntStart, 'accept', false);
             return updateObject(state, {cnts: updateCnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
         }
 
         if (state.changeCntStart.det === 'blockUser') {
             let updateCnt = cnts.filter(cnt => cnt.id !== state.changeCntStart.id);
             return updateObject(state, {cnts: updateCnt, changeCntStart: null, changeCntErr: null, changeCnt: false})
         }
     
         let updateCnt = cnts.filter(cnt => cnt._id !== state.changeCntStart.id);
         return updateObject(state, {cnts: updateCnt, changeCntStart: null, changeCntErr: null, changeCnt: false})
     }
 
     return updateObject(state, {cnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntFail = (state, action) => {
    return updateObject(state, {changeCntErr: action.err})
};

const changeCnt = (state, action) => {
    return updateObject(state, {changeCnt: true})
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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        case actionTypes.FETCH_CNT_RESET:
            return fetchCntReset(state, action);
        case actionTypes.FETCH_CNT_START:
            return fetchCntStart(state, action);
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
        default: return state
    }
};

export default reducer