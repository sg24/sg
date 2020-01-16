import * as actionTypes from '../actions/actionTypes';
import { updateObject, changeMode } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null,
    changedFav: [],
    favChange: null,
    modelType: null,
    changeCnt: false,
    changeCntErr: null,
    changeCntStart: null,
    start: false,
    det: null,
    linkValid: null,
    changeImage: false,
    profileImage: null,
    imageUrl: null,
    startUpload: false
}

const fetchCnt = (state, action) => {
    return updateObject(state, {cnts: action.cnt, det: action.cnt.about})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, skipCnt: null, cntTotal: null, curTab: null, showLoader: false})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {cntErr: action.err})
};

const saveAbout = (state, action) => {
    return updateObject(state, {start: false, det: action.det})
};

const saveAboutStart = (state, action) => {
    return updateObject(state, {start: true})
};

const saveAboutFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, start: false})
};

const changeImage = (state, action) => {
    return updateObject(state, {changeImage: !state.changeImage})
};

const checkLink = (state, action) => {
    return updateObject(state, {linkValid: {err: action.err}});
};

const resetLink = (state, action) => {
    return updateObject(state, {linkValid: null})
};

const changePrfImage = (state, action) => {
    return updateObject(state, {profileImage: action.image, imageUrl: action.url})
};

const submitImage = (state, action) => {
    let cnts = {...state.cnts}
    cnts.image = state.imageUrl;
    return updateObject(state, {startUpload: false, cnts, profileImage: null})
};

const submitImageStart = (state, action) => {
    return updateObject(state, {startUpload: true})
};

const submitImageFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, startUpload: false})
};

const changeCntStart = (state, action) => {
    return updateObject(state, {changeCntStart: {title: action.title, id: action.id, det: action.det, modelType: action.modelType}, changeCntErr: null})
};

const changeCntCancel = (state, action) => {
    return updateObject(state, {changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntReset = (state, action) => {
    let cnts = {...state.cnts};
   
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
    return updateObject(state, {favChange: null })
};

const changeFav = (state, action) => {
    return updateObject(state, {changedFav: action.changedFav, favChange: null})
};

const resetModel = (state, action) => {
    return updateObject(state, {cntErr: null})
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
        case actionTypes.SAVE_ABOUT:
            return saveAbout(state, action);
        case actionTypes.SAVE_ABOUT_START:
            return saveAboutStart(state, action);
        case actionTypes.SAVE_ABOUT_FAIL:
            return saveAboutFail(state, action);
        case actionTypes.CHANGE_IMAGE:
            return changeImage(state, action);
        case actionTypes.CHECK_LINK:
            return checkLink(state, action);
        case actionTypes.RESET_LINK:
            return resetLink(state, action);
        case actionTypes.CHANGE_PRFIMAGE:
            return changePrfImage(state, action);
        case actionTypes.SUBMIT_IMAGE:
            return submitImage(state, action);
        case actionTypes.SUBMIT_IMAGE_START:
            return submitImageStart(state, action);
        case actionTypes.SUBMIT_IMAGE_FAIL:
            return submitImageFail(state, action);
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
        case actionTypes.RESET_MODEL:
            return resetModel(state, action);
        default: return state
    }
};

export default reducer