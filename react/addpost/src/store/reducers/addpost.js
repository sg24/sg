import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ptCateg: null,
    newPtCateg: null,
    hidAddItm: false,
    imgValid: false,
    image: null
};

const fetchPtCateg = (state, action) => {
    return updateObject(state, {ptCateg: action.ptCateg})
};

const addPtCateg = (state, action) => {
    return updateObject(state, {newPtCateg: action.ptCateg})
};

const hidAddItm = (state, action) => {
    return updateObject(state, {hidAddItm: true})
};

const showAddItm = (state, action) => {
    return updateObject(state, {hidAddItm: false})
};

const checkImage = (state, action) => {
    return updateObject(state, {imgValid: action.isValid})
};

const selectImage = (state, action) => {
    return updateObject(state, {imgValid: false})
};

const addImage = (state, action) => {
    return updateObject(state, {image: action.image, hidAddItm: true})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PT_CATEG:
            return fetchPtCateg(state, action);
        case actionTypes.ADD_PT_CATEG:
            return addPtCateg(state, action);
        case actionTypes.HID_ADD_ITM:
            return hidAddItm(state, action);
        case actionTypes.SHOW_ADD_ITM:
            return showAddItm(state, action);
        case actionTypes.CHECK_IMAGE:
            return checkImage(state, action);
        case actionTypes.SELECT_IMAGE:
            return selectImage(state, action);
        case actionTypes.ADD_IMAGE:
            return addImage(state, action);
        default: return state
    };
};

export default reducer;