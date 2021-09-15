import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    page: null
};

const previewPageReset = (state, action) => {
    return updateObject(state, {error: null, page: null});
};

const previewPageStart = (state, action) => {
    return updateObject(state, {error: null, page: null});
};

const previewPageFail = (state, action) => {
    return updateObject(state, {
        error: action.err
    });
};

const previewPage = (state, action) => {
    return updateObject(state, { page: action.cnt, });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PREVIEW_PAGE_START:
            return previewPageStart(state, action);
        case actionTypes.PREVIEW_PAGE_FAIL:
            return previewPageFail(state, action);
        case actionTypes.PREVIEW_PAGE:
            return previewPage(state, action);
        case actionTypes.PREVIEW_PAGE_RESET:
            return previewPageReset(state, action);
        default: return state
    };
};

export default reducer;