import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'ionicons';
import Moment from 'react-moment';
import * as Animatable from 'react-native-animatable';
import Uridetect from 'uridetect';

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import Href from '../../UI/Href/Href';
import Button from '../../UI/Button/Button';
import LinkPreview from '../../UI/LinkPreview/LinkPreview';
import LoadMore from '../../UI/LoadMore/LoadMore';
import Avatar from '../../UI/Avatar/Avatar';
import Advert from '../Advert/Advert';
import { transformNumber, checkUri } from '../../../shared/utility';
import FriendRequest from '../FriendRequest/FriendRequest';
import Carousel from '../../UI/Carousel/Carousel';
import MediaContainer from '../../UI/MediaContainer/MediaContainer';
import TabBarge from '../../UI/TabBarge/TabBarge';

const cbtContent = props => {
    let AnimatedIcon = Animatable.createAnimatableComponent(Ionicons);
    let showAdvert = null;
    let userOpt = null;

    if (props.cnt._id === props.pageCntID) {
        userOpt = (
            <BoxShadow style={styles.userOpt}>
                { props.userID === props.cnt.authorID ? 
                <Button style={styles.userOptItem} onPress={props.edit}>
                    <Ionicons name="create-outline" size={20}/>
                    <Text style={[styles.textStyle, styles.detText]}>Edit</Text>
                </Button> : null }
                { (props.cnt.request > 0) && props.userID === props.cnt.authorID ?
                <Button style={styles.userOptNotificaion} onPress={props.showRequest}>
                    <View style={styles.userOptNotificaionItem}>
                        <Ionicons name="timer-outline" size={20}/>
                        <Text style={[styles.textStyle, styles.detText]}>Request</Text>
                    </View>
                    <TabBarge
                        onPress={props.showRequest}
                        notification={props.cnt.request} 
                        style={styles.tabBarge}
                        textStyle={styles.tabBargeText}/>
                </Button> : null}
                {(props.cnt.allowedUser > 0) &&  props.userID === props.cnt.authorID ?
                <Button style={styles.userOptItem} onPress={props.allowedUser}>
                    <Ionicons name="person-outline" size={20}/>
                    <Text style={[styles.textStyle, styles.detText]}>Allowed User</Text>
                </Button>: null}
                {(props.cnt.mark > 0) &&  props.userID === props.cnt.authorID ?
                <Button style={styles.userOptItem} onPress={props.edit}>
                    <Ionicons name="create-outline" size={20}/>
                    <Text style={[styles.textStyle, styles.detText]}>Mark Question</Text>
                </Button>: null}
                { props.cnt.showResult ?
                <Button style={styles.userOptItem} onPress={props.delete}>
                    <Ionicons name="pencil-outline" size={20} />
                    <Text style={[styles.textStyle, styles.detText]}>Result</Text>
                </Button> : null}
                <Button style={styles.userOptItem} onPress={props.delete}>
                    <Ionicons name="trash-bin-outline" size={20} />
                    <Text style={[styles.textStyle, styles.detText]}>Delete</Text>
                </Button>
                <Button style={styles.userOptItem} onPress={props.shareFriends}>
                    <Ionicons name="paper-plane-outline" size={20} onPress={props.share}/>
                    <Text style={[styles.textStyle, styles.detText]}>Share with friends</Text>
                </Button>
                {props.userID !== props.cnt.authorID ? <Button style={styles.userOptItem} onPress={props.report}>
                    <Ionicons name="warning-outline" size={20}/>
                    <Text style={[styles.textStyle, styles.detText]}>Report</Text>
                </Button>: null}
            </BoxShadow>
        )
    }

    let startPageReaction = props.pageReaction.length > 0 ? 
        props.pageReaction.filter(id => id === props.cnt._id).length > 0 ? true : false : false;

    let previewUri = checkUri(props.cnt.content);

    if (props.cnt.advert && props.cnt.advert.length > 0) {
        showAdvert = (
            <Advert 
                cnt={props.cnt.advert}
                openURI={props.openURI}
                preview={props.mediaPreview}
                advertChatbox={props.advertChatbox}/>
        )
    }

    if (props.cnt.friendRequest && props.cnt.friendRequest.length > 0) {
        showAdvert = (
            <FriendRequest 
                cnt={props.cnt.friendRequest}/>
        )
    }
    return (
        <>
            <View style={styles.container}>
                <BoxShadow style={styles.wrapper}>
                    <View style={styles.userDet}>
                        <View style={styles.userInfo}>
                            <Avatar userImage={props.cnt.userImage} iconSize={20} imageSize={40} onPress={props.userProfile}/>
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
                        {props.cnt.request > 0 ?
                        <TabBarge
                            onPress={props.showUserOpt}
                            notification={props.cnt.request} 
                            style={{top: -4, right: 0}}
                            textStyle={styles.tabBargeText}/> : null}
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={[{width: props.cnt.media.length > 0 ? '60%' : '100%'}, styles.contentWrapper]}>
                            <Pressable 
                                onPress={props.pagePreview}>
                                <Uridetect
                                    numberOfLines={2}
                                    onPress={props.openURI} 
                                    style={styles.title} 
                                    content={props.cnt.title}/>
                            </Pressable>
                            <Text style={[styles.textStyle, styles.contentText]}>Total: 
                            <Text style={{fontWeight: 'bold', marginLeft: 10}}>{ props.cnt.qchatTotal } Questions</Text></Text>
                            <Text style={[styles.textStyle]}>Duration: <Text style={{fontWeight: 'bold', marginLeft: 10}}>{`${props.cnt.hour} hour ${props.cnt.minute} minute ${props.cnt.second} second`}</Text></Text>
                        </View>
                        { props.cnt.media.length > 0  ?
                        <View style={styles.mediaWrapper}>
                                <Carousel 
                                    renderData={props.cnt.media}
                                    hideSeeker
                                    _renderItem={({item:media, index}) => (
                                        <View
                                            style={{flex: 1, backgroundColor: '#e9ebf2'}}>
                                            <MediaContainer
                                                media={media}
                                                onPress={props.mediaPreview.bind(this, null, props.cnt.media, index)} >
                                                {media.description ? <Text numberOfLines={1} style={styles.description}>{ media.description }</Text> : null}
                                            </MediaContainer>
                                        </View>
                                    )}/>
                        </View> : null}
                    </View>
                    {/* <Pressable 
                        onPress={props.pagePreview}>
                        <Uridetect
                            numberOfLines={1}
                            onPress={props.openURI} 
                            style={styles.title}
                            content={props.cnt.title}/>
                    </Pressable>
                    <Pressable 
                        onPress={props.pagePreview}>
                        <Uridetect
                            numberOfLines={2}
                            onPress={props.openURI} 
                            style={styles.content} 
                            content={props.cnt.content}/>
                    </Pressable> */}
                    { previewUri.length > 0 ? 
                        <ScrollView style={styles.linkPreview} horizontal>
                            <LinkPreview 
                                links={previewUri}/>
                        </ScrollView>: null}
                    { props.cnt.chat && props.cnt.chat.user.length > 0 ? 
                    <TouchableNativeFeedback  onPress={props.chat}>
                        <View style={styles.userComment}>
                            { props.cnt.chat.user.map((user, index) => (
                            <Avatar key={index} userImage={user.userImage} iconSize={20} style={[styles.userCommentImage, {left: index !== 0 ? -(index*8) : 'auto'}]}/> ))}
                            <Text  numberOfLines={1} style={[styles.userCommentText, {marginLeft: props.cnt.chat.user.length > 1 ? -((props.cnt.chat.user.length*8)-15) : 10}]}>{props.cnt.chat.user[0].username} {props.cnt.chat.user.length > 1 ? "and other's" : ''} comment on this</Text>
                        </View>
                    </TouchableNativeFeedback> : null}
                    <View style={styles.det}>
                    {props.userID === props.cnt.authorID ? 
                        <Button 
                            onPress={props.chat}
                            disabled={!props.cnt.enableComment}
                            style={{paddingVertical: 0}}>
                            <View style={styles.detContent}>
                                <Ionicons name="chatbox-ellipses-outline" size={24}/>
                                <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(props.cnt.chat ? props.cnt.chat.total : 0) }</Text>
                            </View>
                        </Button> : null}
                        <TouchableNativeFeedback onPress={startPageReaction ? null : props.favorite}>
                            <View style={styles.detContent}>
                                <AnimatedIcon animation={startPageReaction && (props.cnt.cntType !== 'setRequest' && props.cnt.cntType !== 'cancelRequest') ? "pulse" : ''}  duration={500} iterationCount="infinite" 
                                    name={props.cnt.isFavored ? 'heart' : 'heart-outline'} size={24} color={props.cnt.isFavored ? '#ff1600' : '#333'}/>
                                <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(props.cnt.favorite) }</Text>
                            </View>
                        </TouchableNativeFeedback>
                        {props.userID !== props.cnt.authorID ?
                        <Button
                            onPress={props.cnt.takeExam ? props.takeExam : 
                                props.cnt.isPending ? props.cancelRequest : props.request}
                            title={props.cnt.takeExam ? 'Take Exam' : 
                                props.cnt.isPending ? 'Cancel Request' : 'Request'}
                            style={props.cnt.takeExam ? styles.actionButton : styles.actionButtonAlt}
                            textStyle={props.cnt.takeExam ? styles.textStyle : styles.actionButtonText}
                            disabled={startPageReaction && (props.cnt.isPending || !props.cnt.takeExam )}/> : null}
                        <TouchableNativeFeedback onPress={props.share}>
                            <View style={styles.detContent}>
                                <Ionicons name="paper-plane-outline" size={24}/>
                                <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(props.cnt.share) }</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    { userOpt }
                </BoxShadow>
            </View>
            { showAdvert }
            { props.lastItem && props.enableLoadMore ? (
                <LoadMore
                    title="Load More"
                    icon={{name: 'reload-outline'}}
                    onPress={props.loadMore}
                    start={props.start}/>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    container: {
        width: '100%',
        paddingHorizontal: 10
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
    title: {
        fontSize: 16
    },
    
    contentContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentWrapper: {
        paddingRight: 10
    },
    contentText: {
        marginVertical: 10
    },
    mediaWrapper: {
        width: '40%',
        paddingLeft: 10,
        height: 150,
        borderLeftColor: '#dcdbdc',
        borderLeftWidth: 1
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
    actionButton: {
        backgroundColor: '#437da3',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    actionButtonAlt: {
        backgroundColor: '#dcdbdc',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    actionButtonText: {
        color: '#333',
        fontSize: 15
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
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    userOptNotificaion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    userOptNotificaionItem: {
        flexDirection: 'row',
        marginRight: 10
    },
    linkPreview: {
        width: '100%',
        backgroundColor: '#dcdbdc',
        marginBottom: 10
    },
    tabBarge: {
        position: 'relative',
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 0
    },
    tabBargeText: {
        fontSize: 15
    }
});

export default cbtContent;