import React from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import Moment from 'react-moment';

import TabBarge from '../../../UI/TabBarge/TabBarge';
import TouchableNativeFeedback from '../../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import Href from '../../../UI/Href/Href';
import { trim } from '../../../../shared/utility';
import Button from '../../../UI/Button/Button';
import BoxShadow from '../../../UI/BoxShadow/BoxShadow';

const privateConv = props => {
    let notification = null;
    let msgCreated = null;
    let userImg = <Ionicons name="person" size={40} color="#777"/>
    let picked = props.picked && props.picked.length > 0 ? 
        props.picked.filter(id => id === props.userDet._id)[0] ? true : false : false;
    let msg = (
        <Href onPress={!props.allowPressable ? props.showChat : null} numberOfLines={1} style={styles.msg} wrapperStyle={styles.msg} title={props.userDet.message} />
    )

    let userStatus = (
        <View style={[styles.userStatus]}></View>
    );

    if (props.userDet.status) {
        userStatus = (
            <View style={[styles.userStatus, styles.userStatusOn]}></View>
        );
    }

    if (props.userDet.userImage) {
        userImg = <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${props.userDet.userImage}`}} style={styles.userImageWrapper}/>;
    }

    if (!props.userDet.message) {
        msg = (
            <>
                <Button onPress={props.showChat} disabled={props.allowPressable} >
                    <BoxShadow style={styles.msgButton}>
                        <Ionicons name="chatbubble-ellipses" size={16} color="#fff"/>
                        <Text style={styles.bottonText}>Chat</Text>
                    </BoxShadow>
                </Button>
                <Button onPress={props.unfriend} disabled={props.allowPressable} style={styles.useroptButtonWrapper}>
                    <BoxShadow style={styles.useroptButton}>
                        <Ionicons name="person-remove" size={16} />
                        <Text numberOfLines={1} style={styles.unfriend}>Unfriend</Text>
                    </BoxShadow>
                </Button>
            </>
        )
    }

    if (props.userDet.created) { 
        msgCreated = (
            <Text numberOfLines={1} style={styles.msgCreated}>
                @ <Moment element={Text} date={props.userDet.created} fromNow />
            </Text>
        )
    }

    if (props.userDet.notification && props.userDet.notification > 0) {
        notification = (
            <TabBarge 
                notification={props.userDet.notifications}
                style={styles.tabBarge}/>
        )
    }


    return (
        <>
            <BoxShadow
                style={styles.wrapper}>
                <Pressable
                    android_ripple={{radius: 10}}
                    onLongPress={props.allowPressable ? props.pick : null}
                    onPress={props.picked && props.picked.length > 0 ? props.pick : 
                        props.allowPressable ? props.showProfile : null}
                    style={({ pressed }) => {
                        let style = {}
                        if (pressed && props.allowPressable) {
                            style.backgroundColor = '#e9ebf2';
                        }
                        return {
                            ...style,
                            padding: 10,
                            borderRadius: 10,
                            flexDirection: 'row',
                            width: '100%'
                        };
                    }}>
                    { notification }
                    <TouchableNativeFeedback onPress={!props.allowPressable ? props.showProfile : null}>
                        <View>
                            <View style={styles.userImageWrapper}>
                                {userImg}
                                {userStatus}
                            </View>
                            {picked ? (
                                <View style={styles.pick}>
                                    <Ionicons name="checkmark-outline" color="#16cf27" size={40} />
                                </View>
                            ): null}
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.det}>
                        <Href numberOfLines={1} style={styles.userDet} title={props.userDet.username} 
                            onPress={!props.allowPressable ? props.showProfile: null}/>
                        <View style={styles.msgWrapper}>
                            {msg}{msgCreated}
                        </View>
                    </View>
                </Pressable>
            </BoxShadow>
            { props.lastItem && props.enableLoadMore ? (
            <Button onPress={props.loadMore} disabled={props.start} style={{width: '100%', marginVertical: 10, paddingVertical: 0}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    { !props.start ? (
                        <View style={{width: '100%', paddingVertical: 5, paddingHorizontal: 10,backgroundColor: '#dcdbdc', borderRadius: 5, 
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="reload-outline" size={18} />
                            <Text style={{marginLeft: 10}}>Load More</Text>
                        </View>
                    ):  (
                        <ActivityIndicator
                            size="small"
                            animating
                            color="#437da3"/>
                    )}
                </View>
            </Button>
        ) : null}
        </>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
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
        fontSize: 16
    },
    msgCreated: {
        color: 'rgba(0,0,0, .45)',
        fontSize: 15
    },
    msgButton: {
        backgroundColor: '#437da3',
        color: '#fff',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottonText: {
        marginLeft: 5,
        color: '#fff'
    },
    useroptButtonWrapper: {
        marginLeft: 10
    },
    useroptButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
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
        top: 'auto',
        right: 10
    },
    pick: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, .65)',
        borderRadius: 30
    }
});

export default privateConv;