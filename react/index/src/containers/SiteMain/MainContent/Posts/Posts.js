import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Post from '../../../../components/Main/Post/Post';
import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

class Posts extends Component {
    state = {
        ptOpt: null,
        filterTag: null
    }

    componentDidMount() {
        this.props.onFetchPost(this.props.userID);
        this.props.onChangeTag('/post');
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id) {
            this.props.onFilterPost(this.props.posts, this.props.match.params.id);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }
    }

    showUserOptHandler = (index) => {
        if (this.state.ptOpt && this.state.ptOpt.index === index) {
            this.setState((prevState, props) => {
                return {
                    ptOpt: updateObject(prevState.ptOpt, {visible: !prevState.ptOpt.visible})
                }
            });
            return
        }

        const newPtOpt = {visible: true, index}
        this.setState({ptOpt: newPtOpt})
    }

    changeFavoriteHandler = (postID) => {
        this.props.onChangeFav(this.props.posts, this.props.filteredPost , postID);
    }

    showShareHandler = (shareID) => {
        this.props.onChangeShareID(shareID);
        this.props.history.push('/index/share')
    };

    render() {
        let post = "Loading";

        if (this.props.posts) {
            post = <Post 
                content={this.props.posts} 
                userOpt={this.showUserOptHandler}
                showPtOpt={this.state.ptOpt}
                fav={this.changeFavoriteHandler}
                share={this.showShareHandler}/>
        }

        if (this.props.filteredPost && this.props.filteredPost.length > 0 && this.props.match.url !== '/index/post') {
            post = <Post 
                content={this.props.filteredPost} 
                userOpt={this.showUserOptHandler}
                showPtOpt={this.state.ptOpt}
                fav={this.changeFavoriteHandler}
                share={this.showShareHandler}/>
        }

        if (this.props.filteredPost && this.props.filteredPost.length < 1 && this.props.match.url !== '/index/post') {
            post = "no category found";
        }

        return post
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        posts: state.pt.posts,
        filteredPost: state.pt.filteredPost
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: (userID) => dispatch(actions.fetchPostInit(userID)),
        onChangeFav: (posts, filteredPost, postID) => dispatch(actions.changeFavInit(posts, filteredPost, postID)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFilterPost: (post, tag) => dispatch(actions.filterPostInit(post, tag))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));