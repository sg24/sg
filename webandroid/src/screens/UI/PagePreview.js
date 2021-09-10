import React, { Component} from 'react';
import { View,  ScrollView, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import Uridetect from 'uridetect';
import { size } from 'tailwind';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import Option from '../../components/UI/Option/Option';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import { checkUri } from '../../shared/utility';
import TouchableNativeFeedback from '../../components/UI/TouchableNativeFeedback/TouchableNativeFeedback';
import Button from '../../components/UI/Button/Button';
import Avatar from '../../components/UI/Avatar/Avatar';
import LinkPreview from '../../components/UI/LinkPreview/LinkPreview';

class Preview extends Component {
    constructor(props) {
        super(props);
        let pageCnt = this.props.route.params.cnt
        let authorOption = this.props.userID === pageCnt.authorID ? 
        {title: 'Edit', icon: {name: 'create-outline'}, action: 'edit'} : {title: 'Report', icon: {name: 'warning-outline'}, action: 'report'};
        let defaultOption = [{title: 'Share with friends', icon: {name: 'paper-plane-outline'}, action: 'share'}]
        let option = authorOption ? [authorOption, ...defaultOption] : defaultOption;
        this.state = {
            viewMode: Dimensions.get('window').width >= size.sm ? 'landscape' : 'portrait',
            showOption: false,
            option,
            pageCnt,
            title: this.props.route.params.title,
            showMediaOption: this.props.route.params.showOption,
            page: this.props.route.params.page,
            showContent: this.props.route.params.showContent,
            navigationURI: this.props.route.params.navigationURI,
            navigationURIWeb: this.props.route.params.navigationURIWeb,
            editPage: this.props.route.params.editPage,
            share: this.props.route.params.share || {}
        };
    
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.sm ? 'landscape' :  'portrait'
        })
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
            this.props.navigation.navigate(this.state.editPage, {cntID: this.state.pageCnt._id})
        }

        if (action === 'share') {
            let updateCnt = {_id: this.state.pageCnt._id};
            this.props.navigation.navigate('SharePicker', {shareType: 'Friends', cnt: updateCnt,
                shareUpdates: [{shareType: this.state.share.shareType, cntID: 'setShare', page: this.state.page, pageID: updateCnt._id}], shareChat: this.state.share.shareChat,
                info: this.state.share.info})
        }

        if (action === 'report') {
            this.props.navigation.navigate('AddReport', {navigationURI: this.state.viewMode === 'landscape' ? this.state.navigationURIWeb  :  this.state.navigationURI, 
                cntType: 'pageReport', page: this.state.page, pageID: this.state.pageCnt._id});
        }
        this.setState({showOption: false});
    }

    userProfileHandler = (authorID) => {
        this.props.navigation.navigate('Profile', {userID: authorID})
    }

    openURIHandler = (type, uri) => {
        if (type === 'hashTag') {
            return this.props.navigation.navigate('HashSearch', {hashTag: uri})
        }
        urischeme(type, uri);
    }

    render () {
        let previewUri = checkUri(this.state.pageCnt.content);
        let cnt =  (
            <View style={[styles.wrapper, {backgroundColor: this.props.settings.backgroundColor}]}>
                    <DefaultHeader
                        onPress={this.props.navigation.goBack}
                        title={this.state.title ? this.state.title + "" : "post"}
                        leftSideContent={(
                            <Avatar userImage={this.state.pageCnt.userImage} iconSize={20} imageSize={30} onPress={() => this.userProfileHandler(this.state.pageCnt.authorID)}/>
                        )}
                        rightSideContent={(
                            <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                                <Ionicons name="ellipsis-vertical-outline" size={20} />
                            </Button>
                        )}/>
                     <ScrollView style={styles.scroll}>
                        { this.state.pageCnt.media.length > 0 ? 
                            <MediaPreview
                                showOption={this.state.showMediaOption === false ? false : true}
                                pageID={this.state.pageCnt._id}
                                media={this.state.pageCnt.media}
                                page={this.state.page}
                                hideSeeker
                                hideHeader
                                style={styles.mediaPreview}/> : null}
                        {this.state.pageCnt.title ?
                            <Uridetect
                            onPress={this.openURIHandler} 
                            style={styles.title} 
                            content={this.state.pageCnt.title}/>: null}
                        {this.state.pageCnt.content && this.state.showContent !== false ?
                            <Uridetect
                                onPress={this.openURIHandler} 
                                style={styles.content} 
                                content={this.state.pageCnt.content}/> : null}
                            { previewUri.length > 0 ? 
                            <View style={styles.linkPreview}>
                                <LinkPreview 
                                    links={previewUri}/>
                            </View>: null}
                    </ScrollView>
                 { this.state.showOption ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeOptionHandler}
                        onPress={this.optionHandler}/>
                ) : null}
            </View>
        );

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
                content={ cnt }
                contentFetched={true}>
            </NoBackground>
          )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flex: 1
    },
    scroll: {
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
        settings: state.settings,
        userID: state.auth.userID
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Preview);
  