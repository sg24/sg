import React from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet, Platform} from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import Moment from 'react-moment';
import Uridetect from 'uridetect';

import { calendarStrings, checkUri } from '../../../../../shared/utility';
import Button from '../../../Button/Button';
import BoxShadow from '../../../BoxShadow/BoxShadow';
import Href from '../../../Href/Href';
import TouchableNativeFeedback from '../../../TouchableNativeFeedback/TouchableNativeFeedback';
import MediaContainer from '../../../MediaContainer/MediaContainer';
import AbsoluteFill from '../../../AbsoluteFill/AbsoluteFill';
import LinkPreview from '../../../LinkPreview/LinkPreview';
import LoadMore from '../../../LoadMore/LoadMore';
import ReplyChatItem from './ReplyChatItem';

const chatItemBox = props => {
    let created = (
        <Moment element={Text} date={props.cnt.created} style={styles.textStyle} format="h:mm a"  />
    );
    let deleteChatBox = props.deleteChatBox && (
        (props.deleteChatBox._id ? props.deleteChatBox._id === props.cnt._id : false) || 
        (props.deleteChatBox.sendChatID ? props.deleteChatBox.sendChatID === props.cnt.sendChatID : false));
    let editChatBox = props.editChatBox && props.editChatBox._id === props.cnt._id;
    let uri = checkUri(props.cnt.content);
    let loader = (
        <ActivityIndicator
            size="small"
            animating
            color="#437da3"/>
    );
    let replyChatItem = null;
    let userImage = (
        <View style={[styles.userImage, props.direction === 'right' ? styles.userImageDirection : null]}>
            <Ionicons name="person" size={25} color="#777"/>
        </View>
    );

    if (props.cnt.userImage) {
        userImage = <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${props.cnt.userImage}`}}  
        style={[styles.userImage, props.direction === 'right' ? styles.userImageDirection : null]}/>
    }
    if (!props.showReply && props.cnt.replyChatID) {
        replyChatItem = (
            <ReplyChatItem 
                cnt={props.cnt.replyChatInfo[0]}
                deleteChatBox={props.deleteChatBox}
                preview={props.preview}
                replyChat={props.replyChat.bind(this, props.cnt.replyChatInfo[0])}
                showOption={props.showReplyOption.bind(this, props.cnt.replyChatInfo[0], props.direction)}
                scrollToChat={props.scrollToChat.bind(this, props.cnt.replyChatInfo[0])}
                disableUserOpt={props.disableUserOpt}
                openURI={props.openURI}
                searchText={props.searchText}
                highlighted={props.highlighted}/>
        );
    }
    return (
        <>
            { props.firstItem && !props.enableReply && props.enableLoadPrevious ? (
                <LoadMore
                    title="Load Previous"
                    icon={{name: 'reload-outline'}}
                    onPress={props.loadPrevious}
                    start={props.fetchChatStart}
                    wrapperStyle={styles.loadMore} />
            ) : null}
            { props.showDuration && !props.disableUserOpt && !props.enableReply ? (
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 5}}>
                        {/* <View style={{height: 1, backgroundColor: '#dcdbdc', position: 'absolute', top: '50%', width: '100%'}}></View> */}
                        <Moment element={Text} calendar={calendarStrings} style={{fontStyle: 'italic', color: '#777', backgroundColor: '#fff', paddingHorizontal: 10}}>{props.cnt.created}</Moment>
                    </View>
                ): null}
            <View onLayout={(e) => props.chatBoxPosition(e.nativeEvent.layout, props.cnt._id, props.cnt.scrollID, props.index)} style={{height: 0, width: props.width}}></View>
            <View style={[styles.wrapper, props.direction === 'right' ? styles.wrapperDirectionRight : null,
                props.showUserImage ? styles.removeUserImage : null, props.style]} >
                { props.showUserImage ? (
                    !props.disableUserOpt  ? 
                        <TouchableNativeFeedback onPress={props.userProfile}>
                            { userImage }
                        </TouchableNativeFeedback>  
                : null ) : null}
                
                <BoxShadow style={StyleSheet.flatten([deleteChatBox ? styles.deleteContainer : styles.container,
                    !props.showUserImage ? {backgroundColor: '#437da3'} : null])}>
                    { replyChatItem }
                    { props.cnt.media && props.cnt.media.length > 0 ? 
                        props.cnt.media.map((media, index) => (
                            <View
                                style={!props.showUserImage ? [styles.mediaWrapper, {backgroundColor: '#437da3'}] : styles.mediaWrapper}
                                key={index}>
                                <View
                                    style={styles.media}>
                                    <MediaContainer
                                        key={index}
                                        media={media}
                                        fileIconStyle={styles.fileIcon}
                                        fileIconWrapper={styles.mediaContainer}
                                        videoStyle={styles.mediaContainer}
                                        style={styles.mediaContainer}
                                        wrapperStyle={{width: 200}}
                                        onPress={props.preview.bind(this, null, [media], 0)}
                                        android_ripple={{radius: 10}}
                                        enablePressable
                                        onLongPress={props.cnt._id && !deleteChatBox && !editChatBox ? props.showOption : null}>
                                        { media.description ?
                                            <Uridetect
                                                onPress={props.openURI} 
                                                style={!props.showUserImage ?  [styles.content, styles.mediaDescription, styles.hideUserImage] : [styles.content, styles.mediaDescription]} 
                                                textStyle={!props.showUserImage ? styles.hideUserImage : null}
                                                content={media.description} 
                                                searchText={props.searchText}
                                                highlighted={props.highlighted}/> : null}
                                    </MediaContainer>
                                    { !props.cnt.sent && props.cnt.sendChatID? 
                                        <AbsoluteFill
                                            style={styles.uploadWrapper}>
                                            <View style={styles.upload}>
                                                <Text>{props.cnt.uploadedPercent}%</Text>
                                            </View>
                                        </AbsoluteFill> : null}
                                </View>
                            </View>
                        )) : null}
                    { props.cnt.content ? 
                        <Pressable
                            android_ripple={{radius: 10}}
                            onLongPress={props.cnt._id && !deleteChatBox && !editChatBox ? (e) => props.showOption(e, true) : null}
                            style={({ pressed }) => {
                                let style = {}
                                if (pressed) {
                                    style.backgroundColor = '#e9ebf2';
                                }
                                return {
                                    ...style,
                                    padding: 10,
                                    borderRadius: 10,
                                    backgroundColor: props.showUserImage ? '#fff' : '#437da3'
                                };
                            }}>
                            <Uridetect 
                                onPress={props.openURI} 
                                style={!props.showUserImage ?  [styles.content, styles.hideUserImage] : styles.content} 
                                textStyle={!props.showUserImage ? styles.hideUserImage : null}
                                content={props.cnt.content} 
                                searchText={props.searchText}
                                highlighted={props.highlighted}/>
                        </Pressable> : null}
                    { uri.length > 0 ? 
                        <View style={styles.linkPreview}>
                            <LinkPreview 
                                links={uri}/>
                        </View>: null}
                </BoxShadow>
                { !props.disableUserOpt ?
                    <View style={[styles.userInfo, props.direction === 'right' ? styles.userInfoDirection : null, !props.showUserImage ?  styles.userInfoDisableImg : null]}>
                    {/* { !props.showUserImage ? ( */}
                        {/* <View style={[styles.userInfoCnt,
                                props.direction === 'right' ? styles.userInfoCntDirection : null]}>
                            <Href title={props.cnt.username} numberOfLines={1}  onPress={props.userProfile} style={styles.textStyle}/>
                        </View> */}
                        {/* ) : null} */}
                        <View style={props.direction === 'right' ? styles.detDirection : styles.det}>
                            { props.cnt.sendChatID && !props.cnt.sent && !props.cnt.fail ?
                                loader : !props.cnt.fail ? created : null}
                            { props.cnt.sendChatID && props.cnt.fail ?
                                <Button onPress={props.sendChatInfo} disabled={deleteChatBox && editChatBox} style={styles.button}>
                                    <Ionicons name="alert-circle-outline" color="#ff1600" size={20}/>
                                </Button> : null}
                        </View>
                        { props.showReply && props.cnt.reply.length > 0 ?
                            <Button onPress={props.replyChat} disabled={deleteChatBox && editChatBox}
                            style={props.direction === 'right' ? styles.buttonReplyDirection : styles.buttonReply}>
                                <View style={styles.reply}>
                                    <Ionicons name="arrow-redo-outline" size={20} color="#777" />
                                    <Text style={styles.textStyle}>View reply</Text>
                                </View>
                            </Button> : null}
                        { !props.showReply && props.cnt.shared ? 
                            <Button disabled={deleteChatBox && editChatBox} 
                            style={props.direction === 'right' ? styles.buttonReplyDirection : styles.buttonReply}>
                                <View style={styles.reply}>
                                    <Ionicons name="paper-plane-outline" size={20} color="#777" />
                                    <Text style={styles.textStyle}>shared</Text>
                                </View>
                            </Button> : null}
                            {props.cnt.verified ? 
                            <View style={[props.direction === 'right' ? styles.buttonReplyDirection : styles.buttonReply]}><Ionicons name="checkmark" color="#16cf27" size={20}/></View> : null}
                    </View> : null}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        maxWidth: '80%',
        minWidth: 100,
        marginTop: 10,
        marginBottom: 40,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
    },
    wrapperUserImage: {
        marginBottom: 40
    },
    wrapperDirectionRight: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-end'
    },
    container: {
        borderRadius: 10,
        ...Platform.select({
            web: {
                flex: 1
            }
        }),
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
    textStyle: {
        color: '#777'
    },
    deleteContainer: {
        borderRadius: 10,
        ...Platform.select({
            web: {
                flex: 1
            }
        }),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        opacity: .5
    },
    userImage: {
        backgroundColor: '#e9ebf2',
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        borderColor: '#437da3',
        borderWidth: 2,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImageDirection: {
        marginRight: 0,
        marginLeft: 10
    },
    userInfo: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        bottom: -22,
        paddingLeft: 50,
        alignItems: 'center'
    },
    userInfoDirection: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        paddingRight: 50,
        paddingLeft: 0
    },
    userInfoDisableImg: {
        paddingRight: 0,
        paddingLeft: 0
    },
    userInfoCnt: {
        marginRight: 0,
        marginLeft: 10,
    },
    userInfoCntDirection: {
        marginLeft: 0,
        marginRight: 10
    },
    reply: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    mediaWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 10,
        borderRadius: 10
    },
    media: {
        flex: 1
    },
    mediaDescription: {
        marginTop: 10
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333'
    },
    button: {
        paddingVertical: 0
    },
    buttonReply: {
        paddingVertical: 0,
        marginRight: 0,
        marginLeft: 10
    },
    buttonReplyDirection: {
        paddingVertical: 0,
        marginLeft: 0,
        marginRight: 10
    },
    fileIcon: {
        width: '100%',
        height: 100
    },
    mediaContainer: {
        backgroundColor: '#e9ebf2',
        width: '100%',
        height: 150
    },
    uploadWrapper: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    upload: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    linkPreview: {
        width: '100%',
        padding: 10
    },
    loadMore: {
        width: '100%',
        marginVertical: 0,
        paddingHorizontal: 10
    },
    det: {
        marginRight: 0,
        marginLeft: Platform.OS !== 'web' ? 10 : 10
    },
    detDirection: {
        marginLeft: 0,
        marginRight: Platform.OS !== 'web' ? 10 : 10
    },
    hideUserImage: {
        color: '#fff'
    }
});


export default chatItemBox;