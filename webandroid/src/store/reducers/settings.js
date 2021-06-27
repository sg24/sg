import AsyncStorage from '@react-native-community/async-storage';

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
        fetchLimit: 20
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
    version: 2
};

const saveSetting = (state, action) => {
    let settings = action.settings;
    if (action.settings.version !== state.version) {
        let updateSettings = state;
        AsyncStorage.setItem('settings', JSON.stringify(updateSettings));
        settings = updateSettings;
    }
    return updateObject(state, settings)
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SAVE_SETTINGS:
            return saveSetting(state, action);
        default: return state
    }
};

export default reducer;