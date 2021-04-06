import AsyncStorage from '@react-native-community/async-storage';

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    commentBox: {
        highlighted: {
            color: '#fff',
            backgroundColor: '#437da3'
        },
        backgroundImage: null,
        enableBackgroundOverlay: true,
        enableBackgroundImage: true
    },
    page: {
        fetchLimit: 5,
        highlighted: {
            color: '#fff',
            backgroundColor: '#437da3'
        },
        backgroundImage: null,
        enableBackgroundOverlay: true,
        enableBackgroundImage: true
    },
    highlightBackgroundColor: [{title: 'Red',  color: '#ff1600'},{title: 'Blue', color: '#437da3'},{title: 'Black', color: '#000'}],
    highlightColor: [{title: 'White',  color: '#fff'},{title: 'Black', color: '#000'}],
    backgroundColor: '#437da3',
    color: '#333',
    version: 1
};

const saveSetting = (state, action) => {
    let settings = action.settings;
    if (action.settings.version !== state.version) {
        let updateSettings = updateObject(state, {...action.settings, version: state.version});
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