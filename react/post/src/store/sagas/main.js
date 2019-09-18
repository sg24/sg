import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';

export function* fetchMainActiveInitSaga(action) {
    let oldMainProps = {...action.mainProps};
    let curActive = 90;
    let updatedMainProps = {}

    for (let key in oldMainProps) {
        curActive += 2;
        updatedMainProps[key] = oldMainProps[key]
        updatedMainProps[key].active = curActive; 
    }
    yield put(actions.fetchMainActive(updatedMainProps));
}

export function* defaultMainActiveInitSaga(action) {
    let oldMainProps = {...action.mainProps};
    let curActive = 90;
    let updatedMainProps = {}

    for (let key in oldMainProps) {
        curActive += 2;
        updatedMainProps[key] = oldMainProps[key]
        updatedMainProps[key].active = curActive; 
    }

    let newMainProps = {};
    for (let key in updatedMainProps) {
        newMainProps[key] = updatedMainProps[key];
    }
    let mainProps = {...newMainProps[action.categ]}
    mainProps.active = null; 
    newMainProps[action.categ] = mainProps;
    yield put(actions.defaultMainActive(newMainProps));
}