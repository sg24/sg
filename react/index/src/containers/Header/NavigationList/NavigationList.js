import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import NavigationLists from '../../../components/Navigation/NavigationLists/NavigationLists';

class NavigationList extends Component {
    state = {
        show: false,
        showNavList: false,
        default: false
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

    fetchNavListHandler = () => {
        this.props.onFetchNavList();
        this.setState((prevState, props) => {
            return {
                show: false,
                default: false,
                showNavList: !prevState.showNavList
            }
        });
    }

    render() {
        let navTipClass = ["site-header__tool-tip site-header__tool-tip--nav"];
        let navClass = ["site-header__menu--nav__opt"];
        let navList = null;

        if (this.state.show) {
            navTipClass.push("site-header__tool-tip--nav__visible")
        }

        if (this.props.navList && this.state.showNavList) {
            navClass.push("site-header__menu--nav__opt__visible");
            navList = <NavigationLists 
                content={this.props.navList}/>
        }

        return (
            <div className="site-header__menu--nav">
                <div 
                    className="site-header__menu--nav__icn"
                    onMouseEnter={this.showNavTipHandler}
                    onMouseLeave={this.hidNavTipHandler}
                    onClick={this.fetchNavListHandler}>
                    <i className="fas fa-bars icon icon__site-header--list"></i>
                </div>
                <div className={navTipClass.join(' ')}>
                    Options
                </div>
                <nav className={navClass.join(' ')}>
                    { navList }
                    <ul className="site-header__menu--nav__opt--itm">
                        <li
                            onClick={}><i className="fas fa-clone icon icon__site-header--nav__itm"></i> Post <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                        <li><i className="fas fa-clone icon icon__site-header--nav__itm"></i> Questions <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                        <li><i className="fas fa-coffee icon icon__site-header--nav__itm"></i> Online Exam <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                        <li><i className="fas fa-users icon icon__site-header--nav__itm"></i> Group <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                        <li><i className="fas fa-book icon icon__site-header--nav__itm"></i> Poet/Writers <i className="fas fa-caret-right icon icon__site-header--nav__angle"></i></li>
                    </ul>
                </nav> 
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
       navList: state.header.navList,
       hidNavList: state.header.hidNavList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchNavPt: () => dispatch(actions.fetchNavlistInit())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationList);