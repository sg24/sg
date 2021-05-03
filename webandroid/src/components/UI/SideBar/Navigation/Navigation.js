import React , { Component } from 'react';
import { View , Text } from 'react-native';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import Ionicons from 'ionicons';
import { tailwind } from 'tailwind';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import BoxShadow from '../../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../TouchableNativeFeedback/TouchableNativeFeedback';

const navigation = props => {
    let { styles } = props
    const navigation = useNavigation();
    const state = useNavigationState(state => ({routes: state.routes, index: state.index}));
    const activeUri = state.routes[state.index] ? state.routes[state.index].name : '';
    let navLink = [
        {iconName: 'newspaper-outline', uri: 'Feed', title: 'Feed'},
        {iconName: 'bulb-outline', uri: 'Question', title: 'Question'},
        {iconName: 'reader-outline', uri: 'WriteUp', title: 'WriteUp'},
        {iconName: 'cash-outline', uri: 'Contest', title: 'Contest'},
        {iconName: 'bug-outline', uri: 'ErrorReport', title: 'App Error'},
        {iconName: 'settings-outline', uri: 'Settings', title: 'Settings'},
        {iconName: 'log-out-outline', uri: 'Logout', title: 'Logout'}]
    return (
        <BoxShadow style={[styles.sideBarNav, {backgroundColor: props.backgroundColor}]}>
             { navLink.map((nav, index) => (
                <TouchableNativeFeedback  onPress={() => navigation.navigate(nav.uri)} key={index}>
                <View style={[styles.navItem, activeUri === nav.uri ? styles.navActiveItem : null]}>
                    <Ionicons name={nav.iconName} size={20} color={activeUri === nav.uri ? '#437da3' : props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: activeUri === nav.uri ? '#437da3' : props.color}]}>{ nav.title }</Text>
                </View>
            </TouchableNativeFeedback>
            ))}
        </BoxShadow>
    );
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
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
    }
}));

export default withStyles(useStyles)(navigation);