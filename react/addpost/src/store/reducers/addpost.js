import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ptCateg: null,
    newPtCateg: null,
    hidAddItm: false,
    linkValid: false,
    media: {}
};

const fetchPtCateg = (state, action) => {
    return updateObject(state, {ptCateg: action.ptCateg})
};

const addPtCateg = (state, action) => {
    return updateObject(state, {newPtCateg: action.ptCateg})
};

const showAddItm = (state, action) => {
    return updateObject(state, {hideMediaBox: false})
};

const checkLink = (state, action) => {
    return updateObject(state, {linkValid: action.isValid})
};

const resetLink = (state, action) => {
    return updateObject(state, {linkValid: false})
};

const submitMedia = (state, action) => {
    return updateObject(state, {media: action.media, hideMediaBox: true})
};

const hideMediaBox = (state, action) => {
    return updateObject(state, {hideMediaBox: true})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PT_CATEG:
            return fetchPtCateg(state, action);
        case actionTypes.ADD_PT_CATEG:
            return addPtCateg(state, action);
        case actionTypes.HIDE_MEDIA_BOX:
            return hideMediaBox(state, action);
        case actionTypes.SHOW_ADD_ITM:
            return showAddItm(state, action);
        case actionTypes.CHECK_LINK:
            return checkLink(state, action);
        case actionTypes.RESET_LINK:
            return resetLink(state, action);
        case actionTypes.SUBMIT_MEDIA:
            return submitMedia(state, action);
        default: return state
    };
};

export default reducer;