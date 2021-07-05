import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Icon from 'ionicons';
import { connect } from 'react-redux';

import HomeScreen from '../../../screens/Home/Post';
import UserScreen from '../../../screens/Home/Users';
import GroupScreen from '../../../screens/Home/Group';
import CBTScreen from '../../../screens/Home/CBT';
import QuestionScreen from '../../../screens/Home/Question';
import TabBarge from '../TabBarge/TabBarge';
import SplashScreen from '../../../screens/SplashScreen/SplashScreen';

const Tab = createMaterialTopTabNavigator();

const topTab = props => (
    <Tab.Navigator 
        screenOptions={({route}) => {
            return {
                tabBarIcon: ({ color }) => {
                    let name = route.name;
                    if (route.name === 'Home') {
                        name = 'home';
                    }
                    if (route.name === 'User') {
                        name = 'people'
                    }
                    if (route.name === 'Group') {
                        name = 'chatbubble-ellipses'
                    }
                    if (route.name === 'CBT') {
                        name = 'timer'
                    }
                    return <Icon name={name} color={color} size={20}/>
                },
                tabBarLabel: ({color}) => {
                    let userChat = 0;
                    let groupNotification = 0;
                    let cbtNotification = 0;
                    if (props.notification) {
                        // for (let cnt of props.notification['userChat']) {
                        //     if (!cnt.expiresIn) {
                        //         userChat = userChat + cnt.counter
                        //     }
                        // }
                        // userChat = userChat + props.notification['userRequest'].filter(cntItem => !cntItem.expiresIn).length
                        // let groupPage = ['groupRequest', 'groupJoin', 'groupAccept', 'groupReject', 'groupPending', 'groupMark'];
                        // for (let page of groupPage) {
                        //     groupNotification = groupNotification + props.notification[page].filter(cntItem => !cntItem.expiresIn).length
                        // }
                        // let cbtPage = ['qchat', 'qchatRequest', 'qchatResult', 'qchatAccept', 'qchatReject', 'qchatMark', 'qchatShare'];
                        // for (let page of cbtPage) {
                        //     cbtNotification = cbtNotification + props.notification[page].filter(cntItem => !cntItem.expiresIn).length
                        // }
                    }
                    return (
                        <View>
                            <Text style={[styles.labelStyle, {color}]}>{ route.name  }</Text>
                            <TabBarge 
                                style={styles.tabBarge}
                                notification={
                                    route.name === 'User' ?  userChat :
                                    route.name === 'Group' ? groupNotification :
                                    route.name === 'CBT' ? cbtNotification :
                                    route.name === 'Home' ?  props.notification && props.notification['post'] ? props.notification['post'].filter(cntItem => !cntItem.expiresIn).length : 0: 0}
                                disableZero/>
                        </View>
                    )
                }
            }
        }}
        swipeEnabled={false}
        tabBarOptions={{
            activeTintColor: '#437da3',
            inactiveTintColor: '#777',
            showIcon: true,
            tabStyle: {
                flexDirection: 'row',
                paddingHorizontal: 10
            },
            style: {
                paddingHorizontal: 5,
                backgroundColor: '#fff',
                borderTopWidth: 1,
                borderColor: '#e9ebf2'
            },
            indicatorStyle: {
                backgroundColor: '#437da3'
            }
        }}
        lazy={true}
        lazyPlaceholder={() => <SplashScreen />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="User" component={UserScreen} />
        <Tab.Screen name="Group" component={GroupScreen} />
        <Tab.Screen name="CBT" component={CBTScreen} />
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