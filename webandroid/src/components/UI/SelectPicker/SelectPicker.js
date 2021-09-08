import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { size } from 'tailwind';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { useNavigation } from '@react-navigation/native';
import withComponent from 'withcomponent';
import Ionicons from 'ionicons';
import Text, { translator } from 'text';

import InnerScreen from '../InnerScreen/InnerScreen';
import SearchHeader from '../Header/Search';
import DefaultHeader from '../Header/DefaultHeader';
import * as actions from '../../../store/actions/index';
import ErrorInfo from '../ErrorInfo/ErrorInfo';
import Button from '../Button/Button';
import NotificationModal from '../NotificationModal/NotificationModal';
import PrivateConv from './PrivateConv/PrivateConv';
import PendingMark from './PendingMark/PendingMark';
import PendingApprove from './PendingAprove/PendingApprove';
import Group from './Group/Group';
import Member from './Member/Member';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import InfoBox from '../InfoBox/InfoBox';
import AbsoluteFill from '../AbsoluteFill/AbsoluteFill';

class SelectPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#fff',
            color: '#333',
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            showSearch: false,
            picked: [],
            search: '',
            changeReaction: null,
            select: null
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
        this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings[this.props.pageSetting].fetchLimit, this.props.page, this.props.pageID, this.props.cntID);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
        this.props.onSelectCntReset(); 
    }

    reloadFetchHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings[this.props.pageSetting].fetchLimit, this.props.page, this.props.pageID, this.props.searchID, this.state.search);
        }
        this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings[this.props.pageSetting].fetchLimit, this.props.page, this.props.pageID, this.props.cntID);
    }

    navigationHandler = (page, userID) => {
        if (page === 'Profile') {
            this.props.navigation.push(page, {userID})
        }

        if (page === 'GroupPreview') {
            this.props.navigation.push(page, userID)   
        }

        if (page === 'User') {
            this.props.navigation.navigate(page);
        }
    }

    closeModalHandler = () => {
        if (this.state.changeReaction) {
            this.props.onSelectReactionReset(this.state.changeReaction.cntID);
            this.setState({changeReaction: null});
            return
        }
        if (this.state.select) {
            this.props.onSelectReset();
            this.setState({select: null});
        }
    }

    showSearchHandler = () => {
        this.setState({showSearch: true})
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onSelectCntReset();
        this.props.onFetchCnt(0, this.props.settings[this.props.pageSetting].fetchLimit, this.props.page, this.props.pageID, this.props.cntID);
    }

    loadMoreHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings[this.props.pageSetting].fetchLimit, this.props.page, this.props.pageID, this.props.searchID, this.state.search);
        }
        this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings[this.props.pageSetting].fetchLimit, this.props.page, this.props.pageID, this.props.cntID);
    }

    pickHandler = (id) => {
        let picked = [...this.state.picked];
        let checkPicked = picked.filter(cnt => cnt === id)[0];
        if (checkPicked) {
            picked = picked.filter(cnt => cnt !== id);
        } else {
            picked.push(id);
        }
        this.setState({picked})
    }

    selectHandler = (cntType, confirm, info) => {
        if (this.props.selectType === 'cbtRequest' || this.props.selectType === 'groupRequest' || this.props.selectType === 'groupPendingapprove'
        || this.props.selectType === 'group' || this.props.selectType === 'chatroomRequest' || this.props.selectType === 'chatroomPendingapprove'
        || this.props.selectType === 'userRequest') {
            this.props.onSelectCnt(this.props.actionpage ? this.props.actionpage: this.props.page, this.props.pageID, cntType, this.props.cntID, this.state.picked, 'post',
                confirm, this.props.selectType !== 'group' );
            if (confirm) {
                return this.setState({select: null});
            }
            this.setState({select: {cntID: this.props.cntID, cntType, info, confirm}});
        }
    }

    selectResetHandler = () => {
        this.setState({picked: []});
        this.props.onSelectReset();
    }

    searchHandler = (cnt) => {
        if (cnt && cnt.length > 0) {
            this.props.onSearchCnt(0, this.props.settings[this.props.pageSetting].fetchLimit, this.props.page, this.props.pageID, this.props.searchID, cnt);
            this.setState({search: cnt});
        }
    }

    selectReactionHandler = (cntType, cntID, confirm, info) => {
        this.props.onSelectReaction(this.props.page, this.props.pageID, cntType, cntID, [cntID], 'post', confirm);
        if (confirm) {
            let picked = this.state.picked
            if (this.state.picked.length > 0) {
                picked = picked.filter(id => id !== cntID);
            }
            return this.setState({changeReaction: null, picked});
        }
        this.setState({changeReaction: {cntID, cntType, info, confirm}});
    }

    render() {
        let { styles } = this.props;
        let reaction = this.props.selectReaction.length > 0 && this.state.changeReaction ? this.props.selectReaction.filter(id => id === this.state.changeReaction.cntID)[0] : null;
        let header = (
            <DefaultHeader 
                onPress={this.props.closeSelectPicker}
                title={`${this.props.title} ${this.state.picked.length > 0 ? this.state.picked.length : ''}`}
                rightSideContent={(
                    <View style={styles.headerRightContent}>
                        { this.props.leftButton && this.props.leftButton.show !== false ? <Button 
                            title={this.props.leftButton.title}
                            style={styles.selectAltButton}
                            textStyle={styles.selectAltText}
                            onPress={() => this.selectHandler(this.props.leftButton.action, false, this.props.confirmAllRejInfo ? this.props.confirmAllRejInfo : 'Are you sure you want to remove this users')}
                            disabled={this.state.picked.length < 1 || this.props.selectStart}
                            submitting={this.props.selectStart && !this.state.select && this.props.reactionType === this.props.leftButton.action}
                            loaderStyle="#fff" /> : null}
                        { this.props.rightButton ? <Button 
                            title={this.props.rightButton.title}
                            style={styles.selectButton}
                            onPress={() => this.selectHandler(this.props.rightButton.action, false, this.props.confirmAllInfo ? this.props.confirmAllInfo : 'Are you sure you want to allow this users')}
                            disabled={this.state.picked.length < 1 || this.props.selectStart}
                            submitting={this.props.selectStart && !this.state.select && this.props.reactionType === this.props.rightButton.action}
                            loaderStyle="#fff" /> : null}
                        {this.props.enableSearch === false ? null :
                            <TouchableNativeFeedback onPress={this.showSearchHandler}>
                                <Ionicons name="search" size={24} />
                            </TouchableNativeFeedback>}
                    </View>
                )}
            />
        );

        if (this.state.showSearch) {
            header =  (
                <SearchHeader 
                    onPress={this.closeSearchHandler}
                    title={this.props.searchTitle}
                    filterCnt={this.searchHandler}
                    editable
                    rightSideContent={(
                        <View style={styles.headerRightContent}>
                           { this.state.picked.length > 0 ?
                            <View style={styles.picked}>
                                <Text style={styles.pickedText} numberOfLines={1}> { this.state.picked.length } </Text>
                            </View> : null}
                            { this.props.leftButton ? <Button 
                                title={this.props.leftButton.title}
                                style={styles.selectAltButton}
                                textStyle={styles.selectAltText}
                                onPress={() => this.selectHandler(this.props.leftButton.action, false, this.props.confirmAllRejInfo ? this.props.confirmAllRejInfo : 'Are you sure you want to remove this users')}
                                disabled={this.state.picked.length < 1 || this.props.selectStart}
                                submitting={this.props.selectStart && !this.state.select && this.props.reactionType === this.props.leftButton.action}
                                loaderStyle="#fff" /> : null}
                            { this.props.rightButton ? <Button 
                                title={this.props.rightButton.title}
                                style={styles.selectButton}
                                onPress={() => this.selectHandler(this.props.rightButton.action, false, this.props.confirmAllInfo ? this.props.confirmAllInfo : 'Are you sure you want to allow this users')}
                                disabled={this.state.picked.length < 1 || this.props.selectStart}
                                submitting={this.props.selectStart && !this.state.select && this.props.reactionType === this.props.rightButton.action}
                                loaderStyle="#fff" /> : null}
                        </View>
                    )}
                />
            );
        }
        
        let cnt = (
            <View style={[styles.wrapper, styles.loaderCnt]}>
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            </View>
         )

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0) {
            let items = null;
            if (this.props.selectType === 'cbtRequest' || this.props.selectType === 'groupRequest' || this.props.selectType === 'chatroomRequest'
                || this.props.selectType === 'userRequest') {
                items = this.props.fetchCnt.map((cnt, index) => (
                    <PrivateConv
                        key={index}
                        userDet={cnt}
                        showProfile={() => this.navigationHandler('Profile', cnt.authorID)}
                        rightTitle={this.props.rightButton ? this.props.rightButton.title : null}
                        leftTitle={this.props.leftButton ? this.props.leftButton.title : null}
                        lastItem={index === (this.props.fetchCnt.length - 1)}
                        loadMore={this.loadMoreHandler}
                        enableLoadMore={this.props.loadMore}
                        allowPressable
                        selectReaction={this.props.selectReaction}
                        allowUser={() => this.selectReactionHandler(this.props.rightButton.action, cnt._id, false, this.props.confirmInfo ? this.props.confirmInfo : 'Are you sure you want to allow this user')}
                        rejectUser={() => this.selectReactionHandler(this.props.leftButton.action, cnt._id, false, this.props.confirmRejInfo ? this.props.confirmRejInfo : 'Are you sure you want to remove this user')}
                        start={this.props.fetchSelectcntStart}
                        pick={() => this.pickHandler(cnt._id)}
                        picked ={this.state.picked}
                        disabledRightButton={!this.props.rightButton}
                        />
                ));
            }

            if (this.props.selectType === 'groupPendingapprove'  || this.props.selectType === 'chatroomPendingapprove') {
                items = this.props.fetchCnt.map((cnt, index) => (
                    <PendingApprove
                        key={index}
                        userDet={cnt}
                        showProfile={() => this.navigationHandler('Profile', cnt.authorID)}
                        rightTitle={this.props.rightButton ? this.props.rightButton.title : null}
                        lastItem={index === (this.props.fetchCnt.length - 1)}
                        loadMore={this.loadMoreHandler}
                        enableLoadMore={this.props.loadMore}
                        allowPressable
                        selectReaction={this.props.selectReaction}
                        allowUser={() => this.selectReactionHandler(this.props.rightButton.action, cnt._id, false, this.props.confirmInfo ? this.props.confirmInfo : 'Are you sure you want to allow this user')}
                        rejectUser={() => this.selectReactionHandler(this.props.leftButton.action, cnt._id, false, this.props.confirmRejInfo ? this.props.confirmRejInfo : 'Are you sure you want to remove this user')}
                        start={this.props.fetchSelectcntStart}
                        pick={() => this.pickHandler(cnt._id)}
                        picked ={this.state.picked}
                        disabledRightButton={!this.props.rightButton}
                        />
                ));
            }

            if (this.props.selectType === 'pendingMark') {
                items = this.props.fetchCnt.map((cnt, index) => (
                    <PendingMark
                        key={index}
                        userDet={cnt}
                        showProfile={() => this.navigationHandler('Profile', cnt.authorID)}
                        lastItem={index === (this.props.fetchCnt.length - 1)}
                        loadMore={this.loadMoreHandler}
                        enableLoadMore={this.props.loadMore}
                        start={this.props.fetchSelectcntStart}
                        mark={() => this.props.markExam(cnt, this.props.pageID)}
                        />
                ));
            }

            if (this.props.selectType === 'group') {
                items = this.props.fetchCnt.map((cnt, index) => (
                    <Group
                        key={index}
                        groupDet={cnt}
                        showProfile={() => this.navigationHandler('GroupPreview', {pageID: cnt._id})}
                        lastItem={index === (this.props.fetchCnt.length - 1)}
                        loadMore={this.loadMoreHandler}
                        enableLoadMore={this.props.loadMore}
                        start={this.props.fetchSelectcntStart}
                        pick={() => this.pickHandler(cnt._id)}
                        picked ={this.state.picked}
                        />
                ));
            }

            if (this.props.selectType === 'member') {
                items = this.props.fetchCnt.map((cnt, index) => (
                    <Member
                        key={index}
                        userDet={cnt}
                        showProfile={() => this.navigationHandler('Profile', cnt.authorID)}
                        lastItem={index === (this.props.fetchCnt.length - 1)}
                        userID={this.props.userID}
                        isAdmin={this.props.isAdmin}
                        loadMore={this.loadMoreHandler}
                        enableLoadMore={this.props.loadMore}
                        start={this.props.fetchSelectcntStart}
                        selectReaction={this.props.selectReaction}
                        removeUser={() => this.selectReactionHandler(this.props.leftButton.action, cnt._id, false,  this.props.confirmRejInfo ? this.props.confirmRejInfo : 'Are you sure you want to remove this user')}
                        />
                ));
            }

            cnt =  (
                <View style={styles.wrapper}>
                    {this.props.showNote === false ? null : <Text style={styles.note}>Press and hold to select</Text>}
                    <ScrollView style={styles.scroll}>
                        {this.props.children}
                        { items }
                    </ScrollView>
                </View>
            )
        }

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length < 1 && this.state.search.length < 1) {
            cnt = (
                <InfoBox
                    det={`${translator('You currently have no')} ${this.props.infoBox ? this.props.infoBox: this.props.title}`}
                    name={this.props.iconName ? this.props.iconName : 'timer'}
                    size={40}
                    color="#333"
                    style={styles.info}
                    wrapperStyle={styles.infoWrapper}/>
            )
        }

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length < 1 && this.state.search.length > 1) {
            cnt = (
                <InfoBox
                    det={`${this.state.search} ${translator('entered does not match any name')}`}
                    name="search"
                    size={40}
                    color="#333"
                    style={styles.info}
                    wrapperStyle={styles.infoWrapper}/>
            )
        }

        if (this.props.fetchCntErr && !this.props.fetchCnt) {
            cnt = (
                <ErrorInfo 
                    viewMode={this.state.viewMode}
                    backgroundColor={this.state.backgroundColor}
                    reload={this.reloadFetchHandler}/>
            )
        }

        return (
            <InnerScreen
                onRequestClose={this.props.closeSelectPicker}
                closeModal={this.props.closeSelectPicker}
                animationType="slide"
                onBackdropPress={this.props.closeSelectPicker}
                onPress={this.props.closeSelectPicker}>
                { header }
                <View style={styles.wrapper}>
                    { cnt }
                </View>
                { this.props.fetchCntErr && this.props.fetchCnt ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onFetchCntReset}
                        button={[{title: 'Ok', onPress: this.props.onFetchCntReset, style: styles.button}]}/> : null}
                {this.props.selectStart && !this.state.select  ? (
                    <AbsoluteFill style={{zIndex: 99999}}/>
                ) : null}
                { this.props.selectErr ?
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onSelectReset}
                        button={[{title: 'Ok', onPress: this.props.onSelectReset, style: styles.button}]}/> : null}
                { this.props.selectStart && this.state.select ? 
                        <NotificationModal
                            info={this.state.select.info}
                            closeModal={this.closeModalHandler}
                            button={[{title: 'Ok', onPress: () => this.selectHandler(this.state.select.cntType, true), 
                                style: styles.button},
                            {title: 'Exit', onPress: this.closeModalHandler, style: styles.buttonCancel}]}/> : null}
                { this.props.select ? 
                    <NotificationModal
                        info={this.props.reactionType === (this.props.leftButton && this.props.leftButton.action) ? this.props.removeInfo : this.props.info}
                        infoIcon={{name: this.props.iconName ? this.props.iconName : 'timer-outline', color: '#16cf27', size: 40}}
                        closeModal={this.selectResetHandler}
                        button={[{title: 'Ok', onPress: this.selectResetHandler, style: styles.button}]}/> : null}
                { reaction && !reaction.confirm ?
                        <NotificationModal
                            info={this.state.changeReaction.info}
                            closeModal={this.closeModalHandler}
                            button={[{title: 'Ok', onPress: () => this.selectReactionHandler(this.state.changeReaction.cntType, this.state.changeReaction.cntID, true), 
                                style: styles.button},
                            {title: 'Exit', onPress: this.closeModalHandler, style: styles.buttonCancel}]}/> : null}
                { this.props.selectReactionErr ? 
                    <NotificationModal
                        info="Network Error"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onSelectReactionReset}
                        button={[{title: 'Ok', onPress: this.props.onSelectReactionReset, style: styles.button}]}/> : null}
            </InnerScreen>
          )
    }
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff'
    },
    loaderCnt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    note: {
        paddingHorizontal: 10,
        paddingTop: 10,
        fontSize: 16,
        color: '#777'
    },
    scroll: {
        width: '100%'
    },
    headerRightContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectButton: {
        backgroundColor: '#437da3',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 5
    },
    selectAltButton: {
        backgroundColor: '#dcdbdc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5
    },
    selectAltText: {
        color: '#333'
    },
    selectSearchButton: {
        backgroundColor: '#437da3',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 10,
        borderRadius: 5
    },
    button: {
        backgroundColor: '#437da3',
        color: '#fff'
    },
    infoWrapper: {
        flex: 1
    },
    info: {
        fontSize: 18,
        marginBottom: 5
    },
    infoButton: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#437da3'
    },
    picked: {
        width: 30, 
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: '#dcdbdc'
    },
    pickedText: {
        fontSize: 16
    }
}))

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        fetchSelectcntStart: state.select.fetchSelectcntStart,
        fetchCntErr: state.select.fetchSelectcntError,
        fetchCnt: state.select.fetchSelectcnt,
        loadMore: state.select.loadMore,
        selectReaction: state.select.selectReaction,
        selectReactionErr: state.select.selectReactionError,
        select: state.select.select,
        selectStart: state.select.selectStart,
        selectErr: state.select.selectError,
        reactionType: state.select.selectType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCnt: (start, limit, page, pageID, cntID) => dispatch(actions.fetchSelectcntInit(start, limit, page, pageID, cntID)),
        onSearchCnt: (start, limit, page, pageID, cntID, searchCnt) => dispatch(actions.fetchSelectcntInit(start, limit, page, pageID, cntID, searchCnt)),
        onSelectCntReset: () => dispatch(actions.selectcntReset()),
        onFetchCntReset: () => dispatch(actions.fetchSelectcntReset()),
        onSelectCnt: (page, pageID, reactionType, cntID, cnt, uriMethod, confirm, remove) => dispatch(actions.selectInit(page, pageID, reactionType, cntID, cnt, uriMethod, confirm, remove)),
        onSelectReset: () => dispatch(actions.selectReset()),
        onSelectReaction: (page, pageID, reactionType, cntID, cnt, uriMethod, confirm) => dispatch(actions.selectReactionInit(page, pageID, reactionType, cntID, cnt, uriMethod, confirm)),
        onSelectReactionReset: (cntID) => dispatch(actions.selectReactionReset(cntID))
    };
};

export default  withComponent([{name: 'navigation', component: useNavigation}])(withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(SelectPicker)));