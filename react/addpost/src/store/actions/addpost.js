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

export const addPtCategInit = (categ) =>  {
    return {
        type: actionTypes.ADD_PT_CATEG_INIT,
        categ
    }; 
}; 

export const addPtCateg = (ptCateg) =>  {
    return {
        type: actionTypes.ADD_PT_CATEG,
        ptCateg
    }; 
}; 