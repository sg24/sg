import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import withComponent from 'withcomponent';

import FriendRequestItem from './FriendRequestItem';
import * as actions from '../../../store/actions/index';

class FriendRequest extends Component {
    state = {
        disableUserOption: []
    };

    acceptUserHandler = (id) => {
        this.props.onAcceptUser('friendRequest', 'patch', 'users', id, 'acceptUser', {id})
    }

    rejUserHandler = (id) => {
        this.props.onRejectUser('friendRequest', 'patch', 'users', id, 'rejUser', {id})
    }

    userProfileHandler = (authorID) => {
        this.props.navigation.navigate('Profile', {userID: authorID})
    }

    render() {
        let cnt = this.props.cnt.map((cnt, index) => (
            <FriendRequestItem 
                key={index}
                cnt={cnt}
                profile={() => this.userProfileHandler(cnt._id)}
                acceptUser={() => this.acceptUserHandler(cnt._id)}
                rejUser={() => this.rejUserHandler(cnt._id)}
                disableUserOption={this.state.disableUserOption}
                pending={this.props.pending}
                page={this.props.page} />
        ))
        return  (
            <ScrollView
                horizontal
                style={styles.wrapper}>
                { cnt }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#dcdbdc',
        width: '100%',
        padding: 10
    }
});

const mapStateToProps = state => {
    return {
        pending: state.externalPage.pending,
        page: state.externalPage.page,
        error: state.externalPage.error
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onAcceptUser: (pageType, uriMethod, page, pageID, cntType, cnt) => dispatch(actions.externalPageInit(pageType, uriMethod, page, pageID, cntType, cnt)),
        onRejectUser: (pageType, uriMethod, page, pageID, cntType, cnt) => dispatch(actions.externalPageInit(pageType, uriMethod, page, pageID, cntType, cnt)),
    };
  };

  export default withComponent([{name: 'navigation', component: useNavigation}])(connect(mapStateToProps, mapDispatchToProps)(FriendRequest));