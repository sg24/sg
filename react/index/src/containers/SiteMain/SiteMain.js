import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainNav from './MainNav/MainNav'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import MainFilter from '../../components/MainFilter/MainFilter';
import Loader from '../../components/UI/Loader/Loader';
import NoAcc from '../../components/Main/NoAcc/NoAcc';
import Contest from '../Contest/Contest';

const AsyncShare= asyncComponent(() => {
    return import ('./Share/Share');
});

const AsyncChat= asyncComponent(() => {
    return import ('./Face/Chat');
});

const AsyncForm = asyncComponent(() => {
    return import ('../Contest/Form/Form');
});

const AsyncAroundForm = asyncComponent(() => {
    return import ('../Aroundme/Form/Form');
});

const AsyncGroupInfo = asyncComponent(() => {
    return import ('./GroupInfo/GroupInfo');
});

const AsyncPreview = asyncComponent(() => {
    return import ('./Preview/Preview');
});

const AsyncAround = asyncComponent(() => {
    return import ('./Chat/Chat');
});

class SiteMain extends Component {
    checkHeaderDefault = () => {
        if (!this.props.default) {
            this.props.onNavDefault()
        }
    }

    closeHeaderFilterHandler = () => {
        this.props.onCloseHeaderFilter();
    }

    viewCntHandler = (searchDet) => {
        window.location.assign('/view/'+searchDet.grp+'/'+searchDet.id);
    };

    changeCntHandler = () => {
        this.props.onChangeCnt(this.props.changeCntStart.id, null, this.props.changeCntStart.det, true, this.props.changeCntStart.modelType)
    }

    changeGrpCntHandler = () => {
        this.props.onChangeGrpCnt(this.props.changeGrpCntStart.id, this.props.changeGrpCntStart.user, this.props.changeGrpCntStart.categ, this.props.changeGrpCntStart.username, this.props.changeGrpCntStart.curTab, true)
    }

    closeChangeCntHandler = () => {
        this.props.onCloseChangeCnt()
    }

    closeChangeGrpCntHandler = () => {
        this.props.onCloseChangeGrpCnt()
    }

    closeModelBackdropHandler = () => {
        this.props.onCloseModelBackdrop();

    }

    closeGrpModalBackdropHandler = () => {
        this.props.onCloseChangeGrpCnt()
    }

    render() {
        let filterCnt = <Loader />;

        if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length > 0){
            filterCnt = (
                <ul>
                    <MainFilter 
                        filterResults={this.props.searchCnt}
                        filterPos={this.props.filterPos}
                        filterLastPos={this.props.filterLastPos}
                        viewCnt={this.viewCntHandler}/>
                </ul> 
            )
        }

        if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length === 0) {
            filterCnt = (
                <NoAcc 
                    isAuth={this.props.userID !== null}
                    det='No content found!'
                    icn='clone'
                    filter />
            );
        }

        if (this.props.searchCntErr) {
            filterCnt = (
                <div className="site-main__content--filter__err"> 
                    {this.props.searchCntErr.message} 
                </div> 
            )
        }

        return (
            <div className="site-main site-main__expage" onClick={this.checkHeaderDefault}>
            <div className="wrapper__exmain">
                { this.props.cntErr ? 
                    <Backdrop 
                        component={ Modal }
                        close={this.closeModelBackdropHandler}
                        err={ this.props.cntErr } /> : null}
                <MainContent />
                <MainNav />
                <Contest />
            </div>
            { this.props.filterStart ? 
                <div 
                    className="site-main__content--filter"
                    onClick={this.closeHeaderFilterHandler}>
                    <div
                        className="site-main__content--filter__wrapper">
                        { filterCnt }
                    </div>
                </div> : null}
                { this.props.changeCntStart !== null ? 
                    <Backdrop   
                        show={ this.props.showBackdrop }
                        component={ Modal }
                        close={this.closeModelBackdropHandler}
                        err={ this.props.changeCntErr }
                        warn={{
                            msg: this.props.changeCntStart.det === 'delete' ?
                            'Are you sure you want to delete this ' : 
                            this.props.changeCntStart.det=== 'draft' || this.props.changeCntStart.det=== 'publish' ? 'Are you sure you want to change the mode' : 
                            this.props.changeCntStart.det === 'blockUser' ?
                            'Are you sure you want to block this user' : 
                            this.props.changeCntStart.det === 'rejUser' ? 'Are you sure you want to reject this user' :
                            this.props.changeCntStart.det === 'acceptUser' ? 'Are you sure you want to accept this user' :  
                            this.props.changeCntStart.det === 'cancelReq' ? 'Are you sure you want to Cancel the request, sent to this user' : 
                            this.props.changeCntStart.det === 'exit' ? 'Are you sure you want to exit ' : 'Are you sure you want to remove this user',
                            cnt: this.props.changeCntStart.title,
                            det: this.props.changeCntStart.det
                        }}
                        exit={{
                            msg: this.props.changeCntStart.det=== 'delete' ?
                            'Deleted Successfully' : 
                            this.props.changeCntStart.det=== 'draft' || this.props.changeCntStart.det=== 'publish' ? 'Mode change successfully' :
                            this.props.changeCntStart.det=== 'authUser' ?
                        'user added Successfully' : 'Mode change successfully', 
                            close: this.props.changeCnt}}
                        changeCnt={this.changeCntHandler}
                        closeChangeCnt={this.closeChangeCntHandler}/> : null}
                    { this.props.changeGrpCntStart !== null ? 
                    <Backdrop   
                        show={ this.props.showBackdrop }
                        component={ Modal }
                        close={this.closeGrpModalBackdropHandler}
                        err={ this.props.changeGrpCntErr }
                        warn={{
                            msg: this.props.changeGrpCntStart.categ === 'reject'  || this.props.changeGrpCntStart.categ === 'remove' ?
                            `Are you sure you want to ${this.props.changeGrpCntStart.categ}` : `Are you sure you want to ${this.props.changeGrpCntStart.categ}`,
                            cnt: this.props.changeGrpCntStart.username,
                            det: this.props.changeGrpCntStart.categ
                        }}
                        exit={{
                            msg: this.props.changeGrpCntStart.categ === 'reject'  || this.props.changeGrpCntStart.categ === 'remove' ?
                            `${this.props.changeGrpCntStart.username} ${this.props.changeGrpCntStart.categ === 'reject' ? 'rejected' : 'removed'} successfully` : this.props.changeGrpCntStart.categ,
                            close: this.props.changeGrpCnt}}
                        changeCnt={this.changeGrpCntHandler}
                        closeChangeCnt={this.closeChangeGrpCntHandler}/> : null}
                <Route path={'/index/:id/share'} exact component={AsyncShare} />
                <Route path="/index/group/info/:id" exact component={AsyncGroupInfo} />
                <Route path="/index/add/contest" exact component={AsyncForm} />
                <Route path="/index/add/aroundme" exact component={AsyncAroundForm} />
                <Route path="/index/aroundme/:id" exact component={AsyncAround}/>
                <Route path="/index/contest/:id" exact component={AsyncChat}/>
                <Route path="/index/preview" exact component={AsyncPreview}/>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        default: state.header.default,
        showBackdrop: state.main.showBackdrop,
        cntErr: state.cnt.cntErr,
        filterStart:state.header.filterStart,
        searchCnt: state.header.searchCnt,
        searchCntErr: state.header.searchCntErr,
        filterPos: state.header.filterPos,
        filterLastPos: state.header.filterLastPos,
        changeCntStart: state.cnt.changeCntStart,
        changeCntErr: state.cnt.changeCntErr,
        changeCnt: state.cnt.changeCnt,
        cntType: state.share.cntType,
        changeGrpCntStart: state.grp.changeGrpCntStart,
        changeGrpCntErr: state.grp.changeGrpCntErr,
        changeGrpCnt: state.grp.changeGrpCnt
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault()),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose()),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType)),
        onChangeGrpCnt: (id, userID, categ, username, curTab, confirm) => dispatch(actions.changeGrpCntInit(id, userID, categ, username, curTab, confirm)),
        onCloseChangeCnt: () => dispatch(actions.changeCntCancel()),
        onCloseChangeGrpCnt: () => dispatch(actions.changeGrpCntCancel()),
        onCloseModelBackdrop: () => dispatch(actions.resetModel())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMain)); 