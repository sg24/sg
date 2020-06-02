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

export const removeRequest = (id) => {
    return {
        type: actionTypes.REMOVE_REQUEST,
        id
    }
};

export const resetModel = () => {
    return {
        type: actionTypes.RESET_MODEL
    }
};

export const showPreview = (media) => {
    return {
        type: actionTypes.SHOW_PREVIEW,
        media
    }
};