import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'ionicons';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { size } from 'tailwind';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import MediaItem from '../../components/UI/MediaPreview/MediaItem/MediaItem';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import Button from '../../components/UI/Button/Button';
import Option from '../../components/UI/Option/Option';
import * as actions from '../../store/actions/index';
import  { updateObject } from '../../shared/utility';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';

class MediaPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            page: this.props.route.params.page,
            pageID: this.props.route.params.pageID,
            hideSeeker: this.props.route.params.hideSeeker,
            hideHeader: this.props.route.params.hideHeader,
            layout: this.props.route.params.layout,
            media: this.props.route.params.media,
            showMediaOption: this.props.route.params.showOption,
            startPage: this.props.route.params.startPage,
            containerWidth: null,
            showOption: false,
            option: [{title: 'Save', icon: {name: 'save-outline'}, action: 'save'}],
            loaded: false,
            fetchInfoCnt: null,
            showChatBox: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.sm ? 'landscape' :  'portrait'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
        let updateMedia = [];
        let fetchInfoCnt = [];
        for (let media of this.state.media) {
            if (media.chat && this.state.pageID && this.state.page) {
                fetchInfoCnt.push(media.chat)
            } else {
                updateMedia.push(updateObject(media, {like: 0, chatTotal: 0, dislike: 0, isLiked: false, isDisliked: false}));
            }
        }
        if (fetchInfoCnt.length > 0) {
            this.setState({fetchInfoCnt})
           return this.props.onfetchMediaInfo(fetchInfoCnt, this.state.media);
        }
        this.setState({loaded: true, media: updateMedia});
        this.props.onSetMediaInfo(updateMedia);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
        this.props.onResetMediaInfo();
    }

    reloadFetchHandler = () => {
        this.props.onfetchMediaInfo(this.state.fetchInfoCnt, this.state.media);
    }

    containerWidthHandler = (e) => {
        if (e) {
            let {width} = e.nativeEvent.layout;
            this.setState({containerWidth: width})
        }
    }

    seekHandler = (page) => {
       if (this._carousel) {
            if (page === 'right') {
                this._carousel.snapToNext(true);
            } else {
                this._carousel.snapToPrev(true);
            }
       }
    }

    _renderItem = ({item:media, index}) => {
        return (
            <MediaItem 
                media={media}
                like={() => this.props.onMediaReaction(media.id, this.state.page, this.state.pageID, 'mediaLike')}
                dislike={() => this.props.onMediaReaction(media.id, this.state.page, this.state.pageID, 'mediaDislike')}
                chat={() => this.showChatBoxHandler(media.id)}
                showOption={this.state.showMediaOption} />
        )
    }

    checkOptionHandler = () => {
        this.setState((prevState, props) => ({
            showOption: !prevState.showOption
        }))
    }


    closeModalHandler = () => {
        this.setState({showOption: false, showChatBox: null});
    }

    optionHandler = (action) => {
        if (action === 'save') {
            if (Platform.OS === 'web') {
                alert('feature not supported on web browser, Please use the s lodge24 APK')
            }
            let media = this.props.fetchInfo[this._carousel.currentIndex];
            let ext = media.ext.split('/')[1];
            const fileDir = FileSystem.documentDirectory + 'Slodge24/' + `${media.bucket}/`;
            const fileUri = `${Constants.manifest.extra.BASE_URL}media/${media.bucket}/${media.id}.${ext}`;
            FileSystem.getInfoAsync(fileDir).then(dirInfo => {
                if (!dirInfo.exists) {
                    (async () => await FileSystem.makeDirectoryAsync(fileDir, { intermediates: true }))();
                }
                FileSystem.downloadAsync(fileUri, fileDir + `${media.id}.${ext}`).then(({ uri }) => {
                    this.saveFileAsync(uri);
                }).catch(error => {
                    alert('download Error, check your internet connection !!!')
                });
            }).catch((err) => {
                alert('Could not get directory information !!!')
            });
        }
        this.setState({showOption: false});
    }

    saveFileAsync = async (file_uri) => {
        try {
          const { status, permissions: getPermission } = await MediaLibrary.getPermissionsAsync();
          let permissions = getPermission;
          if (status !== 'granted') {
            const { status: mediaStatus, permissions: requestPermission } = await MediaLibrary.requestPermissionsAsync();
            if (mediaStatus !== 'granted') {
                alert('Permission not granted');
                return;
            }
            permissions = requestPermission;
          }
          if (!permissions || (permissions && permissions.mediaLibrary.accessPrivileges !== 'limited')) {
            const asset = await MediaLibrary.createAssetAsync(file_uri);
            const album = await MediaLibrary.getAlbumAsync('Slodge24');
            if (album === null) {
              await MediaLibrary.createAlbumAsync(album, asset, false);
              alert(`Finished downloading`);
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
              alert(`Finished downloading`);
            }
            return true;
          }
          return false;
        } catch (error) {
          console.log('ERR: saveFileAsync', error);
        }
    }

    showChatBoxHandler = (mediaID) => {
        this.props.navigation.navigate('CommentBox', {title: "Comment", chatType: "mediachat", page: this.state.page, pageID: this.state.pageID, showReply: true,
            cntID: mediaID})
    }

    render() {
        let seekLeft = (
            <View style={styles.seekWrapper}>
                <Button style={styles.seek} onPress={() => this.seekHandler('left')}>
                    <Ionicons name="chevron-back-outline" size={15}/>
                </Button>
            </View>
        )
        let seekRight = (
            <View style={[styles.seekWrapper, styles.seekWrapperRight]}>
                <Button style={styles.seek} onPress={() => this.seekHandler('right')}>
                    <Ionicons name="chevron-forward-outline" size={15}/>
                </Button>
            </View>
        );

        let loader = (
            <View style={styles.loaderCnt}>
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            </View>
        );

        let cnt = loader;

        if (this.props.fetchInfo && this.props.fetchInfo.length > 0) {
            cnt = (
                <>
                    { this.props.fetchInfo.length > 1 && !this.props.hideSeeker ? seekLeft : null}
                    <View 
                        style={styles.container}  
                        onLayout={this.containerWidthHandler}>
                        { this.state.containerWidth ? 
                            <View style={[styles.scroll, this.props.carouselStyle]}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                layout={this.props.layout ? this.props.layout : 'default'}
                                data={this.props.fetchInfo}
                                renderItem={this._renderItem}
                                sliderWidth={this.state.containerWidth}
                                itemWidth={this.state.containerWidth}
                                enableSnap
                                enableMomentum />
                        </View> : loader }
                    </View>
                    { this.props.fetchInfo.length > 1  && !this.props.hideSeeker ? seekRight : null}
                </>
            );
        }

        if (this.props.fetchInfoErr) {
            cnt = (
                <ErrorInfo 
                    viewMode={this.state.viewMode}
                    reload={this.reloadFetchHandler}/>
            )
        }

        let modalCnt = (
            <>
              <View style={this.props.style ? this.props.style : styles.wrapper}>
                    <View style={styles.contentWrapper}>
                        { cnt }
                    </View>
                </View>
                { this.state.showOption && !this.props.mediaReactionErr ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeModalHandler}
                        onPress={this.optionHandler}/>
                ) : null}
                 { this.props.mediaReactionErr ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onMediaLikeReset}
                        button={[{title: 'Ok', onPress: this.props.onMediaLikeReset, style: styles.button}]}/> : null}
            </>
        )
        let allCnt =  (
            <View style={styles.wrapper}>
                <DefaultHeader
                    onPress={this.props.navigation.goBack}
                    title="Preview"
                    rightSideContent={(
                        <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                            <Ionicons name="ellipsis-vertical-outline" size={20} />
                        </Button>
                    )}/>
                { modalCnt }
            </View>
        )

        if (this.props.hideHeader) {
            allCnt =  (
                <>
                    { modalCnt }
                </>
            );
        }

        return (
            <NoBackground
                sideBar={(
                    <>
                    <Navigation 
                            color={this.props.settings.color}
                            backgroundColor={this.props.settings.backgroundColor}/>
                    <CreateNavigation 
                        color={this.props.settings.color}
                        backgroundColor={this.props.settings.backgroundColor}/>
                    </>
                )}
                content={ allCnt }
                contentFetched={this.props.fetchChat}>
            </NoBackground>
          )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
        width: '100%'
    },
    contentWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        flex: 1
    },
    container: {
        flex: 1,
    },
    seekWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    seekWrapperRight: {
        marginRight: 0,
        marginLeft: 5
    },
    seek: {
        backgroundColor: '#dcdbdc',
        width: 20,
        height: 40,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll: {
        width: '100%',
        flex: 1
    },
    optionIcon: {
        paddingVertical: 0
    },
    button: {
        backgroundColor: '#437da3',
        color: '#fff'
    }
});
const mapStateToProps = state => {
    return {
        settings: state.settings,
        fetchInfoStart: state.media.fetchInfoStart,
        fetchInfoErr: state.media.fetchInfoError,
        fetchInfo: state.media.fetchInfo,
        mediaReactionErr: state.media.mediaReactionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetMediaInfo: () => dispatch(actions.resetMediaInfo()),
        onfetchMediaInfo: (chat, media) => dispatch(actions.fetchMediaInfoInit(chat, media)),
        onSetMediaInfo: (media) => dispatch(actions.setMediaInfo(media)),
        onMediaReaction: (mediaID, page, pageID, reactionType) => dispatch(actions.mediaReactionInit(mediaID, page, pageID, reactionType)),
        onMediaLikeReset: () => dispatch(actions.mediaReactionReset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaPreview);