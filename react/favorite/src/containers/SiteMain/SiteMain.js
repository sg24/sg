import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Route } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainNav from './MainNav/MainNav'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import MainFilter from '../../components/MainFilter/MainFilter';
import NoAcc from '../../components/Main/NoAcc/NoAcc';

const AsyncShare= asyncComponent(() => {
    return import ('./Share/Share');
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
        this.props.onChangeCnt(this.props.changeCntStart.id, null, this.props.changeCntStart.det, true,this.props.changeCntStart.modelType)
    }

    closeChangeCntHandler = () => {
        this.props.onCloseChangeCnt()
    }

    render() {
        let filterCnt = 'loading....';

        if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length > 0){
            filterCnt = (
                <ul>
                    <MainFilter 
                        filterResults={this.props.searchCnt}
                        filterPos={this.props.filterPos}
                        viewCnt={this.viewCntHandler}/>
                </ul> 
            )
        }

        if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length === 0) {
            filterCnt = (
                <NoAcc 
                isAuth={this.props.userID !== null}
                det='No content found!' />
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
            <div className="site-main" onClick={this.checkHeaderDefault}>
            <div className="wrapper__exmain">
                { this.props.cntErr ? 
                    <Backdrop 
                        component={ Modal }
                        err={ this.props.cntErr } /> : null}
                <MainContent />
                <MainNav />
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
                    err={ this.props.changeCntErr }
                    warn={{
                        msg: this.props.changeCntStart.det=== 'delete' ?
                        'Are you sure you want to delete this ' : 'Are you sure you want to change the mode',
                        cnt: this.props.changeCntStart.title,
                        det: this.props.changeCntStart.det
                    }}
                    exit={{
                        msg: this.props.changeCntStart.det=== 'delete' ?
                        'Deleted Successfully' : 'Mode change successfully', 
                        close: this.props.changeCnt}}
                    changeCnt={this.changeCntHandler}
                    closeChangeCnt={this.closeChangeCntHandler}/> : null}
                    <Route path={'/index/:id/share'} exact component={AsyncShare} />
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
        changeCntStart: state.cnt.changeCntStart,
        changeCntErr: state.cnt.changeCntErr,
        changeCnt: state.cnt.changeCnt,
        cntType: state.share.cntType
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault()),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose()),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType)),
        onCloseChangeCnt: () => dispatch(actions.changeCntCancel()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMain)); 