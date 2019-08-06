import * as actionTypes from './actionTypes';

export const fetchHelpMeQueInit = (userID) => {
    return {
        type: actionTypes.FETCH_HELPMEQUE_INIT,
        userID
    };
}; 

export const fetchHelpMeQueStart = () => {
    return {
        type: actionTypes.FETCH_HELPMEQUE_START
    }
};


export const fetchHelpMeQueSuccess = () => {
    return {
        type: actionTypes.FETCH_HELPMEQUE_SUCCESS
    }
};

export const fetchHelpMeQueFail = () => {
    return {
        type: actionTypes.FETCH_HELPMEQUE_FAIL
    }
};

export const fetchHelpMeQue = (questions) => {
    return {
        type: actionTypes.FETCH_HELPMEQUE,
        questions
    };
}; 

export const changeFavHelpMeQueInit = (questions, filterQue, queID) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_HELPMEQUE_INIT,
        questions,
        filterQue,
        queID
    };
};

export const changeFavHelpMeQueStart = (questions, queArray) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_HELPMEQUE_START,
        questions,
        queArray
    };
};

export const changeFavHelpMeQueFail = (questions) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_HELPMEQUE_FAIL,
        questions
    };
};

export const changeFavHelpMeQue = (questions) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_HELPMEQUE,
        questions
    };
};

export const changeFavFilterHelpMeQue = (filterQue) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_FILTERHELPMEQUE,
        filterQue
    };
};

export const filterHelpmeQueInit = (que, tag) => {
    return {
        type: actionTypes.FILTER_HELPMEQUE_INIT,
        que,
        tag
    };
};

export const filterHelpmeQueStart = () => {
    return {
        type: actionTypes.FILTER_HELPMEQUE_START
    }
};

export const filterHelpmeQueSuccess = () => {
    return {
        type: actionTypes.FILTER_HELPMEQUE_SUCCESS
    }
};

export const filterHelpmeQueFail = () => {
    return {
        type: actionTypes.FILTER_HELPMEQUE_FAIL
    }
};

export const filterHelpmeQue = (filterQue) => {
    return {
        type: actionTypes.FILTER_HELPMEQUE,
        filterQue
    };
};