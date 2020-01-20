import * as actionTypes from './actionTypes';

export const fetchCntInit = (categ, id) => {
    return {
        type: actionTypes.FETCH_CNT_INIT,
        categ,
        id
    }
};

export const fetchCntStart = () =>{
    return {
        type: actionTypes.FETCH_CNT_START
    };
}

export const fetchCntReset = () =>{
    return {
        type: actionTypes.FETCH_CNT_RESET,
    };
}

export const fetchCntFail = (err) => {
    return {
        type: actionTypes.FETCH_CNT_FAIL,
        err
    }
};

export const fetchCnt = (cnt) => {
    return {
        type: actionTypes.FETCH_CNT,
        cnt
    }
};

export const submitCommentStart = () =>{
    return {
        type: actionTypes.SUBMIT_COMMENT_START
    };
}

export const submitCommentFail = (err) => {
    return {
        type: actionTypes.SUBMIT_COMMENT_FAIL,
        err
    }
};

export const submitComment = (id, categ, cnt) => {
    return {
        type: actionTypes.SUBMIT_COMMENT,
        id,
        categ,
        cnt
    }
};

export const resetInput = () => {
    return {
        type: actionTypes.RESET_INPUT
    }
};

export const resetModel = () => {
    return {
        type: actionTypes.RESET_MODEL
    }
};

export const ansCorrectInit = (commentID, categ, replyID) => {
    return {
        type: actionTypes.ANS_CORRECT_INIT,
        commentID,
        categ,
        replyID
    }
};

export const ansCorrectFail = (err) => {
    return {
        type: actionTypes.ANS_CORRECT_FAIL,
        err
    }
};

export const ansCorrect = (commentID, categ, replyID) => {
    return {
        type: actionTypes.ANS_CORRECT,
        commentID,
        categ,
        replyID
    }
};

export const ansWrongInit = (commentID, categ, replyID) => {
    return {
        type: actionTypes.ANS_WRONG_INIT,
        commentID,
        categ,
        replyID
    }
};

export const ansWrongFail = (err) => {
    return {
        type: actionTypes.ANS_WRONG_FAIL,
        err
    }
};

export const ansWrong = (commentID, categ, replyID) => {
    return {
        type: actionTypes.ANS_WRONG,
        commentID,
        categ,
        replyID
    }
};

export const changeCntInit = (id, title, det, confirm, modelType) => {
    return {
        type: actionTypes.CHANGE_CNT_INIT,
        id, 
        title,
        det,
        confirm,
        modelType
    }
};

export const changeCntStart = (title, id, det,  modelType) => {
    return {
        type: actionTypes.CHANGE_CNT_START,
        title,
        id,
        det,
        modelType
    }
};

export const changeCntCancel = () => {
    return {
        type: actionTypes.CHANGE_CNT_CANCEL
    }
};

export const changeCntReset = (changed) => {
    return {
        type: actionTypes.CHANGE_CNT_RESET,
        changed
    }
};

export const changeCntFail = (err) => {
    return {
        type: actionTypes.CHANGE_CNT_FAIL,
        err
    }
};

export const changeCnt= () => {
    return {
        type: actionTypes.CHANGE_CNT
    }
};

export const fetchVideoInit = (videoID, ptVideoID) => {
    return {
        type: actionTypes.FETCH_VIDEO_INIT,
        videoID,
        ptVideoID
    }
};

export const fetchVideoStart = (ptVideoID) => {
    return {
        type: actionTypes.FETCH_VIDEO_START,
        ptVideoID
    }
};

export const fetchVideoFail = (err) => {
    return {
        type: actionTypes.FETCH_VIDEO_FAIL,
        err
    }
};

export const fetchVideo = (url) => {
    return {
        type: actionTypes.FETCH_VIDEO,
        url
    }
};

export const changeFavInit = (id, liked, favAdd, changedFav, userID, cntGrp) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_INIT,
        id,
        liked,
        favAdd,
        changedFav,
        userID,
        cntGrp
    };
};

export const changeFavPtStart = (id, isLiked) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_PT_START,
        id,
        isLiked
    };
};

export const changeFavPtFail = () => {
    return {
        type: actionTypes.CHANGE_FAVORITE_PT_FAIL
    };
};

export const changeFav = (changedFav) => {
    return {
        type: actionTypes.CHANGE_FAVORITE,
        changedFav
    };
};

export const setCommentID = (commentID, categ) => {
    return {
        type: actionTypes.SET_COMMENTID,
        commentID,
        categ
    };
};