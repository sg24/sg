import React, { Component} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import Ionicons from 'ionicons';
import Uridetect from 'uridetect';

import InnerScreen from '../../UI/InnerScreen/InnerScreen';
import Option from '../../UI/Option/Option';
import DefaultHeader from '../../UI/Header/DefaultHeader';
import MediaPreview from '../../UI/MediaPreview/MediaPreview';
// import * as actions from '../../store/actions/index';
import { checkUri } from '../../../shared/utility';
import TouchableNativeFeedback from '../../UI/TouchableNativeFeedback/TouchableNativeFeedback';
import Button from '../../UI/Button/Button';
import LinkPreview from '../../UI/LinkPreview/LinkPreview';

class Preview extends Component {
    constructor(props) {
        super(props);
        let authorOption = this.props.userID === this.props.cnt.authorID ? 
        {title: 'Edit', icon: {name: 'create-outline'}, action: 'edit'} : null;
        let defaultOption = [{title: 'Share with friends', icon: {name: 'paper-plane-outline'}, action: 'share'},
        {title: 'Report', icon: {name: 'warning-outline'}, action: 'report'}]
        let option = authorOption ? [authorOption, ...defaultOption] : defaultOption;
        this.state = {
            showOption: false,
            option
        };
    
    }

    checkOptionHandler = () => {
        this.setState((prevState, props) => ({
            showOption: !prevState.showOption
        }))
    }

    closeOptionHandler = () => {
        this.setState({showOption: false})
    }

    optionHandler = (action) => {
        if (action === 'edit') {
            this.props.edit(this.props.cnt._id)
        }

        if (action === 'share') {
            this.props.share(this.props.cnt, 'Friends')
        }

        if (action === 'report') {
            this.props.report(this.props.cnt._id);
        }
        this.setState({showOption: false});
    }

    render () {
        let previewUri = checkUri(this.props.cnt.content);
        let Wrapper = this.mediaPreview && this.mediaPreview.state.showChatBox ? View : ScrollView;
        let wrapperProps =  !this.mediaPreview || !this.mediaPreview.state.showChatBox ? {stickyHeaderIndices: [0], style: {flex: 1, width: '100%'}} : {style: styles.wrapper}

        return (
            <InnerScreen
                onRequestClose={this.props.closePagePreview}
                animationType="slide"
                onBackdropPress={this.props.closePagePreview}>
                <Wrapper
                    {...wrapperProps}>
                    <DefaultHeader
                        onPress={this.props.closePagePreview}
                        title={this.props.title ? this.props.title + "'s" : "post's"}
                        leftSideContent={(
                            <TouchableNativeFeedback onPress={() => this.props.userProfile(this.props.cnt.authorID)}>
                                <Image source={{uri: `${Constants.manifest.extra.BASE_IMAGE_URL}${this.props.cnt.userImage}`}}  style={styles.userImage}/>
                            </TouchableNativeFeedback>
                        )}
                        rightSideContent={(
                            <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                                <Ionicons name="ellipsis-vertical-outline" size={20} />
                            </Button>
                        )}/>
                    { this.props.cnt.media.length > 0 ? 
                         <MediaPreview
                            showOption={this.props.showOption === false ? false : true}
                            pageID={this.props.cnt._id}
                            media={this.props.cnt.media}
                            page={this.props.page}
                            hideSeeker
                            hideHeader
                            style={styles.mediaPreview}/> : null}
                    {this.props.cnt.title ?
                        <Uridetect
                        onPress={this.props.openURI} 
                        style={styles.title} 
                        content={this.props.cnt.title}/>: null}
                    {this.props.cnt.content && this.props.showContent !== false ?
                        <Uridetect
                            onPress={this.props.openURI} 
                            style={styles.content} 
                            content={this.props.cnt.content}/> : null}
                        { previewUri.length > 0 ? 
                        <View style={styles.linkPreview}>
                            <LinkPreview 
                                links={previewUri}/>
                        </View>: null}
                </Wrapper>
                 { this.state.showOption ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeOptionHandler}
                        onPress={this.optionHandler}/>
                ) : null}
            </InnerScreen>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%'
    },
    userImage: {
        backgroundColor: '#e9ebf2',
        width: 30,
        height: 30,
        resizeMode: 'cover',
        borderRadius: 20,
        borderColor: '#437da3',
        borderWidth: 2,
        marginHorizontal: 10
    },
    title: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        lineHeight: 24
    },
    content: {
        fontSize: 16,
        marginVertical: 10,
        paddingHorizontal: 10,
        lineHeight: 24
    },
    optionIcon: {
        paddingVertical: 0
    },
    linkPreview: {
        width: '100%'
    },
    mediaPreview: {
        height: 400,
        width: '100%',
        backgroundColor: '#e9ebf2',
        marginBottom: 10
    }
});


const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Preview);
  