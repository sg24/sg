import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: null,
    filteredPost: null
}

const fetchPost = (state, action) => {
    return updateObject(state, {posts: action.posts})
};

const changeFav = (state, action) => {
    return updateObject(state, {posts: action.posts})
};

const changeFavFilter = (state, action) => {
    return updateObject(state, {filteredPost: action.filteredPost})
};

const filterPost = (state, action) => {
    return updateObject(state, {filteredPost: action.posts})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POST:
            return fetchPost(state, action);
        case actionTypes.CHANGE_FAVORITE:
            return changeFav(state, action);
        case actionTypes.CHANGE_FAVORITE_FILTER:
            return changeFavFilter(state, action);
        case actionTypes.FILTER_POST:
            return filterPost(state, action);
        default: return state
    }
};

export default reducer