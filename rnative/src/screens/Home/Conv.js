import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import * as actions from '../../store/actions/index';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import Conv from '../../components/Main/Conv/Conv';
import ScrollView from '../../components/UI/ScrollView/ScrollView';

class Convs extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyle)
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onFetchConv();
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.props.onCloseHeaderPage();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribeBlur();
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
        this.props.onFetchConv();
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

       
        if (!this.props.convErr && this.props.conv && (this.props.conv.friend.length > 0 || this.props.conv.group.length > 0)){
            cnt = (
                <ScrollView>
                     <View style={[styles.wrapper, this.state.viewMode === 'landscape' ? styles.landscapeWrapper : null]}>
                        <Conv
                            conv={this.props.conv}
                            navigate={this.navigationHandler}/>
                     </View>
                </ScrollView>
            )
        }

        if (this.props.convErr) {
            cnt = (
                <>
                    <InfoBox
                        det='Network Error!'
                        name="cloud-offline-outline"
                        size={40}
                        color="#ff1600"
                        style={styles.info}/>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={this.reloadFetchHandler} style={styles.reload}>
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
        conv: state.header.conv,
        convErr: state.header.convErr,
        convLoader: state.header.convLoader,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchConv: () => dispatch(actions.fetchConvInit()),
        onCloseHeaderPage: () => dispatch(actions.fetchConvStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Convs);