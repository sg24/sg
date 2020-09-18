import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import NoBackground from '../../components/UI/NoBackground/NoBackground';
import * as actions from '../../store/actions/index';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import Profiles from '../../components/Main/Profile/Profile.js';
import ScrollView from '../../components/UI/ScrollView/ScrollView';

class Profile extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyle)
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            userID: this.props.route.params.userID
        }
    }

    componentDidMount() {
        if (this.state.userID) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.onFetchProfile(this.state.userID);
            });
            this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
                this.props.onCloseHeaderPage();
            });
        } else {
            this.props.navigation.navigate('Home')
        }
    }

    componentWillUnmount() {
        if (this.state.userID) {
            this._unsubscribe();
            this._unsubscribeBlur();
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    navigationHandler = (page, id) => {
      
    }

    reloadFetchHandler = () => {
        this.props.onFetchProfile(this.state.userID);
    }

    changeCntHandler = (id, title, det, confirm, modelType) => {
        alert()
        // this.props.onChangeCnt(id, title, det, confirm, modelType);
    };

    render() {
        let cnt = (
            <ActivityIndicator 
                size="large"
                animating
                color="#437da3"/>
        )

       
        if (!this.props.profileErr && this.props.profile){
            cnt = (
                <ScrollView>
                     <View style={[styles.wrapper, this.state.viewMode === 'landscape' ? styles.landscapeWrapper : null]}>
                        <Profiles
                            profile={this.props.profile}
                            navigate={this.navigationHandler}
                            userID={this.state.userID}
                            changeCnt={this.changeCntHandler}/>
                     </View>
                </ScrollView>
            )
        }

        if (this.props.profileErr) {
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
        profile: state.profile.profile,
        profileErr: state.profile.profileErr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: (userID) => dispatch(actions.fetchProfileInit(userID)),
        onCloseHeaderPage: () => dispatch(actions.fetchProfileStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);