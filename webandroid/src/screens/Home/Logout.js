import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

import * as actions from '../../store/actions/index';

class Logout extends Component {

    async componentDidMount() {
        await AsyncStorage.multiRemove(['expiresIn', 'token', 'userID', 'username', 'userImage', Constants.manifest.extra.NOTIFICATION]);
        this.props.loggedOut();
    }

    render() {
      return null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loggedOut: () => dispatch(actions.loggedOut())
    };
};

export default connect(null, mapDispatchToProps)(Logout);