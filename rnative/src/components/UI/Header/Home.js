import React , { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Logo from '../../../assets/logo.png';
import TabBarge from '../TabBarge/TabBarge';
import Modal from '../Modal/Modal';
import BoxShadow from '../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

class Home extends Component  {
    state = {
        showModal: false
    };

    modalHandler = () => {
        this.setState({showModal: !this.state.showModal})
    }

    render() {
        let modal = null;
        if (this.state.showModal) {
            modal = (
                <Modal 
                    visible={this.state.showModal}
                    transparent 
                    onRequestClose={this.modalHandler}
                    animationType="fade">
                    <TouchableWithoutFeedback  onPress={this.modalHandler}>
                        <View style={styles.modal}>
                            <BoxShadow style={styles.navItemWrapper}>
                                <TouchableNativeFeedback  onPress={this.props.onPress.bind(this, 'Question')}>
                                    <View style={styles.navItem}>
                                        <Icon name="bulb-outline" size={20} />
                                        <Text style={styles.textStyle}>Question</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback onPress={this.props.onPress.bind(this, 'Feed')}>
                                    <View style={styles.navItem}>
                                        <Icon name="newspaper-outline" size={20} />
                                        <Text style={styles.textStyle}>Feed</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback style={styles.navItem} onPress={this.props.onPress.bind(this, 'Write Up')}>
                                    <View style={styles.navItem}>
                                        <Icon name="reader-outline" size={20} />
                                        <Text style={styles.textStyle}>Write Up</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback style={styles.navItem} onPress={this.props.onPress.bind(this, 'Shared')}>
                                    <View style={styles.navItem}>
                                        <Icon name="paper-plane-outline" size={20} />
                                        <Text style={styles.textStyle}>Shared</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback onPress={this.props.onPress.bind(this, 'Contest')}>
                                    <View style={styles.navItem}>
                                        <Icon name="cash-outline" size={20} />
                                        <Text style={styles.textStyle}>Contest</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback onPress={this.props.onPress.bind(this, 'Settings')}>
                                    <View style={styles.navItem}>
                                        <Icon name="settings-outline" size={20} />
                                        <Text style={styles.textStyle}>Settings</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback onPress={this.props.onPress.bind(this, 'Logout')}>
                                    <View style={styles.navItem}>
                                        <Icon name="log-out-outline" size={20} />
                                        <Text style={styles.textStyle}>Logout</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </BoxShadow>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )
        }
        return (
            <View style={styles.wrapper}>
                <Image source={Logo} style={styles.logo}/>
                <TouchableNativeFeedback  onPress={this.props.onPress.bind(this, 'Search')}>
                    <View style={styles.navIcon}>
                        <Icon name="search" size={22} color="#05578b"/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback  onPress={this.props.onPress.bind(this, 'Addnew')}>
                    <View style={[styles.navIcon, styles.addNew]}>
                        <Icon name="add-outline" size={22} color="#fff"/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.navIcon}>
                        <Icon name="heart" size={22} color="#ff1600"/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback  onPress={this.props.onPress.bind(this, 'Conversation')}>
                    <View style={styles.navIcon}>
                        <Icon name="chatbubbles-outline" size={22}/>
                        <TabBarge 
                            style={styles.tabBarge}
                            notification={3}/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.props.onPress.bind(this, 'Notification')}>
                    <View style={styles.navIcon}>
                        <Icon name="notifications-outline" size={22}/>
                        <TabBarge 
                            style={styles.tabBarge}
                            notification={3}/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.modalHandler}>
                    <View style={styles.navIcon}>
                        <Icon name="reorder-three-outline" size={24}/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.props.onPress.bind(this, 'Profile')}>
                    <View style={styles.navIcon}>
                        {this.props.userImage ? <Image style={styles.profileImage} resizeMode="cover" source={this.props.userImage}/> 
                        : <Icon name="person-outline" size={22}/>}
                    </View>
                </TouchableNativeFeedback>
                { modal }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    logo: {
        width: 40,
        height: '100%',
        resizeMode: 'cover'
    },
    navIcon: {
        backgroundColor: '#e9ebf2',
        width: 30,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#dcdbdc',
        borderWidth: 1
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
        paddingHorizontal: 20,
        paddingVertical: 10
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
    }
});

export default Home;