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
import PrivateConv from '../../Main/Conv/PrivateConv/PrivateConv';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

class SharePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#fff',
            color: '#333',
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            showSearch: false,
            picked: []
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
            this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, 1, 'users', 'getFriend');
        }
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
        this.props.onShareCntReset();
    }

    reloadFetchHandler = () => {
        this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, 20, 'users', 'getFriend');
    }

    navigationHandler = (page, userID) => {
        if (page === 'Profile') {
            this.props.navigation.navigate(page, {userID})
        }
    }

    showSearchHandler = () => {
        this.setState({showSearch: true})
    }

    closeSearchHandler = () => {
        this.setState({showSearch: false})
    }

    loadMoreHandler = () => {
        this.props.onFetchCnt(this.props.fetchCnt ? this.props.fetchCnt.length : 0, 20, 'users', 'getFriend');
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
            this.props.onShareCnt('users', 'sendChat', this.props.cnt, this.state.picked);
        }
    }

    render() {
        let { styles } = this.props;
        let header = (
            <DefaultHeader 
                onPress={() => this.props.navigation.goBack()}
                title={`Select ${this.state.picked.length > 0 ? this.state.picked.length : ''}`}
                rightSideContent={(
                    <View style={styles.headerRightContent}>
                        <Button 
                            title="Share"
                            style={styles.shareButton}
                            onPress={this.shareHandler}
                            disabled={this.state.picked.length < 1}
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
                    title="Search ...."
                    filterCnt
                    editable
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

        if (!this.props.fetchCntErr && this.props.fetchCnt && this.props.fetchCnt.length > 0) {
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
                        shareType
                        start={this.props.fetchSharecntStart}
                        pick={() => this.pickHandler(cnt._id)}
                        picked ={this.state.picked}
                        />
                ));
            }

            cnt =  (
                <View style={styles.wrapper}>
                    <Text style={styles.note}>Note: Press and hold to select</Text>
                    <ScrollView style={styles.scroll}>
                        { items }
                    </ScrollView>
                </View>
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
        fontSize: 16
    },
    scroll: {
        width: '100%',
        padding: 10
    },
    headerRightContent: {
        flexDirection: 'row'
    },
    shareButton: {
        backgroundColor: '#437da3',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5
    },
    button: {
        backgroundColor: '#437da3',
        color: '#fff'
    }
}))

const mapStateToProps = state => {
    return {
        fetchSharecntStart: state.share.fetchSharecntStart,
        fetchCntErr: state.share.fetchSharecntError,
        fetchCnt: state.share.fetchSharecnt,
        loadMore: state.share.loadMore,
        share: state.share.share,
        shareStart: state.share.start,
        shareErr: state.share.shareError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCnt: (start, limit, shareType, cntID) => dispatch(actions.fetchSharecntInit(start, limit, shareType, cntID)),
        onShareCntReset: () => dispatch(actions.sharecntReset()),
        onFetchCntReset: () => dispatch(actions.fetchSharecntReset()),
        onShareCnt: (shareType, cntID, cnt, reciepient) => dispatch(actions.shareInit(shareType, cntID, cnt, reciepient)),
        onShareReset: () => dispatch(actions.shareReset())
    };
};

export default  withComponent([{name: 'navigation', component: useNavigation}])(withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(SharePicker)));