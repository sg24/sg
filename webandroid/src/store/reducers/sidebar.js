import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchAdvertError: null,
    fetchAdvertStart: false,
    fetchAdvert: null,
    fetchFriendError: null,
    fetchFriendStart: false,
    fetchFriend: null,
    advertLoadMore: false,
    friendLoadMore: false,
    tabPage: false
};

const fetchSidebarFail = (state, action) => {
    if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}, fetchAdvertStart: false});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchFriendError: {message: action.err}, fetchFriendStart: false});
    }
};

const fetchSidebarStart = (state, action) => {
    if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: null, fetchAdvert: action.start === 0 ? null : state.fetchAdvert, fetchAdvertStart: true});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchFriendError: null, fetchFriend: action.start === 0 ? null : state.fetchFriend, fetchFriendStart: true});
    }
};

const fetchSidebarReset = (state, action) => {
    return updateObject(state, {fetchAdvertError: null, fetchAdvertStart: false, fetchFriendError: null, fetchFriendStart: false});
};

const sidebarReset = (state, action) => {
    return updateObject(state, {
        fetchAdvertError: null,fetchAdvertStart: false,fetchAdvert: null,fetchFriendError: null,fetchFriendStart: false,fetchFriend: null,advertLoadMore: false,friendLoadMore: false,tabPage: false
    });
};

const fetchSidebar = (state, action) => {
    function updatePage(page, action) {
        let updatePageCnt = page && action.start !== 0 ? [...page] : [];
        if (action.cnt.page) {
            updatePageCnt.push(...action.cnt.page)
        }
        return updatePageCnt;
    }
    if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert: updatePage(state.fetchAdvert, action), page: action.page, advertLoadMore: action.cnt.advertLoadMore, fetchAdvertStart: false, tabPage: action.cnt.tabPage});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchFriend: {friend: action.cnt.page, friendTotal: action.cnt.friendTotal}, page: action.page, friendLoadMore: action.cnt.friendLoadMore, fetchFriendStart: false, tabPage: action.cnt.tabPage});
    }
};

const updateSidebar = (state, action) => {
    function updatePageCnt (page, action) {
        if (page) {
            let pageCnt = page.filter(page => page._id === action.pageInfo._id)[0];
            let pageCntIndex = page.findIndex(page => page._id === action.pageInfo._id);
            if (pageCnt) {
                for (let cnt in action.pageInfo) {
                    pageCnt[cnt] =  action.pageInfo[cnt];
                }
            }
            page[pageCntIndex] =  pageCnt;
        }
        return page;
    }
    if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert: updatePageCnt(state.fetchAdvert, action)});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchFriend: updatePageCnt(state.fetchFriend, action)});
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SIDEBAR_FAIL:
            return fetchSidebarFail(state, action);
        case actionTypes.FETCH_SIDEBAR_START:
            return fetchSidebarStart(state, action);
        case actionTypes.FETCH_SIDEBAR_RESET:
            return fetchSidebarReset(state, action);
        case actionTypes.FETCH_SIDEBAR:
            return fetchSidebar(state, action);
        case actionTypes.UPDATE_SIDEBAR:
            return updateSidebar(state, action);
        case actionTypes.SIDEBAR_RESET:
            return sidebarReset(state, action);
        default: return state
    };
};

export default reducer;