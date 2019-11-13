import { put, delay } from 'redux-saga/effects';
import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    try {
        if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
            let response =  yield axios.get('/poet', {
                headers: {
                    'data-categ': action.fetchType, 
                    'limit': action.fetchLimit, 
                    'skip': action.skipCnt}});
            let cntArray = [];
            if (response.data.cnt && response.data.cnt.length > 0 ) { 
                for (let cnt of response.data.cnt) {
                    const newCnt = {...cnt};
                    let liked = false;
                    for (let userID of newCnt.liked) {
                        if(action.userID === userID) {
                            liked = true
                        }
                    }
                    const valid = action.userID === newCnt.authorID;
                    const author = 'user' +  newCnt._id;
                    const newData = updateObject(newCnt, {author,userOpt: valid, liked});
                    cntArray.push(newData);
                }
                yield put(actions.fetchCnt(cntArray, action.skipCnt, response.data.cntTotal));
            }

            if (response.data.cnt.length === 0) {
                yield put(actions.fetchCnt([]));
            }
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
        yield axios.patch('/post', {id: updateFav.favDet.id, userID: action.userID, model: action.cntGrp})
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
    if (!action.confirm) {
        yield put(actions.changeCntStart(action.title, action.id, action.det))
        return;
    }
    try {
        if (action.det === 'delete') {
            yield axios.delete('/poet', {headers: {'data-categ': 'deleteCnt-'+action.id}});
        } else {
            yield axios.patch('/poet', {id: action.id} ,{headers: {'data-categ': 'changemode'}});
        }
        yield put(actions.changeCnt())
        yield delay(1000);
        yield put(actions.changeCntReset())
    } catch(err){
        yield put(actions.changeCntFail(err))
        yield delay(1000);
        yield put(actions.changeCntReset())
    }
}