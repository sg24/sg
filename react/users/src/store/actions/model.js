import * as actionTypes from './actionTypes';

export const fetchCntInit = (fetchType, fetchLimit, skipCnt, cntTotal) => {
    return {
        type: actionTypes.FETCH_CNT_INIT,
        fetchType,        
        fetchLimit,
        skipCnt,
        cntTotal
    }
};

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