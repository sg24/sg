import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    users: null,
    grpInfo: null,
    filterUser: null,
    grpErr: null,
    userOpt: false,
    curTab: 'online',
    changeGrpCnt: false,
    changeGrpCntErr: null,
    changeGrpCntStart: null,
    requestTotal: 0,
    disable: []
}
const fetchInfoStart = (state, action) => {
    return updateObject(state, {users: null, filterUser: null, curTab: action.curTab})
};

const fetchInfoFail = (state, action) => {
    return updateObject(state, {grpErr: action.err})
};

const fetchInfo = (state, action) => {
    return updateObject(state, {users: action.users})
};


const filterUser = (state, action) => {
    return updateObject(state, {
        filterUser: action.users
    })
};

const shareCnt = (state, action) => {
    return updateObject(state, {grpInfo: action.cnt, userOpt: action.cnt.userOpt, requestTotal: action.cnt.requestTotal});
};

const resetInputFilter = (state, action) => {
    return updateObject(state, {filterUser: null});
};

const changeGrpCntStartInit = (state, action) => {
    let disable = [...state.disable];
    disable.push(action.userID)
    return updateObject(state, {disable})
};

const changeGrpCntStart = (state, action) => {
    return updateObject(state, {changeGrpCntStart: {categ: action.categ, id: action.id, user: action.user, username: action.username, curTab: action.curTab}, changeGrpCntErr: null})
};

const changeGrpCntCancel = (state, action) => {
    let updatedisable = state.disable.filter( userID => userID !== state.changeGrpCntStart.user)
    return updateObject(state, {disable: updatedisable, changeGrpCntStart: null, changeGrpCntErr: null, changeGrpCnt: false})
};

const changeGrpCntReset = (state, action) => {
    let requestTotal = state.requestTotal;
    if (state.curTab && state.curTab === 'request') {
        requestTotal = requestTotal - 1;
    }

    let users = [...state.users]
    let updateUser = users.filter( user => user._id !== action.user)
    let disable = [...state.disable]
    let updatedisable = disable.filter( userID => userID !== action.user)
    return updateObject(state, {users: updateUser, changeGrpCntStart: null, changeGrpCntErr: null, changeGrpCnt: false, disable: updatedisable, requestTotal})
};

const changeGrpCntFail = (state, action) => {
    return updateObject(state, {changeGrpCntErr: action.err})
};

const changeGrpCnt = (state, action) => {
    return updateObject(state, {changeGrpCnt: true})
};

const shareUser = (state, action) => {
    return updateObject(state, {
        users: null,
        grpInfo: null,
        filterUser: null,
        shareCnt: null,
        grpErr: null
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_INFO_START:
            return fetchInfoStart(state, action);
        case actionTypes.FETCH_INFO_FAIL:
            return fetchInfoFail(state, action);
        case actionTypes.FETCH_INFO:
            return fetchInfo(state, action);
        case actionTypes.FILTER_GRPUSER:
            return filterUser(state, action);
        case actionTypes.SHARE_CNT:
            return shareCnt(state, action);
        case actionTypes.SHARE_GRPUSER:
            return shareUser(state, action);
        case actionTypes.RESET_INPUT_FILTER:
            return resetInputFilter(state, action);
        case actionTypes.CHANGE_GRPCNT_STARTINIT:
            return changeGrpCntStartInit(state, action);
        case actionTypes.CHANGE_GRPCNT_START:
            return changeGrpCntStart(state, action)
        case actionTypes.CHANGE_GRPCNT_CANCEL:
            return changeGrpCntCancel(state, action);
        case actionTypes.CHANGE_GRPCNT_RESET:
            return changeGrpCntReset(state, action);
        case actionTypes.CHANGE_GRPCNT_FAIL:
            return changeGrpCntFail(state, action);
        case actionTypes.CHANGE_GRPCNT:
            return changeGrpCnt(state, action);
        default: return state
    }
};



export default reducer