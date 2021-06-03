import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'ionicons';
import Moment from 'react-moment';
import { useNavigation } from '@react-navigation/native';

import Avatar from '../Avatar/Avatar';
import Href from '../Href/Href';

const shareInfo = props => {
    let navigation = useNavigation();
    let cnt = null;
    if (props.shareInfo && props.shareInfo.authorID) {
        let groupPage = props.shareInfo.pageID;
        cnt = (
        <View style={styles.userInfoShare}>
            <Avatar userImage={props.shareInfo.userImage} iconSize={20} imageSize={40} enableBorder={groupPage ? false : true} 
                onPress={() => props.onPress(props.shareInfo.authorID)}/>
            <View style={styles.userInfoCnt}>
                <Href title={props.shareInfo.username} numberOfLines={1} 
                    onPress={() => props.onPress(props.shareInfo.authorID)} style={styles.textStyle}/>
                <View style={styles.info}>
                    <Ionicons name="paper-plane-outline" color="#777" size={18}/>
                    {groupPage ? (
                        <>
                        <Text style={styles.infoText} numberOfLines={1} >
                            Shared from 
                        </Text>
                        <View style={{flexShrink: 1}}>
                            <Href numberOfLines={1} style={{fontWeight: 'bold'}} title={ props.shareInfo.pageTitle } onPress={() => navigation.navigate('GroupPreview', {pageID: groupPage, cntID: props.shareInfo.cntID})} />
                        </View>
                        </>
                    ): (
                    <Text style={styles.infoText} numberOfLines={1}>Shared <Moment element={Text} date={props.shareInfo.created} fromNow  /></Text>)}
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
        marginLeft: 10,
        flexShrink: 1
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        marginHorizontal: 5,
        color: '#777'
    }
});

export default shareInfo;