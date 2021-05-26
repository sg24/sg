import React from 'react';

import GroupContent from './GroupContent';

const group = props => {
    return props.cnt.map((cnt, index) => (
        <GroupContent 
            key={index}
            cnt={cnt}
            userID={props.userID}
            openURI={props.openURI}
            pageCntID={props.pageCntID}
            edit={props.edit.bind(this, cnt._id)}
            delete={props.delete.bind(this, cnt._id, false)}
            shareFriends={props.share.bind(this, cnt, 'Friends')}
            report={props.report.bind(this, cnt._id)}
            showUserOpt={props.showUserOpt.bind(this, cnt._id)}
            showRequest={props.showRequest.bind(this, cnt._id)}
            mark={props.mark.bind(this, cnt._id)}
            mediaPreview={props.mediaPreview}
            saveMedia={props.saveMedia}
            closeModal={props.closeModal}
            userProfile={props.userProfile.bind(this, cnt.authorID)}
            shareUserProfile={props.userProfile}
            showGroupInfo={props.showGroupInfo.bind(this, cnt._id, cnt.title)}
            favorite={props.favorite.bind(this, cnt._id)}
            request={props.request.bind(this, cnt._id, cnt, cnt.isPublic, cnt.enableRule, cnt.enableCbt)}
            enterGroup={props.enterGroup.bind(this, cnt._id, cnt.title, cnt.image, cnt.member)}
            cancelRequest={props.cancelRequest.bind(this, cnt._id)}
            showPendingAppove={props.showPendingAppove.bind(this, cnt._id)}
            cancelApprove={props.cancelApprove.bind(this, cnt._id, null, 'cancelApprove', false, 'Cancelling this request will remove the exam you have written !')}
            cancelMark={props.cancelMark.bind(this, cnt._id, null, 'cancelMark', false, 'Cancelling this request will remove the exam you have written !')}
            pageReaction={props.pageReaction}
            share={props.share.bind(this, cnt, 'select')}
            closeModal={props.closeModal}
            lastItem={(props.cnt.length - 1) === index}
            enableLoadMore={props.enableLoadMore}
            start={props.start}
            loadMore={props.loadMore}
            advertChatbox={props.advertChatbox}/>
    ));
}

export default group;