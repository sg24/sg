import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'react-moment';
import ShadowView from 'react-native-simple-shadow-view';

import Botton from '../../../UI/Botton/Botton';
import BoxShadow from '../../../UI/BoxShadow/BoxShadow';

const profileContent = props => {
    let userImg = <Icon name="person" size={60} color="#777"/>
    if (props.cnt.image) {
        userImg = <Image source={{uri: props.cnt.image}} style={styles.userImageWrapper}/>;
    }
    let status = (
        <>
            <View style={[styles.statusIcon]}></View>
            <Text numberOfLines={1} style={styles.statusDet}>
                <Moment element={Text} date={props.cnt.offline} fromNow />
            </Text>
        </>
    )
    let edit = null;
    let editCnt = props.cnt.about && !props.updateDet ? props.cnt.about : props.updateDet ? props.updateDet : '';
    if (props.cnt.status) {
        status = (
            <>
                <View style={[styles.statusIcon, styles.statusOnIcon]}></View>
                <Text numberOfLines={1} style={styles.statusDet}>
                   online
                </Text>
            </>
        )
    }
    let userOpt = (
        <Botton onPress={props.addUser} >
            <BoxShadow style={styles.useroptBotton}>
                <Icon name="person" size={16} color="#437da3"/>
                <Text numberOfLines={1} style={styles.userOptText}>Add</Text>
            </BoxShadow>
        </Botton>
    )
    if (props.cnt.request) {
        userOpt = (
            <>
                <Botton onPress={props.acceptUser}>
                    <BoxShadow style={styles.useroptBotton}>
                        <Icon name="person-add" size={16} color="#16cf27"/>
                        <Text numberOfLines={1} style={styles.userOptText}>Accept</Text>
                    </BoxShadow>
                </Botton>
                <Botton onPress={props.rejUser}>
                    <BoxShadow style={styles.useroptBotton}>
                        <Icon name="close" size={16} color="#ff1600"/>
                        <Text numberOfLines={1} style={styles.userOptText}>Reject</Text>
                    </BoxShadow>
                </Botton>
            </>
        )
    }
    if (props.cnt.pending) {
        userOpt = (
            <Botton onPress={props.cancelReq}>
               <BoxShadow style={styles.useroptBotton}>
                   <Icon name="close" size={16} color="#ff1600"/>
                   <Text numberOfLines={1} style={styles.userOptText}>Cancel</Text>
               </BoxShadow>
           </Botton>
        )
    }
    if (props.cnt.accept) {
        userOpt = (
            <>
                <Botton onPress={props.chat}>
                    <BoxShadow style={styles.useroptBotton}>
                        <Icon name="chatbubble-ellipses" size={16} color="#437da3"/>
                        <Text numberOfLines={1} style={styles.userOptText}>Chat</Text>
                    </BoxShadow>
                </Botton>
                <Botton onPress={props.unfriend}>
                    <BoxShadow style={styles.useroptBotton}>
                        <Icon name="person-remove" size={16} color="#ff1600"/>
                        <Text numberOfLines={1} style={styles.userOptText}>Unfriend</Text>
                    </BoxShadow>
                </Botton>
            </>
        )
    }
    if (props.cnt.id === props.userID) {
        status = null
        edit = (
            <View style={styles.edit}><Icon name="create-outline" size={20} color="#437da3"/></View>
        )
        // userOpt = null
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.userDet}>
                <View style={styles.userDetWrapper}>
                    <BoxShadow style={styles.userImageWrapper}>
                        { userImg }
                        { edit }
                    </BoxShadow>
                    <View style={[styles.status]}>{status}</View>
                    <ShadowView style={styles.username}>
                        <Text style={styles.usernameText} numberOfLines={1}>
                            { props.cnt.username }
                        </Text>
                    </ShadowView>
                </View>
                <BoxShadow style={styles.userOpt}>
                    <View style={[styles.disabledCnt, props.start ? styles.disabled : null]}>
                        { userOpt }
                    </View>
                </BoxShadow>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#fff'
    },
    userDet: {
        backgroundColor: '#437da3',
        width: '100%'
    },
    userDetWrapper: {
       marginVertical: 10
    },
    edit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 20,
        width: 20,
        backgroundColor: '#e9ebf2'
    },
    userImageWrapper: {
        position: 'relative',
        width: 100,
        height: 100,
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: .6,
        shadowRadius: 5,
    },
    status: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    statusIcon: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ff1600',
        marginRight: 5
    },
    statusOnIcon: {
        backgroundColor: '#16cf27'
    },
    statusDet: {
        fontSize: 16,
        flexShrink: 1,
        color: '#dcdbdc'
    },
    username: {
        shadowColor: 'rgba(220,219,220,.8)',
        backgroundColor: '#437da3',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        marginTop: 10
    },
    usernameText: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(5,87,139, .8)',
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontSize: 22,
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 15,
        textShadowOffset: {
            width: 1,
            hieght: 1
        }
    },
    userOpt: {
        flexDirection: 'row',
        shadowColor: 'rgba(220,219,220,.8)',
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#437da3',
        paddingBottom: 5
    },
    useroptBotton: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: .8,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginLeft: 20,
        borderRadius: 5
    },
    userOptText: {
        fontSize: 16,
        marginLeft: 5
    },
    disabledCnt: {
        flexDirection: 'row',
    },
    disabled: {
        opacity: .6
    }
});

export default profileContent;