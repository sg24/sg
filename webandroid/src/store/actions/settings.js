import * as actionTypes from './actionTypes';

export const saveSettings = (settings) => {
    return {
        type: actionTypes.SAVE_SETTINGS,
        settings
    };
};


export const updateSettingsInit = (page, pageID, cntID, cnt) => {
    return {
        type: actionTypes.UPDATE_SETTINGS_INIT,
        page,
        pageID,
        cntID,
        cnt
    };
};

export const updateSettingsStart = () =>  {
    return {
        type: actionTypes.UPDATE_SETTINGS_START
    };
};

export const  updateSettingsFail = (err) => {
    return {
        type: actionTypes.UPDATE_SETTINGS_FAIL,
        err
    };
};


export const updateSettingsReset = () =>  {
    return {
        type: actionTypes.UPDATE_SETTINGS_RESET
    };
};