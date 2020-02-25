import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import indexMainStore from '../../index/store'
import signupMainStore from '../../signup/store'
import loginMainStore from '../../login/store'
import resetpassMainStore from '../../resetpass/store'
import forgetpassMainStore from '../../forgetpassword/store'
import addgroupMainStore from '../../addgroup/store'
import addpoetMainStore from '../../addpoet/store'
import addpostMainStore from '../../addpost/store'
import addqueMainStore from '../../addque/store'
import editpoetMainStore from '../../editpoet/store'
import editpostMainStore from '../../editpost/store'
import editqueMainStore from '../../editque/store'

export const indexStore = cmp => withRedux(indexMainStore)(withReduxSaga(cmp))
export const signupStore = cmp => withRedux(signupMainStore)(withReduxSaga(cmp))
export const loginStore = cmp => withRedux(loginMainStore)(withReduxSaga(cmp))
export const resetpassStore = cmp => withRedux(resetpassMainStore)(withReduxSaga(cmp))
export const forgetpassStore = cmp => withRedux(forgetpassMainStore)(withReduxSaga(cmp))
export const addgroupStore = cmp => withRedux(addgroupMainStore)(withReduxSaga(cmp))
export const addpoetStore = cmp => withRedux(addpoetMainStore)(withReduxSaga(cmp))
export const addpostStore = cmp => withRedux(addpostMainStore)(withReduxSaga(cmp))
export const addqueStore = cmp => withRedux(addqueMainStore)(withReduxSaga(cmp))
export const editpoetStore = cmp => withRedux(editpoetMainStore)(withReduxSaga(cmp))
export const editpostStore = cmp => withRedux(editpostMainStore)(withReduxSaga(cmp))
export const editqueStore = cmp => withRedux(editqueMainStore)(withReduxSaga(cmp))