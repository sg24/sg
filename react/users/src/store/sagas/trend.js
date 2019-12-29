import { put } from 'redux-saga/effects';

import { updateObject } from '../../shared/utility';
import axios from '../../axios';
import * as actions from '../../store/actions/index';

export function* fetchTrdInitSaga(action) {
    try {
        let response = yield axios.post('/header', {},{headers: {'data-categ':'trend'}});
        console.log(response)
        let updateTrd = [];
        for (let trd of response.data) {
            let liked = false;
            for (let userID of trd.liked) {
                if(action.userID === userID) {
                    liked = true
                }
            }
            const newData = updateObject(trd, {liked});
            updateTrd.push(newData)
        }
        yield put(actions.fetchTrd(updateTrd));
        
    }  catch(e) {}

  
}
