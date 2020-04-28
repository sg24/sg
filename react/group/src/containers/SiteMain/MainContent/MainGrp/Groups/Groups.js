import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Group from '../../../../../components/Main/Group/Group';
import Loader from '../../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../../components/Main/NoAcc/NoAcc';
import * as actions from '../../../../../store/actions/index';
import axios from '../../../../../axios';
import { updateObject } from '../../../../../shared/utility';

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
            clipboard: null,
            resetClipboard: false,
            clearClipboard: null,
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

        if (this.state.clipboard && this.state.resetClipboard) {
            clearTimeout(this.state.clearClipboard)
            let clearClipboard = setTimeout(() => {
                this.setState({clipboard: null})
            }, 2000)
            this.setState({resetClipboard: false, clearClipboard})
        }
    }

    onScroll = () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
            this.props.onFetchCnt(
                    this.state.filterTag !== 'group' ? 
                    this.state.filterTag === 'filter' ?  'filter=='+this.props.filterDet : this.state.filterTag : 'group',
                    this.state.fetchLimit, this.props.skipCnt + this.state.fetchLimit, this.props.cntTotal);
        }
    } 

    joinGrpHandler = (id, categ) => {
        this.props.onJoinGrp(id, categ)
    };

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

    groupInfoHandler = (id) => {
        this.props.onChangeShareID(id);
        this.props.history.push(`/group/info/${id}`)
    }

    changeCntHandler = (id, title, det, confirm) => {
        this.props.onChangeCnt(id, det, det,`${title} Group`, det === 'delete' ? 'deletegroup': 'exitgroup', confirm);
    };

    copyLinkHandler = (id) => {
        copyTextToClipboard(`https://www.slodge24.com/chat/group/${id}`);
        let these = this;
        function fallbackCopyTextToClipboard(text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.padding = 0;
            textArea.style.width = '2em';
            textArea.style.height = '2em';
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                these.setState({clipboard: msg === 'successful' ? {msg: 'Copying to clipboard was successful!', id} : {msg: 'Could not copy link to clipboard', id},
                    resetClipboard: msg === 'successful' ? true: false});
            } catch (err) {
                these.setState({clipboard: {msg: 'Could not copy link to clipboard', id}});
            }

            document.body.removeChild(textArea);
        }
        function copyTextToClipboard(text) {
            if (!navigator.clipboard) {
              fallbackCopyTextToClipboard(text);
              return;
            }
            navigator.clipboard.writeText(text).then(function() {
              these.setState({clipboard: {msg: 'Copying to clipboard was successful!', id}, resetClipboard: true});
            }, function(err) {
              these.setState({clipboard: {msg: 'Could not copy link to clipboard', id}});
            });
          }
    }

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
                userOpt={this.showUserOptHandler}
                showOpt={this.state.cntOpt}
                changeCnt={this.changeCntHandler}
                copyLink={this.copyLinkHandler}
                clipboard={this.state.clipboard}
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
        onChangeCnt: (id, userID, categ,  username, curTab, confirm) => dispatch(actions.changeCntInit(id, userID, categ,  username, curTab, confirm)),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups));