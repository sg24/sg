import * as actionTypes from './actionTypes';

export const fetchQueInit = (userID) => {
    return {
        type: actionTypes.FETCH_QUE_INIT,
        userID 
    }
};

export const fetchQueStart = () => {
    return {
        type: actionTypes.FETCH_QUE_START
    }
};


export const fetchQueSuccess = () => {
    return {
        type: actionTypes.FETCH_QUE_SUCCESS
    }
};

export const fetchQueFail = () => {
    return {
        type: actionTypes.FETCH_QUE_FAIL
    }
};

export const fetchQue = (questions) => {
    return {
        type: actionTypes.FETCH_QUE,
        questions
    }
};

export const changeFavQueInit = (questions, filteredQue, queID) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_QUE_INIT,
        questions,
        filteredQue,
        queID
    };
};

export const changeFavQueStart = (questions) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_QUE_START,
        questions
    };
};

export const changeFavQueFail = (questions) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_QUE_START,
        questions
    };
};

export const changeFavQue = (questions) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_QUE,
        questions
    };
};

export const changeFavFilterQue = (filteredQue) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_FILTERQUE,
        filteredQue
    };
};

export const filterQueInit = (que, tag) => {
    return {
        type: actionTypes.FILTER_QUE_INIT,
        que,
        tag
    }
};

export const filterQueStart = () => {
    return {
        type: actionTypes.FILTER_QUE_START
    }
};

export const filterQueSuccess = () => {
    return {
        type: actionTypes.FILTER_QUE_SUCCESS
    }
};

export const filterQueFail = () => {
    return {
        type: actionTypes.FILTER_QUE_FAIL
    }
};

export const filterQue = (que) => {
    return {
        type: actionTypes.FILTER_QUE,
        que
    };
};