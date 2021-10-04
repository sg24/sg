import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    commentBox: {
        fetchLimit: 10,
        highlighted: {
            color: '#fff',
            backgroundColor: '#437da3'
        },
        backgroundImage: null,
        enableBackgroundOverlay: true,
        enableBackgroundImage: true,
        enableHighlighted: true
    },
    page: {
        fetchLimit: 5,
        highlighted: {
            color: '#fff',
            backgroundColor: '#437da3'
        },
        backgroundImage: null,
        enableBackgroundOverlay: true,
        enableBackgroundImage: true,
        enableHighlighted: false
    },
    userPage: {
        fetchLimit: 5
    },
    notification: {
        page: {
            post: true,
            feed: false,
            question: false,
            cbt: false,
            writeup: false,
            advert: false
        },
        group: {
            post: true,
            feed: false,
            question: false,
            cbt: false,
            writeup: false,
            chatroom: true
        },
        share: {
            post: true,
            feed: false,
            question: false,
            cbt: false,
            writeup: false
        }
    },
    friendProfile: true,
    autoLoading: false,
    notificationLimit: 2,
    friendSidebarListLimit: 10,
    highlightBackgroundColor: [{title: 'Red',  color: '#ff1600'},{title: 'Blue', color: '#437da3'},{title: 'Black', color: '#000'}],
    highlightColor: [{title: 'White',  color: '#fff'},{title: 'Black', color: '#000'}],
    backgroundColor: '#fff',
    color: '#333',
    isRTL: false,
    version: 3,
    config: {
        updateError: null, 
        updateStart: false
    }
};

const saveSetting = (state, action) => {
    delete state.config;
    let settings = {...state, ...action.settings};
    if (state.version !== settings.version) {
        for (let option in state) {
            if (JSON.stringify(state[option]) !== JSON.stringify(settings[option])) {
                settings[option] = state[option];
            }
        }
    }
    AsyncStorage.setItem('settings', JSON.stringify(settings));
    return updateObject(state, {...settings, config: { updateError: null, updateStart: false}})
};

const updateSettingsStart = (state, action) => {
    return updateObject(state, {config: {updateError: null, updateStart: true}})
};

const updateSettingsFail= (state, action) => {
    return updateObject(state, {config: {updateError: action.err, updateStart: false}})
};

const updateSettingsReset = (state, action) => {
    return updateObject(state, {config: {updateError: null, updateStart: false}})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SAVE_SETTINGS:
            return saveSetting(state, action);
        case actionTypes.UPDATE_SETTINGS_START:
            return updateSettingsStart(state, action);
        case actionTypes.UPDATE_SETTINGS_FAIL:
            return updateSettingsFail(state, action);
        case actionTypes.UPDATE_SETTINGS_RESET:
            return updateSettingsReset(state, action);
        default: return state
    }
};

export default reducer;