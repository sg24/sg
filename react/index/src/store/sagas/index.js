import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { fetchPostInitSaga, changeFavSaga, filterPostInitSaga } from './post';
import { fetchQueInitSaga, changeFavQueSaga, filterQueInitSaga } from './question';
import { fetchGroupInitSaga, filterGrpInitSaga } from './group';
import { fetchHelpMeQueInitSaga, changeFavHelpMeQueSaga, filterHelpmeQueSaga } from './helpme';
import { fetchPoetInitSaga, changeFavPwtSaga, filterPoetInitSaga } from './poet';
import { fetchUsersInitSaga, filterUserInitSaga, filterUserSelectInitSaga, shareUserInitSaga } from './share';
import { fetchTagsInitSaga } from './tags';
import { fetchTrdInitSaga, changeFavTrdSaga } from './trend';
import { fetchCategInitSaga } from './setQue';
import { fetchConvInitSaga } from './conv';

export function* watchPt() {
    yield all([
        takeEvery(actionTypes.FETCH_POST_INIT, fetchPostInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_INIT, changeFavSaga),
        takeEvery(actionTypes.FILTER_POST_INIT, filterPostInitSaga)
    ])
} 

export function* watchQue() {
    yield all([
        takeEvery(actionTypes.FETCH_QUE_INIT, fetchQueInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_QUE_INIT, changeFavQueSaga),
        takeEvery(actionTypes.FILTER_QUE_INIT, filterQueInitSaga)
    ])
} 

export function* watchGrp() {
    yield takeEvery(actionTypes.FETCH_GRP_INIT, fetchGroupInitSaga);
    yield takeEvery(actionTypes.FILTER_GRP_INIT, filterGrpInitSaga);
}

export function* watchHelpMeQue() {
    yield takeEvery(actionTypes.FETCH_HELPMEQUE_INIT, fetchHelpMeQueInitSaga);
    yield takeEvery(actionTypes.CHANGE_FAVORITE_HELPMEQUE_INIT, changeFavHelpMeQueSaga);
    yield takeEvery(actionTypes.FILTER_HELPMEQUE_INIT, filterHelpmeQueSaga);
}

export function* watchPoet() {
    yield takeEvery(actionTypes.FETCH_POET_INIT, fetchPoetInitSaga);
    yield takeEvery(actionTypes.CHANGE_FAVORITE_POET_INIT, changeFavPwtSaga);
    yield takeEvery(actionTypes.FILTER_POET_INIT, filterPoetInitSaga);
}

export function* watchShare() {
    yield all([
        takeEvery(actionTypes.FETCH_USERS_INIT, fetchUsersInitSaga),
        takeEvery(actionTypes.FILTER_USER_INIT, filterUserInitSaga),
        takeEvery(actionTypes.FILTER_USER_SELECT_INIT, filterUserSelectInitSaga),
        takeEvery(actionTypes.SHARE_USER_INIT, shareUserInitSaga),
    ])

}

export function* watchTags() {
    yield takeEvery(actionTypes.FETCH_TAGS_INIT, fetchTagsInitSaga)
}

export function* watchTrd() {
    yield all([
        takeEvery(actionTypes.FETCH_TRD_INIT, fetchTrdInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_TRD_INIT, changeFavTrdSaga)
    ])
}

export function* watchSetQue() {
    yield takeEvery(actionTypes.FETCH_CATEG_INIT, fetchCategInitSaga)
}

export function* watchConv() {
    yield takeEvery(actionTypes.FETCH_CONV_INIT, fetchConvInitSaga)
}