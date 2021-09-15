import React, { Component } from 'react';
import {  FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import WriteUpContent from './WriteUpContent';

class Writeup extends Component {
    isCloseToBottomHandler = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 30;
        return (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) && this.props.settings.autoLoading;
    }

    _renderItem = ({item:cnt, index}) => {
        return (
            <WriteUpContent 
                key={index}
                cnt={cnt}
                userID={this.props.userID}
                openURI={this.props.openURI}
                pageCntID={this.props.pageCntID}
                edit={this.props.edit.bind(this, cnt._id)}
                delete={this.props.delete.bind(this, cnt._id, false)}
                shareFriends={this.props.share.bind(this, cnt, 'Friends')}
                report={this.props.report.bind(this, cnt._id)}
                showUserOpt={this.props.showUserOpt.bind(this, cnt._id)}
                mediaPreview={this.props.mediaPreview}
                saveMedia={this.props.saveMedia}
                closeModal={this.props.closeModal}
                userProfile={this.props.userProfile.bind(this, cnt.authorID)}
                shareUserProfile={this.props.userProfile}
                pagePreview={this.props.pagePreview.bind(this, cnt)}
                chat={this.props.chat.bind(this, cnt._id)}
                favorite={this.props.favorite.bind(this, cnt._id)}
                pageReaction={this.props.pageReaction}
                share={this.props.share.bind(this, cnt, 'select')}
                closeModal={this.props.closeModal}
                showAdvert={((index+1)%3 === 0)}
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

export default connect(mapStateToProps)(Writeup);