import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'ionicons';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import * as actions from '../../store/actions/index';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import Notify from '../../components/Main/Notify/Notify.js';
import ScrollView from '../../components/UI/ScrollView/ScrollView';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            notification: {},
            notificationList: null
        }
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
        this.setNotification();
    }

    componentDidUpdate() {
        this.setNotification();
    }

    componentWillUnmount() {
        if (this.props.navigation) {
            Dimensions.removeEventListener('change', this.updateStyle);
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    setNotification = () => {
        if (this.props.notification && (JSON.stringify(this.props.notification) !== JSON.stringify(this.state.notification))) {
            let notificationItem = [];
            for (let cnt in notification) {
                if (Array.isArray(notification[cnt])) {
                    for (let cntItem of notification[cnt]) {
                        notificationItem.push(cntItem)
                    }
                }
            }
            this.setState({notification, userChat, totalNotification});
        }
    }

    navigationHandler = (page, id) => {
        if (page === 'post' || page === 'question' || page === 'poets') {
            alert(id)
        }
        if (page === 'group') {
            alert(id)
        }
        if (page === 'chat') {
            alert(id)
        }
        if (page === 'grpreq') {
            alert(id)
        }
        if (page === 'userReq') {
            alert(id)
        }
    }

    reloadFetchHandler = () => {
        this.props.onFetchNotify();
    }

    render() {
        let cnt = (
            <ActivityIndicator 
                size="large"
                animating
                color="#437da3"/>
        )

        if (!this.props.notifyErr && this.props.notify && this.props.notify.length < 1) {
            cnt = (
                <InfoBox
                    det='No content found!'
                    name="chatbubbles-outline"
                    size={40}
                    style={styles.textStyle} />
            );
        }

       
        if (!this.props.notifyErr && this.props.notify && this.props.notify.length > 0){
            cnt = (
                <ScrollView>
                     <View style={[styles.wrapper, this.state.viewMode === 'landscape' ? styles.landscapeWrapper : null]}>
                        <Notify
                            notify={this.props.notify}
                            navigate={this.navigationHandler}/>
                     </View>
                </ScrollView>
            )
        }

        if (this.props.notifyErr) {
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
        notification: state.header.notification,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);