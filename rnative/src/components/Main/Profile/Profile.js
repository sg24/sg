import React from 'react';
import ProfileContent from './ProfileContent/ProfileContent';

const profile = props => (
    <ProfileContent 
        cnt={props.profile}
        userID={props.userID}
        addUser={props.changeCnt.bind(this, props.profile.id, null, 'addUser', true, 'user')}
        acceptUser={props.changeCnt.bind(this, props.profile.id, props.profile.username, 'acceptUser', false, 'user')}
        rejUser={props.changeCnt.bind(this, props.profile.id, props.profile.username, 'rejUser', false, 'user')}
        cancelReq={props.changeCnt.bind(this, props.profile.id, props.profile.username, 'cancelReq', false, 'user')}
        unfriend={props.changeCnt.bind(this, props.profile.id, props.profile.username, 'unfriend', false, 'user')}
        chat={props.chat}
        />
)

export default profile;