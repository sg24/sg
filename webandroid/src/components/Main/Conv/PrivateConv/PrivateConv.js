import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import Icon from 'ionicons';
import Moment from 'react-moment';

import TabBarge from '../../../UI/TabBarge/TabBarge';
import Href from '../../../UI/Href/Href';
import { trim } from '../../../../shared/utility';

const privateConv = props => {
    let notification = null;
    let msgCreated = null;
    let userImg = <Icon name="person" size={40} color="#777"/>
    let msg = (
     <Text numberOfLines={1} style={styles.msg}>{trim(props.userDet.msg)}</Text>
    )

    let userStatus = (
        <View style={[styles.userStatus]}></View>
    );

    if (props.userDet.status) {
        userStatus = (
            <View style={[styles.userStatus, styles.userStatusOn]}></View>
        );
    }

    if (props.userDet.image) {
        userImg = <Image source={{uri: props.userDet.image}} style={styles.userImageWrapper}/>;
    }

    if (!props.userDet.msg) {
        msg = (
            <View style={styles.msgBottom}>
                <Icon name="chatbubble" color="#fff"/>
                <Text style={styles.bottonText}>Chat</Text>
            </View>
        )
    }

    if (props.userDet.created) { 
        msgCreated = (
            <Text numberOfLines={1} style={styles.msgCreated}>
                @ <Moment element={Text} date={props.userDet.created} fromNow />
            </Text>
        )
    }

    if(props.userDet.notifications && props.userDet.notifications > 0) {
        notification = (
            <TabBarge 
                notification={props.userDet.notifications}
                style={styles.tabBarge}/>
        )
    }

    return (
        <View style={styles.wrapper}>
            { notification }
            <TouchableOpacity onPress={props.showProfile}>
                <View style={styles.userImageWrapper}>
                    {userImg}
                    {userStatus}
                </View>
            </TouchableOpacity>
            <View style={styles.det}>
                <Href onPress={props.showChat} numberOfLines={1} style={styles.userDet} title={props.userDet.username}/>
                <View style={styles.msgWrapper}>
                    <Href onPress={props.showChat} wrapperStyle={styles.msgWrapper}>
                        {msg}{msgCreated}
                    </Href>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#dcdbdc',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'center'
    },
    userImageWrapper: {
        position: 'relative',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e9ebf2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userStatus: {
        position: 'absolute',
        width: 14,
        height: 14,
        borderRadius: 7,
        bottom: 2,
        right: -1,
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#ff1600'
    },
    userStatusOn: {
        backgroundColor: '#16cf27'
    },
    det: {
        marginLeft: 20,
        flex: 1
    },
    userDet: {
        color: 'rgba(5,87,139, .8)',
        fontWeight: 'bold',
        fontSize: 15
    },
    msgWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    msg: {
        marginRight: 5,
        flexShrink:  1
    },
    msgCreated: {
        color: 'rgba(0,0,0, .45)'
    },
    msgBottom: {
        backgroundColor: '#437da3',
        color: '#fff',
        borderRadius: 3,
        paddingVertical: 1,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottonText: {
        marginLeft: 5,
        color: '#fff'
    },
    tabBarge: {
        top: 'auto',
        right: 10
    }
});

export default privateConv;