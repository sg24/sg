import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { getLinkPreview } from 'link-preview-js';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import * as VideoThumbnails from 'expo-video-thumbnails';
import fileIcon from 'file-icons';

import TouchableNativeFeedback from  '../../TouchableNativeFeedback/TouchableNativeFeedback'

class LinkItem extends Component {
    state = {
        linkTitle: null,
        linkDesc: null,
        linkImg: null,
        linkFavicon: null,
        linkVideo: null,
        linkAudio: null,
        linkDoc: null,
        isLoaded: false,
        uri: this.props.uri,
        mediaType: null,
        ext: null
    };

    componentDidMount() {
        getLinkPreview(this.props.uri).then(data => {
            console.log(data)
            this.setState({
                isLoaded: true,
                linkTitle: data.title ? data.title : null,
                linkDesc: data.description ? data.description : null,
                linkImg:
                  data.images && data.images.length > 0
                    ? data.images.find(function(element) {
                        return (
                          element.includes(".png") ||
                          element.includes(".jpg") ||
                          element.includes(".jpeg")
                        );
                      })
                    : data.mediaType === 'image' ? data.url: null,
                linkFavicon:
                  data.favicons && data.favicons.length > 0
                    ? data.favicons[data.favicons.length - 1]
                    : null,
                linkVideo: data.mediaType === 'video' ? data.url: null,
                mediaType: data.mediaType,
                ext: data.contentType.split('/')[1]
              });
        }).catch(e => {
            this.setState({
                isLoaded: true,
                linkDesc: 'Could not get link preview'
            })
        })
    }

    componentDidUpdate() {
        if (this.state.uri !== this.props.uri) {
            this.setState({uri: this.props.uri})
        }
    }

    openLinkHandler = () => {
        Linking.openURL(this.props.uri);
    }

    generateThumbnail = async () => {
        try {
          const { uri } = await VideoThumbnails.getThumbnailAsync(this.state.linkVideo,{
              time: 15000,
            });
          return uri
        } catch (e) {
          console.warn(e);
          return null
        }
      };

    render() {
        let preview = (
            <ContentLoader 
                    speed={2}
                    foregroundColor="#dcdbdc"
                    width="100%"
                    height="100%"
                    backgroundColor="#e9ebf2"
                >
                    <Rect x="8" y="5%" rx="0" ry="0" width="61" height="75%" /> 
                    <Rect x="78" y="5%" rx="0" ry="0" width="195" height="20%" /> 
                    <Rect x="78" y="35%" rx="0" ry="0" width="195" height="45%" /> 
                    <Circle cx="12" cy="90%" r="5"/> 
                    <Rect x="25" y="85%" rx="0" ry="0" width="248" height="10%" /> 
                </ContentLoader>
        )

        if (this.state.isLoaded) {
            preview = (
                <TouchableNativeFeedback 
                    onPress={this.openLinkHandler}
                    style={styles.preview}>
                    <View  style={styles.previewWrapper}>
                        {this.state.mediaType === 'audio' || this.state.mediaType === '' ?  
                            <FileIcon ext={this.state.ext} style={styles.image}/> : null}
                        {this.state.linkImg || this.state.linkFavicon || this.state.linkVideo ? 
                            <Image source={{uri: this.state.linkImg || this.state.linkFavicon || generateThumbnail() }} 
                                style={this.state.mediaType === 'image' || this.state.mediaType === 'video' ? styles.image : styles.favIcon} /> : null}
                        {!this.state.linkImg ? <View style={styles.info}>
                            {this.state.linkTitle ? 
                                <Text numberOfLines={1} >{this.state.linkTitle}</Text> : null}
                            {this.state.linkDesc ? 
                                <Text numberOfLines={2} style={styles.desc}>{this.state.linkDesc}</Text> : null}
                        </View> : null}
                    </View>
                    <Text style={styles.uri} numberOfLines={1}>{this.props.uri}</Text>
                </TouchableNativeFeedback>
            )
        }

        return (
            <View style={styles.wrapper}>
                { preview }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff'
    },
    preview: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        justifyContent: 'space-between'
    },
    previewWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    favIcon: {
        width: 61,
        height: '100%',
        marginRight: 10,
        backgroundColor: '#dcdbdc',
        resizeMode: 'cover'
    },
    image:  {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: '#dcdbdc'
    },
    info: {
        flexShrink: 1,
        justifyContent: 'space-between'
    },
    desc: {
        fontWeight: 'bold'
    },
    uri: {
        color: '#777'
    }
})

export default LinkItem
