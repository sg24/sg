import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform, Image as WebImage } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import { Video } from 'expo-av'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from 'expo-file-system';
// import Image, { CacheManager } from 'expo-cached-image';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

class VideoThumbnail extends Component {
    state = {
        showVideoPlayer: false,
        URI: null,
        videoURI: this.props.media.uri ? this.props.media.uri :  `${Constants.manifest.extra.BASE_URL}media/${this.props.media.bucket}/${this.props.media.id}`,
        fetched: false
    }

    async componentDidMount() {
        if (Platform.OS !== 'web') {
            let media = this.props.media
            const fileDir = FileSystem.documentDirectory + 'Slodge24/image/';
            const fileUri = fileDir + `${media.id}.thumb`;
            let fileList = [];
            try {
                fileList = await FileSystem.readDirectoryAsync(fileDir) ? [] : null;
            }catch (e) { }
            try {
                for(let cachedFile of fileList) {
                    if (cachedFile === `${media.id}.thumb`) {
                        this.setState({URI: fileUri, fetched: true})
                    }
                }
                const { uri: URI } = await VideoThumbnails.getThumbnailAsync(
                this.state.videoURI, { time: 2000} );
                if (!media.uri) {
                    FileSystem.getInfoAsync(fileDir).then(dirInfo => {
                        if (!dirInfo.exists) {
                            (async () => await FileSystem.makeDirectoryAsync(fileDir, { intermediates: true }))();
                        }
                        FileSystem.moveAsync(URI, fileUri).then(() => {
                            this.setState({URI: fileUri, fetched: true})
                        }).catch(()=> {
                            this.setState({URI, fetched: true});
                        });
                    }).catch((err) => {
                        this.setState({URI, fetched: true});
                    });
                    return
                }
                this.setState({URI, fetched: true});
                return;
            } catch (e) {
                console.warn(e);
                this.setState({showVideoPlayer: true})
            }
        } else {
            this.setState({showVideoPlayer: true})
        }
    }

    showPlayerHandler = () => {
        this.setState({showVideoPlayer: true})
    }
    
    render() {
        let cnt = (
            <TouchableNativeFeedback onPress={this.props.disablePreview ? this.showPlayerHandler : this.props.onPress}>
                <View style={[styles.wrapper, this.props.videoStyle]}>
                    <ActivityIndicator 
                        size="large"
                        animating
                        color="#437da3"/>
                </View>
            </TouchableNativeFeedback>
        )

        if (this.state.fetched) {
            // let ImageWrapper = Platform.OS === 'web' ? WebImage : Image;
            cnt = (
                <View style={[styles.wrapper, this.props.style]}>
                    <WebImage source={{uri: this.state.URI}}
                        resizeMode={this.props.resizeMode ? this.props.resizeMode: "cover"} style={styles.mediaWrapper}/>
                    <TouchableNativeFeedback onPress={this.props.disablePreview ? this.showPlayerHandler : this.props.onPress}>
                        <View style={styles.startPlayer}>
                            <Ionicons name="caret-forward-circle-outline" size={60} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        }

        if (this.state.showVideoPlayer) {
            cnt = (
                <View style={[styles.wrapper, this.props.videoStyle]}>
                    <Video
                        source={{uri: this.state.videoURI}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        useNativeControls
                        style={styles.mediaWrapper}
                    />
                    { this.props.disablePreview ? null : (
                        <View style={[styles.optionWrapper, styles.option]}>
                            <TouchableNativeFeedback onPress={this.props.onPress}>
                                <Ionicons name="chatbox-ellipses-outline" size={20} />
                            </TouchableNativeFeedback>
                        </View>
                    )}
                </View>
            )
        }

        return (
            <View style={[styles.wrapper, this.props.videoWrapperStyle]}>
            <View style={[styles.wrapper, this.props.wrapperStyle]}>
                { cnt }
                { this.props.children }
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    startPlayer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default VideoThumbnail;