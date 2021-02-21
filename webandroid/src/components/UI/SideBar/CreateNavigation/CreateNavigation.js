import React  from 'react';
import { View , Text } from 'react-native';
import { makeUseStyles } from "react-native-stylex";
import { withStyles } from "react-native-stylex/withStyles";
import Ionicons from 'ionicons';
import { tailwind } from 'tailwind';
import { useNavigation } from '@react-navigation/native';

import BoxShadow from '../../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../../TouchableNativeFeedback/TouchableNativeFeedback'

const create = props => {
    let { styles } = props
    const navigation = useNavigation();
    return (
        <BoxShadow style={[styles.sideBarAdd, {backgroundColor: props.backgroundColor}]}>
            <View style={styles.createHeader}>
                <Ionicons name="create" size={20} color={props.color}/>
                <Text style={[styles.textStyle, styles.createHeaderText, {color: props.color}]}>Create</Text>
            </View>
            <TouchableNativeFeedback  onPress={() => navigation.navigate('AddPost')}>
                <View style={styles.navItem}>
                    <Ionicons name="chatbox" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Post</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => navigation.navigate('AddAdvert')}>
                <View style={styles.navItem}>
                    <Ionicons name="megaphone" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Advert</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => navigation.navigate('AddQuestion')}>
                <View style={styles.navItem}>
                    <Ionicons name="bulb" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Question</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => navigation.navigate('AddPost')}>
                <View style={styles.navItem}>
                    <Ionicons name="chatbubble-ellipses" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Room</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => navigation.navigate('AddCBT')}>
                <View style={styles.navItem}>
                    <Ionicons name="timer" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>CBT</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => navigation.navigate('AddWriteUp')}>
                <View style={styles.navItem}>
                    <Ionicons name="reader" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Write Up</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => navigation.navigate('AddFeed')}>
                <View style={styles.navItem}>
                    <Ionicons name="newspaper" size={20} color={props.color}/>
                    <Text style={[styles.textStyle, styles.navItemText, {color: props.color}]}>Feed</Text>
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
    sideBarAdd: {
        ...tailwind('flex justify-center w-full rounded-md  mt-4')
    },
    createHeader: {
        flexDirection: 'row',
        backgroundColor: '#dcdbdc',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 20,
        ...tailwind('rounded-t-md')
    },
    createHeaderText: {
        marginLeft: 20
    }
}));

export default withStyles(useStyles)(create);