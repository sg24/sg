import * as actionTypes from './actionTypes';

export const filterGrpUserInit = (users, filterContent) => {
    return {
        type: actionTypes.FILTER_GRPUSER_INIT,
        users,
        filterContent
    };
};

export const filterGrpUser = (users) => {
    return {
        type: actionTypes.FILTER_GRPUSER,
        users
    };
};

export const shareCnt = (cnt) => {
    return {
        type: actionTypes.SHARE_CNT,
        cnt
    };
};

export const shareGrpUser = () => {
    return {
        type: actionTypes.SHARE_GRPUSER
    };
};

export const fetchInfoInit = (id, status) => {
    return {
        type: actionTypes.FETCH_INFO_INIT,
        id,
        status
    };
};

export const fetchInfoStart = (curTab) => {
    return {
        type: actionTypes.FETCH_INFO_START,
        curTab
    };
};

export const fetchInfoFail = (err) => {
    return {
        type: actionTypes.FETCH_INFO_FAIL,
        err
    };
};

export const fetchInfo = (users) => {
    return {
        type: actionTypes.FETCH_INFO,
        users
    };
};

export const setGrpInfo = (grpInfo) => {
    return {
        type: actionTypes.SET_GRP_INFO,
        grpInfo
    };
};


export const resetInputFilter = () => {
    return {
        type: actionTypes.RESET_INPUT_FILTER
    };
};


export const changeGrpCntInit = (id, user, categ, username, curTab, confirm) => {
    return {
        type: actionTypes.CHANGE_GRPCNT_INIT,
        id, 
        user,
        categ,
        username,
        curTab,
        confirm
    }
};
export const changeGrpCntStartInit = (userID, categ) => {
    return {
        type: actionTypes.CHANGE_GRPCNT_STARTINIT,
        userID,
        categ
    }
};

export const changeGrpCntStart = ( id, user, categ,username, curTab) => {
    return {
        type: actionTypes.CHANGE_GRPCNT_START,
        id,
        user,
        categ,
        username,
        curTab   
    }
};

export const changeGrpCntCancel = () => {
    return {
        type: actionTypes.CHANGE_GRPCNT_CANCEL
    }
};

export const changeGrpCntReset = (user) => {
    return {
        type: actionTypes.CHANGE_GRPCNT_RESET,
        user
    }
};

export const changeGrpCntFail = (err) => {
    return {
        type: actionTypes.CHANGE_GRPCNT_FAIL,
        err
    }
};

export const changeGrpCnt= () => {
    return {
        type: actionTypes.CHANGE_GRPCNT
    }
};
