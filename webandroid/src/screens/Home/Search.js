import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'ionicons';
import MaterialIcons from 'materialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'react-moment';
import { tailwind } from 'tailwind';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import TouchableNativeFeedback from '../../components/UI/TouchableNativeFeedback/TouchableNativeFeedback';
import * as actions from '../../store/actions/index';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import HeaderFilter from '../../components/Main/HeaderFilter/HeaderFilter';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import Href from '../../components/UI/Href/Href';
import BoxShadow from '../../components/UI/BoxShadow/BoxShadow';
import { calendarStrings } from '../../shared/utility';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#fff',
            color: '#333',
            searchHistory: null
        }
    }

    async componentDidMount() {
        await AsyncStorage.getItem('searchHistory').then(res => {
            let searchHistory = res ? JSON.parse(res) : [];
            this.setState({searchHistory: searchHistory.reverse()})
        })
    }

    componentWillUnmount() {
        this.props.onCloseHeaderPage();
    }

    navigationHandler = async (page) => {
        alert()
        let recentHistory = await AsyncStorage.getItem('searchHistory');
        recentHistory = recentHistory ? JSON.parse(recentHistory) : [];
        if (recentHistory.filter(history => history.title === String(this.props.filterCnt).trim()).length < 1) {
            recentHistory.push({title: this.props.filterCnt, date: new Date().getTime()});
            const searchHistory = JSON.stringify(recentHistory);
            await AsyncStorage.setItem('searchHistory', searchHistory);
        }
    }

    reloadSearchHandler = () => {
        this.props.onHeaderFilter(this.props.filterCnt)
    }

    searchHandler = (filterCnt) => {
        this.props.onHeaderFilter(filterCnt)
    }

    clearHistoryHandler = async () => {
        await AsyncStorage.removeItem('searchHistory');
        this.setState({searchHistory: []})
    }

    render() {
        let cnt = (
            <ActivityIndicator 
                size="large"
                animating
                color="#777"/>
        );
        if (this.state.searchHistory && !this.props.filterCnt ) {
            cnt = (
                <View style={[styles.search, {backgroundColor: this.state.backgroundColor}]}>
                    <BoxShadow style={styles.searchHeader}>
                        <Text style={[styles.textStyle, styles.searchHeaderText]}>Search History</Text>
                        <View style={styles.searchHeaderIcon}>
                            <TouchableOpacity onPress={this.clearHistoryHandler}>
                                <Ionicons name="trash-bin-outline" size={18} color="#333"/>
                            </TouchableOpacity>
                        </View>
                    </BoxShadow>
                    <View style={styles.scrollWrapper}>
                        <ScrollView style={styles.searchScroll} >
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
        
        if (this.props.filterStart && this.props.filterCnt) {
            cnt = (
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            );
        }

        if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length === 0  && this.props.filterCnt) {
            cnt = (
                <InfoBox
                    det='No content found!'
                    name="search"
                    size={40}
                    style={styles.textStyle} />
            );
        }

        if (!this.props.searchCntErr && this.props.searchCnt && Array.isArray(this.props.searchCnt) && this.props.searchCnt.length > 0){
            cnt = (
                <ScrollView>
                    <View style={[styles.wrapper, this.state.viewMode === 'landscape' ? styles.landscapeWrapper : null]}>
                        <HeaderFilter 
                            filterResults={this.props.searchCnt}
                            viewCnt={this.navigationHandler}/>
                    </View>
                </ScrollView>
            )
        }

        if (this.props.searchCntErr) {
            cnt = (
                <>
                    <InfoBox
                        det='Network Error!'
                        name="cloud-offline-outline"
                        size={40}
                        color="#ff1600"
                        style={styles.info}/>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={this.reloadSearchHandler} style={styles.reload}>
                            <Ionicons name="reload-outline" size={18} color="#777"/>
                            <Text style={styles.reloadText}>Reload</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        }


      return (
         <NoBackground>
           { cnt }
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
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    landscapeWrapper: {
        width: '100%'
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
        filterCnt: state.header.filterCnt,
        filterStart:state.header.filterStart,
        searchCnt: state.header.searchCnt,
        searchCntErr: state.header.searchCntErr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onHeaderFilter: (filterCnt) => dispatch(actions.headerFilterInit(filterCnt)),
      onCloseHeaderPage: () => dispatch(actions.headerFilterStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);