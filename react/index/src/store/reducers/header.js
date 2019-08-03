import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    expand: false,
    hideFormSm: false,
    addNew: false,
    notify: null,
    hidNotify: false,
    navList: null,
    navListCateg: null,
    hidNavList: false,
    hidUserOption: false
};

const formExpand = (state, action) => {
    return updateObject(state, {expand: state.expend ? state.expand : true})
};

const formSm = (state, action) => {
    return updateObject(state, {hideFormSm : false})
};

const navDefault = (state, action) => {
    return updateObject(state, {expand: false, hideFormSm: true, addNew: false, hidNotify: true, hidNavList: true, hidUserOption: true})
};

const addNew = (state, action) => {
    return updateObject(state, {addNew: !state.addNew})
};

const fetchNotify = (state, action) => {
    return updateObject(state, {notify: action.notify, hidNotify: false, hidNavList: true, hidUserOption: true})
};

const changeFavNotify = (state, action) => {
    return updateObject(state, {notify: action.notify})
};

const showNavList = (state, action) => {
    return updateObject(state, {hidNotify: true, hidNavList: false, hidUserOption: true})
};

const fetchNavList = (state, action) => {
    return updateObject(state, {navList: action.navList, navListCateg: action.category})
};

const showUserOption = (state, action) => {
    return updateObject(state, {hidNotify: true, hidNavList: true, hidUserOption: false})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HEADER_FORM_EXPAND:
            return formExpand(state, action);
        case actionTypes.HEADER_FORM_SM:
            return formSm(state, action);
        case actionTypes.HEADER_NAV_DEFAULT:
            return navDefault(state, action);
        case actionTypes.HEADER_ADD_NEW:
            return addNew(state, action);
        case actionTypes.FETCH_NOTIFY:
            return fetchNotify(state, action);
        case actionTypes.CHANGE_FAVORITE_NOTIFY:
            return changeFavNotify(state, action);
        case actionTypes.SHOW_NAV_LIST:
            return showNavList(state, action);
        case actionTypes.FETCH_NAVLIST:
            return fetchNavList(state, action);
        case actionTypes.SHOW_USER_OPTION:
            return showUserOption(state, action);
        default: return state
    };
};

export default reducer;