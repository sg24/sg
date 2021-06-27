import React , { Component } from 'react';
import { View , Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { tailwind } from 'tailwind';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import BoxShadow from '../../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../TouchableNativeFeedback/TouchableNativeFeedback';
import TabBarge from '../../TabBarge/TabBarge';

const navigation = props => {
    let notification = props.notification ? props.notification : {};
    const navigation = useNavigation();
    const state = useNavigationState(state => ({routes: state.routes, index: state.index}));
    const activeUri = state.routes[state.index] ? state.routes[state.index].name : '';
    let navLink = [
        {iconName: 'newspaper-outline', uri: 'Feed', title: 'Feed'},
        {iconName: 'bulb-outline', uri: 'Question', title: 'Question'},
        {iconName: 'reader-outline', uri: 'WriteUp', title: 'Write Up'},
        // {iconName: 'cash-outline', uri: 'Contest', title: 'Contest'},
        {iconName: 'heart', uri: 'Favorite', title: 'Favorite'},
        {iconName: 'bug-outline', uri: 'AddAppError', title: 'App Error'},
        {iconName: 'settings-outline', uri: 'GeneralSettings', title: 'Settings'},
        {iconName: 'log-out-outline', uri: 'Logout', title: 'Logout'}];
    return (
        <BoxShadow style={[styles.sideBarNav, {backgroundColor: props.backgroundColor}]}>
             { navLink.map((nav, index) => (
            <TouchableNativeFeedback  onPress={() => navigation.navigate(nav.uri)} key={index}>
                <>
                    <View style={[styles.navItem, activeUri === nav.uri ? styles.navActiveItem : null]}>
                        <Ionicons name={nav.iconName} size={20} color={activeUri === nav.uri ? nav.title === 'Favorite' ? '#ff1600' : '#437da3' : props.color}/>
                        <Text style={[styles.textStyle, styles.navItemText, {color: activeUri === nav.uri ? '#437da3' : props.color}]}>{ nav.title }</Text>
                    </View>
                    <TabBarge
                        onPress={() => navigation.navigate(nav.uri)}
                        notification={notification[nav.uri.toLowerCase()] ? notification[nav.uri.toLowerCase()].filter(cntItem => !cntItem.expiresIn).length : 0}
                        style={styles.tabBarge}
                        textStyle={styles.tabBargeText}
                        disableZero/>
                </>
            </TouchableNativeFeedback>
            ))}
        </BoxShadow>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    navItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    navActiveItem: {
        ...tailwind('rounded-full')
    },
    navItemText: {
        marginLeft: 20
    },
    sideBarNav: {
        ...tailwind('flex justify-center w-full rounded-md')
    },
    tabBarge: {
        top: 5,
        right: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 0
    },
    tabBargeText: {
        fontSize: 15
    }
});

const mapStateToProps = state => {
    return {
        notification: state.header.notification
    };
};

export default connect(mapStateToProps)(navigation);