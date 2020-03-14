import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    
};

const formSubmitted = (state, action) => {
    return updateObject(state, {id: action.id})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        default: return state
    };
};

export default reducer;