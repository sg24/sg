import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Conv from '../../../../../components/Main/Conv/Conv';
import Loader from '../../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../../components/Main/NoAcc/NoAcc';
import * as actions from '../../../../../store/actions/index';
import axios from '../../../../../axios';

class Convs extends Component {
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
            filterTag: 'private',
            mediaItms: [],
            scrollEnable: false,
            active: null
        }
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/conv');
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
                        these.props.onFetchPrivateActive();
                        these.props.onFetchGroupActive();
                        these.props.onFetchShareActive();
                        these.props.onFetchNavActive();
                        these.props.onFetchNotifyActive();
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
        if (this.props.cnts && this.props.cnts.length > 0 && !this.state.scrollEnable) {
            window.addEventListener('scroll', this.onScroll, false);
            this.setState({scrollEnable: true})
        }
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id) {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, this.props.match.params.id, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (!this.props.match.params.id && this.state.filterTag !== 'private') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'private', this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: 'private'
            });
        }
    }

    onScroll = () => {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
            this.props.onFetchCnt(
                    this.state.filterTag !== 'private' ? 
                    this.state.filterTag === 'filter' ?  'filter=='+this.props.filterDet : this.state.filterTag : 'private',
                    this.state.fetchLimit, this.props.skipCnt + this.state.fetchLimit, this.props.cntTotal);
        }
    } 

    changeCntHandler = (id, title, det, confirm) => {
        this.props.onChangeCnt(id, title, det, confirm);
    };

    render() {
        let cnt = <Loader/>;
        if (this.props.postErr) {
            cnt = null
        }

        if (this.props.cnts && this.props.cnts.length === 0) {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No Conversation found!'
                    icn='user-friends'
                    filter />
        }

        if (this.props.cnts && this.props.cnts.length === 0) {
            cnt = <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No Conversation found!'
                    icn='user-friends'
                    filter />
        }

        if (this.props.cnts && this.props.cnts.length > 0) {
            cnt = <Conv
                content={this.props.filterCnt ? this.props.filterCnt : this.props.cnts} 
                curTab={this.state.filterTag}
                />
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
        status: state.auth.status,
        filterCnt: state.cnt.filterCnt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: () => dispatch(actions.fetchShareactiveInit()),
        onFetchPrivateActive: () => dispatch(actions.fetchPrivateActiveInit()),
        onFetchGroupActive: () => dispatch(actions.fetchGroupActiveInit()),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(userID, fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
       
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onChangeCnt: (id, title, det, confirm) => dispatch(actions.changeCntInit(id, title, det, confirm)),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Convs));