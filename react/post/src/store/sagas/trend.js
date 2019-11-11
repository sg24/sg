import { put } from 'redux-saga/effects';

import { updateObject } from '../../shared/utility';
import axios from '../../axios';
import * as actions from '../../store/actions/index';

export function* fetchTrdInitSaga(action) {
    // const data = [{
    //     id: '234444',
    //     cntGrp: 'post',
    //     category: 'Post',
    //     title: 'What is your view about all this stuffs',
    //     view: 11100000,
    //     comment: 12000000,
    //     favorite: 11000000, 
    //     liked: true
    // },{
    //     id: '464738383838',
    //     cntGrp: 'poet',
    //     category: 'Poet/Writer',
    //     desc: 'The quote is the best nature of lif, this is from the databaseThe quote is the best nature of lif, this is from the database',
    //     helpFull: 11100000,
    //     favorite: 12000000,
    //     comment: 12000000,
    //     liked: false
    // },{
    //     id: '546447737378',
    //     cntGrp: 'question',
    //     category: 'Question',
    //     desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
    //     helpFull: 11100000,
    //     notHelpFull: 12000000,
    //     favorite: 112000,
    //     liked: true
    // }, {
    //     id: '88584903030',
    //     cntGrp: 'group', 
    //     category: 'Group',
    //     desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
    //     users: 11100000,
    //     userOnline: 12000000,
    // }
    // ]

    // let trdArray = [];

    // for (let trd of data) {
    //     const newPt = {...trd};
    //     const valid = action.userID === newPt.authorID;
    //     const newData = updateObject(trd, {userOpt: valid});
    //     trdArray.push(newData);
    // }

    try {
        let response = yield axios.get('/post', {headers: {'data-categ':'trend'}});
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