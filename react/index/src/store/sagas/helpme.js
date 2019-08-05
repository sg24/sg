import { put } from 'redux-saga/effects';

import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';

export function* fetchHelpMeQueInitSaga(action) {
    const data = [{
        id: '53363636722',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        queCreated: '2m ago',
        category: 'social',
        answers: 99,
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        helpFull: 11100000,
        notHelpFull: 12000000,
        favorite: 112000,
        liked: true
    }, 
    {
        id: '646377398992',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        queCreated: '2m ago',
        category: 'social',
        answers: 90,
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        helpFull: 1123000,
        notHelpFull: 120000,
        favorite: 10000000,
        liked: false
    },{
        id: '466463723829',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        queCreated: '2m ago',
        category: 'poet',
        queImage: '/',
        answers: 99,
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database The is a description of the sites to be used when this is rendered to the database,this is rendered to the databaseThe is a description of the sites to be used when this is rendered to the database,this is rendered to the databaseThe is a description of the sites to be used when this is rendered to the database,this is rendered to the databaseThe is a description of the sites to be used when this is rendered to the database,this is rendered to the databaseThe is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        helpFull: 1223000,
        notHelpFull: 120000,
        favorite: 10000000,
        liked: true
    }
    ]

    let queArray = [];

    for (let que of data) {
        const newque = {...que};
        const valid = action.userID === newque.authorID;
        const newData = updateObject(que, {userOpt: valid});
        queArray.push(newData);
    }
    
    yield put(actions.fetchHelpMeQue(queArray));
}


export function* changeFavHelpMeQueSaga(action) {
    let que = changeFav(action.questions ,action.queID);
    yield put(actions.changeFavHelpMeQueStart(que.updateStartArray, true))
    if (action.filterQue && action.filterQue.length > 0) {
        let filterQue = changeFav(action.filterQue, action.queID);
        console.log(filterQue)
        yield put(actions.changeFavHelpMeQueStart(filterQue.updateStartArray, false))
        yield put(actions.changeFavFilterHelpMeQue(filterQue.updateDataArray));
    }
    
    yield put(actions.changeFavHelpMeQue(que.updateDataArray));
}

export function* filterHelpmeQueSaga(action) {
    const questions = [...action.que];
    let filterQue = questions.filter(que => que.category === action.tag);
    yield put(actions.filterHelpmeQue(filterQue))
}