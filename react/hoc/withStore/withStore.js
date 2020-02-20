import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import indexMainStore from '../../index/store'

export const indexStore = cmp => withRedux(indexMainStore)(withReduxSaga(cmp))