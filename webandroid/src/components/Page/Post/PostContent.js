import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import Moment from 'react-moment';

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import Href from '../../UI/Href/Href';
import Button from '../../UI/Button/Button';
import MediaTile from '../../UI/MediaTile/MediaTile';
import { transformNumber } from '../../../shared/utility';

const postContent = props => {
    let userOpt = null;
    if (props.cnt._id === props.pageCntID) {
        userOpt = (
            <BoxShadow style={styles.userOpt}>
                <Button style={styles.userOptItem} onPress={props.edit}>
                    <Ionicons name="create-outline" size={20}/>
                    <Text style={[styles.textStyle, styles.detText]}>Edit</Text>
                </Button>
                <Button style={styles.userOptItem}>
                    <Ionicons name="trash-bin-outline" size={20} onPress={props.delete}/>
                    <Text style={[styles.textStyle, styles.detText]}>Delete</Text>
                </Button>
                <Button style={styles.userOptItem}>
                    <Ionicons name="paper-plane-outline" size={20} onPress={props.share}/>
                    <Text style={[styles.textStyle, styles.detText]}>Share with friends</Text>
                </Button>
                <Button style={styles.userOptItem} onPress={props.report}>
                    <Ionicons name="warning-outline" size={20}/>
                    <Text style={[styles.textStyle, styles.detText]}>Report</Text>
                </Button>
            </BoxShadow>
        )
    }

    return (
        <View style={styles.container}>
            <BoxShadow style={styles.wrapper}>
                <View style={styles.userDet}>
                    <View style={styles.userInfo}>
                        <TouchableNativeFeedback onPress={props.userProfile}>
                            <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${props.cnt.userImage}`}}  style={styles.userImage}/>
                        </TouchableNativeFeedback>
                        <View style={styles.userInfoCnt}>
                            <Href title={props.cnt.username} numberOfLines={1} onPress={props.userProfile} style={styles.textStyle}/>
                            {props.cnt.edited ? (
                                <View style={styles.userInfoCreate}>
                                    <Ionicons name="pencil-outline" color="#777" />
                                    <Text style={{color: '#777', marginRight: 5}} >
                                        Edit
                                    </Text> 
                                    <Moment element={Text} date={props.cnt.edited} fromNow /></View>) : 
                                    <Moment element={Text} date={props.cnt.created} fromNow  />}
                        </View>
                    </View>
                    <TouchableNativeFeedback onPress={props.showUserOpt}>
                        <Ionicons name="ellipsis-horizontal-outline" size={20}/>
                    </TouchableNativeFeedback>
                </View>
                <MediaTile 
                    media={props.cnt.media}
                    preview={props.mediaPreview}
                    save={props.saveMedia}
                    cntID={props.cnt._id} />
                <Href numberOfLines={2} title={props.cnt.content} style={styles.content}/>
                <TouchableNativeFeedback>
                    <View style={styles.userComment}>
                        { [...Array(4)].map((_, index) => (
                        <Image key={index} source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${props.cnt.userImage}`}}  
                            style={[styles.userCommentImage, {left: index !== 0 ? -(index*8) : 'auto'}]}/>
                        ))}
                        <Text  numberOfLines={1} style={[styles.userCommentText, {marginLeft: -((4*8)-15)}]}>SG Tech and other's comment on this</Text>
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.det}>
                    <TouchableNativeFeedback>
                        <View style={styles.detContent}>
                            <Ionicons name="chatbox-ellipses-outline" size={24}/>
                            <Text style={[styles.textStyle, styles.detText]}>234 K</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.detContent}>
                            <Ionicons name="heart-outline" size={24}/>
                            <Text style={[styles.textStyle, styles.detText]}>234 K</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.detContent}>
                            <Ionicons name="paper-plane-outline" size={24}/>
                            <Text style={[styles.textStyle, styles.detText]}>234 K</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                { userOpt }
            </BoxShadow>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    container: {
        width: '100%'
    },
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 5,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    userDet: {
        width: '100%',
        flexDirection: 'row',
        // paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottomColor: '#dcdbdc',
        // borderBottomWidth: 1
    },
    userImage: {
        backgroundColor: '#e9ebf2',
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        borderColor: '#437da3',
        borderWidth: 2
    },
    userInfo: {
        flexDirection: 'row'
    },
    userInfoCreate: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userInfoCnt: {
        justifyContent: 'space-between',
        marginLeft: 10
    },
    content: {
        fontSize: 16,
        marginVertical: 10
    },
    userComment: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    userCommentImage: {
        width: 30,
        height: 30,
        borderRadius: 15, 
        borderColor: '#dcdbdc',
        borderWidth: 2
    },
    userCommentText: {
        marginLeft: -20,
        color: '#777',
        flex: 1
    },
    det: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopColor: '#dcdbdc',
        borderTopWidth: 1,
        marginTop: 10
    },
    detContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 5
    },
    detText: {
        marginLeft: 10
    },
    userOpt: {
        position: 'absolute',
        top: 20,
        right: 40,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    userOptItem: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});

export default postContent;