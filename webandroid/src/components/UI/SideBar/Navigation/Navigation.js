import React , { Component } from 'react';
import { View , Text } from 'react-native';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import Ionicons from 'ionicons';
import { tailwind } from 'tailwind';

import BoxShadow from '../../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../TouchableNativeFeedback/TouchableNativeFeedback';

const navigation = props => {
    let { styles } = props
    return (
        <BoxShadow style={[styles.sideBarNav, {backgroundColor: props.backgroundColor}]}>
            <TouchableNativeFeedback  onPress={() => props.navigate('Feed')}>
                <View style={styles.navItem}>
                    <Ionicons name="newspaper-outline" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Feed</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => props.navigate('Question')}>
                <View style={styles.navItem}>
                    <Ionicons name="bulb-outline" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Question</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={()  => props.navigate('WriteUp')}>
                <View style={styles.navItem}>
                    <Ionicons name="reader-outline" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Write Up</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={()  => props.navigate('Content')}>
                <View style={styles.navItem}>
                    <Ionicons name="cash-outline" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Contest</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={()  => props.navigate('Content')}>
                <View style={styles.navItem}>
                    <Ionicons name="bug-outline" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Report</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={()  => props.navigate('Settings')}>
                <View style={styles.navItem}>
                    <Ionicons name="settings-outline" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Settings</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={()  => props.navigate('Logout')}>
                <View style={styles.navItem}>
                    <Ionicons name="log-out-outline" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Logout</Text>
                </View>
            </TouchableNativeFeedback>
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
    navItemText: {
        marginLeft: 20
    },
    sideBarNav: {
        ...tailwind('flex justify-center w-full rounded-md')
    }
}));

export default withStyles(useStyles)(navigation);