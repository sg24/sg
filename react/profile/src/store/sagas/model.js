import { put, delay } from 'redux-saga/effects';
import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

import fileAxios from 'axios';

export function* fetchCntInitSaga(action) {
    try {
        let response = yield axios.get(`/user/profile/${action.userID}`, {
            headers: {
                'data-categ': 'userdet'}});
        let cnt = response.data  ? response.data : {}
        yield put(actions.fetchCnt(cnt));
    } catch(err){
        yield put(actions.fetchCntFail(err))
    }
    
}

export function* saveAboutInitSaga(action) {
    try {
        yield put(actions.saveAboutStart())
        yield axios.post(`/user/profile`, {det: action.userDet}, {
            headers: {
                'data-categ': 'about'}});
        yield put(actions.saveAbout(action.userDet));
    } catch(err){
        yield put(actions.saveAboutFail(err))
    }
    
}

export function* submitImageInitSaga(action) {
    try {
        yield put(actions.submitImageStart())
        yield axios.post(`/user/profile`, {image: action.image}, {
            headers: {
                'data-categ': 'profileImage'}});
        yield put(actions.submitImage());
        yield put(actions.checkUserImg(action.url));
    } catch(err){
        yield put(actions.submitImageFail(err))
    }
    
}

export function* checkLinkInitSaga(action) {
    let link = String(action.link).trim();
    try {
        let response = yield fileAxios.get(link, {responseType: 'blob', timeout: 8000});
        if (response.data.type.startsWith('image/')) {
            yield put(actions.checkLink(null));   
            return;
        }
        throw new Error(`Unknown format, Only Image file`);
       
    } catch(err) {
        yield put(actions.checkLink(err));   
    }
}

export function* changeFavSaga(action) {
    let updateFav = changeFav(action.id ,action.liked, action.favAdd, action.changedFav);
    yield put(actions.changeMainFavoriteStart(updateFav.favDet.liked));
    yield put(actions.changeFavPtStart(updateFav.favDet.id, updateFav.favDet.liked))
    try {
        let field = action.cntGrp === 'post' ? 'postID' : action.cntGrp === 'question' ?
        'queID' : 'pwtID';
        yield axios.patch('/header', {id: updateFav.favDet.id, model: action.cntGrp, field},{headers: {'data-categ': 'changefavorite'}});
        yield delay(500)
        yield put(actions.changeMainFavoriteReset());
        yield put(actions.changeFav(updateFav.updateChangeFav));
    }catch(err){
        yield delay(500)
        yield put(actions.changeMainFavoriteReset());
        yield put(actions.changeFavPtFail())
    }
}

export function* changeCntInitSaga(action) {
    let field =   action.modelType === 'post' ? 'postID' : action.modelType === 'question' ? 'queID' : 'pwtID'
    if (!action.confirm) {
        yield put(actions.changeCntStart(action.title, action.id, action.det, action.modelType))
        return;
    }
    if (action.det === 'addUser') {
        yield put(actions.changeCntStart(action.title, action.id, action.det, action.modelType))
    }

    try {
        if (action.det === 'delete') {
            let payload = JSON.stringify({id: action.id, model: action.modelType, field})
            yield axios.delete('/header', {headers: {'data-categ': `deletecnt-${payload}`}});
        } else if (action.modelType === 'user') {
            yield axios.patch('/users', {id: action.id}, {headers: {'data-categ': action.det}});
        } else {
            yield axios.patch('/header', {id: action.id, model: action.modelType, field} ,{headers: {'data-categ': 'draftmode'}});
        }
        yield put(actions.changeCnt())
        yield delay(1000);
        yield put(actions.changeCntReset(true))
    } catch(err){
        yield put(actions.changeCntFail(err))
        yield delay(1000);
        yield put(actions.changeCntReset(false))
    }
}