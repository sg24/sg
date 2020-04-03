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
        users: [],
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
    }

    componentDidMount() {
        this.props.onFetchMember(this.state.id, this.state.categ)
    }

    componentDidUpdate() {  
        if (this.state.showNewTab) {
            this.props.onChangeTab(this.state.curTab)
            this.setState({showNewTab: false})
        }

        if (this.props.filterUser && (JSON.stringify(this.state.users) !== JSON.stringify(this.props.filterUser))) {
            this.setState({users: this.props.filterUser})
        }
     
        if (!this.props.filterUser && this.props.member && (JSON.stringify(this.state.users) !== JSON.stringify(this.props.member))) {
            this.setState({users: this.props.member})
        }
    }

    filterContentHandler = (event) => {
        if (this.props.member) {
            this.setState({inputValue: event.target.value})
            this.props.onFilterUser(this.props.member, event.target.value);
        }
    }

    closeSideNavHandler = () => {
        this.props.onCloseSideNav();
    }

    render() {
        let header = ' ';
        let users = <Loader 
            nav/>;
        let navClass = ["site-main__chat--nav"];

        let tabOpt = (
            <li className="site-main__chat--nav__cnt--tab__conv"> Conversation </li>
        )

        if (this.props.showSideNav) {
            navClass.push('site-main__chat--nav__visible')
        }

        if (this.state.users && this.props.member) {
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
                            { this.props.online }
                        </div>
                        <div className="site-main__chat--nav__header--det__off">
                            { this.props.offline }
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
        member: state.cnt.members,
        typing: state.cnt.typing,
        offline: state.cnt.offline,
        online: state.cnt.online,
        memberLoader: state.cnt.memberLoader,
        filterUser: state.cnt.filterUser,
        showSideNav: state.cnt.showSideNav
    };
 }

 const mapDispatchToProps = dispatch => {
     return {
        onFetchMember: (id, categ) => dispatch(actions.fetchMemberInit(id, categ)),
        onFilterUser: (users,filterContent) => dispatch(
            actions.filterUserInit(users, filterContent)),
        onCloseSideNav: () => dispatch(actions.closeSideNav())
     };
 };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav)); 