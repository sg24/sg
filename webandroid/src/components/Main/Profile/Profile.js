import React from 'react';
import ProfileContent from './ProfileContent/ProfileContent';

const profile = props => (
    <ProfileContent 
        cnt={props.profile}
        viewMode={props.viewMode}
        userID={props.userID}
        profileID={props.profileID}
        addUser={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, null, 'addUser', true)}
        acceptUser={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, props.profile.username, 'acceptUser', true)}
        rejUser={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, props.profile.username, 'rejUser', false, 'Are you sure you want to reject this user !')}
        cancelReq={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, props.profile.username, 'cancelReq', false, 'Are you sure you want to cancel this request !')}
        unfriend={props.changeProfileStart ? null : props.changeProfile.bind(this, props.profile.id, props.profile.username, 'unfriend', false, 'Are you sure you want to remove this user !')}
        chat={props.chat}
        start={props.changeProfileStart}
        inputChanged={props.inputChanged}
        formElement={props.formElement}
        enableEdit={props.enableEdit}
        edit={props.edit}
        cancelEdit={props.cancelEdit}
        submitAbout={props.submitAbout}
        submittingAbout={props.submittingAbout}
        submitAboutErr={props.submitAboutErr}
        enableUserOpt={props.enableUserOpt}
        showUserOpt={props.showUserOpt}
        profileTab={props.profileTab}
        selectProfileTab={props.selectProfileTab}
        currentProfileTab={props.currentProfileTab}
        enableChangeImage={props.enableChangeImage}
        uploadImage={props.uploadImage}
        cancelUploadImage={props.cancelUploadImage}
        submitProfileImage={props.submitProfileImage}
        submittingProfileImage={props.submittingProfileImage}
        submittedProfileImage={props.submittedProfileImage}
        submitProfileImageErr={props.submitProfileImageErr}
        submitUsername={props.submitUsername}
        submittingUsername={props.submittingUsername}
        submitUsernameErr={props.submitUsernameErr}
        submittedUsername={props.submittedUsername}
        showImageAccodion={props.showImageAccodion}
        enableImageAccodion={props.enableImageAccodion}
        showNameAccodion={props.showNameAccodion}
        enableNameAccodion={props.enableNameAccodion}
        index={props.index}
        routes={props.routes}
        setIndex={props.setIndex}
        renderScene={props.renderScene}
        layoutWidth={props.layoutWidth}
        />
)

export default profile;