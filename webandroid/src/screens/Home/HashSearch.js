import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { size } from 'tailwind';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import TabView from '../../components/UI/TabView/TabView';
import SearchHeader from '../../components/UI/Header/Search';
import * as actions from '../../store/actions/index';
import Post from '../HashSearch/Post';
import Question from '../HashSearch/Question';
import Feed from '../HashSearch/Feed';
import WriteUp from '../HashSearch/WriteUp';
import CBT from '../HashSearch/CBT';
import Group from '../HashSearch/Group';
import Advert from '../HashSearch/Advert';

class HashSearch extends Component {
    constructor(props) {
        super(props);
        let layoutWidth = Dimensions.get('window').width;
        this.state = {
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portrait',
            index: 0,
            routes: [{key: 'post', title: 'Post'},{key: 'feed', title: 'Feed'}, {key: 'group' , title: 'Group'}, {key: 'CBT', title: 'CBT'},
            {key: 'question', title: 'Question'}, {key: 'writeUp', title: 'Write Up'}, {key: 'advert', title: 'Product'}],
            option: [{title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            search: this.props.route.params.hashTag,
            showOption: false,
            showSettings: false,
            layoutWidth
        }
    }

    async componentDidMount() {
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.props.onPageReset();
            this.setState({showOption: false, showSettings: false});
        });
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        this._unsubscribeBlur();
        this.props.onPageReset();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    updateStyle = (dims) => {
        let layoutWidth = dims.window.width;
        this.setState({
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portriat',
            layoutWidth
        })
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
            <SearchHeader
                onPress={this.props.navigation.goBack}
                value={this.state.search}
                editable={false}/>
        );
        let cnt = (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator 
                size="large"
                animating
                color="#777"/>
            </View>
        );

        if (this.state.search && this.state.search.trim().length > 0) {
            let renderScene = screenProps => {
                switch (screenProps.route.key) {
                    case 'post':
                        return <Post {...screenProps} focus={this.state.index === 0} search={this.state.search} />;
                    case 'feed':
                        return <Feed {...screenProps} focus={this.state.index === 1} search={this.state.search} />;
                    case 'group':
                        return <Group {...screenProps} focus={this.state.index === 2} search={this.state.search} />;
                    case 'CBT':
                        return <CBT {...screenProps} focus={this.state.index === 3} search={this.state.search} />;
                    case 'question':
                        return <Question {...screenProps} focus={this.state.index === 4} search={this.state.search} />;
                    case 'writeUp':
                        return <WriteUp {...screenProps} focus={this.state.index === 5} search={this.state.search} />;
                    case 'advert':
                        return <Advert {...screenProps} focus={this.state.index === 6} search={this.state.search} />;
                    default:
                        return null;
                }
            }
            cnt = (
                <View style={styles.wrapper}>
                    <TabView
                        navigationState={{ index: this.state.index, routes: this.state.routes }}
                        renderScene={renderScene}
                        onIndexChange={this.setIndexHandler}
                        initialLayout={{ width: this.state.layoutWidth }}
                        lazy
                    />
                </View>
            )
        }

        let allCnt = (
            <View style={styles.wrapper}>
                { header }
                { cnt }
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
            content={ allCnt }
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
        flex: 1
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(HashSearch);