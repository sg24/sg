import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ScrollView, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { size } from 'tailwind';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { useNavigation } from '@react-navigation/native';
import withComponent from 'withcomponent';
import Ionicons from 'ionicons';

import InnerScreen from '../InnerScreen/InnerScreen';
import SearchHeader from '../Header/Search';
import DefaultHeader from '../Header/DefaultHeader';
import * as actions from '../../../store/actions/index';
import ErrorInfo from '../ErrorInfo/ErrorInfo';
import Button from '../Button/Button';
import NotificationModal from '../NotificationModal/NotificationModal';
import PrivateConv from './PrivateConv/PrivateConv';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import InfoBox from '../InfoBox/InfoBox';

class SharePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#fff',
            color: '#333',
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            showSearch: false,
            picked: [],
            search: ''
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle);
        if (this.props.shareType === 'Friends') {
            this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.userPage.fetchLimit, 'users', 'getFriend');
        }
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
        this.props.onShareCntReset(); 
    }

    reloadFetchHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.userPage.fetchLimit, 'users', 'searchFriend', this.state.search);
        }
        this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.userPage.fetchLimit, 'users', 'getFriend');
    }

    navigationHandler = (page, userID) => {
        if (page === 'Profile') {
            this.props.navigation.navigate(page, {userID})
        }

        if (page === 'User') {
            this.props.navigation.navigate(page);
        }
    }

    showSearchHandler = () => {
        this.setState({showSearch: true})
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false, search: ''});
        this.props.onShareCntReset();
        this.props.onFetchCnt(0, this.props.settings.userPage.fetchLimit, 'users', 'getFriend');
    }

    loadMoreHandler = () => {
        if (this.state.search.trim().length > 0) {
            return this.props.onSearchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.userPage.fetchLimit, 'users', 'searchFriend', this.state.search);
        }
        this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, this.props.settings.userPage.fetchLimit, 'users', 'getFriend');
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

    shareHandler = () => {
        if (this.props.shareType === 'Friends' && this.props.cnt) {
            this.props.onShareCnt('userchat', 'shareChat', this.props.cnt, this.state.picked, this.props.shareUpdates);
        }
    }

    shareResetHandler = () => {
        this.setState({picked: []});
        this.props.onShareReset();
    }

    searchUserHandler = (cnt) => {
        if (cnt && cnt.length > 0) {
            this.props.onSearchCnt(0, this.props.settings.userPage.fetchLimit, 'users', 'searchFriend', cnt);
            this.setState({search: cnt});
        }
    }

    render() {
        let { styles } = this.props;
        let header = (
            <DefaultHeader 
                onPress={this.props.closeSharePicker}
                title={`Select ${this.state.picked.length > 0 ? this.state.picked.length : ''}`}
                rightSideContent={(
                    <View style={styles.headerRightContent}>
                        <Button 
                            title="Share"
                            style={styles.shareButton}
                            onPress={this.shareHandler}
                            disabled={this.state.picked.length < 1 || this.props.shareStart}
                            submitting={this.props.shareStart}
                            loaderStyle="#fff" />
                        <TouchableNativeFeedback onPress={this.showSearchHandler}>
                            <Ionicons name="search" size={24} />
                        </TouchableNativeFeedback>
                    </View>
                )}
            />
        );

        if (this.state.showSearch) {
            header =  (
                <SearchHeader 
                    onPress={this.closeSearchHandler}
                    title="Enter Name ...."
                    filterCnt={this.searchUserHandler}
                    editable
                    rightSideContent={(
                        <View style={styles.headerRightContent}>
                           { this.state.picked.length > 0 ?
                            <View style={styles.picked}>
                                <Text style={styles.pickedText} numberOfLines={1}> { this.state.picked.length } </Text>
                            </View> : null}
                            <Button
                                title="Share"
                                style={styles.shareSearchButton}
                                onPress={this.shareHandler}
                                disabled={this.state.picked.length < 1 || this.props.shareStart}
                                submitting={this.props.shareStart}
                                loaderStyle="#fff" />
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
            if (this.props.shareType === 'Friends') {
                items = this.props.fetchCnt.map((cnt, index) => (
                    <PrivateConv
                        key={index}
                        userDet={cnt}
                        showChat={() => this.navigationHandler('chat', cnt.chatID)}
                        showProfile={() => this.navigationHandler('Profile', cnt._id)}
                        lastItem={index === (this.props.fetchCnt.length - 1)}
                        loadMore={this.loadMoreHandler}
                        enableLoadMore={this.props.loadMore}
                        allowPressable
                        start={this.props.fetchSharecntStart}
                        pick={() => this.pickHandler(cnt._id)}
                        picked ={this.state.picked}
                        />
                ));
            }

            cnt =  (
                <View style={styles.wrapper}>
                    <Text style={styles.note}>Press and hold to select</Text>
                    <ScrollView style={styles.scroll}>
                        { items }
                    </ScrollView>
                </View>
            )
        }

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length < 1 && this.state.search.length < 1) {
            cnt = (
                <InfoBox
                    det='You currently have no friend!'
                    name="person"
                    size={40}
                    color="#333"
                    style={styles.info}
                    wrapperStyle={styles.infoWrapper}>
                    <View style={styles.infoButtonWrapper}>
                        <Button 
                            title="Add Friend" 
                            onPress={() => this.navigationHandler('User')} 
                            style={styles.infoButton}/>
                    </View>
                </InfoBox>
            )
        }

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length < 1 && this.state.search.length > 1) {
            cnt = (
                <InfoBox
                    det='Name entered does not match any friends name'
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
                onRequestClose={this.props.closeSharePicker}
                closeModal={this.props.closeSharePicker}
                animationType="slide"
                onBackdropPress={this.props.closeSharePicker}
                onPress={this.props.closeSharePicker}>
                { header }
                <View style={styles.wrapper}>
                    { cnt }
                </View>
                { this.props.fetchCntErr && this.props.fetchCnt ? 
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onFetchCntReset}
                        button={[{title: 'Ok', onPress: this.props.onFetchCntReset, style: styles.button}]}/> : null}
                { this.props.shareErr ?
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onShareReset}
                        button={[{title: 'Ok', onPress: this.props.onShareReset, style: styles.button}]}/> : null}
                { this.props.share ? 
                    <NotificationModal
                        info="Message shared successfully !"
                        infoIcon={{name: 'paper-plane-outline', color: '#16cf27', size: 40}}
                        closeModal={this.shareResetHandler}
                        button={[{title: 'Ok', onPress: this.shareResetHandler, style: styles.button}]}/> : null}
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
    shareButton: {
        backgroundColor: '#437da3',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 5
    },
    shareSearchButton: {
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
    infoButtonWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
        fetchSharecntStart: state.share.fetchSharecntStart,
        fetchCntErr: state.share.fetchSharecntError,
        fetchCnt: state.share.fetchSharecnt,
        loadMore: state.share.loadMore,
        share: state.share.share,
        shareStart: state.share.shareStart,
        shareErr: state.share.shareError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCnt: (start, limit, shareType, cntID) => dispatch(actions.fetchSharecntInit(start, limit, shareType, cntID)),
        onSearchCnt: (start, limit, shareType, cntID, searchCnt) => dispatch(actions.fetchSharecntInit(start, limit, shareType, cntID, searchCnt)),
        onShareCntReset: () => dispatch(actions.sharecntReset()),
        onFetchCntReset: () => dispatch(actions.fetchSharecntReset()),
        onShareCnt: (shareType, cntID, cnt, reciepient, shareUpdates) => dispatch(actions.shareInit(shareType, cntID, cnt, reciepient, shareUpdates)),
        onShareReset: () => dispatch(actions.shareReset())
    };
};

export default  withComponent([{name: 'navigation', component: useNavigation}])(withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(SharePicker)));