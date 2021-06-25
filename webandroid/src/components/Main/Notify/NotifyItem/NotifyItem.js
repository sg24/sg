import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'ionicons';

import Avatar from '../../../UI/Avatar/Avatar';
import Href from '../../../UI/Href/Href';

const notifyItem = props => {
    let isPage = !props.cnt.isUserImage && !props.cnt.isPageID;
    let userImage = props.cnt.userImage;
    let isAllContent = props.cnt.title && props.cnt.content;
    let iconName = (props.cnt.page === 'post') || (props.cnt.page === 'postShare') ? 'chatbox' : 
    (props.cnt.page === 'question') || (props.cnt.page === 'questionShare') ? 'bulb-outline' : 
    (props.cnt.page === 'writeup') || (props.cnt.page === 'writeupShare') ? 'reader-outline' :
    (props.cnt.page === 'feed') || (props.cnt.page === 'feedShare') ? 'newspaper-outline' : 
    (props.cnt.page === 'createGroup') || (props.cnt.page === 'groupShare') ? 'chatbubble-ellipses-outline' : 'timer';
    if (isPage) {
        for (let cnt of props.cnt.media) {
            if (cnt.bucket === 'image') {
                userImage = cnt.id;
            }
        }
    }
    return (
        <Href wrapperStyle={[styles.wrapper, isAllContent ? styles.fullNotification : null]} onPress={props.showCnt}>
            {props.cnt.page && isPage ? <Text style={{position: 'absolute', top: -2, right: 10, color: '#777'}}>{props.cnt.page.split('Share').length > 1 ? props.cnt.page.split('Share').join(' shared') : props.cnt.page }</Text>: null}
            <Avatar userImage={userImage} iconSize={30} imageSize={50} onPress={props.userProfile} iconName={isPage ? iconName : 'person'}
                disableRadius={isPage} enableBorder={!isPage}/>
            <View style={styles.msg}>
                { props.cnt.title ? <Href style={props.cnt.expiresIn ? styles.read : styles.textStyle} numberOfLines={!props.cnt.content ? 2 : 1 } title={props.cnt.title} onPress={props.showCnt}/> : null}
                {props.cnt.content ? <Href style={props.cnt.expiresIn ? styles.read : styles.textStyle} numberOfLines={!props.cnt.title ? 2 : 1 } title={props.cnt.content} onPress={props.showCnt}/>: null}
            </View>
        </Href>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        color: '#333'
    },
    read: {
        fontSize: 15,
        color: '#777'
    },
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#dcdbdc',
        borderWidth: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 10,
        borderRadius: 5
    },
    fullNotification: {
        alignItems: 'stretch'
    },
    msg: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10
    }
});

export default notifyItem;