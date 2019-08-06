import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    poets: null,
    filterPoet: null
}

const fetchPoet = (state, action) => { 
    return updateObject(state, {poets: action.poets })
};

const changeFavPoetStart = (state, action) => {
    return updateObject(state, {
        posts: action.isPoet ? action.poets : state.poets,
        filterPoet: action.isPoet ? state.filterPoet : action.poets})
};

const changeFavPoet = (state, action) => {
    return updateObject(state, {poets: action.poets})
};

const changeFavFilterPoet = (state, action) => {
    return updateObject(state, {filterPoet: action.filterPoet})
};

const filterPoet = (state, action) => {
    return updateObject(state, {filterPoet: action.filterPoet})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POET:
            return fetchPoet(state, action);
        case actionTypes.CHANGE_FAVORITE_POET_START:
            return changeFavPoetStart(state, action);
        case actionTypes.CHANGE_FAVORITE_POET:
            return changeFavPoet(state, action);
        case actionTypes.CHANGE_FAVORITE_FILTERPOET:
            return changeFavFilterPoet(state, action)
        case actionTypes.FILTER_POET:
            return filterPoet(state, action);
        default: return state
    }
};

export default reducer