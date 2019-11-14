import * as actionTypes from './actionTypes';

export const fetchCntInit = (model,id) => {
    return {
        type: actionTypes.FETCH_CNT_INIT,
        model,
        id
    }
};

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

export const changeCntInit = (id, title, det, confirm) => {
    return {
        type: actionTypes.CHANGE_CNT_INIT,
        id, 
        title,
        det,
        confirm
    }
};

export const changeCntStart = (title, id, det) => {
    return {
        type: actionTypes.CHANGE_CNT_START,
        title,
        id,
        det
    }
};

export const changeCntCancel = () => {
    return {
        type: actionTypes.CHANGE_CNT_CANCEL
    }
};

export const changeCntReset = () => {
    return {
        type: actionTypes.CHANGE_CNT_RESET
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