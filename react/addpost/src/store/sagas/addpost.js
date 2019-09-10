import { put, delay } from 'redux-saga/effects';
import uuid from 'uuid/v1';

import * as actions from '../../store/actions/index';
import { updateObject } from '../../shared/utility';
import axios from '../../axios';
import fileAxios from 'axios';

const users = [{
    id: '454537dggdgd',
    user: 'User',
    userImage: '/',
    userStatus: 'online',
    students: 99
},{
    id: '293874756gfdyey33',
    user: 'User User',
    userImage: '/',
    userStatus: 'offline',
    students: 99
},{
    id: '572ghgd898393838',
    user: 'User',
    userImage: '/',
    userStatus: 'online',
    students: 90
},{
    id: '2ii3yr4ygdbbdbdsjjw',
    user: 'User User',
    userImage: '/',
    userStatus: 'online',
    students: 99
}]

export function* fetchPostCategInitSaga(action) {
    try {
        yield put(actions.fetchPtCategStart());
        const category = yield axios.get('/add/post', {headers: {'data-categ':  'category'}, timeout: 5000});
        const postCateg =  category.data && category.data.length > 0 ? category.data[0].posts : null;
        yield put(actions.fetchPtCateg(postCateg))
    } catch(err){
        yield put(actions.fetchPtCategFail(err));
        yield delay(2000);
        yield put(actions.fetchPtCategReset());
    }
    
}

export function* addPostCategInitSaga(action) {
    let transformCateg = 
        String(action.categ).trim().charAt(0).toUpperCase() + String(action.categ).trim().toLowerCase().slice(1);
    yield put(actions.addPtCateg(transformCateg));
}

export function* checkLinkInitSaga(action) {
    let link = String(action.link).trim();
    try {
        let response = yield fileAxios.get(link, {responseType: 'blob', timeout: 8000});
        if (response.data.type.startsWith(action.mediaType + '/')) {
            yield put(actions.checkLink(null, window.URL.createObjectURL(response.data)));   
            return;
        }
        throw new Error(`Unknown format, Only ${action.mediaType} files`);
       
    } catch(err) {
        yield put(actions.checkLink(err, null));   
    }
}

export function* fetchUsersInitSaga(action) {
    let updateUser = users.filter(user => user.userStatus === action.userStatus);
    yield put(actions.fetchUsers(updateUser, action.userStatus));
}

export function* filterUserInitSaga(action) {
       let filterUser = action.users.filter(user => user.user.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1 );

       if (!action.filterContent && action.users && action.users.length > 0) {
            filterUser = [...action.users];
       }
    
       yield put(actions.filterUser(filterUser))
}

export function* showUserSelectInitSaga(action) {
    let usersArray = [];
    let usersID = [...action.userID];
    for (let user of users) {
        let filterUser = usersID.filter(userID => userID === user.id);
        if (filterUser.length > 0) {
            usersArray.push({...user})
        }
    }

    yield put(actions.showUserSelect(usersArray));
}


export function* submitFormInitSaga(action) {
    yield put(actions.submitFormStart());
    let mediaID = uuid();

    for(let videoUrl of action.formData.media.video) {
        try {
            let response = yield fileAxios.get(videoUrl, {responseType: 'blob'})
            let reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onloadend= function(){
                axios.post('/add/post', {
                    mediaType: 'video',
                    mediaID,
                    data: reader.result
                })
            }
           yield put(actions.submitFormSuccess())
        } catch(err){
            yield put(actions.submitFormFail(err))
        }
    }

    for(let imageUrl of action.formData.media.image) {
        try {
            let response = yield fileAxios.get(imageUrl, {responseType: 'blob'})
            let reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onloadend= function(){
                axios.post('/add/post', {
                    mediaType: 'image',
                    mediaID,
                    data: reader.result
                })
            }
           yield put(actions.submitFormSuccess())
        } catch(err){
            yield put(actions.submitFormFail(err))
        }
    }

   let updateMedia = updateObject(action.formData, {mediaID})
        try {
           let response = yield axios.post('/add/post', updateMedia);
           yield put(actions.submitFormSuccess())
           yield put(actions.formSubmitted(response.data))
        } catch(err){
            yield put(actions.submitFormFail(err))
        }
   
}