import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FeedContent from './FeedContent';

const feed = props => {
    return props.cnt.map((cnt, index) => (
        <FeedContent 
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
            mediaPreview={props.mediaPreview}
            saveMedia={props.saveMedia}
            closeModal={props.closeModal}
            userProfile={props.userProfile.bind(this, cnt.authorID)}
            shareUserProfile={props.userProfile}
            pagePreview={props.pagePreview.bind(this, cnt)}
            chat={props.chat.bind(this, cnt._id)}
            favorite={props.favorite.bind(this, cnt._id)}
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

export default feed;