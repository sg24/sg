import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'ionicons';

import Avatar from '../Avatar/Avatar';
import Href from '../Href/Href';

const shareInfo = props => {
    let cnt = null;
    if (props.shareInfo) {
        cnt = (
        <View style={styles.userInfoShare}>
            <Avatar userImage={props.shareInfo.image} iconSize={20} imageSize={40} onPress={() => props.onPress(props.shareInfo.ID)}/>
            <View style={styles.userInfoCnt}>
                <Href title={props.shareInfo.title} numberOfLines={1} onPress={() => props.onPress(props.shareInfo.ID)} style={styles.textStyle}/>
                <View style={styles.info}>
                    <View style={styles.userInfoCreate}>
                        <Ionicons name="paper-plane-outline" color="#777" size={18}/>
                        <Text style={styles.infoText} >
                            Shared
                        </Text>
                    </View>
                </View>
            </View>
        </View>
        )
    }
    return cnt;
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    userInfoShare: {
        flexDirection: 'row',
        backgroundColor: '#dcdbdc',
        padding: 10,
        marginBottom: 0,
        borderRadius: 5
    },
    userInfoCnt: {
        justifyContent: 'space-between',
        marginLeft: 10
    },
    info: {
        flexDirection: 'row'
    },
    infoText: {
        marginLeft: 5,
        color: '#777'
    },
    userInfoCreate: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default shareInfo;