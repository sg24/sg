import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PostContent from './PostContent';

const post = props => {
    return props.cnt.map((cnt, index) => (
        <PostContent 
            key={index}
            cnt={cnt}
            pageCntID={props.pageCntID}
            edit={props.edit.bind(this, cnt._id)}
            delete={props.delete.bind(this, cnt._id)}
            share={props.share.bind(this, cnt._id)}
            report={props.report.bind(this, cnt._id)}
            showUserOpt={props.showUserOpt.bind(this, cnt._id)}
            mediaPreview={props.mediaPreview}
            saveMedia={props.saveMedia}
            closeModal={props.closeModal}/>
    ));
}

export default post;