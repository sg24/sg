import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pending: null,
    error: null,
    page: []
};

const pageReset = (state, action) => {
    return updateObject(state, {
        pending: null, error: null, page: []
    })
};

const externalPageReset = (state, action) => {
    return updateObject(state, {error: null});
};

const externalPageStart = (state, action) => {
    let pending = state.pending ? [...state.pending] : [];
    let pendingCnt = pending.filter(cnt => cnt.id === action.pageID && cnt.type === action.pageType)[0];
    if (!pendingCnt) {
        pending.push({id: action.pageID, type: action.pageType});
    }
    return updateObject(state, {pending, error: null});
};

const externalPageFail = (state, action) => {
    let pending  = [...state.pending];
    let updatePending = pending.filter(cnt => cnt.id !== action.pageID && cnt.type !== action.pageType);
    return updateObject(state, {
        pending: updatePending, error: action.err
    });
};

const externalPage = (state, action) => {
    let page  = [...state.page];
    let checkPage = page.filter(cnt => cnt.id === action.pageID && cnt.type === action.pageType)[0];
    if (!checkPage) {
        page.push({id: action.pageID, type: action.pageType, cntType: action.cntType});
    }
    return updateObject(state, { page });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXTERNAL_PAGE_START:
            return externalPageStart(state, action);
        case actionTypes.EXTERNAL_PAGE_FAIL:
            return externalPageFail(state, action);
        case actionTypes.EXTERNAL_PAGE:
            return externalPage(state, action);
        case actionTypes.EXTERNAL_PAGE_RESET:
            return externalPageReset(state, action);
        default: return state
    };
};

export default reducer;