import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchAdvertError: null,
    fetchAdvertStart: false,
    fetchAdvert: null,
    fetchFriendError: null,
    fetchFriendStart: false,
    fetchFriend: null,
    tabPage: false
};

const fetchSidebarFail = (state, action) => {
    if (page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}, fetchAdvertStart: false});
    } else if (page === 'users') {
        return updateObject(state, {fetchFriendError: {message: action.err}, fetchFriendStart: false});
    }
};

const fetchSidebarStart = (state, action) => {
    if (page === 'advert') {
        return updateObject(state, {fetchAdvertError: null, fetchAdvert: action.start === 0 ? null : state.fetchAdvert, fetchAdvertStart: true});
    } else if (page === 'users') {
        return updateObject(state, {fetchFriendError: null, fetchFriend: action.start === 0 ? null : state.fetchFriend, fetchFriendStart: true});
    }
};

const fetchSidebarReset = (state, action) => {
    return updateObject(state, {fetchAdvertError: null, fetchAdvertStart: false, fetchFriendError: null, fetchFriendStart: false});
};

const fetchSidebar = (state, action) => {
    function updatePage(page, action) {
        let updatePageCnt = page && action.start !== 0 ? [...page] : [];
        updatePageCnt.push(...action.cnt.page);
        return updatePageCnt;
    }
    if (page === 'advert') {
        return updateObject(state, {fetchAdvert: updatePage(state.fetchAdvert, action), page: action.page, loadMore: action.cnt.loadMore, fetchAdvertStart: false, tabPage: action.cnt.tabPage});
    } else if (page === 'users') {
        return updateObject(state, {fetchFriend: updatePage(state.fetchFriend, action), page: action.page, loadMore: action.cnt.loadMore, fetchFriendStart: false, tabPage: action.cnt.tabPage});
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
    if (page == 'advert') {
        return updateObject(state, {fetchAdvert: updatePageCnt(state.fetchAdvert, action)});
    } else if (page == 'users') {
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
        default: return state
    };
};

export default reducer;