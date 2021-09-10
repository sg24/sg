import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import Moment from 'react-moment';
import Text, { translator, TextWrapper } from 'text'

import TabBarge from '../../../UI/TabBarge/TabBarge';
import TouchableNativeFeedback from '../../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import Href from '../../../UI/Href/Href';
import { trim } from '../../../../shared/utility';
import Button from '../../../UI/Button/Button';
import LoadMore from '../../../UI/LoadMore/LoadMore';
import BoxShadow from '../../../UI/BoxShadow/BoxShadow';

const privateConv = props => {
    let notification = null;
    let msgCreated = null;
    let userImg = <Ionicons name="person" size={40} color="#777"/>
    let msg = null;
    let startPageReaction = props.pageReaction.length > 0 ? 
        props.pageReaction.filter(id => id === props.cnt._id).length > 0 ? true : false : false;

    let userStatus = (
        <View style={[styles.userStatus]}></View>
    );

    if (props.cnt.status) {
        userStatus = (
            <View style={[styles.userStatus, styles.userStatusOn]}></View>
        );
    }

    if (props.cnt.userImage) {
        userImg = <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${props.cnt.userImage}`}} style={styles.userImageWrapper}/>;
    }

    if (props.cnt.notification && props.cnt.notification > 0) {
        notification = (
            <TabBarge 
                notification={props.cnt.notification}
                style={styles.tabBarge}
                onPress={props.chat}/>
        )
    }

    if ((!props.cnt.message && props.cnt.chat) || props.hideMessage) {
        msg = (
            <>
                <Button onPress={props.chat} style={styles.defaultButton}>
                    <BoxShadow style={styles.msgButton}>
                        <Ionicons name="chatbubble-ellipses" size={16} color="#fff"/>
                        <Text style={styles.bottonText}>Chat</Text>
                        { notification }
                    </BoxShadow>
                </Button>
                <Button onPress={props.unfriend} style={styles.useroptButtonWrapper}>
                    <BoxShadow style={styles.useroptButton} disabled={startPageReaction}>
                        <Ionicons name="person-remove" size={16} />
                        <Text numberOfLines={1} style={styles.unfriend}>Unfriend</Text>
                    </BoxShadow>
                </Button>
            </>
        )
    }

    if (props.cnt.chat && props.cnt.created && !props.hideMessage) { 
        msgCreated = (
            <View>
                <Text numberOfLines={1} style={styles.msgCreated} >{translator('@')} <Moment element={TextWrapper} date={props.cnt.created} fromNow /></Text>
                { notification && !props.hideMessage ? notification : null }
            </View>
        )
    }

    if (props.cnt.chat && props.cnt.message && !props.hideMessage) {
        msg = (
            <Href onPress={props.chat} numberOfLines={1} style={styles.msg} wrapperStyle={styles.msg} title={props.cnt.message} />
        )
    }

    if (!props.cnt.chat) {
        msg = (
            <Button onPress={props.addUser} style={styles.defaultButton} disabled={startPageReaction}>
                <BoxShadow style={styles.msgButton} disabled={startPageReaction}>
                    {/* <Ionicons name="person" size={16} color="#fff"/> */}
                    <Text numberOfLines={1} style={styles.buttonAdd}>Add</Text>
                </BoxShadow>
            </Button>
        )
    }

    if (!props.cnt.chat && props.cnt.request) {
        msg = (
            <>
                <Button onPress={props.acceptUser} style={styles.defaultButton} disabled={startPageReaction}>
                    <BoxShadow style={styles.msgButton} disabled={startPageReaction}>
                        <Ionicons name="person-add" size={16} color="#fff"/>
                        <Text style={styles.bottonText}>Accept</Text>
                    </BoxShadow>
                </Button>
                <Button onPress={props.rejUser} style={styles.useroptButtonWrapper} disabled={startPageReaction}>
                    <BoxShadow style={styles.useroptButton} disabled={startPageReaction}>
                        <Ionicons  name="close" size={16} />
                        <Text numberOfLines={1} style={styles.unfriend}>Reject</Text>
                    </BoxShadow>
                </Button>
            </>
        )
    }

    if (!props.cnt.chat && props.cnt.pending) {
        msg = (
            <Button onPress={props.cancelReq} style={styles.defaultButton} disabled={startPageReaction}>
               <BoxShadow style={styles.useroptButton} disabled={startPageReaction}>
                   <Ionicons name="close" size={16}/>
                   <Text numberOfLines={1} style={styles.unfriend}>Cancel</Text>
               </BoxShadow>
           </Button>
        )
    }

    return (
        <View style={styles.wrapper}>
            <BoxShadow
                style={styles.container}>
                <TouchableNativeFeedback onPress={!props.allowPressable ? props.userProfile : null}>
                    <View style={styles.userImageWrapper}>
                        {userImg}
                        {userStatus}
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.det}>
                    <Href numberOfLines={1} style={styles.userDet} title={props.cnt.username} 
                        onPress={!props.allowPressable ? props.userProfile: null}/>
                    {!props.showProfileButton ?
                        <TouchableNativeFeedback onPress={props.chat} style={Platform.OS === 'web' ? styles.msgWrapper : null}>
                            <View style={styles.msgWrapper}>
                                {msg}{msgCreated}
                            </View>
                        </TouchableNativeFeedback>: 
                        <View style={{flexDirection: 'row'}}>
                            <Button onPress={props.userProfile} style={styles.profileButton}>
                                <Text numberOfLines={1} style={styles.profile}>Profile</Text>
                            </Button>
                        </View>}
                </View>
            </BoxShadow>
            { props.lastItem && props.enableLoadMore ? (
                <LoadMore
                    title="Load More"
                    icon={{name: 'reload-outline'}}
                    onPress={props.loadMore}
                    start={props.start}/>
            ) : null}
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingHorizontal: 2
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginTop: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
    userImageWrapper: {
        position: 'relative',
        width: 60,
        height: 60,
        borderRadius: 30,
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
        flex: 1,
        justifyContent: 'space-between'
    },
    userDet: {
        fontSize: 18,
    },
    msgWrapper: {
        flexDirection: 'row',
        width: '100%'
    },
    msg: {
        marginRight: 5,
        flexShrink:  1,
        fontSize: 16,
        color: '#777'
    },
    msgCreated: {
        color: 'rgba(0,0,0, .45)',
        fontSize: 15
    },
    msgButton: {
        backgroundColor: '#437da3',
        color: '#fff',
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonAdd: {
        color: '#fff',
        fontSize: 15,
        paddingHorizontal: 10
    },
    bottonText: {
        marginLeft: 5,
        color: '#fff'
    },
    defaultButton: {
        paddingVertical: 0
    },
    useroptButtonWrapper: {
        marginLeft: 10,
        paddingVertical: 0
    },
    useroptButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        backgroundColor: '#dcdbdc',
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
    unfriend: {
        marginLeft: 5
    },
    tabBarge: {
        top: -5,
        right: 0
    },
    profileButton: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        backgroundColor: '#dcdbdc',
        shadowOffset: {
            width: 0,
            height: 0,
        }
    }
});

export default privateConv;