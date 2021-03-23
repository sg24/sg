import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Ionicons from 'ionicons';
// import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import MediaContainer from '../../MediaContainer/MediaContainer';
import Button from '../../Button/Button';
import {  transformNumber } from '../../../../shared/utility';

const mediaItem = props => {
    return (
    <View style={styles.wrapper}>
        <View
            maxZoom={1.5}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            style={styles.wrapper}>
            <MediaContainer
                media={props.media}
                disablePreview
                fileIconStyle={styles.fileIcon}
                videoStyle={styles.videoWrapper} />
            <Text style={styles.content}>{ props.media.description }</Text>
        </View>
        { props.showOption ?
            <View style={styles.det}>
                <Button 
                    onPress={props.like} 
                    style={styles.detContent}
                    disabled={props.media.start ? true : false}>
                    <Ionicons name="thumbs-up-outline" size={24} color={props.media.isLiked ? '#437da3' : '#333'}/>
                    <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(props.media.like) }</Text>
                </Button>
                <Button 
                    onPress={props.chat} 
                    style={styles.detContent}>
                    <Ionicons name="chatbox-ellipses-outline" size={24}/>
                    <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(props.media.chatTotal) }</Text>
                </Button>
                <Button 
                    onPress={props.dislike} 
                    style={styles.detContent}>
                    <Ionicons name="thumbs-down-outline" size={24}/>
                    <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(props.media.dislike) }</Text>
                </Button>
            </View>
        : null}
    </View>
)
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
    },
    fileIcon: {
        height: 200,
        width: 200
    },
    content: {
        fontSize: 16,
        paddingVertical: 10
    },
    videoWrapper: {
        backgroundColor: '#fff'
    },
    det: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopColor: '#dcdbdc',
        borderTopWidth: 1,
        marginTop: 10,
        width: '100%'
    },
    detContent: {
        flexDirection: 'row',
        // backgroundColor: '#e9ebf2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 5,
        // paddingHorizontal: 10
    },
    detText: {
        marginLeft: 10
    },
    button: {
        paddingVertical: 0
    }
});


export default mediaItem;