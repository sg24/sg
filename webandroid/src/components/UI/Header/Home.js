import React , { Component } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'ionicons';
import WebModal from 'modal-enhanced-react-native-web';
import Text from 'text';

import Logo from '../../../assets/logocircle.png';
import TabBarge from '../TabBarge/TabBarge';
import Modal from '../Modal/Modal';
import BoxShadow from '../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

class Home extends Component  {
    state = {
        showModal: false,
        navLink: [{title: 'Question', iconName: 'bulb-outline', uri: 'Question', showNotify: true},{title: 'CBT', iconName: 'timer-outline', uri: 'CBT', showNotify: true},
        {title: 'Write Up', iconName: 'reader-outline', uri: 'WriteUp', showNotify: true}, {title: 'App Error', iconName: 'bug-outline', uri: 'AddAppError'},
        {title: 'Settings', iconName: 'settings-outline', uri: 'GeneralSettings'}, {title: 'Logout', iconName: 'log-out-outline', uri: 'Logout'}],
        notification: {},
        userChat: 0,
        totalNotification: 0,
        optionNotification: 0
    };

    componentDidUpdate() {
        if (this.props.notification && (JSON.stringify(this.props.notification) !== JSON.stringify(this.state.notification))) {
            let notification = this.props.notification;
            let userChat = 0;
            let totalNotification = 0;
            let optionNotification = 0;
            for (let cnt in notification) {
                if (Array.isArray(notification[cnt])) {
                    if (cnt === 'userChat') {
                        for (let cntItem of notification[cnt]) {
                            if (!cntItem.expiresIn) {
                                userChat = cntItem.counter + userChat;
                            }
                        }
                    } else {
                        totalNotification = totalNotification + notification[cnt].filter(cntItem => !cntItem.expiresIn).length;
                    }
                    let cbtPage = ['qchat', 'qchatRequest', 'qchatResult', 'qchatAccept', 'qchatReject', 'qchatMark', 'qchatShare'];
                    if (cnt === 'writeup' || cnt === 'question' || cbtPage.filter(cntItem => cntItem == cnt)[0]) {
                        optionNotification = optionNotification + notification[cnt].filter(cntItem => !cntItem.expiresIn).length;
                    }
                }
            }
            this.setState({notification, userChat, totalNotification, optionNotification});
        }
    }

    modalHandler = () => {
        this.setState({showModal: !this.state.showModal})
    }

    navigationHandler = (page) => {
        this.props.onNavigate(page)
        this.setState({showModal: false});
    }

    render() {
        let modal = null;
        if (this.state.showModal) {
            let ModalComponent = Platform.OS === 'web' ? WebModal : Modal;
            modal = (
                <ModalComponent 
                    visible={this.state.showModal}
                    transparent 
                    onRequestClose={this.modalHandler}
                    animationType="fade">
                    <TouchableWithoutFeedback  onPress={this.modalHandler}>
                        <View style={styles.modal}>
                            <BoxShadow style={styles.navItemWrapper}>
                                {this.state.navLink.map((cnt, index) => (
                                    <TouchableNativeFeedback  onPress={() => this.navigationHandler(cnt.uri)} key={index}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                            paddingHorizontal: 20}}>
                                            <View style={styles.navItem}>
                                                <Icon name={cnt.iconName} size={20} />
                                                <Text style={styles.textStyle}>{cnt.title}</Text>
                                            </View>
                                            <TabBarge
                                                onPress={() => this.navigationHandler(cnt.uri)}
                                                notification={this.state.notification[cnt.uri.toLowerCase()] ? 
                                                    this.state.notification[cnt.uri.toLowerCase()].filter(cntItem => !cntItem.expiresIn).length : 0}
                                                style={styles.modalTabBarge}
                                                textStyle={styles.tabBargeText}
                                                disableZero/>
                                        </View>
                                    </TouchableNativeFeedback>
                                ))}
                                {/* <TouchableNativeFeedback onPress={() => this.navigationHandler('Contest')}>
                                    <View style={styles.navItem}>
                                        <Icon name="cash-outline" size={20} />
                                        <Text style={styles.textStyle}>Contest</Text>
                                    </View>
                                </TouchableNativeFeedback> */}
                            </BoxShadow>
                        </View>
                    </TouchableWithoutFeedback>
                </ModalComponent>
            )
        }
        return (
            <>
                <View style={styles.wrapper}>
                    <Image source={Logo} style={styles.logo}/>
                    <TouchableNativeFeedback  onPress={() => this.navigationHandler('Search')}>
                        <View style={styles.navIcon}>
                            <Icon name="search" size={26} color="#437da3"/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback  onPress={() => this.navigationHandler('Addnew')}>
                        <View style={[styles.navIcon, styles.addNew]}>
                            <Icon name="add-outline" size={18} color="#fff"/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.navigationHandler('Favorite')}>
                        <View style={styles.navIcon}>
                            <Icon name="heart" size={26} color="#ff1600"/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback  onPress={() => this.navigationHandler('Conversation')}>
                        <View style={styles.navIcon}>
                            <Icon name="chatbubbles-outline" size={23}/>
                            <TabBarge
                                onPress={() => this.navigationHandler('Conversation')}
                                style={styles.tabBarge}
                                notification={this.state.userChat}
                                disableZero/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.navigationHandler('Notification')}>
                        <View style={styles.navIcon}>
                            <Icon name="notifications-outline" size={25}/>
                            <TabBarge 
                                onPress={() => this.navigationHandler('Notification')}
                                style={styles.tabBarge}
                                notification={this.state.totalNotification}
                                disableZero/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.modalHandler}>
                        <View style={styles.navIcon}>
                            <Icon name="reorder-three-outline" size={30}/>
                            <TabBarge
                                onPress={this.modalHandler}
                                style={styles.tabBarge}
                                notification={this.state.optionNotification}
                                disableZero/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.navigationHandler('Profile')}>
                        <View style={styles.navIcon}>
                            {this.props.userImage ? <Image style={styles.profileImage} resizeMode="cover" source={this.props.userImage}/> 
                            : <Icon name="person-outline" size={22}/>}
                        </View>
                    </TouchableNativeFeedback>
                </View>
                { modal }
            </>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    logo: {
        width: 40,
        height: '100%',
        resizeMode: 'contain'
    },
    navIcon: {
        // backgroundColor: '#e9ebf2',
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        // borderColor: '#dcdbdc',
        // borderWidth: 1
    },
    profileImage: {
        width: 30,
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15
    },
    addNew: {
        backgroundColor: '#437da3'
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
        paddingVertical: 10,
        marginRight: 10
    },
    textStyle: {
        marginLeft: 20
    },
    navItemWrapper: {
        backgroundColor: 'rgb(255,255,255)',
        position: 'absolute',
        right: 20,
        top: 5,
        paddingVertical: 10
    },
    modal: {
        flex: 1
    },
    modalTabBarge: {
        position: 'relative',
        top: 'auto',
        right: 'auto',
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 0
    },
    tabBargeText: {
        fontSize: 15
    }
});

export default Home;