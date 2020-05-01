import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    categ: null,
    qchat: [],
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
    submitForm: false,
    id: null
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

const removeMedia = (state, action) => {
    return updateObject(state, {media: action.media})
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

const resetSelect = (state, action) => {
    let media = state.media;
    if (media && media.user) {
        media.user = null
    }
    return updateObject(state, {media})
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

const addQchat = (state, action) => {
    let qchat = [...state.qchat].length < 1 ? localStorage.getItem('question') ? JSON.parse(localStorage.getItem('question')) : [...state.qchat] :  [...state.qchat];
    let filterQueChat = qchat.filter(que => que.position === action.cnt.position)[0];
    if (filterQueChat) {
        let qchatIndex = qchat.findIndex(que => que.position === action.cnt.position)
        qchat[qchatIndex] = {...action.cnt}
        localStorage.removeItem('question')
        localStorage.setItem('question', JSON.stringify(qchat))
        return updateObject(state, {qchat, media: {}})
    }
    qchat.push(action.cnt)
    localStorage.removeItem('question')
    localStorage.setItem('question', JSON.stringify(qchat))
    return updateObject(state, {qchat, media: {}, categ: null, newCateg: null})
};

const setMedia = (state, action) => {
    return updateObject(state, {media: action.media})
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
        case actionTypes.RESET_SELECT:
            return resetSelect(state, action);
        case actionTypes.SHOW_USER_SELECT:
            return showUserSelect(state, action);
        case actionTypes.ADD_QCHAT:
            return addQchat(state, action);
        case actionTypes.SET_MEDIA:
            return setMedia(state, action);
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