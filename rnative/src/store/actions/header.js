import * as actionTypes from './actionTypes';

export const headerFilterInit = (filterCnt) =>  {
    return {
        type: actionTypes.HEADER_FILTER_INIT,
        filterCnt
    }; 
}; 

export const headerFilterStart = (filterCnt) =>  {
    return {
        type: actionTypes.HEADER_FILTER_START,
        filterCnt
    }; 
}; 

export const headerFilterFail = (searchCntErr) =>  {
    return {
        type: actionTypes.HEADER_FILTER_FAIL,
        searchCntErr
    }; 
}; 

export const headerFilter = (searchCnt) =>  {
    return {
        type: actionTypes.HEADER_FILTER,
        searchCnt
    }; 
}; 

export const headerPageClose = () => {
    return {
        type: actionTypes.HEADER_PAGE_CLOSE
    }
}


export const fetchConvInit = () =>  {
    return {
        type: actionTypes.FETCH_CONV_INIT
    }; 
}; 

export const fetchConvStart = () => {
    return {
        type: actionTypes.FETCH_CONV_START
    };
};

export const fetchConvFail = (err) => {
    return {
        type: actionTypes.FETCH_CONV_FAIL,
        err
    };
};

export const fetchConv = (cnt) => {
    return {
        type: actionTypes.FETCH_CONV,
        cnt
    };
};

export const fetchNotifyInit = () => {
    return {
        type: actionTypes.FETCH_NOTIFY_INIT
    };
};

export const fetchNotifyStart = () => {
    return {
        type: actionTypes.FETCH_NOTIFY_START
    };
};

export const fetchNotifyFail = (err) => {
    return {
        type: actionTypes.FETCH_NOTIFY_FAIL,
        err
    };
};

export const fetchNotify = (notify) =>  {
    return {
        type: actionTypes.FETCH_NOTIFY,
        notify
    };
}; 

export const fetchProfileInit = () => {
    return {
        type: actionTypes.FETCH_PROFILE_INIT
    };
};

export const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    };
};

export const fetchProfileFail = (err) => {
    return {
        type: actionTypes.FETCH_PROFILE_FAIL,
        err
    };
};

export const fetchProfile = (profile) =>  {
    return {
        type: actionTypes.FETCH_PROFILE,
        profile
    };
}; 