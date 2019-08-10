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

export const showAddItm = () =>  {
    return {
        type: actionTypes.SHOW_ADD_ITM,
    }; 
}; 

export const checkLinkInit = (link) =>  {
    return {
        type: actionTypes.CHECK_LINK_INIT,
        link
    }; 
}; 

export const checkLink = (isValid) =>  {
    return {
        type: actionTypes.CHECK_LINK,
        isValid
    }; 
}; 

export const resetLink = () =>  {
    return {
        type: actionTypes.RESET_LINK
    }; 
}; 

export const submitMedia = (media) =>  {
    return {
        type: actionTypes.SUBMIT_MEDIA,
        media
    }; 
}; 

export const hideMediaBox = () =>  {
    return {
        type: actionTypes.HIDE_MEDIA_BOX,
    }; 
}; 
