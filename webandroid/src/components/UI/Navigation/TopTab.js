import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Icon from 'ionicons';
import { connect } from 'react-redux';
import Text from 'text';

import HomeScreen from '../../../screens/Home/Post';
import FeedScreen from '../../../screens/Home/Feed';
import UserScreen from '../../../screens/Home/Users';
import GroupScreen from '../../../screens/Home/Group';
import TabBarge from '../TabBarge/TabBarge';
import SplashScreen from '../../../screens/SplashScreen/SplashScreen';

const Tab = createMaterialTopTabNavigator();

const topTab = props => (
    <Tab.Navigator 
        screenOptions={({route}) => {
            return {
                swipeEnabled: false,
                tabBarActiveTintColor: "#437da3",
                tabBarInactiveTintColor: "#777",
                tabBarShowIcon: true,
                tabBarScrollEnabled: true,
                tabBarItemStyle: {
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    width: 'auto'
                },
                tabBarStyle: {
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderColor: '#e9ebf2'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'transparent'
                },
                tabBarIcon: ({ color }) => {
                    let name = route.name;
                    if (route.name === 'Home') {
                        name = 'home-outline';
                    }
                    if (route.name === 'User') {
                        name = 'people-outline'
                    }
                    if (route.name === 'Group') {
                        name = 'chatbubble-ellipses-outline'
                    }
                    if (route.name === 'Feed') {
                        name = 'newspaper-outline'
                    }
                    return <Icon name={name} color={color} size={20}/>
                },
                tabBarLabel: ({color}) => {
                    let userChat = 0;
                    let groupNotification = 0;
                    let feedNotification = 0;
                    if (props.notification) {
                        for (let cnt of props.notification['userChat']) {
                            if (!cnt.expiresIn) {
                                userChat = userChat + cnt.counter
                            }
                        }
                        userChat = userChat + props.notification['userRequest'].filter(cntItem => !cntItem.expiresIn).length
                        let groupPage = ['groupRequest', 'groupJoin', 'groupAccept', 'groupReject', 'groupPending', 'groupMark'];
                        for (let page of groupPage) {
                            groupNotification = groupNotification + props.notification[page].filter(cntItem => !cntItem.expiresIn).length
                        }
                        feedNotification = feedNotification + props.notification['feed'].filter(cntItem => !cntItem.expiresIn).length
                    }
                    return (
                        <View>
                            <Text style={[styles.labelStyle, {color}]}>{ route.name  }</Text>
                            <TabBarge 
                                style={styles.tabBarge}
                                notification={
                                    route.name === 'User' ?  userChat :
                                    route.name === 'Group' ? groupNotification :
                                    route.name === 'Feed' ? feedNotification :
                                    route.name === 'Home' ?  props.notification && props.notification['post'] ? props.notification['post'].filter(cntItem => !cntItem.expiresIn).length : 0: 0}
                                disableZero/>
                        </View>
                    )
                },
                lazy: true,
                lazyPlaceholder: () => <SplashScreen />
            }
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="User" component={UserScreen} />
        <Tab.Screen name="Group" component={GroupScreen} />
    </Tab.Navigator>
)

const styles = StyleSheet.create({
    tabBarge: {
        right: -10,
        top: -10,
        width: 20,
        height: 20,
        borderRadius: 10
    },
    labelStyle: {
        fontSize: 14, 
        textTransform: 'uppercase',
        marginLeft: 4,
    }
})

const mapStateToProps = state => {
    return {
        notification: state.header.notification
    };
};

export default connect(mapStateToProps)(topTab);