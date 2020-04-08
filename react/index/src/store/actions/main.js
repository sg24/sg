import * as actionTypes from './actionTypes';

export const fetchPtActiveInit = (userID) => {
    return {
        type: actionTypes.FETCH_PT_ACTIVE_INIT,
        userID
    };
};

export const fetchPtActive = (ptActive) => {
    return {
        type: actionTypes.FETCH_PT_ACTIVE,
        ptActive
    };
};

export const fetchQueActiveInit = (queActive) => {
    return {
        type: actionTypes.FETCH_QUE_ACTIVE_INIT,
        queActive
    };
};

export const fetchQueActive = (queActive) => {
    return {
        type: actionTypes.FETCH_QUE_ACTIVE,
        queActive
    };
};

export const fetchCntActiveInit = (userID) => {
    return {
        type: actionTypes.FETCH_CNT_ACTIVE_INIT,
        userID
    };
};

export const fetchCntActive = (cntActive) => {
    return {
        type: actionTypes.FETCH_CNT_ACTIVE,
        cntActive
    };
};

export const fetchShareactiveInit = (userID) =>  {
    return {
        type: actionTypes.FETCH_SHARE_ACTIVE_INIT,
        userID
    }; 
}; 

export const fetchShareActive = (shareActive) =>  {
    return {
        type: actionTypes.FETCH_SHARE_ACTIVE,
        shareActive
    }; 
}; 

export const fetchReqActiveInit = () =>  {
    return {
        type: actionTypes.FETCH_REQ_ACTIVE_INIT
        
    }; 
}; 

export const fetchReqActive = (reqActive) =>  {
    return {
        type: actionTypes.FETCH_REQ_ACTIVE,
        reqActive
    }; 
};

export const fetchShareCntactiveInit = (userID) =>  {
    return {
        type: actionTypes.FETCH_SHARECNT_ACTIVE_INIT,
        userID
    }; 
}; 

export const fetchShareCntActive = (shareCntActive) =>  {
    return {
        type: actionTypes.FETCH_SHARECNT_ACTIVE,
        shareCntActive
    }; 
}; 

export const resetActiveInit = (userID, curTab) => {
    return {
        type: actionTypes.RESET_ACTIVE_INIT,
        userID,
        curTab
    };
};

export const resetActive = (curTab) => {
    return {
        type: actionTypes.RESET_ACTIVE,
        curTab
    };
};

export const fetchNavActiveInit = () => {
    return {
        type: actionTypes.FETCH_NAV_ACTIVE_INIT
    };
};

export const fetchNavActive = (active) => {
    return {
        type: actionTypes.FETCH_NAV_ACTIVE,
        active
    };
};

export const fetchJoinActiveInit = (userID) => {
    return {
        type: actionTypes.FETCH_JOIN_ACTIVE_INIT,
        userID
    };
};

export const fetchJoinActive = (joinActive) => {
    return {
        type: actionTypes.FETCH_JOIN_ACTIVE,
        joinActive
    };
};

export const showMainBackdrop = () => {
    return {
        type: actionTypes.SHOW_MAIN_BACKDROP
    };
};

export const hideMainBackdrop = () => {
    return {
        type: actionTypes.HIDE_MAIN_BACKDROP
    };
};