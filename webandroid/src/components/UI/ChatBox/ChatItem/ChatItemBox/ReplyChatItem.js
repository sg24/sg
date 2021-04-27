import React from 'react';
import { View, Pressable, StyleSheet, Platform} from 'react-native';
import Uridetect from 'uridetect';

import { checkUri } from '../../../../../shared/utility';
import BoxShadow from '../../../BoxShadow/BoxShadow';
import MediaContainer from '../../../MediaContainer/MediaContainer';
import LinkPreview from '../../../LinkPreview/LinkPreview';

const chatItemBox = props => {
    let deleteChatBox = props.deleteChatBox && (
        (props.deleteChatBox._id ? props.deleteChatBox._id === props.cnt._id : false) || 
        (props.deleteChatBox.sendChatID ? props.deleteChatBox.sendChatID === props.cnt.sendChatID : false));
    let editChatBox = props.editChatBox && props.editChatBox._id === props.cnt._id;
    let uri = checkUri(props.cnt.content);
    return (
        <BoxShadow style={styles.container}>
            { props.cnt.media && props.cnt.media.length > 0 ? 
                [props.cnt.media[0]].map((media, index) => (
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
                                wrapperStyle={{width: 200}}
                                android_ripple={{radius: 10}}
                                enablePressable
                                onLongPress={props.cnt._id && !deleteChatBox ? props.showOption : null}
                                onPress={props.scrollToChat}>
                                { media.description ?
                                    <Uridetect 
                                        onPress={props.openURI} 
                                        style={[styles.content, styles.mediaDescription]} 
                                        content={media.description} 
                                        searchText={props.searchText}
                                        highlighted={props.highlighted}/> : null}
                            </MediaContainer>
                        </View>
                    </View>
                )) : null}
            { props.cnt.content ? 
                <Pressable
                    android_ripple={{radius: 10}}
                    onLongPress={props.cnt._id && !deleteChatBox && !editChatBox ? (e) => props.showOption(e, true) : null}
                    onPress={props.scrollToChat}
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
                        highlighted={props.highlighted}
                        numberOfLines={3}/>
                </Pressable> : null}
            { uri.length > 0 ? 
                <View style={styles.linkPreview}>
                    <LinkPreview 
                        links={uri}/>
                </View>: null}
        </BoxShadow>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#dcdbdc',
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
        marginRight: 10
    },
    buttonReplyDirection: {
        paddingVertical: 0,
        marginLeft: 10,
        marginRight: 0
    },
    fileIcon: {
        width: '100%',
        height: 100
    },
    mediaContainer: {
        width: '100%',
        height: 150
    },
    linkPreview: {
        width: '100%',
        padding: 10
    },
    det: {
        marginHorizontal: 10
    }
});


export default chatItemBox;