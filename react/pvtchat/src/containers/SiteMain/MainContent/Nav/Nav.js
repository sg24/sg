import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Nav.css';
import Users from '../../../../components/Main/Users/Users';
import * as actions from '../../../../store/actions/index';
import Loader from '../../../../components/UI/Loader/Loader';

class Nav extends Component {
    state = {
        showNewTab: false,
        curTab: 'online',
        inputValue: '',
        users: []
    }

    componentDidUpdate() {  
        if (this.state.showNewTab) {
            this.props.onChangeTab(this.state.curTab)
            this.setState({showNewTab: false})
        }

        if (this.props.filterUser && (JSON.stringify(this.state.users) !== JSON.stringify(this.props.filterUser))) {
            this.setState({users: this.props.filterUser})
        }
     
        if (!this.props.filterUser && this.props.navCnt && (JSON.stringify(this.state.users) !== JSON.stringify(this.props.navCnt.users))) {
            this.setState({users: this.props.navCnt.users})
        }
    }

    changeTabHandler = (newtab) => { 
        let curTab = null;
        curTab =  newtab === 'online' ? newtab : curTab;
        curTab =  newtab === 'offline' ? newtab : curTab;
        this.setState({curTab, showNewTab: true})
    }

    filterContentHandler = (event) => {
        if (this.props.navCnt && this.props.navCnt.users ) {
            this.setState({inputValue: event.target.value})
            this.props.onFilterUser(this.props.navCnt.users, event.target.value);
        }
    }

    closeSideNavHandler = () => {
        this.props.onCloseSideNav();
    }

    render() {
        let header = 'Teachers';
        let users = <Loader 
            nav/>;
        let navClass = ["site-main__chat--nav"];

        let tabOpt = (
            <>
                <li 
                    className={this.state.curTab === 'online' ? "site-main__chat--nav__cnt--tab__active site-main__chat--nav__cnt--tab__active-on" : null}
                    onClick={this.changeTabHandler.bind(this, 'online')}> Online</li>
                <li
                    className={this.state.curTab === 'offline' ? "site-main__chat--nav__cnt--tab__active site-main__chat--nav__cnt--tab__active-off" : null}
                    onClick={this.changeTabHandler.bind(this, 'offline')}>Offline</li>
            </>
        )

        if (this.props.showSideNav) {
            navClass.push('site-main__chat--nav__visible')
        }

        if (this.props.match.params.categ === 'user') {
            header =''
            tabOpt = (
                <li className="site-main__chat--nav__cnt--tab__conv"> Conversation </li>
            )
        }

        if (this.state.users && this.props.navCnt && this.props.navCnt.users && this.props.navCnt.users) {
            users = (
                <Users 
                content={this.state.users}
                typing={this.props.typing}/>
            )
        }

        return (
            <div 
                className={navClass.join(' ')}>
            <div className="site-main__chat--nav__wrapper">
                <div className="site-main__chat--nav__shad"></div>
                <div 
                    className="site-main__chat--nav__close"
                    onClick={this.closeSideNavHandler}>
                    <FontAwesomeIcon  icon={['fas', 'times']} className="icon icon__site-main--chat__nav--close"/>
                </div> 
                <div className="site-main__chat--nav__header site-main__chat--nav__header--teach">
                    <div className="site-main__chat--nav__header--det">
                        <div className="site-main__chat--nav__header--det__on">
                            { this.props.navCnt && this.props.navCnt.online ? this.props.navCnt.online : 0 }
                        </div>
                        <div className="site-main__chat--nav__header--det__off">
                            { this.props.navCnt && this.props.navCnt.offline ? this.props.navCnt.offline : 0 }
                        </div>
                        <h4 className="site-main__chat--nav__header--det__title site-main__chat--nav__header--det__title--teach">
                            { header }
                        </h4>
                    </div>
                    <div className="site-main__chat--nav__header--srch">
                        <input 
                            type="text" 
                            className="site-main__chat--nav__header--srch__input" 
                            placeholder="Search Users"
                            value={this.state.inputValue}
                            onChange={this.filterContentHandler} />
                        <div>
                            <FontAwesomeIcon  icon={['fas', 'search']} className="icon icon__site-main--chat__nav--srch"/>
                        </div>
                    </div>
                </div>

                <div className="site-main__chat--nav__cnt">
                    <div className="site-main__chat--nav__cnt--wrapper">
                        <ul className="site-main__chat--nav__cnt--tab site-main__chat--nav__cnt--tab__rm">
                            { tabOpt }
                        </ul> 
                        <div className="site-main__chat--nav__cnt--user">
                            { users }
                        </div>
                    </div>
                </div>
                <div className="site-main__chat--nav__footer">
                </div>
            </div>
        </div>
        )
    }
};


const mapStateToProps = state => {
    return {
        cnt: state.cnt.cnts,
        navCnt: state.cnt.navCnt,
        typing: state.cnt.typing,
        memberLoader: state.cnt.memberLoader,
        filterUser: state.cnt.filterUser,
        showSideNav: state.cnt.showSideNav
    };
 }

 const mapDispatchToProps = dispatch => {
     return {
        onChangeTab: (curTab) => dispatch(actions.changeTab(curTab)),
        onFilterUser: (users,filterContent) => dispatch(
            actions.filterUserInit(users, filterContent)),
        onCloseSideNav: () => dispatch(actions.closeSideNav())
     };
 };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav)); 