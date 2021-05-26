import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Icon from 'ionicons';

import SplashScreen from '../../../screens/SplashScreen/SplashScreen';


const tabView = props => {
    const renderTabBar = tabProps => (
        <TabBar
            {...tabProps}
            activeColor="#fff"
            tabStyle={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                width: 'auto'
            }}
            renderIcon={({ route, focused, color }) => {
                let name = route.name;
                if (route.name === 'Post') {
                    name = 'home';
                }
                if (route.name === 'Question') {
                    name = 'bulb';
                }
                if (route.name === 'WriteUp') {
                    name = 'home';
                }
                if (route.name === 'Group') {
                    name = 'chatbubble-ellipses'
                }
                if (route.name === 'CBT') {
                    name = 'timer'
                }
                return <Icon name={name} color={color} size={20}/>
            }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color, fontSize: 15 }}>
                  {route.title}
                </Text>
              )}
            style={{
                paddingHorizontal: 5,
                backgroundColor: '#437da3',
                borderTopWidth: 1,
                borderColor: '#e9ebf2'
            }}
            indicatorStyle={{
                backgroundColor: '#fff'
            }}
            labelStyle={{fontSize: 15, textTransform: 'none'}}
        />
      );
    return (
        <TabView
            {...props}
            renderLazyPlaceholder={({ route }) =>  <SplashScreen route={route}/>}
            swipeEnabled={false}
            renderTabBar={renderTabBar}
        />
    )
}

const styles = StyleSheet.create({
    tabView: {

    }
})

export default tabView;