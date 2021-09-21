import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'ionicons';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import Text from 'text';

import MediaContainer from '../../MediaContainer/MediaContainer';
import Button from '../../Button/Button';
import {  transformNumber } from '../../../../shared/utility';

class MediaItem extends Component {
    state = {
        containerInfo: null
    }

    containerInfoHandler = (e) => {
        if (e) {
            let {width, height} = e.nativeEvent.layout;
            this.setState({containerInfo: {width, height}})
        }
    }

    render() {
        let cnt = (
            <View style={styles.loaderCnt}>
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            </View>
        )

        if (this.state.containerInfo) {
            cnt = (
                <View style={styles.zoomWrapper}>
                    <ReactNativeZoomableView
                        zoomEnabled={true}
                        maxZoom={2}
                        minZoom={0.5}
                        zoomStep={0.25}
                        initialZoom={1}
                        bindToBorders={true}
                        style={styles.zoomableView}
                        captureEvent
                    >
                    <MediaContainer
                        media={this.props.media}
                        disablePreview
                        fileIconStyle={styles.fileIcon}
                        videoStyle={styles.videoWrapper} />
                </ReactNativeZoomableView>
            </View>
            )
        }
        return (
            <View style={styles.wrapper}>
                <View
                    style={styles.wrapper}
                    onLayout={this.containerInfoHandler}>
                    { cnt }
                </View>
                {this.props.media.description ?
                <ScrollView style={styles.scroll}>
                    <Text style={styles.content}>{ this.props.media.description }</Text>
                </ScrollView>: null}
                { this.props.showOption ?
                    <View style={styles.det}>
                        <Button 
                            onPress={this.props.like} 
                            style={styles.detContent}
                            disabled={this.props.media.start ? true : false}>
                            <Ionicons name="thumbs-up-outline" size={24} color={this.props.media.isLiked ? '#437da3' : '#333'}/>
                            <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(this.props.media.like) }</Text>
                        </Button>
                        <Button 
                            onPress={this.props.chat} 
                            style={styles.detContent}>
                            <Ionicons name="chatbox-ellipses-outline" size={24} />
                            <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(this.props.media.chatTotal) }</Text>
                        </Button>
                        <Button 
                            onPress={this.props.dislike} 
                            style={styles.detContent}
                            disabled={this.props.media.start ? true : false}>
                            <Ionicons name="thumbs-down-outline" size={24} />
                            <Text style={[styles.textStyle, styles.detText]}>{ transformNumber(this.props.media.dislike) }</Text>
                        </Button>
                    </View>
                : null}
            </View>
        )
    }
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
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoWrapper: {
        backgroundColor: '#fff'
    },
    det: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderTopColor: '#dcdbdc',
        borderTopWidth: 1,
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
    },
    scroll: {
        maxHeight: 80,
        marginBottom: 10
    },
    zoomWrapper: {
        flex: 1,
        overflow: 'hidden',
    },
    zoomableView: {
        padding: 10
    },
});


export default MediaItem;