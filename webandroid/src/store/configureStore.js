import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import  createSagaMiddleware from 'redux-saga';

import auth from './reducers/auth';
import authForm from './reducers/authForm';
import header from './reducers/header';
import profile from './reducers/profile';
import addForm from './reducers/addForm';
import editForm from './reducers/editForm';
import page from './reducers/page';
import sidebar from './reducers/sidebar';
import media from './reducers/media';
import chatBox from './reducers/chatBox';
import share from './reducers/share';
import select from './reducers/select';
import settings from './reducers/settings';
import externalPage from './reducers/externalPage';
import previewPage from './reducers/previewPage';

import { 
    watchAuth,
    watchAuthForm,
    watchHeader,
    watchProfile,
    watchEditForm,
    watchPage,
    watchSidebar,
    watchMedia,
    watchChatBox,
    watchShare,
    watchSelect,
    watchExternalPage,
    watchPreviewPage,
    watchSettings
} from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    auth,
    authForm,
    header,
    profile,
    addForm,
    editForm,
    page,
    sidebar,
    media,
    chatBox,
    share,
    select,
    settings,
    externalPage,
    previewPage
});

let composeEnhancers = compose;
if(__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
}
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchAuthForm);
sagaMiddleware.run(watchHeader);
sagaMiddleware.run(watchProfile);
sagaMiddleware.run(watchEditForm);
sagaMiddleware.run(watchPage); 
sagaMiddleware.run(watchSidebar); 
sagaMiddleware.run(watchMedia);
sagaMiddleware.run(watchChatBox);
sagaMiddleware.run(watchShare);
sagaMiddleware.run(watchSelect);
sagaMiddleware.run(watchExternalPage);
sagaMiddleware.run(watchSettings);
sagaMiddleware.run(watchPreviewPage);

const configureStore = () => {
    return store;
};



export default configureStore;