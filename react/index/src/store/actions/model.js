import * as actionTypes from './actionTypes';

export const fetchCntInit = (userID, fetchType, fetchLimit, skipCnt, cntTotal) => {
    return {
        type: actionTypes.FETCH_CNT_INIT,
        userID,
        fetchType,        
        fetchLimit,
        skipCnt,
        cntTotal
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

export const fetchCnt = (cnt, skipCnt, cntTotal) => {
    return {
        type: actionTypes.FETCH_CNT,
        cnt,
        skipCnt,
        cntTotal
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

export const resetModel = () => {
    return {
        type: actionTypes.RESET_MODEL
    }
};