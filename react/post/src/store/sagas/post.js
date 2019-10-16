import { put } from 'redux-saga/effects';

import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPostInitSaga(action) {
    const data = [{
        id: '234444',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        postCreated: '2m ago',
        category: 'social',
        postImage: '/',
        title: 'What is your view about all this stuffs',
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        view: 11100000,
        comment: 12000000,
        favorite: 120000, 
        liked: false
    }, 
    {
        id: '23444467',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        postCreated: '2m ago',
        category: 'poem',
        postImage: '/',
        title: 'What is your view about all this stuffs',
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        view: 1123000,
        comment: 120000,
        favorite: 100000000,
        liked: false
    },{
        id: '23444489',
        author: 'user user',
        authorID: 'user_ids',
        userImage: '/',
        postCreated: '2m ago',
        category: 'social',
        title: 'What is your view about all this stuffs',
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        view: 1223000,
        comment: 120000,
        favorite: 10000000,
        liked: false
    }
    ]

    try {
        let response = yield axios.get('/post', {headers: {'data-categ':'post', 'authorization': 'authorization'}});
        console.log(response.data)
        let ptArray = [];
    
        for (let pt of response.data) {
            const newPt = {...pt};
            if (newPt.mediaID) {
                try {
                    let response  = yield axios.get('/media', {headers: {'authorization': 'authorization', 'data-categ': newPt.mediaID}})
                    console.log(response)
                } catch(err) {

                }
            }
            const valid = action.userID === newPt.authorID;
            const author = 'user' +  newPt._id;
            const newData = updateObject(pt, {author,userOpt: valid});
            ptArray.push(newData);
        }
    
    
        yield put(actions.fetchPost(ptArray));
    } catch(err){
        console.log(err)
    }
    
}

export function* changeFavSaga(action) {
    let pt = changeFav(action.posts ,action.postID);
    yield put(actions.changeFavPtStart(pt.updateStartArray, true))
    if (action.filteredPost && action.filteredPost.length > 0) {
        let filterPt = changeFav(action.filteredPost, action.postID)
        yield put(actions.changeFavPtStart(filterPt.updateStartArray, false))
        yield put(actions.changeFavFilter(filterPt.updateDataArray));
    }
    yield put(actions.changeFav(pt.updateDataArray));
}

export function* filterPostInitSaga(action) {
    const posts = [...action.posts];
    let filteredPost = posts.filter(post => post.category === action.tag);
    yield put(actions.filterPost(filteredPost))
}