import React, { Component } from 'react';
import {  FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import ChatRoomContent from './ChatRoomContent';

class ChatRoom extends Component {
    shouldComponentUpdate(props) {
        if (props.pageCntID !== this.props.pageCntID || props.closeModal !== this.props.closeModal ||
            props.pageReaction !== this.props.pageReaction || props.enableLoadMore !== this.props.enableLoadMore || 
            props.start !== this.props.start || props.loadMore !== this.props.loadMore || props.tabLoadMore !== this.props.tabLoadMore ||
            props.cnt.length !== this.props.cnt.length) {
                this.setState({pageCntID: props.pageCntID, closeModal: props.closeModal,
                    pageReaction: props.pageReaction, enableLoadMore: props.enableLoadMore,
                    start: props.start, loadMore: props.loadMore, tabLoadMore: props.tabLoadMore});
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
            <ChatRoomContent 
                key={index}
                cnt={cnt}
                cntLength={this.props.cnt.length}
                userID={this.props.userID}
                openURI={this.props.openURI}
                pageCntID={this.props.pageCntID}
                edit={this.props.edit.bind(this, cnt._id)}
                delete={this.props.delete.bind(this, cnt._id, false)}
                report={this.props.report.bind(this, cnt._id)}
                showUserOpt={this.props.showUserOpt.bind(this, cnt._id)}
                showRequest={this.props.showRequest.bind(this, cnt._id)}
                mark={this.props.mark.bind(this, cnt._id)}
                mediaPreview={this.props.mediaPreview}
                saveMedia={this.props.saveMedia}
                closeModal={this.props.closeModal}
                userProfile={this.props.userProfile.bind(this, cnt.authorID)}
                shareUserProfile={this.props.userProfile}
                showChatroomInfo={this.props.showChatroomInfo.bind(this, cnt._id, cnt.title, cnt.media)}
                favorite={this.props.favorite.bind(this, cnt._id)}
                request={this.props.request.bind(this, cnt._id, cnt, cnt.isPublic, cnt.enableRule, cnt.enableCbt)}
                enterChatroom={this.props.enterChatroom.bind(this, cnt._id, cnt.title, cnt.image, cnt.member)}
                cancelRequest={this.props.cancelRequest.bind(this, cnt._id)}
                showPendingAppove={this.props.showPendingAppove.bind(this, cnt._id)}
                cancelApprove={this.props.cancelApprove.bind(this, cnt._id, null, 'cancelApprove', false, 'Cancelling this request will remove the exam you have written')}
                cancelMark={this.props.cancelMark.bind(this, cnt._id, null, 'cancelMark', false, 'Cancelling this request will remove the exam you have written')}
                pageReaction={this.props.pageReaction}
                closeModal={this.props.closeModal}
                lastItem={(this.props.cnt.length - 1) === index}
                enableLoadMore={this.props.enableLoadMore}
                start={this.props.start}
                loadMore={this.props.loadMore}
                advertChatbox={this.props.advertChatbox}/>
        )
    }

    render() {
        let cnt = (
            <FlatList 
                    data={this.props.cnt}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item+index}
                    removeClippedSubviews
                    updateCellsBatchingPeriod={200}
                    onScroll={({nativeEvent}) => {
                        if (this.isCloseToBottomHandler(nativeEvent)) {
                            this.props.loadMoreHandler();
                        }
                    }}
                />
        );

        if (this.props.enableScrollView) {
            cnt = (
                <ScrollView>
                    {this.props.cnt.map((cnt, index) => this._renderItem({item: cnt, index}))}
                </ScrollView>
            )
        }
        return cnt;
    }
}

const mapStateToProps = state => {
    return {
        settings: state.settings
    };
};

export default connect(mapStateToProps)(ChatRoom);