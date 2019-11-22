import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';


export function* submitFormInitSaga (action) {
    yield put(actions.submitFormStart());

    try {
        yield axios.post('/login', action.formData);
        yield put(actions.formSubmitted())
    } catch(err) {
        let error = null
        if (err.response) {
            if(err.response.data && err.response.data.keyValue) {
                for (let key in err.response.data.keyValue) {
                    if (key === 'email') {
                        error = `${key}  already taken`;
                    } else if (key === 'username') {
                        error = `${key} already taken`;
                    } else {
                        error = err.message
                    }
                }
            } else if(err.response.data.errno) {
                error = err.response.data.errno
            } else {
                error = err.response.data
            }
            
          } else {
              error = err.message
          }
       yield put(actions.submitFormFail(error))
    }
} 