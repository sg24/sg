import * as actionTypes from './actionTypes';

export const fetchPtCategInit = () =>  {
    return {
        type: actionTypes.FETCH_PT_CATEG_INIT
    }; 
}; 

export const fetchPtCateg = (ptCateg) =>  {
    return {
        type: actionTypes.FETCH_PT_CATEG,
        ptCateg
    }; 
}; 