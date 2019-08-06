import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    users: null,
    userSelect: null,
    filterUserSelect: null,
    viewAllUsers: true,
    shareID: null
}

const fetchUsers = (state, action) => {
    return updateObject(state, {users: action.users})
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
        users: action.users
    })
};

const filterUserSelect = (state, action) => {
    return updateObject(state, {
        filterUserSelect: action.userSelect
    });
};

const shareID = (state, action) => {
    return updateObject(state, {
        shareID: String(action.shareID) 
    });
};

const defaultShareProps = (state, action) => {
    return updateObject(state, {
        users: null,
        userSelect: null,
        filterUserSelect: null,
        viewAllUsers: true,
        shareID: null
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
        case actionTypes.DEFAULT_SHARE_PROPS:
            return defaultShareProps(state, action)
        default: return state
    }
};



export default reducer