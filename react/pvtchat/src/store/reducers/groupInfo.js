import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    users: null,
    grpInfo: null,
    shareID: null,
    grpErr: null,
    userOpt: false,
    curTab: 'online',
    changeCnt: false,
    changeCntErr: null,
    changeCntStart: null,
    requestTotal: 0,
    disable: [],
    filterMember: null,
}

const setGrpInfo = (state, action) => {
    return updateObject(state, {grpInfo: action.grpInfo, userOpt: action.grpInfo.userOpt, requestTotal: action.grpInfo.requestTotal})
};

const fetchInfoStart = (state, action) => {
    return updateObject(state, {users: null, filterMember: null, curTab: action.curTab})
};

const fetchInfoFail = (state, action) => {
    return updateObject(state, {grpErr: action.err})
};

const fetchInfo = (state, action) => {
    return updateObject(state, {users: action.users})
};

const removeUser = (state, action) => {
    return updateObject(state, {
            userSelect: action.users, 
            viewAllUsers: action.users && !action.users.length > 0 
        })
};

const shareID = (state, action) => {
    return updateObject(state, {shareID: String(action.shareID)});
};

const resetInputFilter = (state, action) => {
    return updateObject(state, {filterMember: null});
};

const changeCntStartInit = (state, action) => {
    let disable = [...state.disable];
    disable.push(action.userID)
    return updateObject(state, {disable})
};

const changeCntStart = (state, action) => {
    return updateObject(state, {changeCntStart: {categ: action.categ, id: action.id, user: action.user, username: action.username, curTab: action.curTab}, changeCntErr: null})
};

const changeCntCancel = (state, action) => {
    let updatedisable = state.disable.filter( userID => userID !== state.changeCntStart.user)
    return updateObject(state, {disable: updatedisable, changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntReset = (state, action) => {
    let requestTotal = state.requestTotal;
    if (state.curTab && state.curTab === 'request') {
        requestTotal = requestTotal - 1;
    }

    let users = [...state.users]
    let updateUser = users.filter( user => user._id !== action.user)
    let disable = [...state.disable]
    let updatedisable = disable.filter( userID => userID !== action.user)
    return updateObject(state, {users: updateUser, changeCntStart: null, changeCntErr: null, changeCnt: false, disable: updatedisable, requestTotal})
};

const changeCntFail = (state, action) => {
    return updateObject(state, {changeCntErr: action.err})
};

const changeCnt = (state, action) => {
    return updateObject(state, {changeCnt: true})
};

const filterMember = (state, action) => {
    return updateObject(state, {
        filterMember: action.users
    })
};

const resetModel = (state, action) => {
    return updateObject(state, {cntErr: null,changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_GRP_INFO:
            return setGrpInfo(state, action);
        case actionTypes.FETCH_INFO_START:
            return fetchInfoStart(state, action);
        case actionTypes.FETCH_INFO_FAIL:
            return fetchInfoFail(state, action);
        case actionTypes.FETCH_INFO:
            return fetchInfo(state, action);
        case actionTypes.REMOVE_USER:
            return removeUser(state, action);
        case actionTypes.SHARE_ID:
            return shareID(state, action);
        case actionTypes.RESET_INPUT_FILTER:
            return resetInputFilter(state, action);
        case actionTypes.CHANGE_CNT_STARTINIT:
            return changeCntStartInit(state, action);
        case actionTypes.CHANGE_CNT_START:
            return changeCntStart(state, action)
        case actionTypes.CHANGE_CNT_CANCEL:
            return changeCntCancel(state, action);
        case actionTypes.CHANGE_CNT_RESET:
            return changeCntReset(state, action);
        case actionTypes.CHANGE_CNT_FAIL:
            return changeCntFail(state, action);
        case actionTypes.CHANGE_CNT:
            return changeCnt(state, action);
        case actionTypes.FILTER_MEMBER:
            return filterMember(state, action);
        case actionTypes.RESET_MODEL:
            return resetModel(state, action);
        default: return state
    }
};



export default reducer