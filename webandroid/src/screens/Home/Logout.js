import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

import * as actions from '../../store/actions/index';

class Logout extends Component {

    async componentDidMount() {
        await AsyncStorage.multiRemove(['expiresIn', 'token', 'userID', 'username', 'userImage', Constants.manifest.extra.NOTIFICATION]);
        this.props.loggedOut();
        this.props.onResetSideBar();
    }

    render() {
      return null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loggedOut: () => dispatch(actions.loggedOut()),
        onResetSideBar: () => dispatch(actions.sidebarReset())
    };
};

export default connect(null, mapDispatchToProps)(Logout);