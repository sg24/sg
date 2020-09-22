import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    profile: null,
    profileErr: null,
    changeProfileErr: null,
    changeProfileStart: null
};

const fetchProfile = (state, action) => {
    return updateObject(state, {profile: action.profile})
};

const fetchProfileStart = (state, action) => {
    return updateObject(state, {profile: null, profileErr: null, changeProfileErr: null, changeProfileStart: null})
};

const fetchProfileFail = (state, action) => {
    return updateObject(state,{profileErr: action.err})
};

const changeProfileStart = (state, action) => {
    return updateObject(state, {changeProfileStart: {title: action.title, id: action.id, det: action.det, info: action.info, confirm: action.confirm}, changeProfileErr: null})
};

const changeProfileCancel = (state, action) => {
    return updateObject(state, {changeProfileStart: null, changeProfileErr: null})
};

const changeProfile = (state, action) => {
    let profile = {...state.profile};
    function changeMode (oldCnts,changeCntStart,field, isUpdate) {
        let cnts = [{...oldCnts}];
        let curIndex;
    
        let user = cnts.filter((userFnd, index) => {
            curIndex = index;
            return userFnd.id === changeCntStart.id;
        });
        if (user.length > 0) {
            user[0].pending = false;
            user[0].request = false;
            user[0].accept = false;
            user[0][field] = isUpdate;
            cnts[curIndex] = user[0];
           return {...cnts[0]};
        }
        return oldCnts
      }
   
    if (action.changed) {
        if (state.changeProfileStart.det === 'addUser') {
            let updateProfile = changeMode(profile, state.changeProfileStart, 'pending', true);
            return updateObject(state, {profile: updateProfile, changeProfileStart: null, changeProfileErr: null})
        }
    
        if (state.changeProfileStart.det === 'acceptUser') {
            let updateProfile = changeMode(profile, state.changeProfileStart, 'accept', true);
            return updateObject(state, {profile: updateProfile, changeProfileStart: null, changeProfileErr: null})
        }
    
        if (state.changeProfileStart.det === 'rejUser') {
            let updateProfile = changeMode(profile, state.changeProfileStart, 'request', false);
            return updateObject(state, {profile: updateProfile, changeProfileStart: null, changeProfileErr: null})
        }
         
        if (state.changeProfileStart.det === 'cancelReq') {
            let updateProfile = changeMode(profile, state.changeProfileStart, 'pending', false);
            return updateObject(state, {profile: updateProfile, changeProfileStart: null, changeProfileErr: null})
        }
    
        if (state.changeProfileStart.det === 'unfriend') {
            let updateProfile = changeMode(profile, state.changeProfileStart, 'accept', false);
            return updateObject(state, {profile: updateProfile, changeProfileStart: null, changeProfileErr: null})
        }

        if (state.changeProfileStart.det === 'blockUser') {
            let updateProfile = profile.filter(cnt => cnt.id !== state.changeProfileStart.id);
            return updateObject(state, {profile: updateProfile, changeProfileStart: null, changeProfileErr: null})
        }
    
        let updateProfile = profile.filter(cnt => cnt._id !== state.changeProfileStart.id);
        return updateObject(state, {profile: updateProfile, changeProfileStart: null, changeProfileErr: null})
    }

    return updateObject(state, {profile, changeProfileStart: null, changeProfileErr: null})
};

const changeProfileFail = (state, action) => {
    return updateObject(state, {changeProfileErr: action.err})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_START:
            return fetchProfileStart(state, action);
        case actionTypes.FETCH_PROFILE_FAIL:
            return fetchProfileFail(state, action);
        case actionTypes.FETCH_PROFILE:
            return fetchProfile(state, action);
        case actionTypes.CHANGE_PROFILE_START:
            return changeProfileStart(state, action);
        case actionTypes.CHANGE_PROFILE_CANCEL:
            return changeProfileCancel(state, action);
        case actionTypes.CHANGE_PROFILE:
            return changeProfile(state, action);
        case actionTypes.CHANGE_PROFILE_FAIL:
            return changeProfileFail(state, action);
        default: return state
    };
};

export default reducer;