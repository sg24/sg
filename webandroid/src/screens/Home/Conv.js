import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'ionicons';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import * as actions from '../../store/actions/index';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import Conv from '../../components/Main/Conv/Conv';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import ErrorInfo from '../../components/UI/ErrorInfo/ErrorInfo';

class Convs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
        }
    }

    componentDidMount() {
        if (this.props.navigation) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.onFetchConv(0, this.props.settings.userPage.fetchLimit);
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.props.onCloseHeaderPage();
            });
            Dimensions.addEventListener('change', this.updateStyle)
        } else {
            this.props.onFetchConv(0, this.props.settings.userPage.fetchLimit);
        }
    }

    componentWillUnmount() {
        if (this.props.navigation) { 
            this._unsubscribe();
            this._unsubscribeBlur();
            Dimensions.removeEventListener('change', this.updateStyle);
        } else {
            this.props.onCloseHeaderPage();
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    navigationHandler = (page, id) => {
        if (page === 'chat') {
            alert(id)
        }
        if (page === 'group') {
            alert(id)
        }
        if (page === 'profile') {
            alert(id)
        }
    }

    reloadFetchHandler = () => {
        this.props.onFetchConv(0, this.props.settings.userPage.fetchLimit);
    }

    loadMoreHandler = () => {
        this.props.onFetchConv(this.props.conv ? this.props.conv.length : 0, this.props.settings.userPage.fetchLimit);
    }

    render() {
        let cnt = (
                <ActivityIndicator 
                    size="large"
                    animating
                    color="#437da3"/>
            );

        if (!this.props.convErr && this.props.conv && this.props.conv.friend.length === 0 &&  this.props.conv.group.length === 0) {
            cnt = (
                <InfoBox
                    det='No content found!'
                    name="chatbubbles-outline"
                    size={40}
                    style={styles.textStyle} />
            );
        }

       
        if (!this.props.convErr && this.props.conv && this.props.conv.length > 0){
            cnt = (
                <ScrollView>
                     <View style={[styles.wrapper, this.state.viewMode === 'landscape' ? styles.landscapeWrapper : null]}>
                        <Conv
                            conv={this.props.conv}
                            navigate={this.navigationHandler}
                            enableLoadMore={this.props.loadMore}
                            start={this.props.convLoader}
                            loadMore={this.loadMoreHandler}/>
                     </View>
                </ScrollView>
            )
        }

        if (this.props.convErr) {
            cnt = (
                <View style={{width: '100%', flex: 1}}>
                    <ErrorInfo 
                        viewMode={this.state.viewMode}
                        backgroundColor={this.props.settings.backgroundColor}
                        reload={this.reloadFetchHandler}/>
                </View>
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
        settings: state.settings,
        conv: state.header.conv,
        convErr: state.header.convErr,
        convLoader: state.header.convLoader,
        loadMore: state.header.loadMore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchConv: (start, limit) => dispatch(actions.fetchConvInit(start, limit)),
        onCloseHeaderPage: () => dispatch(actions.fetchConvStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Convs);