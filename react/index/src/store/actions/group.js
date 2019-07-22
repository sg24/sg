import * as actionTypes from './actionTypes';

export const fetchGroupInit = (userID) => {
    return {
        type: actionTypes.FETCH_GRP_INIT,
        userID
    }
};

export const fetchGroup = (groups) => {
    return {
        type: actionTypes.FETCH_GRP,
        groups
    };
};

export const filterGrpInit = (groups, tag) => {
    return {
        type: actionTypes.FILTER_GRP_INIT,
        groups,
        tag
    };
};

export const filterGrpStart = () => {
    return {
        type: actionTypes.FILTER_GRP_START
    }
};

export const filterGrpSuccess = () => {
    return {
        type: actionTypes.FILTER_GRP_SUCCESS
    }
};

export const filterGrpFail = () => {
    return {
        type: actionTypes.FILTER_GRP_FAIL
    }
};

export const filterGrp = (filteredGrp) => {
    return {
        type: actionTypes.FILTER_GRP,
        filteredGrp
    };
};