import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Post from '../../../../components/Main/Post/Post';
import NoAcc from '../../../../components/Main/NoAcc/NoAcc';
import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

let IS_ANIMATED = true;

class Posts extends Component {
    constructor(props) {
        super(props);
        let limit = 0;
        if (window.innerHeight >= 1200) {
            limit = 6
        } else if(window.innerHeight >= 900) {
            limit = 4;
        } else if(window.innerHeight >= 500) {
            limit = 3
        } else {
            limit = 2;
        }
        this.state = {
            ptOpt: null,
            fetchLimit: limit,
            filterTag: 'post',
            mediaItms: [],
            animateItm: null,
            removeAnim: false,
            removePrevMedia: null,
            playerIcnId: null,
            animationComplete: true
        }
    }

    componentDidMount() {
        this.props.onFetchPost(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/post');
        let these = this;
        window.addEventListener('scroll', function(event) {
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                these.props.onFetchPost(
                        these.props.userID, 
                        these.state.filterTag !== 'post' ? 
                        these.state.filterTag === 'filter' ?  'filter=='+these.props.filterDet : these.state.filterTag : 'post',
                        these.state.fetchLimit, these.props.skipPost + these.state.fetchLimit, these.props.ptTotal);
            }
        });
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id !== 'share' && this.props.match.params.id !== 'filter' && this.props.match.params.id !== 'startfilter') {
            this.props.onFetchPostReset();
            this.props.onFetchPost(this.props.userID, this.props.match.params.id === 'shared' ? `shared-${this.props.userID}` : this.props.match.params.id, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.props.filterDet && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'filter') {
            this.props.onFetchPostReset();
            this.props.onFetchPost(this.props.userID, 'filter=='+this.props.filterDet, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'startfilter') {
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (!this.props.match.params.id && this.state.filterTag !== 'post') {
            this.props.onFetchPostReset();
            this.props.onFetchPost(this.props.userID, 'post', this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: 'post'
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

    changeFavoriteHandler = (id, isLiked, favAdd, cntGrp) => {
        this.props.onChangeFav(id, isLiked, favAdd, this.props.changedFav, this.props.userID, cntGrp);
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
    changePtHandler = (id, title, det) => {
        this.props.onChangePt(id, title, det, false);
    }

    render() {
        this.props.onFetchShareActive(this.props.userID);
        this.props.onFetchPtActive(this.props.userID);
        this.props.onFtechShareCntActive(this.props.userID);

        let post = "Loading";
        if (this.props.postErr) {
            post = null
        }

        if (this.props.posts && this.props.posts.length === 0 && this.state.filterTag === 'shared') {
            post = <NoAcc 
                isAuth={this.props.userID !== null}
                det='You have no shared post yet!'/>
        }

        if (this.props.posts && this.props.posts.length === 0 && this.state.filterTag !== 'shared') {
            post = <NoAcc 
                isAuth={this.props.userID !== null}
                det='Category not found !!'/>
        }

        if (this.props.posts && this.props.posts.length > 0) {
            post = <Post 
                content={this.props.posts} 
                media={this.props.media}
                userOpt={this.showUserOptHandler}
                showPtOpt={this.state.ptOpt}
                fav={this.changeFavoriteHandler}
                changedFav={this.props.changedFav}
                favChange={this.props.favChange}
                share={this.showShareHandler}
                nextMedia={this.changeMediaHandler}
                prevMedia={this.changeMediaHandler}
                mediaItms={this.state.mediaItms}
                removeAnim={this.removeAnimHandler}
                disableAnim={this.state.removeAnim}
                animateItm={this.state.animateItm}
                removePrevMedia={this.state.removePrevMedia}
                playVideo={this.playVideoHandler}
                videoErr={this.props.videoErr}
                video={this.props.postVideo}
                playerIcnId={this.state.playerIcnId}
                slidePlay={this.slidePlayHandler}
                moveSlidePlay={this.moveSlidePlayHandler}
                clearSlidePlay={this.clearSlidePlayhandler}
                changePt={this.changePtHandler}/>
        }

        return post
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        posts: state.pt.posts,
        skipPost: state.pt.skipPost,
        ptTotal: state.pt.ptTotal,
        changedFav: state.pt.changedFav,
        favChange: state.pt.favChange,
        postErr: state.pt.postErr,
        postVideo: state.pt.postVideo,
        videoErr: state.pt.videoErr,
        filterDet: state.pt.filterDet
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: (userID) => dispatch(actions.fetchShareactiveInit(userID)),
        onFtechShareCntActive: (userID) => dispatch(actions.fetchShareCntactiveInit(userID)),
        onFetchPtActive: (userID) => dispatch(actions.fetchPtActiveInit(userID)),
        onFetchPost: (userID, fetchType, limit, skipPost, ptTotal) => dispatch(actions.fetchPostInit(userID, fetchType, limit, skipPost, ptTotal)),
        onFetchPostReset: () => dispatch(actions.fetchPostReset()),
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFetchVideo: (videoID, ptVideoID) => dispatch(actions.fetchVideoInit(videoID, ptVideoID)),
        onChangePt: (id, title, det, confirm) => dispatch(actions.changePtInit(id, title, det, confirm))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));