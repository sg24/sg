import React from 'react';

import PrfUser from'./PrfUser/PrfUser';

const prfUsers = props => {
    return <PrfUser 
        cnt={props.cnt}
        addUser={props.changeCnt.bind(this, props.cnt.id, null, 'addUser', true, 'user')}
        acceptUser={props.changeCnt.bind(this, props.cnt.id, props.cnt.username, 'acceptUser', false, 'user')}
        rejUser={props.changeCnt.bind(this, props.cnt.id, props.cnt.username, 'rejUser', false, 'user')}
        cancelReq={props.changeCnt.bind(this, props.cnt.id, props.cnt.username, 'cancelReq', false, 'user')}
        unfriend={props.changeCnt.bind(this, props.cnt.id, props.cnt.username, 'unfriend', false, 'user')}
        editProfile={props.editProfile}
        editEnable={props.editEnable}
        inputChanged={props.inputChanged}
        value={props.inputValue}
        saveProfile={props.saveProfile}
        start={props.start}
        updateDet={props.updateDet}
        saveEnable={props.saveEnable}
        changeImage={props.changeImage}
        chat={props.chat}/>
}

export default prfUsers;