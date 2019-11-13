import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'pepjs';

import Poet from '../../../../../components/Main/Poet/Poet';
import NoAcc from '../../../../../components/Main/NoAcc/NoAcc';
import { updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';

class Model extends Component {
    constructor(props) {
        super(props);
        let limit = 0;
        if (window.innerHeight >= 1200) {
            limit = 6
        } else if(window.innerHeight >= 900) {
            limit = 4;
        } else if(window.innerHeight >= 500) {
            limit = 3
        } else {
            limit = 2;
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
            animationComplete: true
        }
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/poet');
        let these = this;
        window.addEventListener('scroll', function(event) {
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                these.props.onFetchCnt(
                        these.props.userID, 
                        these.state.filterTag !== 'poet' ? 
                        these.state.filterTag === 'filter' ?  'filter=='+these.props.filterDet : these.state.filterTag : 'poet',
                        these.state.fetchLimit, these.props.skipCnt + these.state.fetchLimit, these.props.cntTotal);
            }
        });
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id !== 'share' && this.props.match.params.id !== 'filter' && this.props.match.params.id !== 'startfilter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, this.props.match.params.id === 'shared' ? `shared-${this.props.userID}` : this.props.match.params.id, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.props.filterDet && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'filter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'filter=='+this.props.filterDet, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'startfilter') {
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (!this.props.match.params.id && this.state.filterTag !== 'poet') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.userID, 'poet', this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: 'poet'
            });
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
        this.props.onChangeShareID(shareID);
        this.props.history.push('/poet/share')
    };

    changeCntHandler = (id, title, det) => {
        let checkTitle = String(title).length > 149 ? String(title).substr(0, 180) + '...' : title
        this.props.onChangeCnt(id, checkTitle, det, false);
    }

    render() {
        this.props.onFetchShareActive(this.props.userID);
        this.props.onFetchCntActive(this.props.userID);
        this.props.onFetchShareCntActive(this.props.userID);

        let cnt = "Loading";
        if (this.props.postErr) {
            cnt = null
        }

        if (this.props.cnts && this.props.cnts.length === 0 && this.state.filterTag === 'shared') {
            cnt = <NoAcc 
                isAuth={this.props.userID !== null}
                det='You have no shared Question yet!'/>
        }

        if (this.props.cnts && this.props.cnts.length === 0 && this.state.filterTag !== 'shared') {
            cnt = <NoAcc 
                isAuth={this.props.userID !== null}
                det='Category not found !!'/>
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
        filterDet: state.cnt.filterDet
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: (userID) => dispatch(actions.fetchShareactiveInit(userID)),
        onFetchShareCntActive: (userID) => dispatch(actions.fetchShareCntactiveInit(userID)),
        onFetchCntActive: (userID) => dispatch(actions.fetchCntActiveInit(userID)),
        onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(userID, fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions.changeFavInit(id, liked, favAdd, changedFav, userID, cntGrp)),
        onChangeShareID: (shareID) => dispatch(actions.shareID(shareID)),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onChangeCnt: (id, title, det, confirm) => dispatch(actions.changeCntInit(id, title, det, confirm))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Model));