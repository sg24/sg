import * as actionTypes from './actionTypes';

export const fetchCntInit = (id) =>  {
    return {
        type: actionTypes.FETCH_CNT_INIT,
        id
    }; 
}; 

export const fetchCntStart = () =>  {
    return {
        type: actionTypes.FETCH_CNT_START
    }; 
}; 

export const fetchCntFail = (err) =>  {
    return {
        type: actionTypes.FETCH_CNT_FAIL,
        err
    }; 
}; 

export const fetchCnt = (cnt) =>  {
    return {
        type: actionTypes.FETCH_CNT,
        cnt
    }; 
}; 