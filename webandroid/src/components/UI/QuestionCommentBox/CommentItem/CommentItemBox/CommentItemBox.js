import React from 'react';
import { View, Pressable, ActivityIndicator, StyleSheet, Platform} from 'react-native';
import Ionicons from 'ionicons';
import Moment from 'locale-moment';
import Uridetect from 'uridetect';
import Text, { TextWrapper } from 'text';

import { calendarStrings, checkUri } from '../../../../../shared/utility';
import Button from '../../../Button/Button';
import BoxShadow from '../../../BoxShadow/BoxShadow';
import Href from '../../../Href/Href';
import MediaContainer from '../../../MediaContainer/MediaContainer';
import AbsoluteFill from '../../../AbsoluteFill/AbsoluteFill';
import LinkPreview from '../../../LinkPreview/LinkPreview';
import LoadMore from '../../../LoadMore/LoadMore';
import Avatar from '../../../Avatar/Avatar';

const commentItemBox = props => {
    let created = (
        <Moment element={TextWrapper} date={props.cnt.created} style={styles.textStyle} format="h:mm a"  />
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
    let startChatBoxReaction = props.chatBoxReaction.length > 0 ? 
        props.chatBoxReaction.filter(id => id === props.cnt._id).length > 0 ? true : false : false;

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
                    <Moment element={TextWrapper} calendar={calendarStrings} style={{fontStyle: 'italic', color: '#777', backgroundColor: '#fff', paddingHorizontal: 10}}>{props.cnt.created}</Moment>
                </View>
            ): null}
        <View style={[styles.wrapper]}>
            {!props.hideSolutionInfo ?
                <View style={{backgroundColor: props.cnt.correct > props.cnt.wrong  ? '#16cf27' :
                    props.cnt.wrong > props.cnt.correct ? '#ff1600' : '#e9ebf2', width: 30, height: 30, marginRight: 10, 
                    flexDirection: 'row',justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                    <Text style={{color: (props.cnt.correct > props.cnt.wrong) || (props.cnt.wrong > props.cnt.correct) ? '#fff': '#333'}}> 
                        { props.cnt.correct > props.cnt.wrong ? props.cnt.correct : props.cnt.wrong } 
                    </Text>
                </View>: null }
            <View style={{flex: 1}}>
                <BoxShadow style={deleteChatBox ? styles.deleteContainer : styles.container }>
                    { props.cnt.media && props.cnt.media.length > 0 ? 
                        props.cnt.media.map((media, index) => (
                            <View 
                                style={styles.mediaWrapper}
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
                                        wrapperStyle={{width: 300}}
                                        onPress={props.preview.bind(this, null, [media], 0)} 
                                        android_ripple={{radius: 10}}
                                        enablePressable
                                        onLongPress={props.cnt._id && !deleteChatBox && !editChatBox ? props.showOption : null}>
                                        { media.description ?
                                            <Uridetect 
                                                onPress={props.openURI} 
                                                style={[styles.content, styles.mediaDescription]} 
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
                        )) : (
                            <Pressable
                                android_ripple={{radius: 10}}
                                onLongPress={props.cnt._id && !deleteChatBox && !editChatBox ? props.showOption : null}
                                style={({ pressed }) => {
                                    let style = {}
                                    if (pressed) {
                                        style.backgroundColor = '#e9ebf2';
                                    }
                                    return {
                                        ...style,
                                        padding: 10,
                                        borderRadius: 10
                                    };
                                }}>
                                <Uridetect 
                                    onPress={props.openURI} 
                                    style={styles.content} 
                                    content={props.cnt.content} 
                                    searchText={props.searchText}
                                    highlighted={props.highlighted}/>
                            </Pressable>
                        )}
                    { uri.length > 0 ? 
                        <View style={styles.linkPreview}>
                            <LinkPreview 
                                links={uri}/>
                        </View>: null}
                </BoxShadow>
                { (props.userID !== props.cnt.authorID) && !props.hideSolutionInfo ? (
                    <View style={{flexDirection: 'row', position: 'absolute', bottom: 30}}>
                        <Button style={styles.buttonCorrect} onPress={props.correct} disabled={startChatBoxReaction || props.cnt.isCorrect}>
                            { !props.cnt.isCorrect ?
                                <View style={[styles.reaction, {marginRight: 10}]} >
                                    <Ionicons name="checkmark-outline" color="#16cf27" size={20}/>
                                </View> : null}
                            <Text style={{color: '#777', marginRight: 5}}>Correct</Text>
                            <Text>{ props.cnt.correct }</Text>
                        </Button>
                        <Button  style={styles.button} onPress={props.wrong} disabled={startChatBoxReaction || props.cnt.isWrong}>
                            { !props.cnt.isWrong ? 
                                <View style={[styles.reaction, {marginRight: 5}]}>
                                    <Ionicons name="close-outline" color="#ff1600" size={20}/>
                                </View> : null}
                            <Text style={{color: '#777', marginRight: 5}}>Wrong</Text>
                            <Text>{ props.cnt.wrong }</Text>
                        </Button>
                    </View>
                ) : null}
                { !props.disableUserOpt ?
                    <View style={[styles.userInfo]}>
                        <Avatar onPress={props.userProfile} userImage={props.cnt.userImage} iconSize={25} imageSize={40} />
                        <View style={[styles.userInfoCnt]}>
                            <Href title={props.cnt.username} numberOfLines={1}  onPress={props.userProfile} style={styles.textStyle}/>
                        </View>
                        { props.showReply && props.cnt.reply.length > 0 ? 
                            <Button onPress={props.replyChat} disabled={deleteChatBox && editChatBox} 
                            style={styles.buttonReply}>
                                <View style={styles.reply}>
                                    <Ionicons name="arrow-redo-outline" size={20} color="#777" />
                                    <Text style={styles.textStyle}>View reply</Text>
                                </View>
                            </Button> : null}
                        <View style={styles.det}>
                            { props.cnt.sendChatID && !props.cnt.sent && !props.cnt.fail ? 
                                loader : !props.cnt.fail ? created : null}
                            { props.cnt.sendChatID && props.cnt.fail ? 
                                <Button onPress={props.sendChatInfo} disabled={deleteChatBox && editChatBox} style={styles.button}>
                                    <Ionicons name="alert-circle-outline" color="#ff1600" size={20}/>
                                </Button> : null}
                        </View>
                    </View> : null}
                </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        marginBottom: 40,
        paddingHorizontal: 10
    },
    wrapperUserImage: {
        marginBottom: 40
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
    userInfo: {
        flexDirection: 'row-reverse',
        width: '100%',
        alignItems: 'center',
        marginTop: 15
    },
    userInfoCnt: {
        marginHorizontal: 10
    },
    reply: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    mediaWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 10
    },
    media: {
        flex: 1
    },
    mediaDescription: {
        marginTop: 10
    },
    content: {
        fontSize: 16,
        textAlign: 'center'
    },
    button: {
        paddingVertical: 0
    },
    buttonReply: {
        paddingVertical: 0,
        marginLeft: 10
    },
    fileIcon: {
        width: '100%',
        height: 100
    },
    mediaContainer: {
        backgroundColor: '#e9ebf2',
        width: '100%',
        height: 200
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
    button: {
        paddingVertical: 0,
        flexDirection: 'row'
    },
    buttonCorrect: {
        paddingVertical: 0,
        flexDirection: 'row',
        marginRight: 10
    },
    reaction: {
        width: 20,
        height: 20, 
        // position: 'absolute',
        // bottom: 15,
        backgroundColor: '#e9ebf2',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default commentItemBox;