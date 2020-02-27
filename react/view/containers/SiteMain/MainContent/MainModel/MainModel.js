import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { EditorState, convertToRaw } from 'draft-js';

import ModelContents from '../../../../components/Main/ModelContents/ModelContents';
import Loader from '../../../../components/UI/Loader/Loader';
import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';
import global from '../../../../../../global/global';

let IS_ANIMATED = true;

class Model extends Component {
    constructor(props) {
        super(props);
        let these = this;
        this.state = {
            cntOpt: null,
            categ: this.props.router.query.categ,
            id: this.props.router.query.id,
            mediaItms: [],
            animateItm: null,
            removeAnim: false,
            removePrevMedia: null,
            playerIcnId: null,
            animationComplete: true,
            inputValue: EditorState.createEmpty(),
            submitStart: false
        }
    }

    componentDidUpdate() {
        if ( this.props.show) {
            this.props.onFetchCntReset();
            this.props.onFetchCnt( this.state.categ,  this.state.id);
            this.setState({categ: this.state.categ, id: this.state.id})
            this.props.onDefaultTrd()
        }

        if (this.state.submitStart && this.props.resetInput){
            this.setState({inputValue: EditorState.createEmpty(), submitStart: false})
            this.props.onResetInput();
        }
    }

    inputChangedHandler = (editorState) => {
        this.setState({inputValue: editorState})
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

    changeFavoriteHandler = (id, isLiked, favAdd) => {
        this.props.onChangeFav(id, isLiked, favAdd, this.props.changedFav, this.props.userID, this.state.categ);
    }

    showShareHandler = (shareID) => {
        this.props.onChangeShareID(shareID, this.state.categ);
        this.props.history.push(`/view/${this.state.categ}/share`)
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

    changeCntHandler = (id, title, det) => {
        let checkTitle = String(title).length > 50 ? String(title).substr(0, 50) + '...' : title
        this.props.onChangeCnt(id, checkTitle, det, false, this.state.categ);
    }

    scrollHandler  = () => {
        document.querySelector('.reuse-view__form--field__wrapper').scrollIntoView({behavior: 'smooth'})
    }

    replyHandler = (commentID) => {
        // this.props.history.push(`/view/reply/${this.state.categ}?id=${}`)
        this.props.onSetCommentID(commentID,this.state.categ);
    }

    correctHandler = (commentID, type, replyID) => {
        this.props.onAnsCorrect(commentID, type, replyID)
    }

    wrongHandler = (commentID, type, replyID) => {
        this.props.onAnsWrong(commentID, type, replyID)
    }

    submitCommentHandler = () => {
        let cnt = JSON.stringify(convertToRaw(this.state.inputValue.getCurrentContent()))
        this.props.onSubmitComment(this.state.id, this.state.categ, cnt)
        this.setState({submitStart: true})
    }

    render() {
        this.props.onFetchShareActive();
        this.props.onFetchNotifyActive();
        let cnt = <Loader 
            view/>;
        if (this.props.cntErr) {
            cnt = null
        }

        if (!this.state.categ || !this.state.id) {
            
        }

        if (this.props.cnts) {
            cnt = <ModelContents
                    cnt={this.props.cnts}
                    userOpt={this.showUserOptHandler}
                    showCntOpt={this.state.cntOpt}
                    cntGrp={this.state.categ}
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
                    changeCnt={this.changeCntHandler}
                    scroll={this.scrollHandler}
                    inputValue={this.state.inputValue}
                    inputChanged={this.inputChangedHandler}
                    submitComment={this.submitCommentHandler}
                    comments={this.props.comments}
                    submitEnable={this.props.submitStart || String(convertToRaw(this.state.inputValue.getCurrentContent()).blocks[0].text).length < 1}
                    reply={this.replyHandler}
                    correct={this.correctHandler}
                    wrong={this.wrongHandler}
                    commentTotal={this.props.commentTotal}
                    url={`${global.url}/view/${this.state.categ}/${this.state.id}`}/>
        }

        return cnt
    }
} 

const mapStateToProps = state => {
    return {
        status: state.auth.status,
        cnts: state.cnt.cnts,
        cntErr: state.cnt.cntErr,
        changedFav: state.cnt.changedFav,
        favChange: state.cnt.favChange,
        videoErr: state.cnt.videoErr,
        postVideo: state.cnt.postVideo,
        filterDet: state.cnt.filterDet,
        comments: state.cnt.comments,
        submitStart: state.cnt.submitStart,
        resetInput: state.cnt.resetInput,
        commentID: state.cnt.commentID,
        show: state.trd.show,
        commentTotal: state.cnt.commentTotal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: () => dispatch(actions.fetchShareactiveInit()),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchCnt: (categ, id) => dispatch(actions.fetchCntInit(categ, id)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType)),
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID, categ) => dispatch(actions.shareID(shareID, categ)),
        onFetchVideo: (id, url) => dispatch(actions.fetchVideo(id, url)),
        onSubmitComment: (id, cntGp, cnt) => dispatch(actions.submitCommentInit(id, cntGp, cnt)),
        onResetInput: () => dispatch(actions.resetInput()),
        onDefaultTrd: () => dispatch(actions.defaultTrd()),
        onAnsCorrect: (commentID, categ, replyID, modelType) => dispatch(actions.ansCorrectInit(commentID, categ, replyID, modelType)),
        onAnsWrong: (commentID, categ, replyID) => dispatch(actions.ansWrongInit(commentID, categ,replyID)),
        onSubmitSuccess: (id, cntGrp, msg) => dispatch(actions.submitComment(id, cntGrp, msg)),
        onJoinErr: (err) => dispatch(actions.submitCommentFail(err)) ,
        onSetCommentID: (commentID, categ) => dispatch(actions.setCommentID(commentID, categ))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Model));