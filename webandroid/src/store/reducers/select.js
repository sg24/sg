import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchSelectcntError: null,
    fetchSelectcnt: null,
    fetchSelectcntStart: false,
    loadMore: false,
    select: false,
    selectType: null,
    selectError: null,
    selectStart: false,
    selectReaction: [],
    selectReactionError: false,
};

const selectcntReset = (state, action) => {
    return updateObject(state, {
        fetchSelectcntError: null, fetchSelectcnt: null, loadMore: false, fetchSelectcntStart: false,
        select: false, selectType: null, selectStart: false, selectError: null, selectReaction: [], selectReactionError: false
    });
};

const fetchSelectcntReset = (state, action) => {
    return updateObject(state, {
        fetchSelectcntError: null,  fetchSelectcntStart: false
    });
};

const fetchSelectcntStart = (state, action) => {
    return updateObject(state, {
        fetchSelectcntError: null, fetchSelectcntStart: true, fetchSelectcnt: action.start === 0 ? null : state.fetchSelectcnt
    });
};

const fetchSelectcntFail = (state, action) => {
    return updateObject(state, {
        fetchSelectcntError: {message: action.err}, fetchSelectcntStart: false
    });
};

const fetchSelectcnt = (state, action) => {
    let fetchSelectcnt  = state.fetchSelectcnt && action.start !== 0 ? [...state.fetchSelectcnt] : [];
    fetchSelectcnt.push(...action.cnt.select);
    return updateObject(state, {
        fetchSelectcntError: null, fetchSelectcnt, loadMore: action.cnt.loadMore, fetchSelectcntStart: false
    });
};

const selectReset = (state, action) => {
    return updateObject(state, {
        select: false, selectError: null, selectStart: false, selectType: null
    });
};

const selectStart = (state, action) => {
    return updateObject(state, {
        select: false, selectError: null, selectStart: true, selectType: action.selectType
    });
};

const selectFail = (state, action) => {
    return updateObject(state, {
        selectError: {message: action.err}, selectStart: false, selectType: null
    });
};

const select = (state, action) => {
    let fetchSelectcnt = state.fetchSelectcnt ? state.fetchSelectcnt : [];
    if (action.remove) {
        for (let cntID of action.cnt) {
            fetchSelectcnt = fetchSelectcnt.filter(cnt => cnt._id !== cntID);
        }
    }
    return updateObject(state, {
        selectError: null, select: true, selectStart: false, fetchSelectcnt
    });
};

const selectReactionReset = (state, action) => {
    let selectReaction  =  [...state.selectReaction];
    let updateSelectReaction = selectReaction.filter(id => id !== action.cntID);
    return updateObject(state, { 
        selectReaction: updateSelectReaction, selectReactionError: null
    })
};

const selectReactionStart = (state, action) => {
    let selectReaction = [...state.selectReaction];
    let selectReactionCnt = selectReaction.filter(id => id === action.cntID)[0];
    if (!selectReactionCnt) {
        selectReaction.push(action.cntID)
    }
    return updateObject(state, {selectReaction, selectReactionError: null})
};

const selectReactionFail = (state, action) => {
    let selectReaction  = [...state.selectReaction];
    let updateSelectReaction = selectReaction.filter(id => id !== action.cntID);
    return updateObject(state, { 
        selectReaction: updateSelectReaction, selectReactionError: action.err
    })
};

const selectReaction = (state, action) => {
    let selectReaction  = [...state.selectReaction];
    let updateSelectReaction = selectReaction.filter(id => id !== action.cntID);
    let fetchSelectcnt = state.fetchSelectcnt ? state.fetchSelectcnt : [];
    if (action.remove) {
        fetchSelectcnt  = fetchSelectcnt.filter(cnt => cnt._id !== action.cntID);
    }
    return updateObject(state, { selectReaction: updateSelectReaction, fetchSelectcnt })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SELECTCNT_START:
            return fetchSelectcntStart(state, action);
        case actionTypes.FETCH_SELECTCNT_FAIL:
            return fetchSelectcntFail(state, action);
        case actionTypes.FETCH_SELECTCNT:
            return fetchSelectcnt(state, action);
        case actionTypes.FETCH_SELECTCNT_RESET:
            return fetchSelectcntReset(state, action);
        case actionTypes.SELECTCNT_RESET:
            return selectcntReset(state, action);
        case actionTypes.SELECT_FAIL:
            return selectFail(state, action);
        case actionTypes.SELECT_START:
            return selectStart(state, action);
        case actionTypes.SELECT:
            return select(state, action);
        case actionTypes.SELECT_RESET:
            return selectReset(state, action);
        case actionTypes.SELECT_REACTION_START:
            return selectReactionStart(state, action);
        case actionTypes.SELECT_REACTION_FAIL:
            return selectReactionFail(state, action);
        case actionTypes.SELECT_REACTION:
            return selectReaction(state, action);
        case actionTypes.SELECT_REACTION_RESET:
            return selectReactionReset(state, action);
        default: return state
    };
};

export default reducer;