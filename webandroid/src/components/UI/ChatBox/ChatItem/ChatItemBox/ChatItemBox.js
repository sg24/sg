import React from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import Moment from 'react-moment';

import Button from '../../../Button/Button';
import {  transformNumber } from '../../../../../shared/utility';
import BoxShadow from '../../../BoxShadow/BoxShadow';
import Href from '../../../Href/Href';
import TouchableNativeFeedback from '../../../TouchableNativeFeedback/TouchableNativeFeedback';

const chatItemBox = props => {
    let created = (
        <Moment element={Text} date={props.cnt.created} format="h:mm a"  />
    )
    return (
        <View style={[styles.wrapper, props.direction === 'right' ? styles.wrapperDirectionRight : null, 
            props.showUserImage ? styles.wrapperUserImage : null ]}>
            <BoxShadow  style={styles.container}>
                <Pressable
                    android_ripple={{radius: 10}}
                    onLongPress={props.cnt._id ? props.showOption : null}
                    style={({ pressed }) => {
                        let style = {}
                        if (pressed) {
                            style.backgroundColor = '#e9ebf2';
                        }
                        return {
                            ...style,
                            padding: 15,
                            borderRadius: 10
                        };
                    }}>
                    <Text style={styles.content}>{ props.cnt.content }</Text>
                </Pressable>
            </BoxShadow>
            <View style={[styles.userInfo, props.direction === 'right' ? styles.userInfoDirection : null]}>
                <View style={[styles.userInfoCnt, props.direction === 'right' ? styles.userInfoDirection : null]}>
                    { props.showUserImage ? (
                        <>
                        <TouchableNativeFeedback onPress={props.userProfile}>
                            <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${props.cnt.userImage}`}}  
                                style={[styles.userImage, props.direction === 'right' ? styles.userImageDirection : null]}/>
                        </TouchableNativeFeedback>
                        <Href title={props.cnt.username} numberOfLines={1}  onPress={props.userProfile} style={styles.textStyle}/>
                        </>
                    ) : null}
                </View>
                { props.showReply ? 
                    <TouchableNativeFeedback onPress={props.userProfile}>
                        <View style={styles.reply}>
                            <Ionicons name="arrow-redo-outline" size={20} />
                            <Text>View reply</Text>
                        </View>
                    </TouchableNativeFeedback> : null}
                <View style={styles.det}>
                    { props.cnt.sendChatID && props.cnt.sent && !props.cnt.fail ? 
                        <ActivityIndicator
                            size="small"
                            animating
                            color="#437da3"/> : !props.cnt.fail ? created : null}
                    { props.cnt.sendChatID && props.cnt.fail ? 
                        <TouchableNativeFeedback onPress={props.sendChatInfo}>
                            <Ionicons name="alert-circle-outline" color="#ff1600" size={20}/>
                        </TouchableNativeFeedback> : null}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        maxWidth: '80%',
        minWidth: 100,
        paddingLeft: 20,
        marginTop: 10,
        marginBottom: 20
    },
    wrapperUserImage: {
        marginBottom: 40
    },
    wrapperDirectionRight: {
        paddingLeft: 0,
        paddingRight: 20,
        alignSelf: 'flex-end'
    },
    container: {
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
    userImage: {
        backgroundColor: '#e9ebf2',
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        borderColor: '#437da3',
        borderWidth: 2,
        marginRight: 10
    },
    userImageDirection: {
        marginRight: 0,
        marginLeft: 10
    },
    userInfo: {
        position: 'absolute',
        bottom: -20,
        left: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
    },
    userInfoDirection: {
        flexDirection: 'row-reverse',
        left: 'auto',
        right: 0
    }, 
    userInfoCnt: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    userInfoCntDirection: {
        flexDirection: 'row-reverse'
    },
    reply: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    det: {
        marginLeft: 10
    },
    content: {
        fontSize: 16
    }
});


export default chatItemBox;