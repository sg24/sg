import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'ionicons';
import Moment from 'react-moment';

import TabBarge from '../../../UI/TabBarge/TabBarge';
import Href from '../../../UI/Href/Href';
import { transformNumber, trim } from '../../../../shared/utility';

const groupConv = props => {
    let notification = null;
    let groupImg = <Icon name="chatbubble-ellipses" size={30} color="#777" style={styles.groupImage}/>

    if (props.groupDet.image && props.groupDet.image.length > 0) {
        groupImg = <Image source={{uri: `https://www.slodge24.com/media/image/${props.groupDet.image[0].id}`}} style={styles.groupImageWrapper}/>;
    }
    
    if(props.groupDet.notify && props.groupDet.notify > 0) {
        notification = (
            <TabBarge 
                notification={props.groupDet.notify}
                style={styles.tabBarge}/>
        )
    }

    return (
        <View style={styles.wrapper}>
            { notification }
            <View style={styles.groupImageWrapper}>
                {groupImg}
            </View>
            <View style={styles.det}>
                <Href onPress={props.showGroup} numberOfLines={1} style={styles.groupDet} title={props.groupDet.title}/>
                {props.groupDet.lastChat ? 
                <Href onPress={props.showGroup} numberOfLines={1} wrapperStyle={styles.msgWrapper}>
                    <Text numberOfLines={1} style={styles.lastChat}>{trim(props.groupDet.lastChat)}</Text>
                    <Text numberOfLines={1} style={styles.msgCreated}>
                        @ <Moment element={Text} date={props.groupDet.created} fromNow />
                    </Text>
                </Href> : null}
                <View style={styles.msgWrapper}>
                    <Text> online </Text>
                    <Text style={[styles.groupInfo, styles.groupUseron]}>{ transformNumber(props.groupDet.online) }</Text>
                    <Text> offline </Text>
                    <Text style={[styles.groupInfo]}>{ transformNumber(props.groupDet.offline) }</Text>
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
    groupImageWrapper: {
        position: 'relative',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e9ebf2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    det: {
        marginLeft: 20,
        flex: 1
    },
    groupDet: {
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
    lastChat: {
        fontWeight: 'normal',
        color: 'rgba(0,0,0, .6)',
        marginRight: 5,
        fontSize: 15,
        flexShrink:  1
    },
    msgCreated: {
        color: 'rgba(0,0,0, .45)'
    },
    groupInfo: {
        paddingHorizontal: 5,
        paddingVertical: 1,
        backgroundColor: '#ff1600',
        color: '#fff',
        borderRadius: 20,
        marginLeft: 4
    },
    groupUseron: {
        backgroundColor: '#16cf27',
        marginRight: 10
    },
    tabBarge: {
        top: 'auto',
        right: 10
    }
});

export default groupConv;