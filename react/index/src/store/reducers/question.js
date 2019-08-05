import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    questions: null,
    filteredQue: null
}

const fetchQue = (state, action) => {
    return updateObject(state, {questions: action.questions})
};

const changeFavQue = (state, action) => {
    return updateObject(state, {questions: action.questions})
};

const changeFavQueStart = (state, action) => {
    return updateObject(state, {
        questions: action.queArray ? action.questions : state.questions,
        filteredQue: action.queArray ? state.filteredQue : action.questions})
};

const changeFavFilterQue = (state, action) => {
    return updateObject(state, {filteredQue: action.filteredQue})
};

const filterQue= (state, action) => {
    return updateObject(state, {filteredQue: action.que})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_QUE:
            return fetchQue(state, action);
        case actionTypes.CHANGE_FAVORITE_QUE:
            return changeFavQue(state, action);
        case actionTypes.CHANGE_FAVORITE_QUE_START:
            return changeFavQueStart(state, action);
        case actionTypes.CHANGE_FAVORITE_FILTERQUE:
            return changeFavFilterQue(state, action);
        case actionTypes.FILTER_QUE:
            return filterQue(state, action);
        default: return state
    }
};

export default reducer