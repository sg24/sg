import React from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import Ionicons from 'ionicons';

import Button from '../../../UI/Button/Button';
import Href from '../../../UI/Href/Href';
import BoxShadow from '../../../UI/BoxShadow/BoxShadow';
import LoadMore from '../../../UI/LoadMore/LoadMore';
import Avatar from '../../Avatar/Avatar';

const privateConv = props => {
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
                        <Avatar userImage={props.userDet.userImage} iconSize={40} imageSize={60} enableBorder={false} onPress={props.showProfile}/>
                          {/* {userStatus} */}
                    </View>
                    <View style={styles.det}>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Href
                                numberOfLines={1}  title={props.userDet.username} style={styles.userDet} onPress={props.showProfile}/>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button onPress={props.mark} style={styles.useroptButton}>
                                <Ionicons name="checkmark-outline" size={16} color="#fff"/>
                                <Text numberOfLines={1} style={styles.mark}>Mark</Text>
                            </Button>
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
        color: '#333'
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
        }
    },
    mark: {
        color: '#fff',
        marginLeft: 5
    }
});

export default privateConv;