import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import TabBarge from '../../../UI/TabBarge/TabBarge';
import Href from '../../../UI/Href/Href';

const notifyItem = props => {
    let cntMsg = props.notify.title
    let cnt = props.notify.category === 'post' ? ['newspaper-outline', cntMsg, 'Feed'] : props.notify.category === 'question' ? ['bulb-outline', cntMsg, 'Question'] : 
        props.notify.category === 'poets' ? ['reader-outline', cntMsg, 'Write Up'] : props.notify.category === 'userReq' ? ['person-outline', 'Friend request', 'Request'] :
        props.notify.category === 'group' ? ['chatbubble-ellipses-outline', `New message from ${props.notify.title}`, 'Room'] : 
        props.notify.category === 'grpreq' ? ['people-outline', `New Request from ${props.notify.title}`, 'Room'] : ['person-outline', `New message from ${props.notify.username}`, 'friend'];
    let imageCnt = (
        <View style={styles.imageWrapper}>
            <Icon name={cnt[0]} size={25}/>
            <Text style={styles.textStyle}>{cnt[2]}</Text>
        </View>
    )

    if (props.notify.image) {
        let uri = Array.isArray(props.notify.image) ? `https://www.slodge24.com/media/image/${props.notify.image[0].id}` :  props.notify.image;
        imageCnt = (
            <Image source={{uri}}  style={styles.imageWrapper}/>
        )
    }

    return (
        <Href wrapperStyle={[styles.wrapper, props.notify.category === 'chat' ? styles.chat: null]} onPress={props.showCnt}>
            { imageCnt }
            <Text  numberOfLines={1} style={[styles.msg, props.notify.category === 'chat' ? styles.chatText: null]}>
                { cnt[1] }
            </Text>
            <TabBarge 
                notification={props.notify.total ? props.notify.total : props.notify.notifications}
                style={styles.tabBarge}/>
        </Href>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#dcdbdc',
        borderWidth: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 5
    },
    imageWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#e9ebf2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    msg: {
        flex: 1,
        fontSize: 16
    },
    tabBarge: {
        position: 'relative',
        top: 'auto',
        right: 'auto'
    },
    textStyle: {
        fontSize: 12,
        color: 'rgba(0,0,0, .65)'
    }
});

export default notifyItem;