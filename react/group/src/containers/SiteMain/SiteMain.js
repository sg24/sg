import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch,Route } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainNav from './MainNav/MainNav'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import MainFilter from '../../components/MainFilter/MainFilter';
import Loader from '../../components/UI/Loader/Loader';
import NoAcc from '../../components/Main/NoAcc/NoAcc';

const AsyncShare= asyncComponent(() => {
    return import ('./Share/Share');
});

const AsyncFilterContent= asyncComponent(() => {
    return import ('./MainContent/MainGrp/Filter/FilterContent/FilterContent');
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
        this.props.onChangeCnt(this.props.changeCntStart.id, this.props.changeCntStart.user, this.props.changeCntStart.categ, this.props.changeCntStart.username, this.props.changeCntStart.curTab, true)
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
                    <Route path="/group" exact render={() => (
                            <>
                                <MainContent/>
                                <MainNav/>
                            </>    
                        )}/>
                    <Route path="/group/:id" exact render={() => (
                        <>
                            <MainContent/>
                            <MainNav/>
                        </>    
                    )}/>
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
                            msg: this.props.changeCntStart.categ === 'reject'  || this.props.changeCntStart.categ === 'remove' ?
                            `Are you sure you want to ${this.props.changeCntStart.categ}` : `Are you sure you want to ${this.props.changeCntStart.categ}`,
                            cnt: this.props.changeCntStart.username,
                            det: this.props.changeCntStart.categ
                        }}
                        exit={{
                            msg: this.props.changeCntStart.categ === 'reject'  || this.props.changeCntStart.categ === 'remove' ?
                            `${this.props.changeCntStart.username} ${this.props.changeCntStart.categ === 'reject' ? 'rejected' : this.props.changeCntStart.categ === 'delete' ? 'deleted' : 'removed'} successfully` : this.props.changeCntStart.categ,
                            close: this.props.changeCnt}}
                        changeCnt={this.changeCntHandler}
                        closeChangeCnt={this.closeChangeCntHandler}/> : null}
                <Route path="/group/info/:id" exact component={AsyncShare} />
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
        changeCntStart: state.share.changeCntStart,
        changeCntErr: state.share.changeCntErr,
        changeCnt: state.share.changeCnt
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault()),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose()),
         onChangeCnt: (id, userID, categ, username, curTab, confirm) => dispatch(actions.changeCntInit(id, userID, categ, username, curTab, confirm)),
        onCloseChangeCnt: () => dispatch(actions.changeCntCancel()),
        onCloseBackdrop: () => dispatch(actions.hideMainBackdrop()),
        onCloseModelBackdrop: () => dispatch(actions.resetModel())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMain)); 