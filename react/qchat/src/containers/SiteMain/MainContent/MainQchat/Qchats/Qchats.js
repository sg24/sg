import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Qchat from '../../../../../components/Main/Qchat/Qchat';
import Loader from '../../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../../components/Main/NoAcc/NoAcc';
import { updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';
import axios from '../../../../../axios';

class Qchats extends Component {
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
            filterTag: 'qchat',
            showTooltip: null,
            active: null
        }
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/qchat');
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
                    these.props.onFetchCntActive();
                    these.props.onFetchShareCntActive();
                    these.props.onFetchNotifyActive();
                    these.props.onFetchNavActive();
                    these.props.onFetchTotal()
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

        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id !== 'share' && this.props.match.params.id !== 'pay' && this.props.match.params.id !== 'filter' && this.props.match.params.id !== 'startfilter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, this.props.match.params.id === 'shared' ? `shared-${this.props.userID}` : this.props.match.params.id, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id === 'filter' && this.props.filterDet && this.state.filterTag !== `filter==${this.props.filterDet}`) {
            this.props.onFetchCntReset();
            let cnt = `filter==${this.props.filterDet}`;
            this.props.onFetchCnt(this.props.userID, cnt, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: cnt
            });
        }

        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'startfilter') {
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (!this.props.match.params.id && this.state.filterTag !== 'qchat') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'qchat', this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: 'qchat'
            });
        }
    }

    onScroll = () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
            this.props.onFetchCnt(
                    this.props.userID, 
                    this.state.filterTag !== 'qchat' ? 
                    this.state.filterTag === 'filter' ?  'filter=='+this.props.filterDet : this.state.filterTag : 'qchat',
                    this.state.fetchLimit, this.props.skipCnt + this.state.fetchLimit, this.props.cntTotal);
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

    showShareHandler = (shareID) => {
        this.props.onChangeShareID(shareID);
        this.props.history.push('/qchat/share')
    };

    showTooltipHandler = (id) => {
        if (this.state.showTooltip && this.state.showTooltip.id === id) {
            this.setState((prevState, props) => {
                return {
                    showTooltip: updateObject(prevState.showTooltip, {visible: !prevState.showTooltip.visible})
                }
            });
            return
        }

        const newCntOpt = {visible: true, id}
        this.setState({showTooltip: newCntOpt})
    }

    showPaymentHandler = (id, amount, qchattotal) => {
        this.props.history.push('/qchat/pay')
        this.props.onPayout({id, amount, qchattotal})
    }

    changeCntHandler = (id, title, det) => {
        if ( this.props.match.params.id === 'myqchat') {
            det = det === 'draft' ?  'acc-draft' : det;
        }
        let checkTitle = String(title).length > 50 ? String(title).substr(0, 50) + '...' : title
        this.props.onChangeCnt(id, checkTitle, det, false);
    }

    startExamHandler = (id) => {
        var win = window.open(`https://www.slodge24.com/examtab/${id}`, '_blank');
        win.focus();
    }

    render() {
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
            cnt = <Qchat 
                content={this.props.cnts} 
                userOpt={this.showUserOptHandler}
                showCntOpt={this.state.cntOpt}
                share={this.showShareHandler}
                payment={this.showPaymentHandler}
                tooltip={this.showTooltipHandler}
                startExam={this.startExamHandler}
                showTooltip={this.state.showTooltip}
                changeCnt={this.changeCntHandler}/>
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
        onPayout: (payment) => dispatch(actions.paymentDet(payment)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onFetchVideo: (id, url) => dispatch(actions.fetchVideo(id, url)),
        onChangeCnt: (id, title, det, confirm) => dispatch(actions.changeCntInit(id, title, det, confirm)),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Qchats));