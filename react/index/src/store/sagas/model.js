import { put, delay } from 'redux-saga/effects';
import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    let fetchType = action.fetchType.split('-')[0];
    let model = fetchType === 'post' ? '/post' : fetchType === 'question' || fetchType === 'shared' ?
    '/question':'/'+fetchType;
    let categ = fetchType === 'shared' ? `shared-${action.userID}` : action.fetchType.split('-')[1] ? action.fetchType.split('-').splice(1).join('-') : action.fetchType.split('-')[0];
    if (action.cntTotal > action.skipCnt) {
        yield put(actions.fetchCntStart());
    }

    try {
        if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
            let response = yield axios.post(model, null,{
                headers: {
                    'data-categ': categ,
                    'limit': action.fetchLimit, 
                    'skip': action.skipCnt}});
            yield put(actions.fetchCnt(response.data.cnt, action.skipCnt, response.data.cntTotal));
        }  
        
    } catch(err){
        yield put(actions.fetchCntFail(err))
    }
    
}

export function* changeFavSaga(action) {
    let updateFav = changeFav(action.id ,action.liked, action.favAdd, action.changedFav);
    yield put(actions.changeMainFavoriteStart(updateFav.favDet.liked));
    yield put(actions.changeFavPtStart(updateFav.favDet.id, updateFav.favDet.liked))
    try {
        let field = action.cntGrp === 'post' ? 'postID' : action.cntGrp === 'question' ?
        'queID' : action.cntGrp === 'advert' ? 'advertID' : action.cntGrp === 'aroundme' ? 'aroundID' : 'pwtID';
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

export function* joinGrpInitSaga(action) {
    yield put(actions.joinGrpStart(action.id));
    try {
        yield axios.post('/group', {id: action.id}, {
            headers: {
                'data-categ': action.categ}});
        yield put(actions.joinGrp(action.id, action.categ));
    }catch(err){
        yield put(actions.joinGrpFail(err, action.id))
    }
}

export function* changeCntInitSaga(action) {
    let field =   action.modelType === 'post' ? 'postID' : action.modelType === 'question' ? 'queID' : 
    action.modelType === 'advert' ? 'advertID' : action.modelType === 'qchat' ? 'qchatID' : 
    action.modelType === 'aroundme' ? 'aroundID' : 'pwtID';
    if (!action.confirm) {
        yield put(actions.changeCntStart(action.title, action.id, action.det, action.modelType))
        return;
    }
    if (action.det === 'addUser') {
        yield put(actions.changeCntStart(action.title, action.id, action.det, action.modelType))
    }

    try {
        if (action.modelType === 'exitgroup') {
            yield axios.post('/group', {id: action.id}, {
                headers: {'data-categ': 'exitgroup'}})
            window.location.reload()
            return
        }

        if (action.modelType === 'aroundme') {
            yield axios.post('/aroundme', {id: action.id}, {
                headers: {'data-categ': 'deletearoundme'}})
            window.location.reload()
            return
        } 

        if (action.modelType === 'deleteqchat') {
            yield axios.post('/qchat', {id: action.id}, {
                headers: {'data-categ': 'deleteqchat'}})
            window.location.reload()
            return
        } 

        if (action.modelType === 'contest') {
            yield axios.post('/contest', {id: action.id}, {
                headers: {'data-categ': 'deletecontest'}})
            window.location.reload()
            return
        } 

        if (action.modelType === 'deletegroup') {
            yield axios.post('/group', {id: action.id}, {
                headers: {'data-categ': 'deletegroup'}})
            window.location.reload()
            return
        } 

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