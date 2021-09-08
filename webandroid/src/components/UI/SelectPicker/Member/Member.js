import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'ionicons';
import Text from 'text';

import Button from '../../Button/Button';
import BoxShadow from '../../BoxShadow/BoxShadow';
import LoadMore from '../../LoadMore/LoadMore';
import Avatar from '../../Avatar/Avatar';
import Href from '../../Href/Href';

const privateConv = props => {
    let startSelectReaction = props.selectReaction.length > 0 ? 
    props.selectReaction.filter(id => id === props.userDet._id).length > 0 ? true : false : false;

    let userStatus = (
        <View style={[styles.userStatus]}></View>
    );

    if (props.userDet.status) {
        userStatus = (
            <View style={[styles.userStatus, styles.userStatusOn]}></View>
        );
    }

    return (
        <View style={styles.container}>
            <BoxShadow
                style={styles.wrapper}>
                <View
                    style={{ padding: 10, borderRadius: 10, flexDirection: 'row', width: '100%'}}>
                    <View>
                        <Avatar userImage={props.userDet.userImage} iconSize={40} imageSize={60} enableBorder={props.userDet.isAdmin} onPress={props.showProfile}/>
                        {userStatus}
                    </View>
                    <View style={styles.det}>
                        <Href onPress={props.showProfile} numberOfLines={1} style={styles.userDet} title={ props.userDet.username }/>
                        <View style={styles.buttonWrapper}>
                            <Button onPress={props.showProfile} style={styles.useroptButton}>
                                <Text numberOfLines={1} style={styles.profile}>Profile</Text>
                            </Button>
                            {props.isAdmin && (props.userDet.authorID !== props.userID) ? 
                            <Button onPress={props.removeUser} style={styles.useroptAltButton} disabled={startSelectReaction}>
                                <Ionicons name="close" size={16} color="#ff1600"/>
                                <Text numberOfLines={1} style={styles.remove}>Remove</Text>
                            </Button>: null}
                        </View>
                    </View>
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
        backgroundColor: '#dcdbdc',
        shadowOffset: {
            width: 0,
            height: 0,
        }
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
    },
    useroptAltButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        backgroundColor: '#e9ebf2',
        marginLeft: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        }
    },
    remove: {
        marginLeft: 5,
        color: '#ff1600'
    },
});

export default privateConv;