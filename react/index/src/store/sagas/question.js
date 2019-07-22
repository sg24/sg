import { put } from 'redux-saga/effects';

import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';

export function* fetchQueInitSaga(action) {
    const data = [{
        id: '546447737378',
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
        id: '7388383838',
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
        id: '36637727',
        author: 'user user',
        authorID: 'user_ids',
        userImage: '/',
        queCreated: '2m ago',
        category: 'poet',
        queImage: '/',
        answers: 99,
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
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

    yield put(actions.fetchQue(queArray));
}


export function* changeFavQueSaga(action) {
    if (action.filteredQue && action.filteredQue.length > 0) {
        yield put(actions.changeFavFilterQue(changeFav(action.filteredQue, action.queID)));
    }
    yield put(actions.changeFavQue(changeFav(action.questions ,action.queID)));
}

export function* filterQueInitSaga(action) {
    const questions = [...action.que];
    let filteredQue = questions.filter(que => que.category === action.tag);
    yield put(actions.filterQue(filteredQue))
}