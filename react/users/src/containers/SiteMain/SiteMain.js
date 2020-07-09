import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch,Route } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import MainFilter from '../../components/MainFilter/MainFilter';
import Loader from '../../components/UI/Loader/Loader';
import NoAcc from '../../components/Main/NoAcc/NoAcc';

const AsyncFilterContent= asyncComponent(() => {
    return import ('./MainContent/MainModel/Filter/FilterContent/FilterContent');
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
        window.location.assign(searchDet);
    };

    changeCntHandler = () => {
        this.props.onChangeCnt(this.props.changeCntStart.id, null, this.props.changeCntStart.det, true)
    }

    closeChangeCntHandler = () => {
        this.props.onCloseChangeCnt()
    }

    closeBackdropHandler = () => {
        this.props.onCloseBackdrop();
    }

    closeModelBackdropHandler = () => {
        this.props.onCloseModelBackdrop();
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
                    isAuth={this.props.status}
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
            {this.props.showBackdrop ? 
                <Backdrop   
                    show={ this.props.showBackdrop }
                    close={this.closeBackdropHandler}
                    component={ AsyncFilterContent }/> : null}
                    { this.props.cntErr ? 
                        <Backdrop 
                            component={ Modal }
                            close={this.closeModelBackdropHandler}
                            err={ this.props.cntErr } /> : null}
                    <Switch>
                        <Route path="/users/:id" exact component={MainContent}/>
                        <Route path={"/users/:id/?search=/:id"} exact component={MainContent}/>
                    </Switch>
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
                            msg: this.props.changeCntStart.det === 'blockUser' ?
                            'Are you sure you want to block this user' : 
                            this.props.changeCntStart.det === 'rejUser' ? 'Are you sure you want to reject this user' :
                            this.props.changeCntStart.det === 'acceptUser' ? 'Are you sure you want to accept this user' :  
                            this.props.changeCntStart.det === 'cancelReq' ? 'Are you sure you want to Cancel the request, sent to this user' : 
                            'Are you sure you want to remove this user',
                            cnt: this.props.changeCntStart.title,
                            det: this.props.changeCntStart.det
                        }}
                        exit={{
                            msg: this.props.changeCntStart.det=== 'acceptUser' ?
                            'User added Successfully' : 'Successful', 
                            close: this.props.changeCnt}}
                        changeCnt={this.changeCntHandler}
                        closeChangeCnt={this.closeChangeCntHandler}/> : null}
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.auth.status,
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
        changeCnt: state.cnt.changeCnt
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault()),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose()),
        onChangeCnt: (id, title, det, confirm) => dispatch(actions.changeCntInit(id, title, det, confirm)),
        onCloseChangeCnt: () => dispatch(actions.changeCntCancel()),
        onCloseBackdrop: () => dispatch(actions.hideMainBackdrop()),
        onCloseModelBackdrop: () => dispatch(actions.resetModel())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMain)); 