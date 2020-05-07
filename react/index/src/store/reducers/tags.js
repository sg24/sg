import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    path: '/post',
    categ: null,
    showCateg: false,
    tags: null
};

const fetchTags = (state, action) => {
    return updateObject(state, { tags: action.tags })
};

const fetchCategStart = (state, action) => {
    return updateObject(state, { showCateg: true })
};

const fetchCateg = (state, action) => {
    return updateObject(state, { categ: action.categ })
};

const changeTagsPath = (state, action) => {
    return updateObject(state, { path: action.path, categ: null, showCateg: false })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_TAGS_PATH:
            return changeTagsPath(state, action)
        case actionTypes.FETCH_TAGS:
            return fetchTags(state, action);
        case actionTypes.FETCH_TAGS_CATEG:
            return fetchCateg(state, action);
        case actionTypes.FETCH_TAGS_CATEG_START:
            return fetchCategStart(state, action);
        default: return state
    }
};

export default reducer;