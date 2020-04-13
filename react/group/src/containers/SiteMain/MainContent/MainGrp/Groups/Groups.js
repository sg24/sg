import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Group from '../../../../../components/Main/Group/Group';
import Loader from '../../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../../components/Main/NoAcc/NoAcc';
import * as actions from '../../../../../store/actions/index';
import axios from '../../../../../axios';

class Groups extends Component {
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
            filterTag: 'group',
            mediaItms: [],
            scrollEnable: false,
            active: null
        }
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/group');
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
            let active = setInterval(() => {
                if (numberOfAjaxCAllPending === 0 && these.props.status) {
                    these.props.onFetchReqActive();
                    these.props.onFetchJoinActive();
                    these.props.onFetchTotal();
                    these.props.onFetchShareActive();
                    these.props.onFetchNavActive();
                    these.props.onFetchNotifyActive();
                }
            }, 5000);
            these.setState({active})
            return response;
        }, function (error) {
            numberOfAjaxCAllPending--;
        });
    }

    componentWillUnmount() {
        if (this.state.active) {
            clearInterval(this.state.active)
        }
    }

    componentDidUpdate() {
        if (this.props.cnts && this.props.cnts.length > 0 && !this.state.scrollEnable) {
            window.addEventListener('scroll', this.onScroll, false);
            this.setState({scrollEnable: true})
        }

        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id !== 'info' && this.props.match.params.id !== 'filter' && this.props.match.params.id !== 'startfilter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, this.props.match.params.id === 'request' ? `request` : this.props.match.params.id, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.props.filterDet && this.state.filterTag !== this.props.history.location.search && this.props.match.params.id === 'filter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'filter=='+this.props.filterDet, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.history.location.search
            });
        }

        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'startfilter') {
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (!this.props.match.params.id && this.state.filterTag !== 'group') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'group', this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: 'group'
            });
        }
    }

    onScroll = () => {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
            this.props.onFetchCnt(
                    this.state.filterTag !== 'group' ? 
                    this.state.filterTag === 'filter' ?  'filter=='+this.props.filterDet : this.state.filterTag : 'group',
                    this.state.fetchLimit, this.props.skipCnt + this.state.fetchLimit, this.props.cntTotal);
        }
    } 

    joinGrpHandler = (id, categ) => {
        this.props.onJoinGrp(id, categ)
    };

    groupInfoHandler = (id) => {
        this.props.onChangeShareID(id);
        this.props.history.push(`/group/info/${id}`)
    }

    changeCntHandler = (id, title, det, confirm) => {
        this.props.onChangeCnt(id, title, det, confirm);
    };

    render() {
        let cnt = <Loader />;
        if (this.props.postErr) {
            cnt = null
        }

        if (this.props.cnts && this.props.cnts.length === 0 && this.state.filterTag === 'shared') {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No Group found!'
                    icn='user-friends'
                    filter />
        }

        if (this.props.cnts && this.props.cnts.length === 0 && this.state.filterTag !== 'shared') {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No Group found!'
                    icn='user-friends'
                    filter />
        }

        if (this.props.cnts && this.props.cnts.length > 0) {
            cnt = <Group
                content={this.props.cnts} 
                join={this.joinGrpHandler}
                joinStartID ={this.props.joinStartID}
                joined={this.props.joined}
                groupInfo={this.groupInfoHandler}
                />
        }

        return cnt
    }
}

const mapStateToProps = state => {
    return {
        status: state.auth.status,
        cnts: state.cnt.cnts,
        skipCnt: state.cnt.skipCnt,
        cntTotal: state.cnt.cntTotal,
        joinStartID: state.cnt.joinStartID, 
        joined: state.cnt.joined,
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
        onFetchReqActive: () => dispatch(actions.fetchReqActiveInit()),
        onFetchJoinActive: () => dispatch(actions.fetchJoinActiveInit()),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchTotal: () => dispatch(actions.fetchTotalInit()),
        onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(userID, fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onJoinGrp: (id, categ) => dispatch(actions.joinGrpInit(id, categ)),
        
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFetchVideo: (id, url) => dispatch(actions.fetchVideo(id, url)),
        onChangeCnt: (id, title, det, confirm) => dispatch(actions.changeCntInit(id, title, det, confirm)),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups));