import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null,
    skipCnt: null,
    showLoader: false,
    changedFav: [],
    favChange: null,
    postVideo: {id: null},
    videoErr: null,
    filterDet: null,
    changeCnt: false,
    changeCntErr: null,
    changeCntStart: null,
    comments: [],
    submitStart: false,
    resetInput: false
}

const fetchCnt = (state, action) => {
    let comments = [...state.comments]
    comments.push(...action.cnt.commentcnt)
    return updateObject(state, {cnts: action.cnt, comments})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, comments: []})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, showLoader: false})
};

const submitComment = (state, action) => {
    let comments = [...state.comments];
    if (action.categ ==='reply') {
        let indexPos;
        let commentReply = comments.filter((comment, index) => {
            if (comment._id === action.id) {
                indexPos = index;
                return true;
            }
            return false
        });

        let comment = {...commentReply[0]}
       if (comment.reply) {
            comment.reply.push({...action.cnt})
       } else {
        comment['reply'] = [{...action.cnt}]
       }
        comments[indexPos] = comment;
        return updateObject(state, {comments, submitStart: false, resetInput: true})
    } 
    comments.push(action.cnt);
    return updateObject(state, {comments, submitStart: false, resetInput: true})
};

const submitCommentFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, submitStart: false})
};

const submitCommentStart = (state, action) => {
    return updateObject(state, {submitStart: true})
};

const resetInput = (state, action) => {
    return updateObject(state, {resetInput: false})
};

const resetModel = (state, action) => {
    return updateObject(state, {cntErr: null})
};

const ansCorrect = (state, action) => {
    let comments = [...state.comments];
    let indexPos;
    let comment = comments.filter((comment, index) => {
        if (comment._id === action.commentID) {
            indexPos = index;
            return true;
        }
        return false
    });

    if (action.categ === 'smilereply') { 
        let replyPos;
        let reply = comment[0].reply.filter((replyRes, index) => {
            if (replyRes._id === action.replyID) {
                replyPos = index;
                return true;
            }
            return false;
        });
        reply[0].smiled = reply[0].smile ? reply[0].smiled - 1  : reply[0].smiled + 1;
        reply[0].smile =  !reply[0].smile
        comment[0].reply[replyPos] = reply[0];
        comments[indexPos] = comment[0];
        return updateObject(state, {comments})
    }

    if (action.categ === 'reply') {
        let replyPos;
        let reply = comment[0].reply.filter((replyRes, index) => {
            if (replyRes._id === action.replyID) {
                replyPos = index;
                return true;
            }
            return false;
        });
        reply[0].liked = reply[0].like ? reply[0].liked : reply[0].liked + 1;
        reply[0].disliked = reply[0].dislike ? reply[0].disliked - 1 : reply[0].disliked;
        reply[0].like = true;
        reply[0].dislike = false;
        comment[0].reply[replyPos] = reply[0];
        comments[indexPos] = comment[0];
        return updateObject(state, {comments})
    }

    if (action.categ === 'smile') { 
        comment[0].smiled= comment[0].smile ? comment[0].smiled - 1 : comment[0].smiled + 1;
        comment[0].smile = !comment[0].smile;
        comments[indexPos] = comment[0];
        return updateObject(state, {comments})
    }

    comment[0].liked = comment[0].like ? comment[0].liked : comment[0].liked + 1;
    comment[0].disliked = comment[0].dislike ? comment[0].disliked - 1 : comment[0].disliked;
    comment[0].like = true;
    comment[0].dislike = false;
    comments[indexPos] = comment[0];
    return updateObject(state, {comments})
};

const ansWrong = (state, action) => {
    let comments = [...state.comments];
    let indexPos;
    let comment = comments.filter((comment, index) => {
        if (comment._id === action.commentID) {
            indexPos = index;
            return true;
        }
        return false
    });
    if (action.categ === 'reply') {
        let replyPos;
        let reply = comment[0].reply.filter((replyRes, index) => {
            if (replyRes._id === action.replyID) {
                replyPos = index;
                return true;
            }
            return false;
        });
        reply[0].disliked = reply[0].dislike ? reply[0].disliked : reply[0].disliked + 1;
        reply[0].liked = reply[0].like ? reply[0].liked - 1 : reply[0].liked;
        reply[0].dislike = true;
        reply[0].like = false;
        comment[0].reply[replyPos] = reply[0];
        comments[indexPos] = comment[0];
        return updateObject(state, {comments})
    }
    comment[0].disliked = comment[0].dislike ? comment[0].disliked : comment[0].disliked + 1;
    comment[0].liked = comment[0].like ? comment[0].liked - 1 : comment[0].liked;
    comment[0].dislike = true;
    comment[0].like = false;
    comments[indexPos] = comment[0];
    return updateObject(state, {comments})
};

const changeCntStart = (state, action) => {
    return updateObject(state, {changeCntStart: {title: action.title, id: action.id, det: action.det, modelType: action.modelType}, changeCntErr: null})
};

const changeCntCancel = (state, action) => {
    return updateObject(state, {changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntReset = (state, action) => {
    let cnts = {...state.cnts};
    if ((state.changeCntStart.det === 'publish' || state.changeCntStart.det === 'draft') && state.changeCntStart.det !== 'delete') {
            cnts.mode = state.changeCntStart.det
            return updateObject(state, {cnts: action.changed ? cnts : state.cnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
    }
    return updateObject(state, {cnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changeCntFail = (state, action) => {
    return updateObject(state, {changeCntErr: action.err})
};

const changeCnt = (state, action) => {
    return updateObject(state, {changeCnt: true})
};

const fetchVideoStart = (state, action) => {
    if (state.postVideo.url) {
        window.URL.revokeObjectURL(state.postVideo.url);
    }
    return updateObject(state, {postVideo: {id: action.ptVideoID}, videoErr: null})
};

const fetchVideoFail = (state, action) => {
    return updateObject(state, {videoErr: {id: state.postVideo.id, err: action.err}})
};

const fetchVideo = (state, action) => {
    return updateObject(state, {postVideo: {id: state.postVideo.id, url: action.url}})
};

const changeFavPtStart = (state, action) => {
    return updateObject(state, {favChange: {id:action.id, isLiked: action.isLiked}})
};

const changeFavPtFail = (state, action) => {
    return updateObject(state, {favChange: null })
};

const changeFav = (state, action) => {
    return updateObject(state, {changedFav: action.changedFav, favChange: null})
};

const filterPost = (state, action) => {
    return updateObject(state, {filterDet: action.filterDet})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        case actionTypes.FETCH_CNT_START:
            return fetchCntStart(state, action);
        case actionTypes.FETCH_CNT_RESET:
            return fetchCntReset(state, action);
        case actionTypes.FETCH_CNT_FAIL:
            return fetchPostFail(state, action);
        case actionTypes.SUBMIT_COMMENT:
            return submitComment(state, action);
        case actionTypes.SUBMIT_COMMENT_START:
            return submitCommentStart(state, action);
        case actionTypes.SUBMIT_COMMENT_FAIL:
            return submitCommentFail(state, action);
        case actionTypes.RESET_INPUT:
            return resetInput(state, action);
        case actionTypes.RESET_MODEL:
            return resetModel(state, action);
        case actionTypes.ANS_CORRECT:
            return ansCorrect(state, action);
        case actionTypes.ANS_WRONG:
            return ansWrong(state, action);
        case actionTypes.CHANGE_CNT_START:
            return changeCntStart(state, action);
        case actionTypes.CHANGE_CNT_CANCEL:
            return changeCntCancel(state, action);
        case actionTypes.CHANGE_CNT_RESET:
            return changeCntReset(state, action);
        case actionTypes.CHANGE_CNT_FAIL:
            return changeCntFail(state, action);
        case actionTypes.CHANGE_CNT:
            return changeCnt(state, action);
        case actionTypes.FETCH_VIDEO_START:
            return fetchVideoStart(state, action);
        case actionTypes.FETCH_VIDEO_FAIL:
            return fetchVideoFail(state, action);
        case actionTypes.FETCH_VIDEO:
            return fetchVideo(state, action);
        case actionTypes.CHANGE_FAVORITE:
            return changeFav(state, action);
        case actionTypes.CHANGE_FAVORITE_PT_START:
            return changeFavPtStart(state, action);
        case actionTypes.CHANGE_FAVORITE_PT_FAIL:
            return changeFavPtFail(state, action);
        case actionTypes.FILTER_POST:
            return filterPost(state, action);
        default: return state
    }
};

export default reducer