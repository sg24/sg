import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import urischeme from 'urischeme';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import ContentLoader, { Rect, Circle } from "react-content-loader/native"
import Post from '../Group/Post';
import Question from '../Group/Question';
import Feed from '../Group/Feed';
import WriteUp from '../Group/WriteUp';
import CBT from '../Group/CBT';
import Option from '../../components/UI/Option/Option';
import Button from '../../components/UI/Button/Button';
import Href from '../../components/UI/Href/Href';
import Settings from '../../components/UI/Settings/Settings';
import * as actions from '../../store/actions/index';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import TabView from '../../components/UI/TabView/TabView';
import Avatar from '../../components/UI/Avatar/Avatar';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import SharePicker from '../../components/UI/SharePicker/SharePicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';

class GroupPreview extends Component {
    constructor(props) {
        super(props);
        let  layoutWidth = Dimensions.get('window').width;
        let index = this.props.route.params.page === 'feed' ? 1 : 
            this.props.route.params.page === 'cbt' ? 2 :
            this.props.route.params.page === 'question' ? 3 :
            this.props.route.params.page === 'writeup' ? 4 : 0;
        this.state = {
            viewMode:   layoutWidth >= size.md? 'landscape' : 'portrait',
            layoutWidth,
            option: [],
            pageID: this.props.route.params.pageID,
            pageCntID: null,
            showOption: false,
            showSettings: false,
            showSharePicker: null,
            showActionSheet: null,
            routes: [],
            index,
            loaded: false
        }
    }

    updateStyle = (dims) => {
        let layoutWidth = dims.window.width;
        this.setState({
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portriat',
            layoutWidth
        })
    }

    componentDidMount() {
        if (this.state.pageID) {
            Dimensions.addEventListener('change', this.updateStyle)
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                if (this.state.pageID) {
                    this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'groupPreview', 'getGroupInfo', this.state.pageID)
                } else {
                    this.props.navigation.navigate(this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group');
                }
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.props.onPageReset();
                this.setState({pageCntID: null, showOption: false,showSettings: false, showSharePicker: null,
                    showActionSheet: null, loaded: false})
            });
        } else {
            this.props.navigation.navigate(this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group');
        }
    }

    componentDidUpdate() {
        if (!this.state.loaded && this.props.fetchCnt && this.props.fetchCnt.length > 0) {
            let authorOption = this.props.userID === this.props.fetchCnt[0].authorID ?
                {title: 'Edit', icon: {name: 'create-outline'}, action: 'edit'} : null;
            let defaultOption = [{title: 'Share', icon: {name: 'paper-plane-outline'}, action: 'share'},
                {title: 'Report', icon: {name: 'warning-outline'}, action: 'report'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}];
            let option = authorOption ? [authorOption, ...defaultOption] : defaultOption;
            let routes = [];
            let routeList = [{key: 'enablePost', title: 'Post'},{key: 'enableFeed', title: 'Feed'}, 
                {key: 'enableCBT', title: 'CBT'}, {key: 'enableQuestion', title: 'Question'}, 
                {key: 'enableWriteUp', title: 'Write Up'}, {key: 'enableChatroom' , title: 'Chat Room'}]
            let settings = this.props.fetchCnt[0].settings;
            if (settings) {
                for (let cnt of routeList) {
                    let routeItem = Object.entries(settings).filter(([key, value]) => (cnt.key === key) && value)[0];
                    if (routeItem) {
                        routes.push(cnt);
                    }
                }
            }
            this.setState({option, loaded: true, routes})
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribeBlur();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'groupPreview', 'getGroupInfo', this.state.pageID);
    }

    navigationHandler = (page, cntID) => {
        this.props.navigation.navigate(page);
    }

    closeModalHandler = () => {
        this.setState({pageCntID: null, pageID: null,showSharePicker: null, showActionSheet: null});
    }

    openURIHandler = (type, uri) => {
        if (type === 'hashTag') {
            return this.props.navigation.navigate('HashSearch', {hashTag: uri})
        }
        urischeme(type, uri);
    }

    optionHandler = (action) => {
        if (action === 'edit') {
            this.editHandler(this.state.pageID);
        }

        if (action === 'share') {
            this.shareHandler();
        }

        if (action === 'report') {
            this.reportHandler(this.state.pageID);
        }

        if (action === 'settings') {
            this.setState({showSettings: true, showOption: false});
        }
    }

    checkOptionHandler = () => {
        this.setState((prevState, props) => ({
            showOption: !prevState.showOption
        }))
    }

    closeOptionHandler = () => {
        this.setState({showOption: false})
    }

    closeSettingsHandler = () => {
        this.setState({showSettings: false});
    }

    userProfileHandler = (authorID) => {
        this.props.navigation.navigate('Profile', {userID: authorID})
    }

    editHandler = (id) => {
        this.props.navigation.navigate('EditGroup', {cntID: id});
        this.setState({pageCntID: null, showOption: false});
    }

    showUserOptHandler = (id) => {
        if (id === this.state.pageCntID) {
            return this.setState({pageCntID: null});
        }
        this.setState({pageCntID: id});
    }

    reportHandler = (pageID) => {
        this.props.navigation.navigate('AddReport', {navigationURI: this.state.viewMode === 'landscape' ? 'GroupWeb' : 'Group', cntType: 'pageReport', page: 'group', pageID});
        this.setState({pageCntID: null, showOption: false});
    }

    shareHandler = () => {
        let updateCnt = {_id: this.state.pageID};
        this.setState({showActionSheet: {option: ['Friends', 'Groups', 'Chat Room'],
                icon: ['people-outline', 'chatbox-outline', 'chatbubble-ellipses-outline'],cnt: updateCnt}, showOption: false})
    }

    mediaPreviewHandler = (cntID, media, page) => {
        this.setState({showPreview: { startPage: page, media, cntID}})
    }

    closePreviewHandler = () => {
        this.setState({showPreview: null})
    }

    saveMediaHandler = (mediaCnt) => {

    }

    actionSheetHandler = async (index) => {
        if (index === -1) {
            this.setState({showActionSheet: false})
        } else if (index === 0) {
            this.setState({showSharePicker: {shareType: this.state.showActionSheet.option[index],
                cnt: this.state.showActionSheet.cnt}, showActionSheet: false})
            return
        } else if (index === 1){
        } else if (index === 2) {
        } else if (index === 3){
        }
    };

    setIndexHandler = (index) => {
        this.setState({index});
    }

    render() {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}

        let header = (
            <DefaultHeader
                onPress={this.props.navigation.goBack}>
                <ContentLoader 
                    speed={1}
                    foregroundColor="#777"
                    width="100%"
                    height="100%"
                    backgroundColor="#e9ebf2">
                    <Circle cx="14" cy="14" r="14" /> 
                    <Rect x="34" y="0" rx="5" ry="5" width="260" height="12" /> 
                    <Rect x="34" y="15" rx="5" ry="5" width="100" height="12" /> 
                </ContentLoader>
            </DefaultHeader>
        );

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0 && this.props.fetchCnt[0].name) {
            header = (
                <DefaultHeader
                    onPress={this.props.navigation.goBack}
                    leftSideContent={(
                        <View style={styles.leftSideContent}>
                             <Avatar userImage={this.props.fetchCnt[0].defaultImage} 
                                iconSize={20} iconName="chatbubble-ellipses" imageSize={36} enableBorder={false} />
                            <View>
                                <Href style={styles.leftSideContentText} title={this.props.fetchCnt[0].name} numberOfLines={1}/>
                                <Href style={styles.leftSideContentMember} title={`${this.props.fetchCnt[0].member} Members`} numberOfLines={1}/>
                            </View>
                        </View>
                    )}
                    rightSideContent={(
                        <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                            <Ionicons name="ellipsis-vertical-outline" size={20} />
                        </Button>
                    )}/>
            );
        }

        let options = (
            <>
                { this.state.showOption ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeOptionHandler}
                        onPress={this.optionHandler}/>
                ) : null}
                { this.state.showSettings ?
                    <Settings 
                        page="page"
                        closeSettings={this.closeSettingsHandler}/> : null}
            </>
        );

        let cnt = (
           <View style={styles.wrapper}>
                { header }
                <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : 
                        null]}>
                    <ActivityIndicator 
                        size="large"
                        animating
                        color="#437da3"/>
                </View>
                { options }
           </View>
        )

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0 && this.state.loaded) {
            let renderScene = screenProps => {
                switch (screenProps.route.key) {
                    case 'enablePost':
                        return <Post {...screenProps} groupID={this.state.pageID} focus={this.state.index === 0}/>;
                    case 'enableFeed':
                        return <Feed {...screenProps} groupID={this.state.pageID} focus={this.state.index === 1}/>;
                    case 'enableCBT':
                        return <CBT {...screenProps} groupID={this.state.pageID} focus={this.state.index === 2}/>;
                    case 'enableQuestion':
                        return <Question {...screenProps} groupID={this.state.pageID} focus={this.state.index === 3}/>;
                    case 'enableWriteUp':
                        return <WriteUp {...screenProps} groupID={this.state.pageID} focus={this.state.index === 4}/>;
                    case 'enableChatroom':
                        return <Post {...screenProps} groupID={this.state.pageID} />;
                    default:
                        return null;
                }
            }
            cnt = (
                <View style={styles.container}>
                    { header }
                    <TabView
                        navigationState={{ index: this.state.index, routes: this.state.routes }}
                        renderScene={renderScene}
                        onIndexChange={this.setIndexHandler}
                        initialLayout={{ width: this.state.layoutWidth }}
                        lazy
                    />
                    { options }
                    { this.state.showActionSheet ? 
                        <ActionSheet
                            options={this.state.showActionSheet.option}
                            icons={this.state.showActionSheet.icon}
                            bottonIndex={this.actionSheetHandler}
                            title={"Choose"}
                            showSeparator/>
                        : null}
                    { this.state.showSharePicker ? 
                        <SharePicker
                            shareType={this.state.showSharePicker.shareType}
                            closeSharePicker={this.closeModalHandler}
                            cnt={this.state.showSharePicker.cnt}
                            shareUpdates={[{shareType: 'group', cntID: 'setShare', page: 'group', pageID: this.state.showSharePicker.cnt._id}]}
                            shareChat={false}
                            info="Group shared successfully !"/> : null}
                </View>
            )
        }

        if (this.props.fetchCntErr && !this.props.fetchCnt) {
            cnt = (
                <View style={styles.wrapper}>
                    <ErrorInfo 
                        header={header}
                        viewMode={this.state.viewMode}
                        backgroundColor={this.props.settings.backgroundColor}
                        reload={this.reloadFetchHandler}/>
                    { options }
                </View>
            )
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
            content={ cnt }
            contentFetched={this.props.fetchCnt}>
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
        flex: 1,
    },
    landscapeWrapper: {
        width: '100%'
    },
    button: {
        backgroundColor: '#437da3',
        color: '#fff'
    },
    buttonCancel: {
        color: '#ff1600'
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '100%',
        flex: 1
    },
    scroll: {
        width: '100%',
        paddingTop: 10
    },
    optionIcon: {
        paddingVertical: 0
    },
    href: {
        textDecorationLine: 'underline',
        fontSize: 16
    },
    leftSideContent: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftSideContentText: {
        fontSize: 15,
        marginLeft: 10
    },
    leftSideContentMember: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 10
    }
});

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        fetchCntErr: state.page.fetchGroupPreviewError,
        fetchCntStart: state.page.fetchGroupPreviewStart,
        fetchCnt: state.page.fetchGroupPreview,
        loadMore: state.page.loadMore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onSearchCnt: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onPageReset: () => dispatch(actions.pageReset()),
        onFetchCntReset: () => dispatch(actions.fetchPageReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPreview);