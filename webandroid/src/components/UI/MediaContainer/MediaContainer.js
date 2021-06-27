import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback , Pressable, Image, StyleSheet , Platform} from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import * as FileSystem from 'expo-file-system';
import FileIcon from 'file-icons';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail';

class CheckMediaType extends Component {
    state = {
        fileDownloaded: false,
        downloadStart: false
    }

    saveHandler = async () => {
        if (Platform.OS === 'web') {
            alert('feature not supported on web browser, Please use the S lodge24 APK')
        }
        let media = this.props.media;
        let ext = media.ext.split('/')[1];
        const fileDir = FileSystem.documentDirectory + 's lodge24/' + `${media.bucket}/`;
        const fileUri = `${Constants.manifest.extra.BASE_URL}media/${media.bucket}/${media.id}.${ext}`;
        this.setState({downloadStart: true});
        FileSystem.getInfoAsync(fileDir).then(dirInfo => {
            if (!dirInfo.exists) {
                (async () => await FileSystem.makeDirectoryAsync(fileDir, { intermediates: true }))();
            }
            FileSystem.downloadAsync(fileUri, fileDir + `${media.id}.${ext}`).then(({ uri }) => {
                alert(`Finished downloading to ${uri}`);
                this.setState({fileDownloaded: true})
            }).catch(error => {
                this.setState({downloadStart: false})
                alert('download Error, check your internet connection !!!')
            });
        }).catch((err) => {
            this.setState({downloadStart: false})
            alert('Could not get directory information !!!')
        });
    }

    render() {
        let media = this.props.media;
        let Wrapper = this.props.disablePreview  ?  TouchableWithoutFeedback : TouchableNativeFeedback;
        if (this.props.enablePressable) {
            Wrapper = Pressable;
        }

        if (media.bucket === 'image' || (media.type && media.type.split('/')[0] === 'image')) {
            return  (
                <Wrapper  style={[styles.wrapper]} onPress={this.props.disablePreview ? null : this.props.onPress} onLongPress={this.props.onLongPress}>
                    <View style={[styles.wrapper, this.props.wrapperStyle]}>
                        <View style={[styles.wrapper, this.props.style]}>
                            <Image source={{uri: media.uri ? media.uri : `${Constants.manifest.extra.BASE_URL}media/${media.bucket}/${media.id}`}}  
                                resizeMode={this.props.resizeMode ? this.props.resizeMode: "center"} style={styles.mediaWrapper}/>
                        </View>
                        { this.props.children }
                    </View>
                </Wrapper>  
            )
        }
        if ((media.bucket === 'video' || media.bucket === 'audio') || (media.type && (media.type.split('/')[0] === 'video' || media.type.split('/')[0] === 'audio' ))) {
        return (
            <VideoThumbnail
                    videoWrapperStyle={this.props.videoWrapperStyle}
                    wrapperStyle={this.props.wrapperStyle}
                    videoStyle={this.props.videoStyle}
                    style={this.props.style}
                    media={media}
                    onPress={this.props.onPress}
                    disablePreview={this.props.disablePreview}
                    resizeMode={this.props.resizeMode ? this.props.resizeMode: "center"}
                />
            )
        }  

        return (
            <Wrapper
                style={Platform.OS === 'web' ? [styles.wrapper]: null}
                onPress={this.props.disablePreview ? null : this.props.onPress} onLongPress={this.props.onLongPress}>
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <View style={[styles.wrapper, this.props.fileIconWrapper, styles.fileIconWrapper]}>
                        <FileIcon ext={media.ext ? media.ext.split('/').pop() : (media.name ? String(media.name).split('.').pop()  : '')} wrapper={this.props.fileIconStyle ? this.props.fileIconStyle : styles.fileIcon}/>
                        <Text style={styles.fileName}>{media.filename}</Text>
                        { this.props.disablePreview ? null : (
                            <View style={[styles.optionWrapper, styles.option]}>
                                <TouchableNativeFeedback onPress={this.state.fileDownloaded || this.state.downloadStart ? null : this.saveHandler}>
                                    <Ionicons name="download-outline" size={20} color={this.state.fileDownloaded ? '#437da3' : this.state.downloadStart ? '#777' : '#333'}/>
                                </TouchableNativeFeedback>
                            </View>
                        )}
                    </View>
                    { this.props.children }
                </View>
            </Wrapper>
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

export default CheckMediaType;