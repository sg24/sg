import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Text from 'text';

import PostScreen from '../../../screens/Favorite/Post';
import QuestionScreen from '../../../screens/Favorite/Question';
import WriteUpScreen from '../../../screens/Favorite/WriteUp';
import FeedScreen from '../../../screens/Favorite/Feed';
import CBTScreen from '../../../screens/Favorite/CBT';
import GroupScreen from '../../../screens/Favorite/Group';
import SplashScreen from '../../../screens/SplashScreen/SplashScreen';

const Tab = createMaterialTopTabNavigator();

const topTab = props => (
    <Tab.Navigator 
        screenOptions={({route}) => {
            return {
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
        swipeEnabled={false}
        tabBarOptions={{
            activeTintColor: '#05578b',
            inactiveTintColor: '#777',
            showIcon: true,
            scrollEnabled: true,
            tabStyle: {
                flexDirection: 'row',
                paddingHorizontal: 10,
                width: 'auto'
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
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Group" component={GroupScreen} />
        <Tab.Screen name="CBT" component={CBTScreen} />
        <Tab.Screen name="Question" component={QuestionScreen} />
        <Tab.Screen name="Write Up" component={WriteUpScreen} />
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
        fontSize: 15, 
        marginLeft: 4,
    }
})

export default topTab;