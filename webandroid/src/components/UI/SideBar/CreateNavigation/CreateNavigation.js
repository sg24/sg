import React  from 'react';
import { View , Text } from 'react-native';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import Ionicons from 'ionicons';
import { tailwind } from 'tailwind';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import BoxShadow from '../../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../TouchableNativeFeedback/TouchableNativeFeedback'

const create = props => {
    let { styles } = props
    const navigation = useNavigation();
    const state = useNavigationState(state => ({routes: state.routes, index: state.index}));
    const activeUri = state.routes[state.index] ? state.routes[state.index].name : '';
    let navLink = [
        {iconName: 'chatbox', uri: 'AddPost', title: 'Post'},
        {iconName: 'megaphone', uri: 'AddAdvert', title: 'Advert'},
        {iconName: 'bulb', uri: 'AddQuestion', title: 'Question'},
        {iconName: 'chatbubble-ellipses', uri: 'AddChatRoom', title: 'Chat Room'},
        {iconName: 'timer', uri: 'AddCBT', title: 'CBT'},
        {iconName: 'reader', uri: 'AddWriteUp', title: 'Write Up'},
        {iconName: 'newspaper', uri: 'AddFeed', title: 'Feed'}]
    return (
        <BoxShadow style={[styles.sideBarAdd, {backgroundColor: props.backgroundColor}]}>
            <View style={styles.createHeader}>
                <Ionicons name="create" size={20} color={props.color}/>
                <Text style={[styles.textStyle, styles.createHeaderText, {color: props.color}]}>Create</Text>
            </View>
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
        // backgroundColor: '#e9ebf2',
        ...tailwind('rounded-full')
    },
    navItemText: {
        marginLeft: 20
    },
    sideBarAdd: {
        ...tailwind('flex justify-center w-full rounded-md  mt-4 pb-2')
    },
    createHeader: {
        flexDirection: 'row',
        backgroundColor: '#dcdbdc',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 20,
        ...tailwind('rounded-t-md mb-2')
    },
    createHeaderText: {
        marginLeft: 20
    }
}));

export default withStyles(useStyles)(create);