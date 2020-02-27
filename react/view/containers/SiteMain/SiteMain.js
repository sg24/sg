import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainNav from './MainNav/MainNav'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import MainFilter from '../../components/MainFilter/MainFilter';
import Loader from '../../components/UI/Loader/Loader';
import NoAcc from '../../components/Main/NoAcc/NoAcc';
import Editor from './MainContent/MainModel/ModelEditor/ModelEditor'

// const AsyncShare = asyncComponent(() => {
//     return import ('./Share/Share');
// });

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

    closeChangeCntHandler = () => {
        this.props.onCloseChangeCnt()
    }

    closeBackdropHandler = () => {
        this.props.onCloseBackdrop();
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
                    { this.props.cntErr ? 
                        <Backdrop 
                            component={ Modal }
                            close={this.closeBackdropHandler}
                            err={ this.props.cntErr } /> : null}
                <MainContent/>
                <MainNav/>
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
                        close={this.closeBackdropHandler}
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
                            'Are you sure you want to remove this user',
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
                {this.props.commentID ? <Editor id={this.props.commentID.id} categ={this.props.commentID.categ}/> : null}
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
        changeCnt: state.cnt.changeCnt,
        commentID: state.cnt.commentID
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault()),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose()),
        onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions.changeCntInit(id, title, det, confirm, modelType)),
        onCloseChangeCnt: () => dispatch(actions.changeCntCancel()),
        onCloseBackdrop: () => dispatch(actions.resetModel())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteMain); 