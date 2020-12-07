import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Icon from 'ionicons';

import HomeScreen from '../../../screens/Home/Post';
import UserScreen from '../../../screens/Home/Users';
import RoomScreen from '../../../screens/Home/Room';
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
                    if (route.name === 'Room') {
                        name = 'chatbubble-ellipses'
                    }
                    if (route.name === 'CBT') {
                        name = 'timer'
                    }
                    return <Icon name={name} color={color} size={20}/>
                },
                tabBarLabel: ({color}) => {
                    return (
                        <View>
                            <Text style={[styles.labelStyle, {color}]}>{ route.name  }</Text>
                            {/* <TabBarge 
                                style={styles.tabBarge}
                                notification={3}/> */}
                        </View>
                    )
                }
            }
        }}
        tabBarOptions={{
            activeTintColor: '#05578b',
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
                backgroundColor: '#05578b'
            }
        }}
        lazy={true}
        lazyPlaceholder={() => <SplashScreen />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="User" component={UserScreen} />
        <Tab.Screen name="Room" component={RoomScreen} />
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

export default topTab;