import * as actionTypes from './actionTypes';

export const fetchPtCategInit = (categ) => {
    return {
        type: actionTypes.FETCH_PTCATEG_INIT,
        categ
    }
}; 

export const fetchPtCategStart = () => {
    return {
        type: actionTypes.FETCH_PTCATEG_START
    }
};

export const fetchPtCateg = (categ) => {
    return {
        type: actionTypes.FETCH_PTCATEG,
        categ
    }
};