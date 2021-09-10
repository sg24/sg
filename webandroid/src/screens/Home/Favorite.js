import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import { size } from 'tailwind';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import DefaultHeader from '../../components/UI/Header/DefaultHeader';
import * as actions from '../../store/actions/index';
import Post from '../Favorite/Post';
import Question from '../Favorite/Question';
import Feed from '../Favorite/Feed';
import WriteUp from '../Favorite/WriteUp';
import CBT from '../Favorite/CBT';
import Group from '../Favorite/Group';
import Option from '../../components/UI/Option/Option';
import Button from '../../components/UI/Button/Button';
import Settings from '../../components/UI/Settings/Settings';
import TabView from '../../components/UI/TabView/TabView';

class Favorite extends Component {
    constructor(props) {
        super(props);
        let layoutWidth = Dimensions.get('window').width;
        this.state = {
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portrait',
            index: 0,
            routes: [{key: 'post', title: 'Post'},{key: 'feed', title: 'Feed'}, 
            {key: 'group' , title: 'Group'}, {key: 'CBT', title: 'CBT'},
            {key: 'question', title: 'Question'}, {key: 'writeUp', title: 'Write Up'}],
            option: [{title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            showOption: false,
            showSettings: false,
            layoutWidth,
            showTab: true
        }
    }

    updateStyle = (dims) => {
        let layoutWidth = dims.window.width;
        this.setState({
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portriat',
            layoutWidth
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
             this.setState({showTab: true});
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.props.onPageReset();
            this.setState({showOption: false,showSettings: false, showTab: false});
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribeBlur();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    optionHandler = (action) => {
        if (action === 'search') {
            this.setState({showSearch: true, showOption: false});
        }

        if (action === 'settings') {
            this.setState({showSettings: true, showOption: false});
        }
    }

    checkOptionHandler = () => {
        this.setState((prevState, props) => ({
            showOption: !prevState.showOption, showActionSheet: null
        }))
    }

    closeOptionHandler = () => {
        this.setState({showOption: false})
    }

    closeSettingsHandler = () => {
        this.setState({showSettings: false});
    }

    setIndexHandler = (index) => {
        this.setState({index});
    }

    render() {
        let header = (
                <DefaultHeader 
                    onPress={() => this.props.navigation.goBack()}
                    title="Favorite"
                    rightSideContent={(
                        <Button style={styles.optionIcon} onPress={this.checkOptionHandler}>
                            <Ionicons name="ellipsis-vertical-outline" size={20} />
                        </Button>
                    )}
                />
        );

        let options = (
            <>
                { this.state.showOption ? (
                    <Option
                        option={this.state.option}
                        closeOption={this.closeOptionHandler}
                        onPress={this.optionHandler}/>
                ) : null}
                { this.state.showSettings ?
                    <Settings 
                        page="page"
                        closeSettings={this.closeSettingsHandler}/> : null}
            </>
        );

        let renderScene = screenProps => {
            switch (screenProps.route.key) {
                case 'post':
                    return <Post {...screenProps} focus={(this.state.index === 0) && this.state.showTab}/>;
                case 'feed':
                    return <Feed {...screenProps} focus={(this.state.index === 1) && this.state.showTab}/>;
                case 'group':
                    return <Group {...screenProps} focus={(this.state.index === 2) && this.state.showTab}/>;
                case 'CBT':
                    return <CBT {...screenProps} focus={(this.state.index === 3) && this.state.showTab}/>;
                case 'question':
                    return <Question {...screenProps} focus={(this.state.index === 4) && this.state.showTab}/>;
                case 'writeUp':
                    return <WriteUp {...screenProps} focus={(this.state.index === 5) && this.state.showTab}/>;
                default:
                    return null;
            }
        }

        let cnt = (
            <View style={styles.wrapper}>
                { header }
                <TabView
                    navigationState={{ index: this.state.index, routes: this.state.routes }}
                    renderScene={renderScene}
                    onIndexChange={this.setIndexHandler}
                    initialLayout={{ width: this.state.layoutWidth }}
                    lazy
                />
                { options }
            </View>
        )

      return (
        <NoBackground
            sideBar={(
                <>
                <Navigation 
                        color={this.props.settings.color}
                        backgroundColor={this.props.settings.backgroundColor}/>
                <CreateNavigation 
                    color={this.props.settings.color}
                    backgroundColor={this.props.settings.backgroundColor}/>
                </>
            )}
            content={ cnt }
            contentFetched={true}>
        </NoBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    wrapper: {
        width: '100%',
        flex: 1,
    },
    optionIcon: {
        paddingVertical: 0
    }
});

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPageReset: () => dispatch(actions.pageReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);