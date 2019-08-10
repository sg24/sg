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

export const hidAddItm = () =>  {
    return {
        type: actionTypes.HID_ADD_ITM,
    }; 
}; 

export const showAddItm = () =>  {
    return {
        type: actionTypes.SHOW_ADD_ITM,
    }; 
}; 

export const checkImageInit = (imageLink) =>  {
    return {
        type: actionTypes.CHECK_IMAGE_INIT,
        imageLink
    }; 
}; 

export const checkImage = (isValid) =>  {
    return {
        type: actionTypes.CHECK_IMAGE,
        isValid
    }; 
}; 

export const selectImage = (isValid) =>  {
    return {
        type: actionTypes.SELECT_IMAGE
    }; 
}; 

export const addImage = (image) =>  {
    return {
        type: actionTypes.ADD_IMAGE,
        image
    }; 
}; 