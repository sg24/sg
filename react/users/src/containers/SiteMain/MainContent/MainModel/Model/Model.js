import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Users from '../../../../../components/Main/Users/Users';
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
            fetchLimit: limit,
            filterTag: 'users',
        }
    }

    componentDidMount() {
        this.props.onFetchCnt(this.state.filterTag, this.state.fetchLimit, 0, 0);
        this.props.onChangeTag('/users');
        let these = this;
        window.addEventListener('scroll', function(event) {
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                these.props.onFetchCnt(
                        these.state.filterTag !== 'users' ? 
                        these.state.filterTag === 'filter' ?  'filter=='+these.props.filterDet : these.state.filterTag : 'users',
                        these.state.fetchLimit, these.props.skipCnt + these.state.fetchLimit, these.props.cntTotal);
            }
        });
    }

    componentDidUpdate() {
        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id !== 'share' && this.props.match.params.id !== 'filter' && this.props.match.params.id !== 'startfilter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt(this.props.match.params.id === 'shared' ? `shared-${this.props.userID}` : this.props.match.params.id, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.props.filterDet && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'filter') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt('filter=='+this.props.filterDet, this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (this.props.match.params.id && this.state.filterTag !== this.props.match.params.id && this.props.match.params.id === 'startfilter') {
            this.setState({
                filterTag: this.props.match.params.id
            });
        }

        if (!this.props.match.params.id && this.state.filterTag !== 'users') {
            this.props.onFetchCntReset();
            this.props.onFetchCnt('users', this.state.fetchLimit, 0, 0);
            this.setState({
                filterTag: 'users'
            });
        }
    }

    render() {
        this.props.onFetchShareActive();
        // this.props.onFetchCntActive(this.props.userID);
        // this.props.onFetchShareCntActive(this.props.userID);

        let cnt = "Loading";
        if (this.props.postErr) {
            cnt = null
        }

        if (this.props.cnts && this.props.cnts.length === 0 && this.state.filterTag !== 'shared') {
            cnt = <NoAcc 
                isAuth={this.props.status}
                det='Category not found !!'
                icn='users'/>
        }

        if (this.props.cnts && this.props.cnts.length > 0) {
            cnt = <Users
                content={this.props.cnts}/>
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
        filterDet: state.cnt.filterDet
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShareActive: () => dispatch(actions.fetchShareactiveInit()),
        onFetchShareCntActive: (userID) => dispatch(actions.fetchShareCntactiveInit(userID)),
        onFetchCntActive: (userID) => dispatch(actions.fetchCntActiveInit(userID)),
        onFetchCnt: (fetchType, limit, skipCnt, cntTotal) => dispatch(actions.fetchCntInit(fetchType, limit, skipCnt, cntTotal)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset()),
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onChangeCnt: (id, title, det, confirm) => dispatch(actions.changeCntInit(id, title, det, confirm))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Model));