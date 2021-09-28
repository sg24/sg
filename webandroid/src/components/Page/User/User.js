import React, { Component } from 'react';
import {  FlatList, ScrollView, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import PrivateConv from '../../Main/Conv/PrivateConv/PrivateConv';

class User extends Component {
    state = {
        hideMessage: false,
        closeModal: null,
        pageReaction: null,
        enableLoadMore: false,
        start: false,
        loadMore: false
    };

    shouldComponentUpdate(props) {
        if (props.hideMessage !== this.state.hideMessage || props.closeModal !== this.state.closeModal || props.enableLoadMore !== this.state.enableLoadMore || 
            props.start !== this.state.start || props.loadMore !== this.state.loadMore || props.pageReaction !== this.state.pageReaction) {
                this.setState({hideMessage: props.hideMessage, closeModal: props.closeModal, enableLoadMore: props.enableLoadMore,
                    start: props.start, loadMore: props.loadMore, pageReaction: props.pageReaction});
            return true;
        }
        return false
    }

    isCloseToBottomHandler = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 30;
        return (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) && this.props.settings.autoLoading;
    }

    _renderItem = ({item:cnt, index}) => {
        return (
            <PrivateConv 
                key={index}
                cnt={cnt}
                showProfileButton={this.props.showProfileButton}
                hideMessage={this.props.hideMessage}
                userID={this.props.userID}
                userProfile={this.props.userProfile.bind(this, cnt._id)}
                chat={this.props.chat.bind(this, cnt)}
                addUser={this.props.changeProfile.bind(this, cnt._id, null, 'addUser', true)}
                acceptUser={this.props.changeProfile.bind(this, cnt._id, cnt.username, 'acceptUser', true)}
                rejUser={this.props.changeProfile.bind(this, cnt._id, cnt.username, 'rejUser', false, 'Are you sure you want to reject this user')}
                cancelReq={this.props.changeProfile.bind(this, cnt._id, cnt.username, 'cancelReq', false, 'Are you sure you want to cancel this request')}
                unfriend={this.props.changeProfile.bind(this, cnt._id, cnt.username, 'unfriend', false, 'Are you sure you want to remove this user')}
                pageReaction={this.props.pageReaction}
                closeModal={this.props.closeModal}
                lastItem={(this.props.cnt.length - 1) === index}
                enableLoadMore={this.props.enableLoadMore}
                start={this.props.start}
                loadMore={this.props.loadMore}/>
        )
    }

    render() {
        let cnt = (
            <FlatList 
                    data={this.props.cnt}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item+index}
                    showsVerticalScrollIndicator={(Platform.OS === 'web') && (this.props.viewMode === 'landscape')}
                    style={styles.scroll}
                    removeClippedSubviews
                    updateCellsBatchingPeriod={500}
                    onScroll={({nativeEvent}) => {
                        if (this.isCloseToBottomHandler(nativeEvent) && !this.props.start) {
                            this.props.loadMoreHandler();
                        }
                    }}
                />
        );

        if (this.props.enableScrollView) {
            cnt = (
                <ScrollView
                    showsVerticalScrollIndicator={(Platform.OS === 'web') && (this.props.viewMode === 'landscape')}
                    style={styles.scroll}>
                    {this.props.cnt.map((cnt, index) => this._renderItem({item: cnt, index}))}
                </ScrollView>
            )
        }
        return cnt;
    }
}

const styles = StyleSheet.create({
    scroll: {
        paddingTop: 10
    }
})

const mapStateToProps = state => {
    return {
        settings: state.settings
    };
};

export default connect(mapStateToProps)(User);