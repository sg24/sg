import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Question from '../../../../../components/Main/Question/Question';
import Loader from '../../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../../components/Main/NoAcc/NoAcc';
import { updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';

let IS_ANIMATED = true;

class Questions extends Component {
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
            cntOpt: null,
            fetchLimit: limit,
            filterTag: 'question',
            mediaItms: [],
            animateItm: null,
            removeAnim: false,
            removePrevMedia: null,
            playerIcnId: null,
            animationComplete: true
        }
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/question');
        let these = this;
        window.addEventListener('scroll', function(event) {
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                these.props.onFetchCnt(
                        these.props.userID, 
                        these.state.filterTag !== 'question' ? 
                        these.state.filterTag === 'filter' ?  'filter=='+these.props.filterDet : these.state.filterTag : 'question',
                        these.state.fetchLimit, these.props.skipCnt + these.state.fetchLimit, these.props.cntTotal);
            }
        });
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id !== 'share' && this.props.match.params.id !== 'filter' && this.props.match.params.id !== 'startfilter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, this.props.match.params.id === 'shared' ? `shared-${this.props.userID}` : this.props.match.params.id, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.props.filterDet && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'filter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'filter=='+this.props.filterDet, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'startfilter') {
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (!this.props.match.params.id && this.state.filterTag !== 'question') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'question', this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: 'question'
            });
        }
    }

    showUserOptHandler = (id) => {
        if (this.state.cntOpt && this.state.cntOpt.id === id) {
            this.setState((prevState, props) => {
                return {
                    cntOpt: updateObject(prevState.cntOpt, {visible: !prevState.cntOpt.visible})
                }
            });
            return
        }

        const newCntOpt = {visible: true, id}
        this.setState({cntOpt: newCntOpt})
    }

    changeFavoriteHandler = (id, isLiked, favAdd, cntGrp) => {
        this.props.onChangeFav(id, isLiked, favAdd, this.props.changedFav, this.props.userID, cntGrp);
    }

    showShareHandler = (shareID) => {
        this.props.onChangeShareID(shareID);
        this.props.history.push('/question/share')
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
        let videoPlayerIcn = document.querySelector('.reuse-que__media--wrapper__icn-move');
        if (videoPlayerIcn) {
            videoPlayerIcn.style.left = 42 + '%';
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
            let videoPlayerIcn = document.querySelector('.reuse-que__media--wrapper__icn-move');
            if (videoPlayerIcn) {
                let playerIcnHeight = (newpos / slide.offsetWidth) * 100
                videoPlayerIcn.style.left =  playerIcnHeight + 42 + '%';
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
    changeCntHandler = (id, title, det) => {
        console.log(det)
        if ( this.props.match.params.id === 'myquestion') {
            det = det === 'draft' ?  'acc-draft' : det;
        }
        let checkTitle = String(title).length > 149 ? String(title).substr(0, 180) + '...' : title
        this.props.onChangeCnt(id, checkTitle, det, false);
    }

    render() {
        this.props.onFetchShareActive();
        this.props.onFetchCntActive();
        this.props.onFetchShareCntActive();
        this.props.onFetchNotifyActive();
        this.props.onFetchTotal()

        let cnt = <Loader />;
        if (this.props.postErr) {
            cnt = null
        }

        if (this.props.cnts && this.props.cnts.length === 0 && this.state.filterTag === 'shared') {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No content found!'
                    icn='clone'
                    filter />
        }

        if (this.props.cnts && this.props.cnts.length === 0 && this.state.filterTag !== 'shared') {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No content found!'
                    icn='clone'
                    filter />
        }

        if (this.props.cnts && this.props.cnts.length > 0) {
            cnt = <Question 
                content={this.props.cnts} 
                media={this.props.media}
                userOpt={this.showUserOptHandler}
                showCntOpt={this.state.cntOpt}
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
                changeCnt={this.changeCntHandler}/>
        }

        return cnt
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        cnts: state.cnt.cnts,
        skipCnt: state.cnt.skipCnt,
        cntTotal: state.cnt.cntTotal,
        changedFav: state.cnt.changedFav,
        favChange: state.cnt.favChange,
        postErr: state.cnt.postErr,
        postVideo: state.cnt.postVideo,
        videoErr: state.cnt.videoErr,
        filterDet: state.cnt.filterDet
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: () => dispatch(actions.fetchShareactiveInit()),
        onFetchShareCntActive: () => dispatch(actions.fetchShareCntactiveInit()),
        onFetchCntActive: () => dispatch(actions.fetchCntActiveInit()),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchTotal: () => dispatch(actions.fetchTotalInit()),
        onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(userID, fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFetchVideo: (videoID, ptVideoID) => dispatch(actions.fetchVideoInit(videoID, ptVideoID)),
        onChangeCnt: (id, title, det, confirm) => dispatch(actions.changeCntInit(id, title, det, confirm))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));