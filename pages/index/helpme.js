import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Question from '../../react/index/components/Main/Question/Question';
import Loader from '../../react/index/components/UI/Loader/Loader';
import NoAcc from '../../react/index/components/Main/NoAcc/NoAcc';
import { updateObject } from '../../react/index/shared/utility';
import * as actions from '../../react/index/store/actions/index';
import global from '../../global/global';
import App from '../../react/index/App';
import { indexStore } from '../../react/hoc/withStore/withStore';

let IS_ANIMATED = true;

class Questions extends Component {
    static async getInitialProps(props) {
        const { store, isServer } = props.ctx
            store.dispatch(actions.fetchCntReset())
  
          if (!store.getState().cnt.cnts) {
            store.dispatch(actions.fetchCntInit(null, 'shared', 6, 0, 0))
            store.dispatch(actions.changeTagsPath('/question'));
            store.dispatch(actions.fetchTrdInit(null));
          }
  
          return { cnts: store.getState().cnt.cnts }
    }

    constructor(props) {
        super(props);
        let limit = 0;
        if (typeof window !== 'undefined') {
            if (window.innerHeight >= 1200) {
                limit = 18
            } else if(window.innerHeight >= 900) {
                limit = 12;
            } else if(window.innerHeight >= 500) {
                limit = 9
            } else {
                limit = 6;
            }
        }
        this.state = {
            cntOpt: null,
            fetchLimit: limit,
            filterTag: 'shared',
            mediaItms: [],
            animateItm: null,
            removeAnim: false,
            removePrevMedia: null,
            playerIcnId: null,
            animationComplete: true,
            scrollEnable: false
        }
    }

    componentDidMount() {
        // if (this.state.fetchLimit > 6) {
        //     this.props.onFetchCnt(null, 'shared', (this.state.fetchLimit - 6)+6, 6, 0);
        // }
    }

    componentDidUpdate() {
        if (this.props.cnts && this.props.cnts.length > 0 && !this.state.scrollEnable) {
            window.addEventListener('scroll', this.onScroll, false);
            this.setState({scrollEnable: true})
        }
    }

    componentWillUnmount() {
        this.props.onFetchCntReset();
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if (typeof window !== 'undefined') {
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                this.props.onFetchCnt(
                        this.props.userID,  'shared' ,
                        this.state.fetchLimit, this.props.skipCnt + this.state.fetchLimit, this.props.cntTotal);
            }
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
        this.props.history.push('/index/question/share')
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
        this.props.onFetchVideo(snapshot.id, `${global.url}/media/video/${snapshot.videoCnt}`)
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
    changeCntHandler = (id, title, det, modelType) => {
        let checkTitle = String(title).length > 50 ? String(title).substr(0, 50) + '...' : title
        this.props.onChangeCnt(id, checkTitle, det, false, modelType);
    }

    render() {
        this.props.onFetchShareActive();
        this.props.onFetchCntActive();
        this.props.onFetchNotifyActive();
        this.props.onFetchPtActive();
        this.props.onFetchQueActive();
        this.props.onFetchShareCntActive();
        this.props.onFetchReqActive();

        let cnt = <Loader />;
        if (this.props.cntErr) {
            cnt = null
        }
        
        if (this.props.cnts && this.props.cnts.length === 0 ) {
            cnt = <NoAcc 
                    isAuth={this.props.status}
                    det='No Shared Question found!'
                    icn='hand-paper'
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

        return (
            <App>
              { cnt }
            </App>
          )
    }
}

const mapStateToProps = state => {
    return {
        status: state.auth.status,
        cnts: state.cnt.cnts,
        skipCnt: state.cnt.skipCnt,
        cntTotal: state.cnt.cntTotal,
        changedFav: state.cnt.changedFav,
        favChange: state.cnt.favChange,
        cntErr: state.cnt.cntErr,
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
        onFetchPtActive: () => dispatch(actions.fetchPtActiveInit()),
        onFetchQueActive: () => dispatch(actions.fetchQueActiveInit()),
        onFetchReqActive: () => dispatch(actions.fetchReqActiveInit()),
        onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(userID, fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID,  cntType) => dispatch(actions.shareID(shareID,  cntType)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFetchVideo: (id, url) => dispatch(actions.fetchVideo(id, url)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm,  modelType))
    };
};

export default indexStore(withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions)));