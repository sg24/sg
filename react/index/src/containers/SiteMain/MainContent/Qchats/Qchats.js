import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Qchat from '../../../../components/Main/Qchat/Qchat';
import Loader from '../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../components/Main/NoAcc/NoAcc';
import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';

class Qchats extends Component {
    constructor(props) {
        super(props);
         this.props.onFetchCntReset();
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
    }

    componentDidUpdate() {
        if (this.props.cnts && this.props.cnts.length > 0 && !this.state.scrollEnable) {
            window.addEventListener('scroll', this.onScroll, false);
            this.setState({scrollEnable: true})
        }
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id !== 'share' && this.props.match.params.id !== 'filter' && this.props.match.params.id !== 'startfilter') {
            this.props.onFetchCntReset();;
            this.props.onFetchCnt(this.props.userID, `qchat-${this.props.match.params.id}`, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }
        if (this.props.startSearch && this.props.filterDet && this.props.location.search && this.state.filterTag !== `filter==${this.props.filterDet}`) {
            this.props.onFetchCntReset();
            let cnt = `filter==${this.props.filterDet}`;
            this.props.onFetchCnt(this.props.userID, 'qchat-'+cnt, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: cnt
            });
        }
        if (!this.props.startSearch && !this.props.match.params.id && this.state.filterTag !== 'qchat') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'qchat', this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: 'qchat'
            });
        }
    }

    componentWillUnmount() {
        this.props.onFetchCntReset();
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
            this.props.onFetchCnt(
                    this.props.userID,  
                    this.state.filterTag !== 'qchat' ? 
                    this.state.filterTag === 'filter' ?  'filter=='+this.props.filterDet : `qchat-${this.state.filterTag}` : 'qchat' ,
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
        this.props.onChangeShareID(shareID, 'qchat');
        this.props.history.push('/index/qchat/share')
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

    changeCntHandler = (id, title, det, modelType) => {
        let checkTitle = String(title).length > 50 ? String(title).substr(0, 50) + '...' : title
        this.props.onChangeCnt(id, checkTitle, det, false, modelType);
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
                tooltip={this.showTooltipHandler}
                showTooltip={this.state.showTooltip}
                startExam={this.startExamHandler}
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
        cntErr: state.cnt.cntErr,
        postVideo: state.cnt.postVideo,
        videoErr: state.cnt.videoErr,
        filterDet: state.cnt.filterDet,
        startSearch: state.filter.startSearch
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Qchats));