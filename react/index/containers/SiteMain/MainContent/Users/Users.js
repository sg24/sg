import React, { Component } from 'react';
import { connect } from 'react-redux';

import Users from '../../../../components/Main/Users/Users';
import Loader from '../../../../components/UI/Loader/Loader';
import NoAcc from '../../../../components/Main/NoAcc/NoAcc';
import * as actions from '../../../../store/actions/index';
import App from '../../../../App';

class Model extends Component {
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
            fetchLimit: limit,
            filterTag: 'users',
            scrollEnable: false
        }
    }

    componentDidMount() {
        // this.props.onFetchCnt(this.props.userID, this.state.filterTag, this.state.fetchLimit, 0, 0);
        // this.props.onChangeTag('/users');
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
        if (typeof window !== 'undefined') {
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                this.props.onFetchCnt(
                        this.props.userID,  'users' ,
                        this.state.fetchLimit, this.props.skipCnt + this.state.fetchLimit, this.props.cntTotal);
            }
        }
    } 


    changeCntHandler = (id, title, det, confirm, modelType) => {
        this.props.onChangeCnt(id, title, det, confirm, modelType);
    };

    render() {
        this.props.onFetchShareActive();
        this.props.onFetchCntActive();
        this.props.onFetchShareCntActive();
        this.props.onFetchNotifyActive();
        this.props.onFetchPtActive();
        this.props.onFetchQueActive();
        this.props.onFetchReqActive();

        let cnt = <Loader />;
        if (this.props.cntErr) {
            cnt = null
        }

        if (this.props.cnts && this.props.cnts.length === 0) {
            cnt = <NoAcc 
                isAuth={this.props.status}
                det='Users not found !!'
                icn='users'
                filter/>
        }

        if (this.props.cnts && this.props.cnts.length > 0) {
            cnt = <Users
                content={this.props.cnts}
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
        status: state.auth.status,
        cnts: state.cnt.cnts,
        skipCnt: state.cnt.skipCnt,
        cntTotal: state.cnt.cntTotal,
        filterDet: state.cnt.filterDet,
        cntErr: state.cnt.cntErr,
        addUser: state.cnt.addUser,
        pending: state.cnt.pending,
        request: state.cnt.request,
        blocked: state.cnt.blocked,
        accept: state.cnt.accept
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
        onChangeTag: (path) => dispatch(actions.changeTagsPath(path)),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Model);