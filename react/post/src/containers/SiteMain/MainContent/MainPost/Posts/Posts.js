import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Post from '../../../../../components/Main/Post/Post';
import { updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';

let IS_ANIMATED = true;

class Posts extends Component {
    state = {
        ptOpt: null,
        filterTag: null,
        mediaItms: [],
        animateItm: null,
        removeAnim: false,
        removePrevMedia: null,
        playerIcnId: null,
        animationComplete: true
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
        this.props.history.push('/post/share')
    };

    changeMediaHandler = (id, maxLength, type) => {
        this.setState({removePrevMedia: {id, type}, removeAnim: false});
        this.animateSlider(id, maxLength, type, 900);
    }

    removeAnimHandler = (event) => {
        if (!this.state.removePrevMedia) {
            this.setState({removeAnim: true})
        }
    }

    playVideoHandler = (snapshotID, postVideos) => {
        for (let ptVideo of postVideos) {
            if (ptVideo.snapshotID === snapshotID) {
                this.props.onFetchVideo(ptVideo.id, snapshotID)
            }
        }
    }

    slidePlayHandler = (id, maxLength, event) => {
        let slide = event.target;
        slide.setPointerCapture(event.pointerId);
        this.setState({playerIcnId: id})
    }

    clearSlidePlayhandler = (event) => {
        let slide = event.target;
        slide.releasePointerCapture(event.pointerId);
        slide.style.left = 0 +'px';
        let videoPlayerIcn = document.querySelector('.reuse-pt__media--wrapper__icn-move');
        if (videoPlayerIcn) {
            videoPlayerIcn.style.left = 45 + '%';
        }
    }

    moveSlidePlayHandler = (id, maxLength, event) => {
        let slide = event.target;
        if (slide.hasPointerCapture && slide.hasPointerCapture(event.pointerId)) {
            let newpos = event.clientX - slide.parentElement.offsetLeft - (slide.offsetWidth/2);
            if (newpos < -(slide.offsetWidth/2 + slide.offsetWidth/4)) {
                if (IS_ANIMATED) {
                    IS_ANIMATED = false;
                    this.animateSlider(id, maxLength, 'next', 0)
                }
            } else if ( newpos > (slide.offsetWidth/2 + slide.offsetWidth/4)) {
                if (IS_ANIMATED) {
                    IS_ANIMATED = false;
                    this.animateSlider(id, maxLength, 'prev', 0)
                }
            } 
            let videoPlayerIcn = document.querySelector('.reuse-pt__media--wrapper__icn-move');
            if (videoPlayerIcn) {
                let playerIcnHeight = (newpos / slide.offsetWidth) * 100
                videoPlayerIcn.style.left =  playerIcnHeight + 45 + '%';
            }
            slide.style.left = newpos +'px';
        }
    }

    animateSlider = (id, maxLength, type, timeFrame) => {
        setTimeout(() => {
            let mediaItms = [...this.state.mediaItms];
            let filterMedia = mediaItms.filter(media => media.id === id);
            let mediaDet = {id, position: type === 'next' ? 1 : maxLength - 1};
            if (filterMedia.length > 0) {
                for (let mediaItm of filterMedia) {
                    mediaDet = {id: mediaItm.id, position: type === 'next' ? mediaItm.position+=1 : mediaItm.position-=1};
                    if (mediaDet.position > maxLength - 1) {
                        mediaDet = updateObject(mediaDet, {position: 0});
                    }
    
                    if (mediaDet.position < 0) {
                        mediaDet = updateObject(mediaDet, {position: maxLength - 1});
                    }
                    let updateMedia = mediaItms.filter(media => media.id !== id);
                    updateMedia.push(mediaDet);
                    this.setState({mediaItms: updateMedia, removeAnim: false,  removePrevMedia: null, animateItm: {id, direction: type}})
                }
                return
            }
            mediaItms.push(mediaDet);
            this.setState({mediaItms, removeAnim: false, removePrevMedia: null,  animateItm: {id, direction: type}})    
        }, timeFrame)

        setTimeout(() => {
            IS_ANIMATED = true;
        }, 500)
    }

    render() {
        let post = "Loading";
        if (this.props.postErr) {
            post = null
        }

        if (this.props.posts) {
            post = <Post 
                content={this.props.posts} 
                media={this.props.media}
                userOpt={this.showUserOptHandler}
                showPtOpt={this.state.ptOpt}
                fav={this.changeFavoriteHandler}
                share={this.showShareHandler}
                nextMedia={this.changeMediaHandler}
                prevMedia={this.changeMediaHandler}
                mediaItms={this.state.mediaItms}
                removeAnim={this.removeAnimHandler}
                disableAnim={this.state.removeAnim}
                animateItm={this.state.animateItm}
                removePrevMedia={this.state.removePrevMedia}
                playVideo={this.playVideoHandler}
                video={this.props.postVideo}
                playerIcnId={this.state.playerIcnId}
                slidePlay={this.slidePlayHandler}
                moveSlidePlay={this.moveSlidePlayHandler}
                clearSlidePlay={this.clearSlidePlayhandler}/>
        }

        if (this.props.filteredPost && this.props.filteredPost.length > 0 && this.props.match.url !== '/index/post') {
            post = <Post 
                content={this.props.filteredPost} 
                media={this.props.media}
                userOpt={this.showUserOptHandler}
                showPtOpt={this.state.ptOpt}
                fav={this.changeFavoriteHandler}
                share={this.showShareHandler}
                nextMedia={this.changeMediaHandler}
                prevMedia={this.changeMediaHandler}
                mediaItms={this.state.mediaItms}
                removeAnim={this.removeAnimHandler}
                disableAnim={this.state.removeAnim}
                animateItm={this.state.animateItm}
                removePrevMedia={this.state.removePrevMedia}
                playVideo={this.playVideoHandler}
                video={this.props.postVideo}
                playerIcnId={this.state.playerIcnId}
                slidePlay={this.slidePlayHandler}
                moveSlidePlay={this.moveSlidePlayHandler}
                clearSlidePlay={this.clearSlidePlayhandler}/>
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
        postErr: state.pt.postErr,
        postVideo: state.pt.postVideo,
        filteredPost: state.pt.filteredPost,
        mainProps: state.main.mainProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPost: (userID) => dispatch(actions.fetchPostInit(userID)),
        onChangeFav: (posts, filteredPost, postID) => dispatch(actions.changeFavInit(posts, filteredPost, postID)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFilterPost: (post, tag) => dispatch(actions.filterPostInit(post, tag)),
        onFetchVideo: (videoID, ptVideoID) => dispatch(actions.fetchVideoInit(videoID, ptVideoID))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));