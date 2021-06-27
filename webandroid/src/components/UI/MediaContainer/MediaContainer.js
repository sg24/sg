import React from 'react';
import { View, Text, TouchableWithoutFeedback , Pressable, Image, StyleSheet , Platform} from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import { Video } from 'expo-av'
import FileIcon from 'file-icons';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

const checkMediaType = props => {
    let media = props.media;
    let Wrapper = props.disablePreview  ?  TouchableWithoutFeedback : TouchableNativeFeedback;
    if (props.enablePressable) {
        Wrapper = Pressable;
    }

    if (media.bucket === 'image' || (media.type && media.type.split('/')[0] === 'image')) {
        return  (
            <Wrapper  style={[styles.wrapper]} onPress={props.disablePreview ? null : props.onPress} onLongPress={props.onLongPress}>
                <View style={[styles.wrapper, props.wrapperStyle]}>
                    <View style={[styles.wrapper, props.style]}>
                        <Image source={{uri: media.uri ? media.uri : `${Constants.manifest.extra.BASE_URL}media/${media.bucket}/${media.id}`}}  
                            resizeMode={props.resizeMode ? props.resizeMode: "center"} style={styles.mediaWrapper}/>
                    </View>
                    { props.children }
                </View>
            </Wrapper>  
        )
    }
    if ((media.bucket === 'video' || media.bucket === 'audio') || (media.type && (media.type.split('/')[0] === 'video' || media.type.split('/')[0] === 'audio' ))) {
       return (
            <View style={[styles.wrapper, props.videoWrapperStyle]}>
                <View style={[styles.wrapper, props.wrapperStyle]}>
                    <View style={[styles.wrapper, props.videoStyle]}>
                    <Video
                        source={{ uri: media.uri ? media.uri :  `${Constants.manifest.extra.BASE_URL}media/${media.bucket}/${media.id}`}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        useNativeControls
                        style={styles.mediaWrapper}
                        />
                        { props.disablePreview ? null : (
                            <View style={[styles.optionWrapper, styles.option]}>
                                <TouchableNativeFeedback onPress={props.onPress}>
                                    <Ionicons name="chatbox-ellipses-outline" size={20} />
                                </TouchableNativeFeedback>
                            </View>
                        )}
                    </View>
                    { props.children }
                </View>
            </View>
        )
    }  

    return (
        <Wrapper
            style={Platform.OS === 'web' ? [styles.wrapper]: null}
            onPress={props.disablePreview ? null : props.onPress} onLongPress={props.onLongPress}>
            <View style={[styles.wrapper, props.wrapperStyle]}>
                <View style={[styles.wrapper, props.fileIconWrapper, styles.fileIconWrapper]}>
                    <FileIcon ext={media.ext ? media.ext.split('/').pop() : (media.name ? String(media.name).split('.').pop()  : '')} wrapper={props.fileIconStyle ? props.fileIconStyle : styles.fileIcon}/>
                    <Text style={styles.fileName}>{media.filename}</Text>
                    { props.disablePreview ? null : (
                        <View style={[styles.optionWrapper, styles.option]}>
                            <TouchableNativeFeedback onPress={props.save}>
                                <Ionicons name="download-outline" size={20}/>
                            </TouchableNativeFeedback>
                        </View>
                    )}
                </View>
                { props.children }
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fileIconWrapper: {
        padding: 10
    },
    fileIcon: {
        width: '100%',
        flex: 1
    },
    fileName: {
        textAlign: 'center',
        marginTop: 5
    },
    mediaWrapper: {
        width: '100%',
        justifyContent: 'center',
        flex: 1
    },
    optionWrapper: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        position: 'absolute',
        right: -3,
        zIndex: 2,
        top: -5
    },
    option: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default checkMediaType;