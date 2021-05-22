import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'ionicons';

import Button from '../../../UI/Button/Button';
import Href from '../../../UI/Href/Href';
import BoxShadow from '../../../UI/BoxShadow/BoxShadow';
import LoadMore from '../../../UI/LoadMore/LoadMore';
import Avatar from '../../Avatar/Avatar';

const privateConv = props => {
    let picked = props.picked && props.picked.length > 0 ? 
        props.picked.filter(id => id === props.userDet._id)[0] ? true : false : false;

    let userStatus = (
        <View style={[styles.userStatus]}></View>
    );
    
    let startSelectReaction = props.selectReaction.length > 0 ? 
    props.selectReaction.filter(id => id === props.userDet._id).length > 0 ? true : false : false;

    if (props.userDet.status) {
        userStatus = (
            <View style={[styles.userStatus, styles.userStatusOn]}></View>
        );
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
                        <Avatar userImage={props.userDet.userImage} iconSize={40} imageSize={60} enableBorder={false} pressable/>
                        {/* {userStatus} */}
                        {picked ? (
                            <View style={styles.pick}>
                                <Ionicons name="checkmark-outline" color="#16cf27" size={40} />
                            </View>
                        ): null}
                    </View>
                    <View style={styles.det}>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Href
                                numberOfLines={1}  title={props.userDet.username} style={styles.userDet} onPress={props.showProfile}/>
                        </View>
                        <View style={styles.buttonWrapper}>
                            {!props.disabledRightButton ?
                            <Button onPress={props.allowUser} style={styles.useroptButton} disabled={startSelectReaction}>
                                <Text numberOfLines={1} style={styles.allow}>{props.rightTitle ? props.rightTitle: 'Allow'}</Text>
                            </Button> : null}
                            <Button onPress={props.rejectUser} style={styles.useroptAltButton} disabled={startSelectReaction}>
                                <Ionicons name="close" size={16}/>
                                <Text numberOfLines={1} style={styles.remove}>Remove</Text>
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
        flexDirection: 'row',
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
        backgroundColor: '#437da3',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        marginRight: 10
    },
    useroptAltButton: {
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
    allow: {
        color: '#fff'
    },
    remove: {
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