import * as actionTypes from './actionTypes';

export const fetchCntInit = (userID) => {
    return {
        type: actionTypes.FETCH_CNT_INIT,
        userID
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

export const saveAboutInit = (userDet, userID) => {
    return {
        type: actionTypes.SAVE_ABOUT_INIT,
        userDet,
        userID
    }
};

export const saveAboutStart = () =>{
    return {
        type: actionTypes.SAVE_ABOUT_START
    };
}

export const saveAboutFail = (err) => {
    return {
        type: actionTypes.SAVE_ABOUT_FAIL,
        err
    }
};

export const saveAbout = (det) => {
    return {
        type: actionTypes.SAVE_ABOUT,
        det
    }
};

export const changeImage = (userID) =>  {
    return {
        type: actionTypes.CHANGE_IMAGE,
        userID
    }; 
}; 


export const checkLinkInit = (link) =>  {
    return {
        type: actionTypes.CHECK_LINK_INIT,
        link
    }; 
}; 


export const checkLink = (err) =>  {
    return {
        type: actionTypes.CHECK_LINK,
        err
    }; 
}; 

export const resetLink = () =>  {
    return {
        type: actionTypes.RESET_LINK
    }; 
}; 

export const changePrfImage = (image, url) =>  {
    return {
        type: actionTypes.CHANGE_PRFIMAGE,
        image,
        url
    }; 
}; 

export const submitImageInit = (image, url) => {
    return {
        type: actionTypes.SUBMIT_IMAGE_INIT,
        image,
        url
    }
};

export const submitImageStart = () =>{
    return {
        type: actionTypes.SUBMIT_IMAGE_START
    };
}

export const submitImageFail = (err) => {
    return {
        type: actionTypes.SUBMIT_IMAGE_FAIL,
        err
    }
};

export const submitImage = () => {
    return {
        type: actionTypes.SUBMIT_IMAGE
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