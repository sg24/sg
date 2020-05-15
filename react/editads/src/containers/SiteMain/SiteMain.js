import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LogoSvg from './Logo.svg';
import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainFilter from '../../components/MainFilter/MainFilter';
import Loader from '../../components/UI/Loader/Loader';
import NoAcc from '../../components/Main/NoAcc/NoAcc';
import  { requestPermission } from  './Notification/Notification';

class SiteMain extends Component {
    state = {
        isNotify: true
    }

    componentDidMount() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
              .then(swreg => {
                return swreg.pushManager.getSubscription();
              }).then(sub => {
                if (sub === null) {
                    this.setState({isNotify: false})
                }
              })
        }
    }

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

    askPermissionHandler = ()  => {
       requestPermission().then(() => {
        this.setState({isNotify: true})
       })
    };

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

        if (!this.state.isNotify) {
           checkNotify = (
            <div className="site-main__fm--notify">
            <FontAwesomeIcon 
               icon={['fas', 'bell']} 
               className="icon icon__site-form__fm--notify" />
               To receive or send Notifications to teachers/students, 
               Please click the button 
               <span 
                   className="site-main__fm--notify--enable"
                   onClick={this.askPermissionHandler}>Enable Notification</span>
           </div>
           )
        }
        
        return (
            <div 
            className="site-main site-main__fm" 
            onClick={this.checkHeaderDefault}
            style={{
                    backgroundImage: `url('${LogoSvg}')`,
                    backgroundRepeat: 'repeat',
                    backgroundAttachment: 'fixed'
                }}>
            <div className="site-main__fm--wrapper">
                <div className="wrapper__exmain">
                <Route path={'/edit/advert/:id'} exact component={MainContent} />
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
             { checkNotify }
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
        filterLastPos: state.header.filterLastPos,
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault()),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMain)); 