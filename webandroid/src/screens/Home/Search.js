import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
// import MaterialIcons from 'materialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'react-moment';
import { tailwind, size } from 'tailwind';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import Navigation from '../../components/UI/SideBar/Navigation/Navigation';
import CreateNavigation from '../../components/UI/SideBar/CreateNavigation/CreateNavigation';
import TabView from '../../components/UI/TabView/TabView';
import SearchHeader from '../../components/UI/Header/Search';
import TouchableNativeFeedback from '../../components/UI/TouchableNativeFeedback/TouchableNativeFeedback';
import * as actions from '../../store/actions/index';
import Post from '../Search/Post';
import Question from '../Search/Question';
import Feed from '../Search/Feed';
import WriteUp from '../Search/WriteUp';
import CBT from '../Search/CBT';
import Group from '../Search/Group';
import Advert from '../Search/Advert';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import { calendarStrings } from '../../shared/utility';

class Search extends Component {
    constructor(props) {
        super(props);
        let layoutWidth = Dimensions.get('window').width;
        this.state = {
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portrait',
            index: 0,
            routes: [{key: 'post', title: 'Post'},{key: 'feed', title: 'Feed'}, {key: 'group' , title: 'Group'}, {key: 'CBT', title: 'CBT'},
            {key: 'question', title: 'Question'}, {key: 'writeUp', title: 'Write Up'}, {key: 'advert', title: 'Product'}],
            option: [{title: 'Settings', icon: {name: 'settings-outline'}, action: 'settings'}],
            search: '',
            showOption: false,
            showSettings: false,
            layoutWidth,
            searchHistory: null
        }
    }

    async componentDidMount() {
        await AsyncStorage.getItem('searchHistory').then(res => {
            let searchHistory = res ? JSON.parse(res) : [];
            this.setState({searchHistory: searchHistory.reverse()})
        })
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
        if (this.state.search) {
            (async() => {
                let recentHistory = await AsyncStorage.getItem('searchHistory');
                recentHistory = recentHistory ? JSON.parse(recentHistory) : [];
                if (recentHistory.filter(history => history.title === String(this.state.search).trim()).length < 1) {
                    recentHistory.push({title: this.state.search, date: new Date().getTime()});
                    const searchHistory = JSON.stringify(recentHistory);
                    await AsyncStorage.setItem('searchHistory', searchHistory);
                }
            })()
        }
    }

    updateStyle = (dims) => {
        let layoutWidth = dims.window.width;
        this.setState({
            viewMode: layoutWidth >= size.md ? 'landscape' : 'portriat',
            layoutWidth
        })
    }

    searchHandler = (filterCnt) => {
        this.setState({search: filterCnt});
    }

    clearHistoryHandler = async () => {
        await AsyncStorage.removeItem('searchHistory');
        this.setState({searchHistory: []})
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
                filterCnt={this.searchHandler}/>
        );
        let cnt = (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator 
                size="large"
                animating
                color="#777"/>
            </View>
        );
        if (this.state.searchHistory && this.state.searchHistory.length > 0) {
            cnt = (
                <View style={[styles.search]}>
                    <BoxShadow style={styles.searchHeader}>
                        <Text style={[styles.textStyle, styles.searchHeaderText]}>Search History</Text>
                        <View style={styles.searchHeaderIcon}>
                            <TouchableOpacity onPress={this.clearHistoryHandler}>
                                <Ionicons name="trash-bin-outline" size={18} color="#333"/>
                            </TouchableOpacity>
                        </View>
                    </BoxShadow>
                    <View style={styles.scrollWrapper}>
                        <ScrollView style={[styles.searchScroll, this.state.viewMode === 'landscape' ? {backgroundColor: this.props.settings.backgroundColor} : null]} >
                            {this.state.searchHistory.map((searchHistory, index) => {
                                return (
                                    <View style={styles.searchWrapper} key={index}>
                                        <TouchableNativeFeedback onPress={() => this.searchHandler(searchHistory.title)} style={styles.searchTouch}>
                                            <Ionicons name="reload-outline" size={35} color="#777"/>
                                            <View style={styles.searchCnt}>
                                                <Text style={styles.textStyle}>
                                                    {searchHistory.title}
                                                </Text>
                                                <Text style={[styles.textStyle, styles.searchDate]}>
                                                    <Moment element={Text} calendar={calendarStrings}>
                                                        { searchHistory.date }
                                                    </Moment>
                                                </Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            )
        }

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
    },
    info: {
        fontSize: 18
    },
    icon: {
        marginBottom: 5
    },
    reload: {
        flexDirection: 'row'
    },
    reloadText: {
        marginLeft: 5,
        fontSize: 15,
        color: '#777'
    },
    search: {
        flex: 1,
        width: '100%'
    },
    searchHeader: {
        backgroundColor: '#dcdbdc',
        paddingVertical: 6,
        paddingHorizontal: 10,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchHeaderText: {
        color: '#333'
    },
    searchScroll: {
       position: 'absolute',
       top: 0,
       right: 0,
       bottom: 0,
       left: 0,
       justifyContent: 'flex-start',
       alignItems: 'flex-start',
       paddingTop: 10
    },
    searchWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignItems: 'center',
        ...tailwind('mb-4  w-full ')
    },
    searchTouch: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    searchCnt: {
        marginLeft: 10
    },
    searchDate: {
        marginTop: 2,
        fontSize: 12,
        color: '#777'
    },
    scrollWrapper: {
        position: 'relative',
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        settings: state.settings,
        userID: state.auth.userID,
        search: state.header.filterCnt
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onCloseHeaderPage: () => dispatch(actions.headerFilterStart()),
      onPageReset: () => dispatch(actions.pageReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);