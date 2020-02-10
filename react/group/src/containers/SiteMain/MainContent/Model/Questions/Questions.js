import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Question from '../../../../../components/Main/Question/Question';
import { updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';

let IS_ANIMATED = true;

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cntOpt: null,
            mediaItms: [],
            animateItm: null,
            removeAnim: false,
            removePrevMedia: null,
            playerIcnId: null,
            animationComplete: true
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
        this.props.onChangeShareID(shareID, 'question');
        this.props.history.push('/favorite/question/share')
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

    playVideoHandler = (snapshot) => {
        this.props.onFetchVideo(snapshot.id, `${window.location.protocol + '//' + window.location.host}/media/video/${snapshot.videoCnt}`)
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
            let mediaDet = {id, position: type === 'next' ?  maxLength > 1 ? 1 : 0 : maxLength - 1};
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
    changeCntHandler = (id, title, det, modelType) => {
        let checkTitle = String(title).length > 50 ? String(title).substr(0, 50) + '...' : title
        this.props.onChangeCnt(id, checkTitle, det, false, modelType);
    }

    render() {
        let cnt = null;
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
        changedFav: state.cnt.changedFav,
        favChange: state.cnt.favChange,
        postVideo: state.cnt.postVideo,
        videoErr: state.cnt.videoErr,
        filterDet: state.cnt.filterDet
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID,  cntType) => dispatch(actions.shareID(shareID,  cntType)),
        onFetchVideo: (id, url) => dispatch(actions.fetchVideo(id, url)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm,  modelType))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));