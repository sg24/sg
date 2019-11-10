import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainFilter from '../../components/MainFilter/MainFilter';
import NoAcc from '../../components/Main/NoAcc/NoAcc';

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
            <div 
            className="site-main site-main__fm" 
            onClick={this.checkHeaderDefault}>
            <div className="wrapper__exmain">
                <MainContent />
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
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        default: state.header.default,
        filterStart:state.header.filterStart,
        searchCnt: state.header.searchCnt,
        searchCntErr: state.header.searchCntErr,
        filterPos: state.header.filterPos,
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault()),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteMain); 