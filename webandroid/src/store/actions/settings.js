import * as actionTypes from './actionTypes';

export const saveSettings = (settings) => {
    return {
        type: actionTypes.SAVE_SETTINGS,
        settings
    };
};