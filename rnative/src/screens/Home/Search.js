import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import * as actions from '../../store/actions/index';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import HeaderFilter from '../../components/Main/HeaderFilter/HeaderFilter';
import ScrollView from '../../components/UI/ScrollView/ScrollView';

class Search extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyle)
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
        }
    }

    componentWillUnmount() {
        this.props.onCloseHeaderPage();
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    navigationHandler = (page) => {
        alert()
    }

    reloadSearchHandler = () => {
        this.props.onHeaderFilter(this.props.filterCnt)
    }

    render() {
        let cnt = (
            <ActivityIndicator 
                size="large"
                animating
                color="#777"/>
        );

        
        if (this.props.filterStart && this.props.filterCnt) {
            cnt = (
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            );
        }

        if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length === 0) {
            cnt = (
                <InfoBox
                    det='No content found!'
                    name="search"
                    size={40}
                    style={styles.textStyle} />
            );
        }

        if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length > 0){
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
                            <Icon name="reload-outline" size={18} color="#777"/>
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