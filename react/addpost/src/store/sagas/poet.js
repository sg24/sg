import { put } from 'redux-saga/effects';

import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';

export function* fetchPoetInitSaga(action) {
    const data = [{
        id: '464738383838',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        poetCreated: '2m ago',
        category: 'Quote',
        desc: 'The quote is the best nature of lif, this is from the databaseThe quote is the best nature of lif, this is from the database',
        helpFull: 11100000,
        favorite: 120,
        comment: 12000000,
        liked: false
    }, 
    {
        id: '948784747',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        poetCreated: '2m ago',
        category: 'poem',
        desc: 'The quote is the best nature of lif, this is from the databaseThe quote is the best nature of lif, this is from the database',
        helpFull: 11100000,
        favorite: 12000000,
        comment: 12000000,
        liked: false
    },{
        id: '73728929299',
        author: 'user user',
        authorID: 'user_ids',
        userImage: '/',
        poetCreated: '2m ago',
        category: ['social', 'paid'],
        desc: 'The quote is the best nature of lif, this is from the databaseThe quote is the best nature of lif, this is from the database',
        helpFull: 11100000,
        favorite: 12000000,
        comment: 12000000,
        liked: true
    }
    ] 

    let ptArray = [];

    for (let pt of data) {
        const newPt = {...pt};
        const valid = action.userID === newPt.authorID;
        const newData = updateObject(pt, {userOpt: valid});
        ptArray.push(newData);
    }
    

    yield put(actions.fetchPoet(ptArray));
}


export function* changeFavPwtSaga(action) {
    let poet = changeFav(action.poets ,action.pwtID);
    yield put(actions.changeFavPoetStart(poet.updateStartArray, true))
    if (action.filterPoet && action.filterPoet.length > 0) {
        let filterPoet = changeFav(action.filterPoet, action.pwtID)
        yield put(actions.changeFavPoetStart(filterPoet.updateStartArray, false))
        yield put(actions.changeFavFilterPoet(filterPoet.updateDataArray));
    }
    yield put(actions.changeFavPoet(poet.updateDataArray));
}

export function* filterPoetInitSaga(action) {
    const poets = [...action.poets];
    let filterPoet = poets.filter(poet => poet.category === action.tag);
    yield put(actions.filterPoet(filterPoet))
}