import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { size } from 'tailwind';
import urischeme from 'urischeme';
import withComponent from 'withcomponent';
import { useNavigation } from '@react-navigation/native';

import SearchHeader from '../../components/UI/Header/Search';
import Option from '../../components/UI/Option/Option';;
import Settings from '../../components/UI/Settings/Settings';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import WriteUpItem from '../../components/Page/WriteUp/WriteUp';
import PagePreview from '../../components/Page/Preview/Preview';
import MediaPreview from '../../components/UI/MediaPreview/MediaPreview';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import CommentBox from '../../components/UI/CommentBox/CommentBox';
import SelectPicker from '../../components/UI/SelectPicker/SelectPicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';
import Loader from '../../components/UI/Loader/Loader';

class WriteUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            isFocused: false,
            option: [{title: 'Search', icon: {name: 'search-outline'}, action: 'search'},
                {title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            pageCntID: null,
            pageID: null,
            showActionSheet: null,
            showSearch: false,
            search: '',
            showOption: false,
            showSettings: false,
            showSelectGroupPicker: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        this.screenFocused();
        Dimensions.addEventListener('change', this.updateStyle)
    }
    
    componentDidUpdate() {
        this.screenFocused();
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    screenFocused() {
        if (this.props.focus && !this.state.isFocused) {
            this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'writeup', 'getWriteUpFavorite')
            return this.setState({isFocused: true});
        }
        if (!this.props.focus && this.state.isFocused) {
            this.setState({isFocused: false});
        }
    }

    reloadFetchHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'writeup', 'searchWriteUpFavorite', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'writeup', 'getWriteUpFavorite');
    }

    navigationHandler = (page, cntID) => {
        this.props.navigation.navigate(page);
    }

    closeModalHandler = () => {
        this.setState({pageCntID: null, pageID: null, showSelectGroupPicker: null});
    }

    openURIHandler = (type, uri) => {
        if (type === 'hashTag') {
            return this.props.navigation.navigate('HashSearch', {hashTag: uri})
        }
        urischeme(type, uri);
    }

    optionHandler = (action) => {
        if (action === 'search') {
            this.setState({showSearch: true, showOption: false});
        }

        if (action === 'settings') {
            this.setState({showSettings: true, showOption: false});
        }
    }

    searchPageHandler = (cnt) => {
        this.setState({search: cnt});
        if (cnt && cnt.length > 0) {
            this.props.onSearchCnt(0, this.props.settings.page.fetchLimit, 'writeup', 'searchWriteUpFavorite', cnt);
        }
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'writeup', 'getWriteUpFavorite');
    }

    checkOptionHandler = () => {
        this.setState((prevState, props) => ({
            showOption: !prevState.showOption, showActionSheet: null
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
        this.props.navigation.navigate('EditWriteUp', {cntID: id});
    }

    showUserOptHandler = (id) => {
        if (id === this.state.pageCntID) {
            return this.setState({pageCntID: null});
        }
        this.setState({pageCntID: id});
    }

    deletePageHandler = (id, start) => {
        this.props.onDeletePage(id, 'writeup', start, 'getOneAndDelete');
        this.setState({pageCntID: null});
    }

    deletePageResetHandler = () => {
        this.props.onDeletePageReset();
    }

    reportHandler = (pageID) => {
        this.props.navigation.navigate('AddReport', {navigationURI: 'WriteUp', cntType: 'pageReport', page: 'writeup', pageID});
    }

    shareHandler = (cnt, shareType) => {
        let updateCnt = {_id: cnt._id};
        if (shareType === 'Friends') {
            this.props.navigation.navigate('SharePicker', {shareType, cnt: updateCnt,
                shareUpdates: [{shareType: 'writeup', cntID: 'setShare', page: 'writeup', pageID: updateCnt._id}], shareChat: false,
                info: 'Write Up shared successfully !'})
        } else {
            this.setState({showActionSheet: {option: ['Friends', 'Groups'],
                icon: ['people-outline', 'chatbubble-ellipses-outline', 'chatbox-outline'],cnt: updateCnt}})
        }
        this.setState({pageCntID: null});
    }

    mediaPreviewHandler = (cntID, media, startPage) => {
        this.props.navigation.navigate('MediaPreview', {showOption: cntID ? true : false, page: 'writeup', pageID: cntID, media, startPage});
    }

    saveMediaHandler = (mediaCnt) => {

    }

    pagePreviewHandler = (cnt) => {
        this.props.navigation.navigate('PagePreview', {cnt, title: 'Write Up', page: 'writeup', navigationURI: 'WriteUp',
            navigationURIWeb: 'WriteUp', editPage: 'EditWriteUp', showOption: false, share: {shareType: 'writeup', shareChat: false,  info: 'Write Up shared successfully !'}})
    }

    chatHandler = (pageID) => {
        this.props.navigation.navigate('CommentBox', {title: "Comment", chatType: "writeupchat", page: "writeup", pageID, showReply: true})
    }

    favoriteHandler = (pageID) => {
        this.props.onPageReaction('writeup', pageID, 'setFavorite');
    }

    actionSheetHandler = async (index) => {
        if (index === -1) {
            this.setState({showActionSheet: false})
        } else if (index === 0) {
            this.props.navigation.navigate('SharePicker', {shareType: this.state.showActionSheet.option[index], cnt: this.state.showActionSheet.cnt,
                shareUpdates: [{shareType: 'writeup', cntID: 'setShare', page: 'writeup', pageID: this.state.showActionSheet.cnt._id}], shareChat: false,
                info: 'Write Up shared successfully !'})
            return
        } else if (index === 1){
            this.setState({showSelectGroupPicker: {selectType: 'group', pageID: this.state.showActionSheet.cnt._id}, showActionSheet: false})
        } else if (index === 2) {
        } else if (index === 3){
        }
    };

    loadMoreHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit,
                 'writeup', 'searchWriteUpFavorite', this.state.search);
        }
        this.props.onFetchPage(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.page.fetchLimit, 'writeup', 'getWriteUpFavorite');
    }

    render() {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}

        let header = null;

        if (this.state.showSearch) {
            header =  (
                <SearchHeader 
                    onPress={this.closeSearchHandler}
                    title="Search ...."
                    filterCnt={this.searchPageHandler}
                    value={this.state.search}
                    editable
                />
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
        //    <View style={styles.wrapper}>
        //         { header }
        //         <View style={[styles.loaderCnt, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : 
        //                 null]}>
        //             <ActivityIndicator 
        //                 size="large"
        //                 animating
        //                 color="#437da3"/>
        //         </View>
        //         { options }
        //    </View>
        <Loader header={header} options={options} page="writeup" />
        )

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0) {
            cnt = (
                <View style={styles.container}>
                    { header }
                    <Wrapper
                        {...wrapperProps}
                        style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <View 
                            style={styles.scroll}>
                            <WriteUpItem 
                                cnt={this.props.fetchCnt.filter(cnt => cnt.isFavored === true)}
                                userID={this.props.userID}
                                openURI={this.openURIHandler}
                                pageCntID={this.state.pageCntID}
                                userProfile={this.userProfileHandler}
                                pagePreview={this.pagePreviewHandler}
                                edit={this.editHandler}
                                delete={this.deletePageHandler}
                                share={this.shareHandler}
                                report={this.reportHandler}
                                showUserOpt={this.showUserOptHandler}
                                mediaPreview={this.mediaPreviewHandler}
                                saveMedia={this.saveMediaHandler}
                                chat={this.chatHandler}
                                favorite={this.favoriteHandler}
                                pageReaction={this.props.pageReaction}
                                closeModal={this.closeModalHandler}
                                enableLoadMore={this.props.loadMore}
                                start={this.props.fetchCntStart}
                                loadMore={this.loadMoreHandler}
                                loadMoreHandler={this.loadMoreHandler}/>
                        </View>
                    </Wrapper>
                    { options }
                    { this.props.deletePageErr ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onDeletePageReset}
                        button={[{title: 'Ok', onPress: this.props.onDeletePageReset, style: styles.button}]}/> : null}
                    { this.props.pageReactionErr ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onPageReactionReset}
                        button={[{title: 'Ok', onPress: this.props.onPageReactionReset, style: styles.button}]}/> : null}
                    { this.state.showSelectGroupPicker ? 
                        <SelectPicker
                            selectType={this.state.showSelectGroupPicker.selectType}
                            closeSelectPicker={this.closeModalHandler}
                            info="Write Up shared successfully !"
                            confirmAllInfo="Are you sure, you want to share this write Up"
                            iconName="paper-plane-outline"
                            infoBox="Group"
                            title="Select"
                            page="group"
                            pageID={this.state.showSelectGroupPicker.pageID}
                            cntID="getMembergroup"
                            searchID="searchMemberGroup"
                            pageSetting="userPage"
                            rightButton={{title: 'Share', action: 'setShareGroup'}}
                            actionpage="writeup"/> : null}
                    { this.state.showActionSheet ? 
                        <ActionSheet
                            options={this.state.showActionSheet.option}
                            icons={this.state.showActionSheet.icon}
                            bottonIndex={this.actionSheetHandler}
                            title={"Choose"}
                            showSeparator/>
                        : null}
                    { this.props.deletePage && !this.props.deletePage.start ?  
                        <NotificationModal
                            info="Are you sure you want to delete this write up"
                            closeModal={this.deletePageResetHandler}
                            button={[{title: 'Ok', onPress: () => this.deletePageHandler(this.props.deletePage.pageID, true), style: styles.buttonCancel},
                            {title: 'Exit', onPress: this.deletePageResetHandler, style: styles.button}]}/> : null}
                    { this.props.deletePage && this.props.deletePage.start ? 
                        <AbsoluteFill style={{zIndex: 9999999}}/> : null}
                    { this.props.fetchCntErr && this.props.fetchCnt ? 
                        <NotificationModal
                            info="Network Error !"
                            infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                            closeModal={this.props.onFetchCntReset}
                            button={[{title: 'Ok', onPress: this.props.onFetchCntReset, style: styles.button}]}/> : null}
                </View>
            )
        }

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length < 1 && this.state.search.length > 1) {
            cnt = (
                <View style={[styles.wrapper, {backgroundColor: this.props.settings.backgroundColor}]}>
                    { header }
                    <InfoBox
                        det={`Searched text '${this.state.search}' does not match any write up`}
                        name="search"
                        size={40}
                        color="#333"
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}/>
                </View>
            )
        }

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length < 1 && !this.state.showSearch) {
            cnt = (
                <View style={[styles.wrapper, {backgroundColor: this.props.settings.backgroundColor}]}>
                    { header }
                    <InfoBox
                        name="reader-outline"
                        size={40}
                        style={styles.info}
                        wrapperStyle={styles.infoWrapper}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}> No write up added as favorite !!! </Text>
                            <View>
                                {/* <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Href title="Write Up" onPress={() => this.navigationHandler('WriteUp')} style={styles.href}/>
                                </Text> */}
                            </View>
                        </View>
                    </InfoBox>
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

        return cnt;
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
    infoWrapper: {
        flex: 1
    },
    info: {
        fontSize: 18,
        marginBottom: 5
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    href: {
        textDecorationLine: 'underline',
        fontSize: 16
    },
    infoTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    }
});

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        fetchCntErr: state.page.fetchWriteUpError,
        fetchCntStart: state.page.fetchWriteUpStart,
        fetchCnt: state.page.fetchWriteUp,
        loadMore: state.page.loadMore,
        deletePageErr: state.page.deleteWriteUpError,
        deletePage: state.page.deleteWriteUp,
        pageReaction: state.page.pageReaction,
        pageReactionErr: state.page.pageReactionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onSearchCnt: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onDeletePage: (pageID, page, start, cntType) => dispatch(actions.deletePageInit(pageID, page, start, cntType)),
        onPageReset: () => dispatch(actions.pageReset()),
        onDeletePageReset: () => dispatch(actions.deletePageReset()),
        onFetchCntReset: () => dispatch(actions.fetchPageReset()),
        onPageReaction: (page, pageID, reactionType) => dispatch(actions.pageReactionInit(page, pageID, reactionType)),
        onPageReactionReset: () => dispatch(actions.pageReactionReset()),
    };
};

export default withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(WriteUp));