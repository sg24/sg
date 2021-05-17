import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Platform, ScrollView, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import { size } from 'tailwind';
import Ionicons from 'ionicons';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import ActionSheet from '../../components/UI/ActionSheet/ActionSheet';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import MarkExamItem from '../../components/Page/MarkExam/MarkExam';
import Carousel from '../../components/UI/Carousel/Carousel';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';
import CommentBox from '../../components/UI/CommentBox/CommentBox';
import SharePicker from '../../components/UI/SharePicker/SharePicker';
import AbsoluteFill from '../../components/UI/AbsoluteFill/AbsoluteFill';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';

class MarkExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
            pageID: this.props.route.params.pageID,
            mark: this.props.route.params.mark,
            showChatBox: null,
            showSharePicker: null,
            showActionSheet: false,
            selectedAnswer: []
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
        if (this.state.pageID && this.state.mark) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                if (this.state.pageID && this.state.mark) {
                    this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'exam', 'getMarkinfo', this.state.pageID);
                } else {
                    this.props.navigation.navigate(Platform.OS === 'web' ? 'CBTWeb' :'CBT')
                }
            });
            this._unsubscribeBackPress = BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.props.onPageReset();
                this._unsubscribeBackPress.remove();
                this.setState({pageID: null, mark: null, showChatBox: null, showSharePicker: null,showActionSheet: false, selectedAnswer: []});
            });
        } else {
            this.props.navigation.navigate(Platform.OS === 'web' ? 'CBTWeb' :'CBT')
        }
    }

    componentWillUnmount() {
        if (this.state.pageID && this.state.mark) {
            this._unsubscribe();
            this._unsubscribeBackPress.remove();
            this._unsubscribeBlur();
        }
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    reloadFetchHandler = () => {
        this.props.onFetchPage(0, this.props.settings.page.fetchLimit, 'exam', 'getMarkinfo', this.state.pageID);
    }

    backActionHandler = () => {
        if (this.props.fetchCnt && (this.props.fetchCnt[0].score || this.props.fetchCnt[0].score === 0)) {
            this.navigationHandler(Platform.OS === 'web' ? 'CBTWeb' : 'CBT')
        } else {
            Alert.alert('Are you sure ,you want to cancel this exam', null, [{title: 'Exit'}]);
        }
        return true
    }

    navigationHandler = (page, cntID) => {
        this.props.navigation.navigate(page);
    }

    closeModalHandler = () => {
        this.setState({showSharePicker: null, showChatBox: null})
    }

    showCommentHandler = () => {
        this.setState({showChatBox: true})
    }

    showShareHandler = () => {
        let updateCnt = {_id: this.state.pageID, cntType: 'exam', content: 
            `${this.props.fetchCnt[0].title} , Name: ${this.state.mark.username}, Score: ${this.props.fetchCnt[0].score}%  Mark: ${this.props.fetchCnt[0].mark} / ${ this.state.mark.questionTotal}`, verified: true};
        this.setState({showActionSheet: {option: ['Friends', 'Groups', 'Chat Room'],
        icon: ['people-outline', 'chatbox-outline', 'chatbubble-ellipses-outline'],cnt: updateCnt}})
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

    selectAnswerHandler = (val, questionID) => {
        let selectedAnswer = [...this.state.selectedAnswer];
        let checkSelected = selectedAnswer.filter(cnt => cnt._id === questionID)[0];
        if (checkSelected) {
            if (checkSelected.correct !== val) {
                checkSelected.correct = val;
                let selectedAnswerIndex = selectedAnswer.findIndex(cnt => cnt._id === questionID);
                selectedAnswer[selectedAnswerIndex] = checkSelected;
            }
        } else {
            selectedAnswer.push({_id: questionID, correct: val})
        }
        this.setState({selectedAnswer})
    }

    submitAnswerHandler = () => {
        this.props.onPageReaction('exam', this.state.mark._id, 'markTheoryexam', {cnt: JSON.stringify({pageID: this.state.pageID, answer: this.state.selectedAnswer, 
            questionTotal: this.state.mark.questionTotal, cntID: this.state.mark._id})});
    }

    render () {
        let pageBackground = this.props.settings.page.backgroundImage  && this.props.settings.page.enableBackgroundImage;
        let Wrapper = pageBackground ? ImageBackground : View;
        let wrapperProps = pageBackground ? {source: {uri: this.props.settings.page.backgroundImage}, resizeMode: 'cover'} :{}

        let header = null;
        
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
           </View>
        )

        if (this.props.fetchCnt && this.props.fetchCnt.length > 0 && this.state.mark && this.state.mark.question.length > 0) {
            cnt = (
                <View style={styles.container}>
                    { header }
                    <Wrapper
                        {...wrapperProps}
                        style={[styles.container, this.state.viewMode === 'landscape' ? 
                        {backgroundColor: this.props.settings.backgroundColor} : null]}>
                        <View style={styles.exam}>
                            <View style={{flex: 1}}>
                                <Carousel 
                                    ref={ref=> this.carousel = ref}
                                    wrapperStyle={{backgroundColor: 'transparent'}}
                                    renderData={this.state.mark.question}
                                    hideSeeker={!(Platform.OS === 'web' && this.state.viewMode === 'landscape')}
                                    _renderItem={({item:cnt, index}) => (
                                    <MarkExamItem
                                        index={index}
                                        cnt={cnt}
                                        cntID={this.state.mark._id}
                                        questionTotal={this.state.mark.question.length}
                                        selectAnswer={this.selectAnswerHandler}
                                        selectedAnswer={this.state.selectedAnswer}
                                        viewMode={this.state.viewMode}
                                        disableButton={this.state.selectedAnswer.length !== this.state.mark.question.length}
                                        submitAnswerHandler={this.submitAnswerHandler}
                                        pageReaction={this.props.pageReaction} />
                                    )}/>
                            </View>
                        </View>
                    </Wrapper>
                    { this.state.showChatBox ?
                        <CommentBox
                            title={'Result'}
                            chatType="cbtchat"
                            page="cbt"
                            pageID={this.state.pageID}
                            closeChat={this.closeModalHandler}
                            showReply
                            enableDelete={this.props.fetchCnt[0].enableDelete}
                            enableComment={this.props.fetchCnt[0].enableComment} /> : null}
                    { this.state.showSharePicker ? 
                        <SharePicker
                            shareType={this.state.showSharePicker.shareType}
                            closeSharePicker={this.closeModalHandler}
                            cnt={this.state.showSharePicker.cnt}
                            shareUpdates={[]}
                            shareChat
                            info="Result shared successfully !"/> : null}
                     { this.state.showActionSheet ? 
                        <ActionSheet
                            options={this.state.showActionSheet.option}
                            icons={this.state.showActionSheet.icon}
                            bottonIndex={this.actionSheetHandler}
                            title={"Choose"}
                            showSeparator/>
                        : null}
                    { this.props.pageReactionErr ?
                    <NotificationModal
                        info="Network Error !"
                        infoIcon={{name: 'cloud-offline-outline', color: '#ff1600', size: 40}}
                        closeModal={this.props.onPageReactionReset}
                        button={[{title: 'Ok', onPress: this.props.onPageReactionReset, style: styles.button}]}/> : null}
                    { this.props.fetchCnt[0].score || this.props.fetchCnt[0].score === 0 ? (
                        <AbsoluteFill style={styles.absoluteFill}>
                            <DefaultHeader
                                onPress={() => this.navigationHandler(Platform.OS === 'web' ? 'CBTWeb' : 'CBT')}
                                title="Result"/>
                             <Wrapper
                                {...wrapperProps}
                                style={[styles.container, this.state.viewMode === 'landscape' ? 
                                {backgroundColor: this.props.settings.backgroundColor} : null, {justifyContent: 'center', alignItems: 'center'}]}>
                                    <BoxShadow style={styles.result}>
                                        <View>
                                            <Text style={styles.mark}>Score:</Text>
                                            <Text style={styles.score}>{`${this.props.fetchCnt[0].score}%`}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={[styles.mark, {marginRight: 10}]}>Mark:</Text>
                                                <Text style={styles.mark}>{`${this.props.fetchCnt[0].mark} / ${ this.state.mark.questionTotal}`}</Text>
                                            </View>
                                                <View style={{marginTop: 10}}>
                                                    {this.props.fetchCnt[0].showResult ?
                                                        <Text style={{marginBottom: 10, color: '#777'}}>Result as being added </Text> : null}
                                                    <View style={styles.resultButton}>
                                                        {this.props.fetchCnt[0].showResult || this.props.fetchCnt[0].enableComment ?
                                                        <Button style={styles.chatButton} onPress={this.showCommentHandler}>
                                                            <Ionicons name="chatbox-ellipses-outline" size={16} color="#fff"/>
                                                            <Text style={styles.submitButtonText}>Result</Text>
                                                        </Button> : null}
                                                        <Button style={styles.shareButton} onPress={this.showShareHandler}>
                                                            <Ionicons name="paper-plane-outline" size={16} color="#333"/>
                                                            <Text style={styles.shareButtonText}>Share</Text>
                                                        </Button>
                                                    </View>
                                                </View>
                                        </View>
                                    </BoxShadow>
                            </Wrapper>
                        </AbsoluteFill>) : null}
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
                contentFetched={true}>
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
    exam: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        flex: 1
    },
    chatButton: {
        backgroundColor: '#437da3',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    submitButtonText: {
        color: '#fff',
        marginLeft: 5
    },
    absoluteFill: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    result: {
        width: 300,
        backgroundColor: '#fff',
        padding: 10
    },
    mark: {
        fontSize: 16
    },
    score: {
        fontSize: 50,
        textAlign: 'center'
    },
    resultButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    shareButton: {
        backgroundColor: '#dcdbdc',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    shareButtonText: {
        color: '#333',
        marginLeft: 5
    }
});


const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        username: state.auth.username,
        fetchCntErr: state.page.fetchExamError,
        fetchCntStart: state.page.fetchExamStart,
        fetchCnt: state.page.fetchExam,
        pageReaction: state.page.pageReaction,
        pageReactionErr: state.page.pageReactionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPage: (start, limit, page, cntID, searchCnt) => dispatch(actions.fetchPageInit(start, limit, page, cntID, searchCnt)),
        onPageReset: () => dispatch(actions.pageReset()),
        onPageReaction: (page, pageID, reactionType, cnt) => dispatch(actions.pageReactionInit(page, pageID, reactionType, cnt)),
        onPageReactionReset: () => dispatch(actions.pageReactionReset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkExam);
  