import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    questions: null,
    isQue: false,
    filterQue: null 
}

const fetchHelpMeQue = (state, action) => { 
    return updateObject(state, {questions: action.questions, isQue: action.questions && action.questions.length > 0 })
};

const changeFavHelpMeQue = (state, action) => {
    return updateObject(state, {questions: action.questions})
};

const changeFavFilterHelpMeQue = (state, action) => {
    return updateObject(state, {filterQue: action.filterQue})
};

const filterHelpMeQue = (state, action) => { 
    return updateObject(state, {filterQue: action.filterQue})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_HELPMEQUE:
            return fetchHelpMeQue(state, action);
        case actionTypes.CHANGE_FAVORITE_HELPMEQUE:
            return changeFavHelpMeQue(state, action);
        case actionTypes.CHANGE_FAVORITE_FILTERHELPMEQUE:
            return changeFavFilterHelpMeQue(state, action);
        case actionTypes.FILTER_HELPMEQUE:
            return filterHelpMeQue(state, action);
        default: return state
    }
};

export default reducer