import React , { Component } from 'react';
import { View, Text, Image, Dimensions, ImageBackground, TouchableWithoutFeedback,  Modal, Platform } from 'react-native';
import Icon from 'ionicons';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import { minWidth } from 'react-native-stylex/media-query';
import { tailwind, size } from 'tailwind';
import WebModal from 'modal-enhanced-react-native-web';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationState } from '@react-navigation/native';
import withComponent from 'withcomponent';

import Logo from '../../../assets/logocircle.png';
import TabBarge from '../TabBarge/TabBarge';
import BoxShadow from '../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import Container from '../Container/Container';
import FormElement from '../FormElement/FormElement';
import Search from './Search';
import DefaultSearch from './DefaultSearchHeader';
import DefaultHeader from './DefaultHeader';

const Stack = createStackNavigator();


class Home extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            backgroundColor: '#fff',
            color: '#333',
            modalType: null,
            navLink: [{title: 'post', iconName: 'home-outline', uri: 'HomeWeb'},{title: 'Users', iconName: 'people-outline', uri: 'UsersWeb'},
                {title: 'group', iconName: 'chatbubble-ellipses-outline', uri: 'GroupWeb'}, {title: 'cbt', iconName: 'timer-outline', uri: 'CBTWeb'}],
            notification: {},
            userChat: 0,
            userNotification: 0,
            totalNotification: 0,
            groupNotification: 0,
            cbtNotification: 0
        }
    }

    componentDidUpdate() {
        if (this.props.notification && (JSON.stringify(this.props.notification) !== JSON.stringify(this.state.notification))) {
            let notification = this.props.notification;
            let userChat = 0;
            let totalNotification = 0;
            let userNotification = 0;
            let groupNotification = 0;
            let cbtNotification = 0;
            for (let cnt in notification) {
                if (Array.isArray(notification[cnt])) {
                    if (cnt === 'userChat') {
                        for (let cntItem of notification[cnt]) {
                            if (!cntItem.expiresIn) {
                                userChat = cntItem.counter + userChat;
                            }
                        }
                        userNotification = notification['userRequest'].filter(cntItem => !cntItem.expiresIn).length + userChat;
                    }
                    let groupPage = ['groupRequest', 'groupJoin', 'groupAccept', 'groupReject', 'groupPending', 'groupMark'];
                    if (groupPage.filter(page => page === cnt)[0]) {
                        groupNotification = groupNotification + this.props.notification[cnt].filter(cntItem => !cntItem.expiresIn).length
                    }
                    let cbtPage = ['qchat', 'qchatRequest', 'qchatResult', 'qchatAccept', 'qchatReject', 'qchatMark', 'qchatShare'];
                    if (cbtPage.filter(page => page === cnt)[0]) {
                        cbtNotification = cbtNotification + this.props.notification[cnt].filter(cntItem => !cntItem.expiresIn).length
                    }
                    totalNotification = totalNotification + notification[cnt].filter(cntItem => !cntItem.expiresIn).length;
                }
            }
            this.setState({notification, userChat, totalNotification, userNotification, groupNotification, cbtNotification});
        }
    }

    openModalHandler = (modalType) => {
        if (modalType === 'search') {
            this.props.onNavigate('Search')
            this.setState({showModal: false});
            return
        }
        this.setState({showModal: true, modalType});
    }

    closeModalHandler = () => {
        this.setState({showModal: false, modalType: null});
    }

    render() {
        const { styles } = this.props;
        let modal = null;
        let state = this.props.navigationState;
        const activeUri = state.routes[state.index] ? state.routes[state.index].name : '';

        if (this.state.showModal) {
            let ModalComponent = Platform.OS === 'web' ? WebModal : Modal;
            let cnt = null;

            if (this.state.modalType === 'conversation') {
                cnt = (
                    <>
                        <DefaultSearch 
                              onPress={this.closeModalHandler}
                              onNavigate={() => this.openModalHandler('search')}
                              title="Conversation"/>
                        <this.props.modalConv />
                    </>
                )
            }
            if (this.state.modalType === 'notification') {
                cnt = (
                    <>
                        <DefaultHeader
                            onPress={this.closeModalHandler}
                            title="Notification"/>
                        <this.props.modalNotify
                            closeNotification={this.closeModalHandler} />
                    </>
                )
            }

            modal = (
                <ModalComponent
                    isVisible={this.state.showModal}
                    transparent 
                    backdropOpacity={0}
                    onBackdropPress={this.closeModalHandler}
                    onRequestClose={this.closeModalHandler}
                    animationType="fade"
                    style={[styles.modal]}>
                        <Container style={styles.modalContainer}>
                            <TouchableWithoutFeedback style={styles.modalOverlay} onPress={this.closeModalHandler}>
                                <View style={styles.modalOverlay}></View>
                            </TouchableWithoutFeedback>
                            <BoxShadow style={[styles.modalWrapper, 
                                this.state.modalType === 'conversation' ? styles.convModalWrapper : 
                                this.state.modalType === 'notification' ? styles.notifyWrapper : null, {backgroundColor: this.state.backgroundColor}]}>
                                { cnt }
                            </BoxShadow>
                        </Container>
                </ModalComponent>
            )
        }

        return (
            <BoxShadow>
                <View style={[styles.wrapper, {backgroundColor: this.state.backgroundColor}]}>
                    <Container style={styles.container}>
                        <View style={styles.searchNavWrapper}>
                            <TouchableNativeFeedback onPress={this.props.onNavigate.bind(this, 'Home')} style={styles.logo}>
                                <ImageBackground source={Logo} style={styles.logo} resizeMode="contain"/>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback  onPress={this.props.onNavigate.bind(this, 'Search')} style={styles.formWrapper}>
                                <FormElement
                                    placeholder="Search ... "
                                    formWrapperStyle={styles.formWrapper}
                                    inputWrapperStyle={styles.formWrapper}
                                    style={styles.input}
                                    inputIcon="search"
                                    inputIconSize={16}
                                    editable={false}
                                    onPress={() => this.openModalHandler('search')} />
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.contentNavWrapper}>
                                {this.state.navLink.map((cnt, index) => (
                                     <TouchableNativeFeedback  onPress={this.props.onNavigate.bind(this, cnt.uri)} style={styles.navIcon} key={index}>
                                        <>
                                            <View style={styles.navIcon}>
                                                <Icon name={cnt.iconName} size={22} style={((cnt.uri === 'GroupWeb') && (activeUri === 'GroupPreview')) || activeUri === cnt.uri ? styles.activeUri : styles.color}/>
                                            </View>
                                            <TabBarge
                                                onPress={() => this.navigationHandler(cnt.uri)}
                                                notification={cnt.uri === 'UsersWeb' ? this.state.userNotification : 
                                                    cnt.uri === 'GroupWeb' ? this.state.groupNotification : 
                                                    cnt.uri === 'CBTWeb' ? this.state.cbtNotification :
                                                    this.state.notification[cnt.title] ? this.state.notification[cnt.title].filter(cntItem => !cntItem.expiresIn).length : 0}
                                                style={styles.tabBarge}
                                                textStyle={styles.tabBargeText}
                                                disableZero/>
                                        </>
                                    </TouchableNativeFeedback>
                                ))}
                        </View>
                        <View style={styles.profileNavWrapper}>
                            <TouchableNativeFeedback  onPress={() => this.openModalHandler('conversation')} style={styles.navIcon}>
                                <View style={styles.navIcon}>
                                    <Icon name="chatbubbles-outline" size={22} style={this.state.showModal && (this.state.modalType === 'conversation') ? styles.activeUri : styles.color}/>
                                    <TabBarge 
                                        style={styles.tabBarge}
                                        notification={this.state.userChat}
                                        disableZero/>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback onPress={() => this.openModalHandler('notification')} style={styles.navIcon}>
                                <View style={styles.navIcon}>
                                    <Icon name="notifications-outline" size={22} style={this.state.showModal && (this.state.modalType === 'notification') ? styles.activeUri : styles.color}/>
                                    <TabBarge
                                        style={styles.tabBarge}
                                        notification={this.state.totalNotification}
                                        disableZero/>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback onPress={this.props.onNavigate.bind(this, 'Profile')} style={styles.navIcon}>
                                <View style={[styles.navIcon]}>
                                    {this.props.userImage ? <Image style={styles.profileImage} resizeMode="cover" source={this.props.userImage}/> 
                                    : <Icon name="person-outline" size={22} style={activeUri === 'Profile' ? styles.activeUri : styles.color}/>}
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </Container>
                    { modal }
                </View>
            </BoxShadow>
        )
    }
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
    wrapper: {
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingVertical: 6,
        overflow: 'hidden'
    },
    logo: {
        width: 30,
        height: '100%',
        resizeMode: 'contain',
        marginRight: 20,
        ...tailwind('rounded-full')
    },
    navIcon: {
        position: 'relative',
        width: 30,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    profileImage: {
        backgroundColor: '#e9ebf2',
        width: 30,
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
        borderColor: '#dcdbdc',
        borderWidth: 1
    },
    tabBarge: {
        right: -10,
        top: -6,
        width: 20,
        height: 20,
        borderRadius: 10
    },
    navItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textStyle: {
        marginLeft: 20
    },
    searchNavWrapper: {
        ...tailwind('flex flex-row justify-center w-1/5 items-center pr-4 '),
        ...minWidth(size.lg, tailwind('w-1/6'))
    },
    contentNavWrapper: {
        ...tailwind('flex-row justify-around w-3/5 items-center  pl-4 pr-4') ,
        ...minWidth(size.lg, tailwind('w-3/6'))
    },
    profileNavWrapper: {
        justifyContent: "space-between",
        alignItems: "flex-end",
        ...tailwind('flex-row w-1/5 pl-4 '),
        ...minWidth(size.lg, tailwind('w-2/6')),
    },
    formWrapper: {
        flexShrink: 1,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
        ...tailwind('rounded-full'),
        backgroundColor: '#e9ebf2'
    },
    input: {
        paddingVertical: 3,
        ...tailwind('rounded-full')
    },
    modal: {
        margin: 0,
        paddingBottom: 10,
        flex: 1,
    },
    modalContainer: {
        height: '100%',  
        position: 'relative',
        backgroundColor: 'transparent'
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        opacity: 0,
    },
    modalWrapper: {
        position: 'relative',
        width: 400,
        ...tailwind('rounded-md'),
        margin: 0,
        flex: 1
    },
    convModalWrapper: {
        alignSelf: 'flex-end',
        right: '20%'
    },
    notifyWrapper: {
        alignSelf: 'flex-end',
        right: '10%'
    },
    activeUri: {
        color: palette.activeUri.color
    },
    color: {
        color: palette.color
    }
}));

export default withComponent([{name: 'navigationState',defaultParams: state => ({routes: state.routes, index: state.index}), component: useNavigationState}])(withStyles(useStyles)(Home));