import React from 'react';
import ProfileContent from './ProfileContent/ProfileContent';

const profile = props => (
    <ProfileContent 
        cnt={props.profile}
        userID={props.userID}
        addUser={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, null, 'addUser', true)}
        acceptUser={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, props.profile.username, 'acceptUser', true)}
        rejUser={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, props.profile.username, 'rejUser', false, 'Are you sure you want to reject this user !')}
        cancelReq={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, props.profile.username, 'cancelReq', false, 'Are you sure you want to cancel this request !')}
        unfriend={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, props.profile.username, 'unfriend', false, 'Are you sure you want to remove this user !')}
        chat={props.chat}
        start={props.changeProfileStart}
        />
)

export default profile;