import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export const initialShareState = {
    users: null,
    userSelect: null,
    filterUser: null,
    filterUserSelect: null,
    viewAllUsers: true,
    shareID: null,
    cntType: null,
    start: false,
    shareErr: null
}

const fetchUsers = (state, action) => {
    return updateObject(state, {users: action.users, filterUser: null})
};

const userSelect = (state, action) => {
    return updateObject(state, {userSelect: action.userSelect})
};

const viewUsers = (state, action) => {
    return updateObject(state, {viewAllUsers: !state.viewAllUsers})
};

const removeUser = (state, action) => {
    return updateObject(state, {
            userSelect: action.users, 
            viewAllUsers: action.users && !action.users.length > 0 
        })
};

const filterUser = (state, action) => {
    return updateObject(state, {
        filterUser: action.users
    })
};

const filterUserSelect = (state, action) => {
    return updateObject(state, {
        filterUserSelect: action.userSelect
    });
};

const shareID = (state, action) => {
    return updateObject(state, {shareID: String(action.shareID), cntType: action.cntType});
};

const shareUserStart = (state, action) => {
    return updateObject(state, {start: true});
};

const shareUserFail = (state, action) => {
    return updateObject(state, {shareErr: action.err});
};

const shareUser = (state, action) => {
    return updateObject(state, {
        users: null,
        userSelect: null,
        filterUser: null,
        filterUserSelect: null,
        viewAllUsers: true,
        shareID: null,
        share: false,
        start: false
    })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USERS:
            return fetchUsers(state, action);
        case actionTypes.USER_SELECT:
            return userSelect(state, action);
        case actionTypes.VIEW_USERS:
            return viewUsers(state, action);
        case actionTypes.REMOVE_USER:
            return removeUser(state, action);
        case actionTypes.FILTER_USER:
            return filterUser(state, action);
        case actionTypes.FILTER_USER_SELECT:
            return filterUserSelect(state, action);
        case actionTypes.SHARE_ID:
            return shareID(state, action);
        case actionTypes.SHARE_USER_START:
            return shareUserStart(state, action);
        case actionTypes.SHARE_USER_FAIL:
            return shareUserFail(state, action);
        case actionTypes.SHARE_USER:
            return shareUser(state, action);
        default: return state
    }
};



export default reducer