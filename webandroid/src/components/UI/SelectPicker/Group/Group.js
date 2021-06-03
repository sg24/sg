import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'ionicons';

import Href from '../../../UI/Href/Href';
import { transformNumber } from '../../../../shared/utility';
import BoxShadow from '../../../UI/BoxShadow/BoxShadow';
import LoadMore from '../../../UI/LoadMore/LoadMore';
import Avatar from '../../Avatar/Avatar';

const group = props => {
    let picked = props.picked && props.picked.length > 0 ? 
        props.picked.filter(id => id === props.groupDet._id)[0] ? true : false : false;

    let userStatus = (
        <View style={[styles.userStatus]}></View>
    );

    if (props.groupDet.status) {
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
                            justifyContent: 'space-between',
                            width: '100%'
                        };
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Avatar userImage={props.groupDet.image} iconName="chatbubble-ellipses" iconSize={40} imageSize={60} enableBorder={false} pressable/>
                            {picked ? (
                                <View style={styles.pick}>
                                    <Ionicons name="checkmark-outline" color="#16cf27" size={40} />
                                </View>
                            ): null}
                        </View>
                        <View style={styles.det}>
                            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <Href numberOfLines={1}  title={props.groupDet.title} style={styles.userDet} onPress={props.showProfile}/>
                            </View>
                            <View style={styles.memberWrapper}>
                                <Text style={[styles.memberText, styles.textStyle]}>{ transformNumber(props.groupDet.member) } <Text style={{marginLeft: 5}}>Members</Text></Text>
                            </View>
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
    textStyle: {
        fontSize: 15
    },
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
    memberWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    memberText: {
        color: '#333',
        fontWeight: 'bold'
    }
});

export default group;