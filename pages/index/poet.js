import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Poet from '../../react/index/components/Main/Poet/Poet';
import Loader from '../../react/index/components/UI/Loader/Loader';
import NoAcc from '../../react/index/components/Main/NoAcc/NoAcc';
import { updateObject } from '../../react/index/shared/utility';
import * as actions from '../../react/index/store/actions/index';
import App from '../../react/index/App';
import { indexStore } from '../../react/hoc/withStore/withStore';

class Model extends Component {
    static async getInitialProps(props) {
        const { store, isServer } = props.ctx
            store.dispatch(actions.fetchCntReset())
  
          if (!store.getState().cnt.cnts) {
            store.dispatch(actions.fetchCntInit(null, 'poet', 6, 0, 0))
            store.dispatch(actions.changeTagsPath('/poet'));
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
            filterTag: 'poet',
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
        //     this.props.onFetchCnt(null, 'poet', (this.state.fetchLimit - 6)+6, 6, 0);
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
        if (typeof window !== `undefined`) {
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                this.props.onFetchCnt(
                        this.props.userID,  'poet' ,
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
        this.props.onChangeShareID(shareID, 'poet');
        this.props.history.push('/index/poet/share')
    };

    changeCntHandler = (id, title, det, modelType) => {
        let checkTitle = String(title).length > 50 ? String(title).substr(0, 50) + '...' : title
        this.props.onChangeCnt(id, checkTitle, det, false, modelType);
    }

    render() {
        this.props.onFetchShareActive();
        this.props.onFetchShareCntActive();
        this.props.onFetchNotifyActive();
        this.props.onFetchPtActive();
        this.props.onFetchQueActive();
        this.props.onFetchCntActive();
        this.props.onFetchReqActive();

        let cnt = <Loader />;
        if (this.props.cntErr) {
            cnt = null
        }

        if (this.props.cnts && this.props.cnts.length === 0) {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No content found!'
                    icn='clone'
                    filter />
        }

        if (this.props.cnts && this.props.cnts.length === 0) {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No content found!'
                    icn='clone'
                    filter />
        }

        if (this.props.cnts && this.props.cnts.length > 0) {
            cnt = <Poet
                content={this.props.cnts} 
                media={this.props.media}
                userOpt={this.showUserOptHandler}
                showCntOpt={this.state.cntOpt}
                fav={this.changeFavoriteHandler}
                changedFav={this.props.changedFav}
                favChange={this.props.favChange}
                share={this.showShareHandler}
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
        userID: state.auth.userID,
        cnts: state.cnt.cnts,
        cntErr: state.cnt.cntErr,
        skipCnt: state.cnt.skipCnt,
        cntTotal: state.cnt.cntTotal,
        changedFav: state.cnt.changedFav,
        favChange: state.cnt.favChange,
        filterDet: state.cnt.filterDet
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: () => dispatch(actions.fetchShareactiveInit()),
        onFetchShareCntActive: () => dispatch(actions.fetchShareCntactiveInit()),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchPtActive: () => dispatch(actions.fetchPtActiveInit()),
        onFetchQueActive: () => dispatch(actions.fetchQueActiveInit()),
        onFetchCntActive: () => dispatch(actions.fetchCntActiveInit()),
        onFetchReqActive: () => dispatch(actions.fetchReqActiveInit()),
        onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(userID, fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID, cntType) => dispatch(actions.shareID(shareID, cntType)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType))
    };
};

export default indexStore(withRouter(connect(mapStateToProps, mapDispatchToProps)(Model)));