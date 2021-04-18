import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import Href from '../../UI/Href/Href';
import Button from '../../UI/Button/Button';

const friendRequestItem = props => {
    let disableUserOption = props.pending && props.pending.filter(cnt => cnt.id === props.cnt._id && cnt.type === 'friendRequest')[0];
    let removeUserOption = props.page && props.page.filter(cnt => cnt.id === props.cnt._id && cnt.type === 'friendRequest')[0];

    let userImage = (
        <View style={styles.imageWrapper}>
            <Ionicons name="person" size={80} color="#777"/>     
        </View>
    );
    let userStatus = (
        <View style={[styles.userStatus]}></View>
    );

    if (props.cnt.userImage) {
        userImage = <Image source={{uri: Constants.manifest.extra.BASE_IMAGE_URL + props.cnt.userImage}} resizeMode="stretch" style={styles.image} />
    }

    if (props.cnt.status) {
        userStatus = (
            <View style={[styles.userStatus, styles.userStatusOn]}></View>
        );
    }

    return (
        <View style={styles.container}>
            <BoxShadow style={styles.wrapper}>
                <TouchableNativeFeedback onPress={props.profile} style={{flex: 1}}>
                    <View style={styles.imageWrapper}>
                        { userImage }
                        { userStatus }
                    </View>
                </TouchableNativeFeedback>
                <Href numberOfLines={1} title={props.cnt.username} onPress={props.profile} style={styles.username} />
                { !removeUserOption  ? (
                    <View style={styles.actionButtonWrapper}>
                        <Button onPress={props.acceptUser} style={styles.actionButton} disabled={disableUserOption ? true : false}>
                            <Ionicons name="person-add" size={16} color="#fff"/>
                            <Text style={styles.actionButtonAccText}>Accept</Text>
                        </Button>
                        <Button onPress={props.rejUser} style={styles.actionAltButton} disabled={disableUserOption ? true : false}>
                            <Ionicons name="close" size={16}/>
                            <Text style={styles.actionButtonText}>Reject</Text>
                        </Button>
                    </View>
                ) : removeUserOption.cntType === 'acceptUser' ? (
                    <Button style={styles.chat}>
                        <Ionicons name="chatbubble-ellipses" size={16} color="#fff"/>
                        <Text style={styles.actionButtonAccText}>Chat</Text>
                    </Button>
                ) : null}
            </BoxShadow>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    container: {
        paddingRight: 20
    },
    wrapper: {
        width: 300,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    imageWrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: '#dcdbdc',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        backgroundColor: '#dcdbdc',
        height: '100%',
        width: '100%'
    },
    username: {
        fontSize: 18,
        marginVertical: 10
    },
    userStatus: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        bottom: -2,
        right: -3,
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#ff1600'
    },
    userStatusOn: {
        backgroundColor: '#16cf27'
    },
    actionButtonWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#437da3',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    actionAltButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: '#dcdbdc',
        borderRadius: 5
    },
    actionButtonText: {
        color: '#333',
        marginLeft: 5,
        fontSize: 15
    },
    actionButtonAccText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 15
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#437da3',
        paddingVertical: 6,
        paddingHorizontal: 5,
        borderRadius: 5
    }
});

export default friendRequestItem;