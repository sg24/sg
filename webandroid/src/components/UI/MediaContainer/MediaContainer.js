import React from 'react';
import { View, Text, TouchableWithoutFeedback , Image, StyleSheet , Platform} from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import { Video } from 'expo-av'
import FileIcon from 'file-icons';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

const checkMediaType = props => {
    let media = props.media;
    let Wrapper = props.disablePreview  ?  TouchableWithoutFeedback : TouchableNativeFeedback;
    if (media.bucket === 'image') {
        return  (
            <View style={[styles.wrapper, props.style]}>
                <Wrapper style={styles.wrapper} onPress={props.disablePreview ? null : props.onPress}>
                    <>
                        <Image source={{uri: `${Constants.manifest.extra.BASE_URL}media/${media.bucket}/${media.id}`}}  
                            resizeMode="center" style={styles.mediaWrapper}/>
                        { props.disablePreview ? null : (
                            <View style={[styles.optionWrapper, styles.option]}>
                                <Ionicons name="chatbox-ellipses-outline" size={20} />
                            </View>
                        )}
                    </>
                </Wrapper>
           </View>
        )
    }
    if (media.bucket === 'video' || media.bucket === 'audio') {
       return (
            <View style={[styles.wrapper, props.videoStyle]}>
                <Video
                    source={{ uri: `${Constants.manifest.extra.BASE_URL}media/${media.bucket}/${media.id}`}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
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
        )
    }  

    return (
        <View style={[styles.wrapper, props.style]}>
            <Wrapper
                style={Platform.OS === 'web' ? styles.wrapper: null}
                onPress={props.disablePreview ? null : props.onPress}>
                <>
                    <FileIcon ext={media.ext} wrapper={props.fileIconStyle ? props.fileIconStyle : styles.fileIcon}/>
                    <Text style={styles.fileName}>{media.filename}</Text>
                </>
            </Wrapper>
            { props.disablePreview ? null : (
                <View style={[styles.optionWrapper, styles.option]}>
                    <TouchableNativeFeedback onPress={props.save}>
                        <Ionicons name="download-outline" size={20}/>
                    </TouchableNativeFeedback>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9ebf2'
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