import React, { Component } from 'react';
import { View, Text,  ImageBackground, StyleSheet, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'ionicons';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import * as actions from '../../store/actions/index';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import Conv from '../../components/Main/Conv/Conv';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import ChatBox from '../../components/UI/ChatBox/ChatBox';

class Convs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            showChatBox: null
        }
    }

    componentDidMount() {
        if (this.props.navigation) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.onFetchConv(0, this.props.settings.userPage.fetchLimit);
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.props.onCloseHeaderPage();
                this.setState({showChatBox: null})
            });
            Dimensions.addEventListener('change', this.updateStyle)
        } else {
            this.props.onFetchConv(0, this.props.settings.userPage.fetchLimit);
        }
    }

    componentWillUnmount() {
        if (this.props.navigation) { 
            this._unsubscribe();
            this._unsubscribeBlur();
            Dimensions.removeEventListener('change', this.updateStyle);
        } else {
            this.props.onCloseHeaderPage();
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    reloadFetchHandler = () => {
        this.props.onFetchConv(0, this.props.settings.userPage.fetchLimit);
    }

    userProfileHandler = (authorID) => {
        this.props.navigation.push('Profile', {userID: authorID})
    }

    closeModalHandler = () => {
        this.setState({showChatBox: null});
    }
    chatHandler = (cnt) => {
        this.setState({showChatBox: {info: {title: cnt.username, image: cnt.userImage, status: cnt.status, showStatus: true}}, pageID: cnt._id});
    }
    
    loadMoreHandler = () => {
        this.props.onFetchConv(this.props.conv ? this.props.conv.length : 0, this.props.settings.userPage.fetchLimit);
    }

    render() {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}

        let cnt = (
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            );

        if (!this.props.convErr && this.props.conv && this.props.conv.length === 0) {
            cnt = (
                <InfoBox
                    det='No content found!'
                    name="chatbubbles-outline"
                    size={40}
                    style={styles.textStyle} />
            );
        }

       
        if (!this.props.convErr && this.props.conv && this.props.conv.length > 0){
            cnt = (
                <View style={styles.container}>
                    <Wrapper
                        {...wrapperProps}
                        style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <ScrollView
                            style={styles.scroll}
                            showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape' }>
                            <Conv
                                conv={this.props.conv}
                                userID={this.props.userID}
                                userProfile={this.userProfileHandler}
                                closeModal={this.closeModalHandler}
                                chat={this.chatHandler}
                                enableLoadMore={this.props.loadMore}
                                start={this.props.convLoader}
                                loadMore={this.loadMoreHandler}/>
                        </ScrollView>
                     </Wrapper>
                     { this.state.showChatBox ? 
                        <ChatBox
                            title=""
                            showHeaderImage={true}
                            chatType="userchat"
                            page="users"
                            pageID={this.state.pageID}
                            closeChat={this.closeModalHandler}
                            showReply={false}
                            info={this.state.showChatBox.info}
                            showProfile={() => this.userProfileHandler(this.state.pageID)}/> : null}
                </View>
            )
        }

        if (this.props.convErr) {
            cnt = (
                <View style={{width: '100%', flex: 1}}>
                    <ErrorInfo 
                        viewMode={this.state.viewMode}
                        backgroundColor={this.props.settings.backgroundColor}
                        reload={this.reloadFetchHandler}/>
                </View>
            )
        }


      return (
        <NoBackground>
            { cnt }
        </NoBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        flex: 1
    },
    scroll: {
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10
    },
    info: {
        fontSize: 18
    },
    icon: {
        marginBottom: 5
    },
    reload: {
        flexDirection: 'row'
    },
    reloadText: {
        marginLeft: 5,
        fontSize: 15,
        color: '#777'
    }
})

const mapStateToProps = state => {
    return {
        settings: state.settings,
        conv: state.header.conv,
        convErr: state.header.convErr,
        convLoader: state.header.convLoader,
        loadMore: state.header.loadMore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchConv: (start, limit) => dispatch(actions.fetchConvInit(start, limit)),
        onCloseHeaderPage: () => dispatch(actions.fetchConvStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Convs);