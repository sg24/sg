import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ptCateg: null,
    newPtCateg: null,
    hidAddItm: false,
    linkValid: false,
    media: {},
    users: null,
    filteredUser: null,
    defaultValue: false
};

const fetchPtCateg = (state, action) => {
    return updateObject(state, {ptCateg: action.ptCateg})
};

const addPtCateg = (state, action) => {
    return updateObject(state, {newPtCateg: action.ptCateg})
};

const checkLink = (state, action) => {
    return updateObject(state, {linkValid: action.isValid})
};

const resetLink = (state, action) => {
    return updateObject(state, {linkValid: false})
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        default: return state
    };
};

export default reducer;