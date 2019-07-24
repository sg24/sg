import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    expand: false,
    addNew: false
};

const formExpand = (state, action) => {
    return updateObject(state, {expand: state.expend ? state.expand : true})
};

const navDefault = (state, action) => {
    return updateObject(state, {expand: false, addNew: false})
};

const addNew = (state, action) => {
    return updateObject(state, {addNew: !state.addNew})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HEADER_FORM_EXPAND:
            return formExpand(state, action);
        case actionTypes.HEADER_NAV_DEFAULT:
            return navDefault(state, action);
        case actionTypes.HEADER_ADD_NEW:
            return addNew(state, action);
        default: return state
    };
};

export default reducer;