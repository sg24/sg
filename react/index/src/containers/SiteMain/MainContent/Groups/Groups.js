import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Group from '../../../../components/Main/Group/Group';
import Loader from '../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../components/Main/NoAcc/NoAcc';
import * as actions from '../../../../store/actions/index';
import { updateObject } from '../../../../shared/utility';

class Groups extends Component {
    constructor(props) {
        super(props);
        let limit = 0;
        this.props.onFetchCntReset();
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
            clipboard: null,
            resetClipboard: false,
            clearClipboard: null,
            scrollEnable: false
        }
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/group');
    }

    componentDidUpdate() {
        if (this.props.cnts && this.props.cnts.length > 0 && !this.state.scrollEnable) {
            window.addEventListener('scroll', this.onScroll, false);
            this.setState({scrollEnable: true})
        }

        if (this.state.clipboard && this.state.resetClipboard) {
            clearTimeout(this.state.clearClipboard)
            let clearClipboard = setTimeout(() => {
                this.setState({clipboard: null})
            }, 2000)
            this.setState({resetClipboard: false, clearClipboard})
        }
    }

    componentWillUnmount() {
        this.props.onFetchCntReset();
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight < 1) {
            alert('set')
            this.props.onFetchCnt(
                    this.state.filterTag !== 'group' ? 
                    this.state.filterTag === 'filter' ?  'filter=='+this.props.filterDet : this.state.filterTag : 'group',
                    this.state.fetchLimit, this.props.skipCnt + this.state.fetchLimit, this.props.cntTotal);
        }
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            alert("you're at the bottom of the page");
        }
        if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
            alert("you're at the bottom of the page mac");
        }
        if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
            // you're at the bottom of the page
            alert("Bottom of page");
        }
    } 

    joinGrpHandler = (id, categ) => {
        this.props.onJoinGrp(id, categ)
    };

    groupInfoHandler = (cnt) => {
        this.props.onShareCnt({...cnt});
        this.props.history.push(`/index/group/${cnt._id}`)
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

    changeCntHandler = (id, title, det, confirm) => {
        this.props.onChangeCnt(id, title, det, confirm, det === 'delete' ? 'deletegroup': 'exitgroup')
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
                these.setState({clipboard: msg === 'successful' ? 'Copying to clipboard was successful!' : 'Could not copy link to clipboard',
                    resetClipboard: msg === 'successful' ? true: false});
            } catch (err) {
                these.setState({clipboard: 'Could not copy link to clipboard'});
            }

            document.body.removeChild(textArea);
        }
        function copyTextToClipboard(text) {
            if (!navigator.clipboard) {
              fallbackCopyTextToClipboard(text);
              return;
            }
            navigator.clipboard.writeText(text).then(function() {
              these.setState({clipboard: 'Copying to clipboard was successful!', resetClipboard: true});
            }, function(err) {
              these.setState({clipboard: 'Could not copy link to clipboard'});
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
                    isAuth={this.props.status}
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

        if (!this.props.status) {
            cnt = <NoAcc 
            isAuth={this.props.status}
            det='No Group found!'
            icn='user-friends'
            filter />
        }

        return cnt
    }
}

const mapStateToProps = state => {
    return {
        status: true,
        userID: state.auth.userID,
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
        onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(userID, fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onJoinGrp: (id, categ) => dispatch(actions.joinGrpInit(id, categ)),
        
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onShareCnt: (shareID) => dispatch(actions.shareCnt(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups));