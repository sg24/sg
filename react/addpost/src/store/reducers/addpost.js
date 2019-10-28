import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ptCateg: null,
    showPtCateg: false,
    ptCategErr: null,
    newPtCateg: null,
    hideMediaBox: false,
    hidAddItm: false,
    linkValid: null,
    snapshot: [],
    media: {},
    users: null,
    filteredUser: null,
    defaultValue: false,
    uploadPercent: null,
    submitError: null,
    submitForm: false,
    postID: null
};

const fetchPtCategStart = (state, action) => {
    return updateObject(state, {showPtCateg: true, ptCategErr: null})
};

const fetchPtCategFail = (state, action) => {
    return updateObject(state, {ptCategErr: {message: action.err.message, code: action.err.code}});
};

const fetchPtCategReset = (state, action) => {
    return updateObject(state, {ptCategErr: null, showPtCateg: false});
};

const fetchPtCateg = (state, action) => {
    return updateObject(state, {ptCateg: action.ptCateg, showPtCateg: action.ptCateg !== null})
};

const addPtCateg = (state, action) => {
    return updateObject(state, {newPtCateg: action.ptCateg})
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
    return updateObject(state, {users: action.users, filteredUser: null, defaultValue: true})
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
    return updateObject(state, {users: action.users, filteredUser: null, defaultValue: true})
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
    return updateObject(state, {postID: action.ID})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PT_CATEG_START:
            return fetchPtCategStart(state, action);
        case actionTypes.FETCH_PT_CATEG_FAIL:
            return fetchPtCategFail(state, action);
        case actionTypes.FETCH_PT_CATEG_RESET:
            return fetchPtCategReset(state, action);
        case actionTypes.FETCH_PT_CATEG:
            return fetchPtCateg(state, action);
        case actionTypes.ADD_PT_CATEG:
            return addPtCateg(state, action);
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