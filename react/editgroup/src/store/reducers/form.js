import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cntErr: null,
    categ: null,
    showCateg: false,
    categErr: null,
    newCateg: null,
    hideMediaBox: false,
    hidAddItm: false,
    linkValid: null,
    snapshot: [],
    media: {},
    curTab: 'online',
    startUser: true,
    users: null,
    onlineUser: [],
    offlineUser: [],
    filteredUser: null,
    defaultValue: false,
    uploadPercent: null,
    submitError: null,
    removedSnap: [],
    submitForm: false,
    content: null,
    title: null,
    videoFetched: false,
    showVideo:false,
    editImage: false,
    editVideo:false,
    redirect: false,
    imageCapture: null,
    id: null
};

const fetchCnt = (state, action) => {
    if (action.cnt) {
        let desc = JSON.parse(action.cnt.desc)
        let snapshot = [];
        let image = [...action.cnt.image];
        let video = [];
        return updateObject(state, {
            newCateg: action.cnt.category, title: action.cnt.title, content: desc, cntErr: null, snapshot, media: {image, video}})
    }
    return updateObject(state, {redirect: true})
};

const fetchCntFail = (state, action) => {
    return updateObject(state, {cntErr: action.err})
};

const fetchVideo = (state, action) => {
    let media = {...state.media};
    let videos = [...action.videos];
    media.video = videos;
    return updateObject(state, {media, videoFetched: true})
};

const fetchVideoFail = (state, action) => {
    return updateObject(state, {cntErr: action.err})
};


const videoFetched = (state, action) => {
    return updateObject(state, {showVideo: true})
};

const imageEdit = (state, action) => {
    return updateObject(state, {editImage: true})
};

const videoEdit = (state, action) => {
    return updateObject(state, {editVideo: true})
};

const fetchCategStart = (state, action) => {
    return updateObject(state, {showCateg: true, categErr: null})
};

const fetchCategFail = (state, action) => {
    return updateObject(state, {categErr: {message: action.err.message, code: action.err.code}});
};

const fetchCategReset = (state, action) => {
    return updateObject(state, {categErr: null, showCateg: false});
};

const fetchCateg = (state, action) => {
    return updateObject(state, {categ: action.categ, showCateg: action.categ !== null})
};

const addCateg = (state, action) => {
    return updateObject(state, {newCateg: action.categ})
};

const checkLink = (state, action) => {
    return updateObject(state, {linkValid: {err: action.err, media: action.media}});
};

const resetLink = (state, action) => {
    return updateObject(state, {linkValid: null})
};

const addSnapshot = (state, action) => {
    return updateObject(state, {snapshot: action.snapshot})
};

const removeSnapshot= (state, action) => {
    return updateObject(state, {snapshot: action.snapshot})
};

const saveRemoveSnap = (state, action) => {
    let snap = [...state.removedSnap];
    snap.push(action.snapshotDet)
    return updateObject(state, {removedSnap: snap})
};

const removeMedia = (state, action) => {
    return updateObject(state, {media: action.media})
};

const imageCapture = (state, action) => {
    return updateObject(state, {imageCapture: action.imageCapture})
};

const submitMedia = (state, action) => {
    return updateObject(state, {media: action.media, hideMediaBox: true})
};

const hideMediaBox = (state, action) => {
    return updateObject(state, {hideMediaBox: true})
};

const showMediaBox = (state, action) => {
    return updateObject(state, {hideMediaBox: false})
};

const fetchUsers = (state, action) => {
    return updateObject(state, {
        users: action.users, 
        filteredUser: null, startUser: false, defaultValue: true,
        onlineUser: action.status === 'online' ? action.users : state.onlineUser,
        offlineUser: action.status === 'offline' ? action.users : state.offlineUser,
        curTab: action.status})
};

const fetchUsersFail = (state, action) => {
    return updateObject(state, {users: null, filteredUser: null, startUser: false})
};

const resetTab = (state, action) => {
    return updateObject(state, {users: null, filteredUser: null, startUser: false})
};

const inputDefaultValue = (state, action) => {
    return updateObject(state, {defaultValue: false})
};

const filterUser = (state, action) => {
    return updateObject(state, {filteredUser: action.users})
};

const userSelect = (state, action) => {
    return updateObject(state, {media: action.users})
};

const showUserSelect = (state, action) => {
    return updateObject(state, {users: action.users, curTab: 'userSelect', filteredUser: null, defaultValue: true})
};

const submitFormStart = (state, action) => {
    return updateObject(state, {submitForm: true, submitError: null, submitFiles: 0})
};

const submitFormSuccess = (state, action) => {
    return updateObject(state, {uploadPercent: action.uploadPercent})
};

const submitFormFail = (state, action) => {
    return updateObject(state, {submitError: {message: action.err.message, code: action.err.code}})
};

const formSubmitted = (state, action) => {
    return updateObject(state, {id: action.id})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        case actionTypes.FETCH_CNT_FAIL:
            return fetchCntFail(state, action);
        case actionTypes.FETCH_VIDEO:
            return fetchVideo(state, action);
        case actionTypes.FETCH_VIDEO_FAIL:
            return fetchVideoFail(state, action);
        case actionTypes.VIDEO_FETCHED:
            return videoFetched(state, action);
        case actionTypes.VIDEO_EDIT:
            return videoEdit(state, action);
        case actionTypes.IMAGE_EDIT:
            return imageEdit(state, action);
        case actionTypes.FETCH_CATEG_START:
            return fetchCategStart(state, action);
        case actionTypes.FETCH_CATEG_FAIL:
            return fetchCategFail(state, action);
        case actionTypes.FETCH_CATEG_RESET:
            return fetchCategReset(state, action);
        case actionTypes.FETCH_CATEG:
            return fetchCateg(state, action);
        case actionTypes.ADD_CATEG:
            return addCateg(state, action);
        case actionTypes.HIDE_MEDIA_BOX:
            return hideMediaBox(state, action);
        case actionTypes.SHOW_MEDIA_BOX:
            return showMediaBox(state, action);
        case actionTypes.CHECK_LINK:
            return checkLink(state, action);
        case actionTypes.RESET_LINK:
            return resetLink(state, action);
        case actionTypes.ADD_SNAPSHOT:
            return addSnapshot(state, action);
        case actionTypes.REMOVE_SNAPSHOT:
            return removeSnapshot(state, action);
        case actionTypes.SAVE_REMOVE_SNAP:
            return saveRemoveSnap(state, action);
        case actionTypes.IMAGE_CAPTURE:
            return imageCapture(state, action);
        case actionTypes.REMOVE_MEDIA:
            return removeMedia(state, action);
        case actionTypes.SUBMIT_MEDIA:
            return submitMedia(state, action);
        case actionTypes.FETCH_USERS:
            return fetchUsers(state, action);
        case actionTypes.FETCH_USERS_FAIL:
            return fetchUsersFail(state, action);
        case actionTypes.RESET_TAB:
            return resetTab(state, action);
        case actionTypes.INPUT_DEFAULT_VALUE:
            return inputDefaultValue(state, action);
        case actionTypes.FILTER_USER:
            return filterUser(state, action);
        case actionTypes.USER_SELECT:
            return userSelect(state, action);
        case actionTypes.SHOW_USER_SELECT:
            return showUserSelect(state, action);
        case actionTypes.SUBMIT_FORM_START:
            return submitFormStart(state, action);
        case actionTypes.SUBMIT_FORM_SUCCESS:
            return submitFormSuccess(state, action);
        case actionTypes.SUBMIT_FORM_FAIL:
            return submitFormFail(state, action);
        case actionTypes.FORM_SUBMITTED:
            return formSubmitted(state, action);
        default: return state
    };
};

export default reducer;