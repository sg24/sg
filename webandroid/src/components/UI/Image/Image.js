import React, { Component } from 'react';
import { View, TouchableWithoutFeedback , Pressable, StyleSheet , Platform, Image as WebImage} from 'react-native';
import Constants from 'expo-constants';
// import Ionicons from 'ionicons';
// import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import FileIcon from 'file-icons';
import Text, { translator } from 'text';
import axios from 'axios';
import Image from 'expo-cached-image';
// import { v4 as uuid } from 'uuid';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail';

class  CheckMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: this.props.source.uri,
            id: this.props.source.id,
            bucket: this.props.source.bucket,
            ext: this.props.source.ext,
            downloadErr: false
        }
    }

    componentDidMount() {
        if (this.state.id && this.state.bucket) {
            // const fileDir = FileSystem.documentDirectory + 'Slodge24/' + `${this.state.bucket}/`;
            // const fileUri = this.state.uri;
            // FileSystem.getInfoAsync(fileDir).then(dirInfo => {
            //     if (!dirInfo.exists) {
            //         (async () => await FileSystem.makeDirectoryAsync(fileDir, { intermediates: true }))();
            //     }
            //     FileSystem.createDownloadResumable(fileUri, fileDir + `${this.state.id}.${this.state.ext}`).downloadAsync().then(({ uri }) => {
            //         this.saveFileAsync(uri);
            //     }).catch(error => {
            //         this.setState({downloadErr: true});
            //     });
            // }).catch((err) => {
            //     this.setState({allowImage: false})
            // });
        }

    }

    saveFileAsync = async (file_uri) => {
        try {
          const { status, permissions: getPermission } = await MediaLibrary.getPermissionsAsync();
          let permissions = getPermission;
          if (status !== 'granted') {
            const { status: mediaStatus, permissions: requestPermission } = await MediaLibrary.requestPermissionsAsync();
            if (mediaStatus !== 'granted') {
                this.setState({cachedURI: file_uri})
                return;
            }
            permissions = requestPermission;
          }
          if (!permissions || (permissions && permissions.mediaLibrary.accessPrivileges !== 'limited')) {
            const asset = await MediaLibrary.createAssetAsync(file_uri);
            const album = await MediaLibrary.getAlbumAsync('Slodge24');
            if (album === null) {
              await MediaLibrary.createAlbumAsync('Slodge24', asset, false);
              alert(translator(`Finished downloading`));
              this.setState({fileDownloaded: true})
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
              alert(translator(`Finished downloading`));
              this.setState({fileDownloaded: true})
            }
            return true;
          }
          return false;
        } catch (error) {
          console.log('ERR: saveFileAsync', error);
        }
    }

    render() {
        let media = this.props.media;
        let Wrapper = this.props.disablePreview  ?  TouchableWithoutFeedback : TouchableNativeFeedback;
        if (this.props.enablePressable) {
            Wrapper = Pressable;
        }
        if ((media.bucket === 'image' || (media.type && media.type.split('/')[0] === 'image')) && (!media.ext || media.ext.match(/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i))) {
            let ImageWrapper = Platform.OS === 'web' ? WebImage : Image;
            return  (
                <Wrapper  style={[styles.wrapper]} onPress={this.props.disablePreview ? null : this.props.onPress} onLongPress={this.props.onLongPress}>
                    <View style={[styles.wrapper, this.props.wrapperStyle]}>
                        <View style={[styles.wrapper, this.props.style]}>
                            <ImageWrapper source={{uri: media.uri ? media.uri : `${Constants.manifest.extra.BASE_URL}media/${media.bucket}/${media.id}`}}  
                                resizeMode={this.props.resizeMode ? this.props.resizeMode: "contain"} style={styles.mediaWrapper}
                                cacheKey={`${media.id}-thumb`}/>
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
                    resizeMode={this.props.resizeMode ? this.props.resizeMode: "cover"}
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
                                {/* <TouchableNativeFeedback onPress={this.state.downloadStart ? null : this.saveHandler}>
                                    <Ionicons name="download-outline" size={20} color={this.state.fileDownloaded ? '#437da3' : this.state.downloadStart ? '#777' : '#333'}/>
                                </TouchableNativeFeedback> */}
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

export default   CheckMedia;