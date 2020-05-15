import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../components/Main/NoAcc/NoAcc';
import Aux from '../../../../hoc/Auxs/Aux';
import * as actions from '../../../../store/actions/index';
import Post from './Posts/Posts';
import Question from './Questions/Questions';
import Poet from './Poets/Poets';
import axios from '../../../../axios';

class Model extends Component {
    constructor(props) {
        super(props);
        let limit = 0;
        if (window.innerHeight >= 1200) {
            limit = 18
        } else if(window.innerHeight >= 900) {
            limit = 12;
        } else if(window.innerHeight >= 500) {
            limit = 9
        } else {
            limit = 6;
        }
        this.state = {
            cntOpt: null,
            fetchLimit: limit,
            filterTag: 'favorite',
            mediaItms: [],
            animateItm: null,
            removeAnim: false,
            removePrevMedia: null,
            playerIcnId: null,
            animationComplete: true,
            scrollEnable: false,
            active: null
        }
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/favorite');
        let numberOfAjaxCAllPending = 0;
        let these = this;

        axios.interceptors.request.use(function (config) {
            numberOfAjaxCAllPending++;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            numberOfAjaxCAllPending--;
            if (numberOfAjaxCAllPending === 0 && these.props.status) {
                let active = setTimeout(() => {
                    these.props.onFetchShareActive();
                    these.props.onFetchNotifyActive();
                    these.props.onFetchNavActive();
                    clearTimeout(these.state.active)
                    clearTimeout(active)
                }, 10000);
                these.setState({active})
            }
            return response;
        }, function (error) {
            numberOfAjaxCAllPending--;
        });
    }

    componentWillUnmount() {
        if (this.state.active) {
            clearTimeout(this.state.active)
        }
    }

    componentDidUpdate() {
        if (this.props.cnts && (this.props.cnts.post.length > 0 || this.props.cnts.question.length > 0 || this.props.cnts.poet.length > 0 ) && !this.state.scrollEnable) {
            window.addEventListener('scroll', this.onScroll, false);
            this.setState({scrollEnable: true})
        }
    }

    onScroll = () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
            this.props.onFetchCnt(
                    this.props.userID,  'favorite' ,
                    this.state.fetchLimit, this.props.skipCnt + this.state.fetchLimit, this.props.cntTotal);
        }
    } 

    render() {
        let cnt = <Loader />;
        
        if (this.props.cntErr) {
            cnt = null
        }

        if (this.props.cnts && this.props.cnts.post.length === 0 && this.props.cnts.question.length === 0 && this.props.cnts.poet.length === 0) {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No content found!'
                    icn='clone'
                    filter />
        }
       
        if (this.props.cnts && (this.props.cnts.post.length > 0 || this.props.cnts.question.length > 0 || this.props.cnts.poet.length > 0)) {
           cnt = (
                <Aux>
                    <Post 
                    cnts={this.props.cnts.post}/>
                    <Question
                        cnts={this.props.cnts.question} />
                    <Poet
                        cnts={this.props.cnts.poet} />
                </Aux>
           );
        }

        return cnt
    }
}

const mapStateToProps = state => {
    return {
        status: state.auth.status,
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
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(userID, fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID, cntType) => dispatch(actions.shareID(shareID, cntType)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType)),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Model));