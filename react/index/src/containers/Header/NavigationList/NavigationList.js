import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import NavigationLists from '../../../components/Navigation/NavigationLists/NavigationLists';

class NavigationList extends Component {
    state = {
        show: false,
        showNavList: false,
        default: false,
        category: null
    };

    componentDidUpdate() {
        if (this.state.showNavList && !this.state.default && this.props.hidNavList) {
            this.setState({
                default: true,
                show: false,
                showNavList: false
            });
        }
    }

    showNavTipHandler = () => {
       if (!this.state.showNavList) {
        this.setState({
            show: true
        });
       }
    }

    hidNavTipHandler = () => {
        this.setState({
            show: false
        });
    }

    showNavListHandler = () => {
        this.props.onshowNavList();
        this.setState((prevState, props) => {
            return {
                show: false,
                default: false,
                showNavList: !prevState.showNavList
            }
        });
    }

    fetchNavListHandler = (category) => {
        this.props.onFetchNavList(category);
        this.setState({category})
    }

    render() {
        let navTipClass = ["site-header__tool-tip site-header__tool-tip--nav"];
        let navClass = ["site-header__menu--nav__opt"];
        let navList = null;
        let navOptClass = ["site-header__menu--nav__opt--det"];

        if (this.state.show) {
            navTipClass.push("site-header__tool-tip--nav__visible")
        }

        if (this.state.showNavList) {
            navClass.push("site-header__menu--nav__opt--visible");
        }

        if (this.props.navList && this.state.showNavList) {
            let navOptCateg = this.state.category === 'post' ? 'site-header__menu--nav__opt--det__pt' : null;
            navOptCateg = this.state.category === 'question' ? 'site-header__menu--nav__opt--det__que' : navOptCateg;
            navOptCateg = this.state.category === 'onlineque' ? 'site-header__menu--nav__opt--det__onlineque' : navOptCateg;
            navOptCateg = this.state.category === 'group' ? 'site-header__menu--nav__opt--det__grp' : navOptCateg;
            navOptCateg = this.state.category === 'poet' ? 'site-header__menu--nav__opt--det__pwt' : navOptCateg;
            navOptClass.push(navOptCateg);
            navList = (
                <ul className={navOptClass.join(' ')}>
                    <NavigationLists 
                        content={this.props.navList}
                        category={this.props.navListCateg}/>
                </ul>
            );
        }

        return (
            <div className="site-header__menu--nav">
                <div 
                    className="site-header__menu--nav__icn"
                    onMouseEnter={this.showNavTipHandler}
                    onMouseLeave={this.hidNavTipHandler}
                    onClick={this.showNavListHandler}>
                    <i className="fas fa-bars icon icon__site-header--list"></i>
                </div>
                <div className={navTipClass.join(' ')}>
                    Options
                </div>
                <nav className={navClass.join(' ')}>
                    { navList }
                    <ul className="site-header__menu--nav__opt--itm">
                        <li
                            onMouseEnter={this.fetchNavListHandler.bind(this, 'post')}><i className="fas fa-clone icon icon__site-header--nav__itm"></i> Post <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                        <li
                            onMouseEnter={this.fetchNavListHandler.bind(this, 'question')}><i className="fas fa-clone icon icon__site-header--nav__itm"></i> Questions <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                        <li
                            onMouseEnter={this.fetchNavListHandler.bind(this, 'onlineque')}><i className="fas fa-coffee icon icon__site-header--nav__itm"></i> Online Exam <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                        <li
                            onMouseEnter={this.fetchNavListHandler.bind(this, 'group')}><i className="fas fa-users icon icon__site-header--nav__itm"></i> Group <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                        <li
                            onMouseEnter={this.fetchNavListHandler.bind(this, 'poet')}><i className="fas fa-book icon icon__site-header--nav__itm"></i> Poet/Writers <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                    </ul>
                </nav> 
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
       navListCateg: state.header.navListCateg,
       navList: state.header.navList,
       hidNavList: state.header.hidNavList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onshowNavList: () => dispatch(actions.showNavList()),
        onFetchNavList: (category) => dispatch(actions.fetchNavlistInit(category))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationList);