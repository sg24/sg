import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity,  Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'ionicons';

import MediaItem from './MediaItem/MediaItem';
import { size } from 'tailwind';
import InnerScreen from '../InnerScreen/InnerScreen';
import DefaultHeader from '../Header/DefaultHeader';
import Button from '../Button/Button';
import Option from '../Option/Option';
import * as actions from '../../../store/actions/index';
import  { updateObject } from '../../../shared/utility';
import ErrorInfo from '../ErrorInfo/ErrorInfo';
import NotificationModal from '../NotificationModal/NotificationModal';
import ChatBox from '../ChatBox/ChatBox';

class MediaPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            containerWidth: null,
            showOption: false,
            option: [{title: 'Save', icon: {name: 'save-outline'}, action: 'save'}],
            media: this.props.media,
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
            if (media.chat && this.props.pageID && this.props.page) {
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
                like={() => this.props.onLikeMedia(media.id, this.props.page, this.props.pageID)}
                chat={() => this.showChatBoxHandler(media.id)}
                showOption={this.props.showOption}
                />
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
            
        }
    }

    showChatBoxHandler = (mediaID) => {
        this.setState({showChatBox: {mediaID}})
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

        if (this.props.fetchInfo) {
            cnt = (
                <>
                    { this.props.fetchInfo.length > 1 ? seekLeft : null}
                    <View 
                        style={styles.container}  
                        onLayout={this.containerWidthHandler}>
                        { this.state.containerWidth ? 
                            <View style={styles.scroll}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.props.fetchInfo}
                                renderItem={this._renderItem}
                                sliderWidth={this.state.containerWidth}
                                itemWidth={this.state.containerWidth}
                            />
                        </View> : loader }
                    </View>
                    { this.props.fetchInfo.length > 1 ? seekRight : null}
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

        return (
            <InnerScreen
                onRequestClose={this.props.closePreview}
                animationType="slide"
                onBackdropPress={this.props.closePreview}>
                <DefaultHeader
                    onPress={this.props.closePreview}
                    title="Preview"
                    rightSideContent={(
                        <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                            <Ionicons name="ellipsis-vertical-outline" size={20} />
                        </Button>
                    )}/>
                <View style={styles.wrapper}>
                    <View style={styles.contentWrapper}>
                        { cnt }
                    </View>
                </View>
                { this.state.showOption && !this.props.mediaLikeErr ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeModalHandler}
                        onPress={this.optionHandler}/>
                ) : null}
                 { this.props.mediaLikeErr ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onMediaLikeReset}
                        button={[{title: 'Ok', onPress: this.props.onMediaLikeReset, style: styles.button}]}/> : null}
                { this.state.showChatBox ? 
                    <ChatBox
                        title="Comment"
                        chatType="mediachat"
                        pageID={this.props.pageID}
                        page={this.props.page}
                        cntID={this.state.showChatBox.mediaID}
                        closeChat={this.closeModalHandler}
                        showReply/> : null}
            </InnerScreen>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
    },
    contentWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
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
        fetchInfoStart: state.media.fetchInfoStart,
        fetchInfoErr: state.media.fetchInfoError,
        fetchInfo: state.media.fetchInfo,
        mediaLikeErr: state.media.mediaLikeError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetMediaInfo: () => dispatch(actions.resetMediaInfo()),
        onfetchMediaInfo: (chat, media) => dispatch(actions.fetchMediaInfoInit(chat, media)),
        onSetMediaInfo: (media) => dispatch(actions.setMediaInfo(media)),
        onLikeMedia: (mediaID, page, pageID) => dispatch(actions.mediaLikeInit(mediaID, page, pageID)),
        onMediaLikeReset: () => dispatch(actions.mediaLikeReset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaPreview);