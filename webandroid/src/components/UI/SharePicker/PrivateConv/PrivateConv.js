import React from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';

import Button from '../../../UI/Button/Button';
import BoxShadow from '../../../UI/BoxShadow/BoxShadow';
import LoadMore from '../../../UI/LoadMore/LoadMore';

const privateConv = props => {
    let userImg = <Ionicons name="person" size={40} color="#777"/>
    let picked = props.picked && props.picked.length > 0 ? 
        props.picked.filter(id => id === props.userDet._id)[0] ? true : false : false;

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


    return (
        <View style={styles.container}>
            <BoxShadow
                style={styles.wrapper}>
                <Pressable
                    android_ripple={{radius: 10}}
                    onLongPress={props.pick}
                    onPress={props.picked && props.picked.length > 0 ? props.pick : null}
                    style={({ pressed }) => {
                        let style = {}
                        if (pressed) {
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
                    <View style={styles.det}>
                        <Text numberOfLines={1} style={styles.userDet}>
                            { props.userDet.username }
                        </Text>
                        <View style={styles.buttonWrapper}>
                            <Button onPress={props.showProfile} style={styles.useroptButton}>
                                <Text numberOfLines={1} style={styles.profile}>Profile</Text>
                            </Button>
                        </View>
                    </View>
                </Pressable>
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
    container: {
        paddingHorizontal: 10
    },
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
    buttonWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
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
            height: 0,
        }
    },
    profile: {
        marginLeft: 5
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