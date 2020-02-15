import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    path: null,
    tags: null
};

const fetchTags = (state, action) => {
    return updateObject(state, { tags: action.tags })
};

const changeTagsPath = (state, action) => {
    return updateObject(state, { path: action.path })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_TAGS_PATH:
            return changeTagsPath(state, action)
        case actionTypes.FETCH_TAGS:
            return fetchTags(state, action);
        default: return state
    }
};

export default reducer;