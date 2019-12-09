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
    return import ('./MainContent/MainPost/Filter/FilterContent/FilterContent');
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

    changePostHandler = () => {
        this.props.onChangePt(this.props.changePtStart.id, null, this.props.changePtStart.det, true)
    }

    closeChangePostHandler = () => {
        this.props.onCloseChangePt()
    }

    render() {
        let filterCnt = <Loader />;
        let checkNotify = null;

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
                        component={ AsyncFilterContent }/> : null}
                { this.props.postErr ? 
                    <Backdrop 
                        component={ Modal }
                        err={ this.props.postErr } /> : null}
                <Switch>
                    <Route path="/post" exact component={MainContent} />
                    <Route path="/post/:id" exact component={MainContent} />
                </Switch>
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
            { this.props.changePtStart !== null ? 
                <Backdrop   
                    show={ this.props.showBackdrop }
                    component={ Modal }
                    err={ this.props.changePtErr }
                    warn={{
                        msg: this.props.changePtStart.det=== 'delete' ?
                        'Are you sure you want to delete this post' : 'Are you sure you want to change this post mode',
                        cnt: this.props.changePtStart.title,
                        det: this.props.changePtStart.det
                    }}
                    exit={{
                        msg: this.props.changePtStart.det=== 'delete' ?
                        'Post Deleted Successfully' : 'Post mode change successfully', 
                        close: this.props.changePt}}
                    changePost={this.changePostHandler}
                    closeChangePost={this.closeChangePostHandler}/> : null}
            <Route path="/post/share" exact component={AsyncShare} />
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        default: state.header.default,
        showBackdrop: state.main.showBackdrop,
        postErr: state.pt.postErr,
        filterStart:state.header.filterStart,
        searchCnt: state.header.searchCnt,
        searchCntErr: state.header.searchCntErr,
        filterPos: state.header.filterPos,
        filterLastPos: state.header.filterLastPos,
        changePtStart: state.pt.changePtStart,
        changePtErr: state.pt.changePtErr,
        changePt: state.pt.changePt
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault()),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose()),
        onChangePt: (id, title, det, confirm) => dispatch(actions.changePtInit(id, title, det, confirm)),
        onCloseChangePt: () => dispatch(actions.changePtCancel()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMain)); 