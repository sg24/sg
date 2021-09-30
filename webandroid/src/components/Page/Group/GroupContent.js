import React from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'ionicons';
import * as Animatable from 'react-native-animatable';
import Uridetect from 'uridetect';
import Text, { translator } from 'text'

import BoxShadow from '../../UI/BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
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
import AdMob from '../../UI/AdMob/AdMob';

const groupContent = props => {
    let AnimatedIcon = Animatable.createAnimatableComponent(Ionicons);
    let showAdvert = null;
    let userOpt = null;
    
    if (props.showAdvert) {
        showAdvert = (
            <AdMob />
        )
    }

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
                        <Ionicons name="chatbubble-ellipses-outline" size={20}/>
                        <Text style={[styles.textStyle, styles.detText]}>Request</Text>
                    </View>
                    <TabBarge
                        onPress={props.showRequest}
                        notification={props.cnt.request} 
                        style={styles.tabBarge}
                        textStyle={styles.tabBargeText}/>
                </Button> : null}
                { (props.cnt.pendingApprove > 0) && props.userID === props.cnt.authorID ?
                <Button style={styles.userOptNotificaion} onPress={props.showPendingAppove}>
                    <View style={styles.userOptNotificaionItem}>
                        <Ionicons name="chatbubble-ellipses-outline" size={20}/>
                        <Text style={[styles.textStyle, styles.detText]}>Approve</Text>
                    </View>
                    <TabBarge
                        onPress={props.showPendingAppove}
                        notification={props.cnt.pendingApprove} 
                        style={styles.tabBarge}
                        textStyle={styles.tabBargeText}/>
                </Button> : null}
                { (props.cnt.mark > 0) && props.userID === props.cnt.authorID ?
                <Button style={styles.userOptNotificaion} onPress={props.mark}>
                    <View style={styles.userOptNotificaionItem}>
                        <Ionicons name="checkmark-outline" size={20}/>
                        <Text style={[styles.textStyle, styles.detText]}>Mark</Text>
                    </View>
                    <TabBarge
                        onPress={props.mark}
                        notification={props.cnt.mark} 
                        style={styles.tabBarge}
                        textStyle={styles.tabBargeText}/>
                </Button> : null}
                <Button style={styles.userOptItem} onPress={props.delete}>
                    <Ionicons name="trash-bin-outline" size={20} />
                    <Text style={[styles.textStyle, styles.detText]}>Delete</Text>
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

    let previewUri = checkUri(props.cnt.title);

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
            {props.tabLoadMore && props.firstItem ? (
                <LoadMore
                    title=""
                    icon={{name: 'reload-outline'}}
                    start/>
            ): null}
            <View style={styles.container}>
                <BoxShadow style={styles.wrapper}>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentWrapper}>
                            <Pressable 
                                onPress={props.showGroupInfo}>
                                <Uridetect
                                    numberOfLines={6}
                                    onPress={props.openURI} 
                                    style={styles.title} 
                                    content={props.cnt.title}/>
                            </Pressable>
                            <TouchableNativeFeedback onPress={props.showGroupInfo}>
                                <View style={styles.memberWrapper}>
                                    <Text style={[styles.memberText, styles.textStyle]}>{ transformNumber(props.cnt.member) } <Text style={{marginLeft: 5}}>Members</Text></Text>
                                </View>
                            </TouchableNativeFeedback>
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
                        </View> : (
                            <View style={styles.mediaWrapper}>
                                <View style={{height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e9ebf2'}}>
                                    <Ionicons name="chatbox-ellipses-outline" size={30} />
                                </View>
                            </View>
                        )}
                    </View>
                    { previewUri.length > 0 ? 
                        <ScrollView style={styles.linkPreview} horizontal>
                            <LinkPreview 
                                links={previewUri}/>
                        </ScrollView>: null}
                    { props.cnt.chat && props.cnt.chat.user.length > 0 ? 
                        <TouchableNativeFeedback  onPress={props.showGroupInfo}>
                            <View style={styles.userComment}>
                                { props.cnt.chat.user.map((user, index) => (
                                <Avatar key={index} userImage={user.userImage} iconSize={20} style={[styles.userCommentImage, {left: index !== 0 ? -(index*8) : 'auto'}]}/> ))}
                                <Text numberOfLines={1} style={[styles.userCommentText, {marginLeft: props.cnt.chat.user.length > 1 ? -((props.cnt.chat.user.length*8)-15) : 10}]}>{props.cnt.chat.user[0].username} {props.cnt.chat.user.length > 1 ? translator("and other's") : ''} {translator('is a member')}</Text>
                            </View>
                        </TouchableNativeFeedback> : null}
                    <View style={styles.det}>
                        <TouchableNativeFeedback onPress={startPageReaction ? null : props.favorite}>
                            <View style={styles.detContent}>
                                <AnimatedIcon animation={startPageReaction && (props.cnt.cntType !== 'setRequest' && props.cnt.cntType !== 'cancelRequest') ? "pulse" : ''}  duration={500} iterationCount="infinite" 
                                    name={props.cnt.isFavored ? 'heart' : 'heart-outline'} size={24} color={props.cnt.isFavored ? '#ff1600' : '#333'}/>
                                <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(props.cnt.favorite) }</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <Button
                            onPress={props.cnt.isMember ? props.enterGroup : 
                                props.cnt.isPending ? props.cancelRequest : 
                                props.cnt.isPendingApprove ? props.cancelApprove: 
                                props.cnt.isPendingMark ? props.cancelMark: props.request}
                            title={props.cnt.isMember ? 'Chat' : 
                                props.cnt.isPending ? 'Cancel Request' : 
                                props.cnt.isPendingApprove ? 'Cancel Request' :
                                props.cnt.isPendingMark ? 'Cancel Request' : 
                                !props.cnt.isPublic ? 'Request' :'Join'}
                            style={props.cnt.isMember? styles.actionButton : styles.actionButtonAlt}
                            textStyle={props.cnt.isMember ? styles.textStyle : styles.actionButtonText}
                            disabled={startPageReaction && (props.cnt.isPending || !props.cnt.isMember )}/>
                        <Button style={styles.detContentOption} onPress={props.showUserOpt}>
                            <View>
                                <Ionicons name="ellipsis-horizontal-outline" size={20}/>
                            </View>
                            {(props.cnt.request + props.cnt.pendingApprove + props.cnt.mark) > 0 &&  (props.userID === props.cnt.authorID) ?
                            <TabBarge
                                onPress={props.showUserOpt}
                                notification={transformNumber(props.cnt.request + props.cnt.pendingApprove + props.cnt.mark)} 
                                style={{top: -4, right: 0}}
                                textStyle={styles.tabBargeText}/> : null}
                        </Button>
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
        paddingHorizontal: 10,
        marginTop: 5
    },
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 20,
        // marginTop: 5,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    title: {
        fontSize: 15,
        marginTop: 10
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentWrapper: {
        paddingRight: 10,
        justifyContent: 'center',
        width: '50%'
    },
    mediaWrapper: {
        width: '50%',
        paddingLeft: 10,
        height: 150,
        borderLeftColor: '#dcdbdc',
        borderLeftWidth: 1
    },
    userComment: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10
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
    detContentOption: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingLeft: 10
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
        bottom: 20,
        right: 30,
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
        marginTop: 10
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
    },
});

const areEqual = (prevProps, nextProps) => {
    if (nextProps.cnt._id === nextProps.pageCntID || prevProps.cnt._id === prevProps.pageCntID ||
        (nextProps.tabLoadMore && nextProps.firstItem) || (prevProps.tabLoadMore && prevProps.firstItem) ||
        (nextProps.start && nextProps.lastItem && nextProps.enableLoadMore) || 
        (prevProps.start && prevProps.lastItem && prevProps.enableLoadMore)) {
        return false;
    }
    let nextPropsReact =  nextProps.pageReaction.length > 0 ?
        nextProps.pageReaction.filter(id => id === nextProps.cnt._id).length > 0 ? true : false : false;
    let prevPropsReact = prevProps.pageReaction.length > 0 ?
        prevProps.pageReaction.filter(id => id === prevProps.cnt._id).length > 0 ? true : false : false;
    if (nextPropsReact || prevPropsReact) {
        return false;
    }
    return true;
}
export default React.memo(groupContent, areEqual);