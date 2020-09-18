import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    profile: null,
    profileErr: null
};

const fetchProfile = (state, action) => {
    return updateObject(state, {profile: action.profile})
};

const fetchProfileStart = (state, action) => {
    return updateObject(state, {profile: null, profileErr: null})
};

const fetchProfileFail = (state, action) => {
    return updateObject(state,{profileErr: action.err})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_START:
            return fetchProfileStart(state, action);
        case actionTypes.FETCH_PROFILE_FAIL:
            return fetchProfileFail(state, action);
        case actionTypes.FETCH_PROFILE:
            return fetchProfile(state, action);
        default: return state
    };
};

export default reducer;