import React, { Component } from 'react';
import { View, Text , StyleSheet,  Dimensions, Platform } from 'react-native';
import { size } from 'tailwind';
import MediaContainer from '../MediaContainer/MediaContainer';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

class MediaTile extends Component {
    constructor(props) {
        super(props);
        const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 
            Platform.OS === 'web' ? 'landscape' : 'portrait',
            sizeMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            viewportWidth,
            viewportHeight
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.sm ? 'landscape' :  
            Platform.OS === 'web' ? 'landscape' : 'portrait',
            sizeMode: dims.window.width >= size.sm ? 'landscape' : 'portrait',
            viewportWidth: dims.window.width,
            viewportHeight: dims.window.height
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    _renderItem = ({item:link, index}) => {
        return (
            <LinkItem 
                uri={verifyUri(link)}
                style={this.state.viewMode !== 'portriat' ? styles.scrollView : null}/>
        )
    }

    widthPercent =  (percentage) => {
        const value = (percentage * this.state.viewportWidth) / 100;
        return Math.round(value);
    }

    render() {
        const slideHeight = this.state.viewportHeight * 0.36;
        const slideWidth = this.widthPercent(75);
        const itemHorizontalMargin = this.widthPercent(2);
        const sliderWidth = this.state.viewportWidth;
        const itemWidth = slideWidth + itemHorizontalMargin * 2;
        if (this.props.media && this.props.media.length > 0) {
            return (
                <View style={styles.wrapper}>
                    {this.props.media.map((cnt, index) => {
                        if (index <= 1 ) {
                            return (
                                <View style={{width: '100%',  flex: 1, 
                                    marginRight: index === 0  && this.props.media.length > 1 ? 10 : 0}}
                                    key={index}>
                                    <MediaContainer 
                                        media={cnt}
                                        onPress={() => this.props.preview(this.props.cntID, this.props.media, index)}
                                        onSave={() => this.props.save(this.props.media[index])}
                                        style={styles.mediaContainer}
                                        videoStyle={styles.mediaContainer}
                                        fileIconWrapper={styles.mediaContainer}/>
                                    { index === 1 && this.props.media.length > 2 ? (
                                        <TouchableNativeFeedback
                                            style={{ flex: 0.5}} 
                                            onPress={() => this.props.preview(this.props.cntID, this.props.media, 1)}>
                                            <View style={styles.otherMediaWrapper}>
                                                <MediaContainer 
                                                    media={this.props.media[2]}
                                                    onPress={() => this.props.preview(this.props.cntID, this.props.media, 2)}
                                                    videoStyle={styles.mediaContainer}
                                                    fileIconWrapper={styles.mediaContainer}/>
                                                <View style={styles.otherMedia}>
                                                    <Text style={styles.otherMediaText}>+ {this.props.media.length - 2} </Text>
                                                </View>
                                            </View>
                                        </TouchableNativeFeedback>
                                    ) : null}
                                </View>
                            )
                        }
                    })}
                </View>
             )
        }
        return null
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row' ,
        marginTop: 10,
        height: 200,
        borderRadius: 3
    },
    mediaContainer: {
        backgroundColor: '#e9ebf2'
    },
    otherMediaWrapper: {
        flex: Platform.OS !== 'web' ? .5 : 1,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherMediaText: {
        fontSize: 20,
        color: '#fff'
    },
    otherMedia: {
        backgroundColor: '#000',
        opacity: .75,
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default MediaTile