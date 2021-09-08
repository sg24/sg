import React from 'react';
import { View,  StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Icon from 'ionicons';
import { connect } from 'react-redux';
import Text from 'text';

import SplashScreen from '../../../screens/SplashScreen/SplashScreen';

const tabView = props => {
    const renderTabBar = tabProps => (
        <TabBar
            {...tabProps}
            {...props}
            scrollEnabled
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
            renderLabel={({ route, focused, color }) => {
                let chatRoomNotification = 0;
                let cbtNotification = 0;
                let groupFeedNotification = 0;
                let groupPostNotification = 0;
                let groupQuestionNotification = 0;
                let groupWriteupNotification = 0;
                if (props.notification) {
                    let chatRoomPage = ['chatRoomRequest', 'chatRoomJoin', 'chatRoomAccept', 'chatRoomReject', 'chatRoomPending', 'chatRoomMark'];
                    for (let page of chatRoomPage) {
                        chatRoomNotification = chatRoomNotification + props.notification[page].length
                    }
                    let cbtPage = ['groupCbt', 'groupCbtRequest', 'groupCbtResult', 'groupCbtAccept', 'groupCbtReject', 'groupCbtMark', 'groupCbtShare'];
                    for (let page of cbtPage) {
                        cbtNotification = cbtNotification + props.notification[page].length
                    }
                    let groupFeedPage = ['groupFeed', 'groupFeedShare'];
                    for (let page of groupFeedPage) {
                        groupFeedNotification = groupFeedNotification + props.notification[page].length
                    }
                    let groupPostPage = ['groupPost', 'groupPostShare'];
                    for (let page of groupPostPage) {
                        groupPostNotification = groupPostNotification + props.notification[page].length
                    }
                    let groupQuestionPage = ['groupQuestion', 'groupQuestionShare'];
                    for (let page of groupQuestionPage) {
                        groupQuestionNotification = groupQuestionNotification + props.notification[page].length
                    }
                    let groupWriteupPage = ['groupWriteup', 'groupWriteupShare'];
                    for (let page of groupWriteupPage) {
                        groupWriteupNotification = groupWriteupNotification + props.notification[page].length
                    }
                }
                return (
                <View>
                    <Text style={{ color, fontSize: 15 }}>
                        {route.title}
                    </Text>
                    {/* <TabBarge 
                        style={styles.tabBarge}
                        notification={
                            route.key === 'enablePost' ? groupPostNotification :
                            route.key === 'enableFeed' ? groupFeedNotification :
                            route.key === 'enableCBT' ? cbtNotification :
                            route.key === 'enableQuestion' ? groupQuestionNotification :
                            route.key === 'enableWriteUp' ? groupWriteupNotification :
                            route.key === 'enableChatroom' ? chatRoomNotification :
                            props.notification && props.notification[route.key === 'Home' ? 'post' : route.key.toLowerCase()] ?
                                props.notification[route.key === 'Home' ? 'post' : route.key.toLowerCase()].length : 0}
                        disableZero/> */}
                </View>
              )}}
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
    tabBarge: {
        right: -10,
        top: -10,
        width: 20,
        height: 20,
        borderRadius: 10
    }
})

const mapStateToProps = state => {
    return {
        notification: state.header.notification
    };
};

export default connect(mapStateToProps)(tabView);