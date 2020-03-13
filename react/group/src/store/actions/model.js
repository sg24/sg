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

export const joinGrpInit = (id, categ) => {
    return {
        type: actionTypes.JOIN_GRP_INIT,
        id,
        categ
    }
};

export const joinGrpFail = (err, id) => {
    return {
        type: actionTypes.JOIN_GRP_FAIL,
        err,
        id
    }
};

export const joinGrpStart = (id) => {
    return {
        type: actionTypes.JOIN_GRP_START,
        id
    }
};

export const joinGrp = (id, categ) => {
    return {
        type: actionTypes.JOIN_GRP,
        id,
        categ
    }
};

export const fetchVideo = (id, url) => {
    return {
        type: actionTypes.FETCH_VIDEO,
        id,
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

export const removeRequest = (id) => {
    return {
        type: actionTypes.REMOVE_REQUEST,
        id
    }
};