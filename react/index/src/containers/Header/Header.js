import React, { Component } from 'react';
import { connect } from 'react-redux';

import Logo from '../../components/UI/Logo/Logo';
import NavigationInput from './NavigationInput/NavigationInput';
import NavigationList from './NavigationList/NavigationList'
import NavigationNotify from './NavigationNotify/NavigationNotify'
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import NavigationOptions from '../../components/Navigation/NavigationOptions/NavigationOptions';
import Favorite from './Favorite/Favorite';
import Share from './Share/Share';
import * as actions from '../../store/actions/index';

class Header extends Component {
    render() {
        let addNewClass = ["site-header__add-new"];
        let navOpt = <NavigationOptions />

        if (this.props.expand) {
            addNewClass.push("site-header__add-new--hidden");
            navOpt = null;
        }

        if (this.props.addNew) {
            addNewClass.push("icon--rotate")
        }

        return (
            <header className="site-header">
                <div className="wrapper">
                    <Logo />
                    <NavigationInput />
                    <div className="site-header__form-sm"><i className="fas fa-search icon icon__site-header--search"></i></div>
                    <div className={addNewClass.join(' ')} onClick={this.props.onAddNew}>
                        <h4 className="site-header__add-new--title">Add <i className="fas fa-angle-down icon__site-header--add-new"></i></h4>
                        <NavigationItems 
                            show={this.props.addNew}/>
                    </div>
                    { navOpt }
                    <div className="site-header__menu">
                        <Favorite />
                        <Share />
                        <NavigationNotify />
                        <NavigationList />
                    </div>
                    <div className="site-header__user">
                        <div className="site-header__user--img">
        
                        </div>
                        <ul className="site-header__user--det">
                            <li className="site-header__user--det__portal">
                            <a href="/acc">
                                <div className="site-header__user--det__portal--img"><img src="/" alt="" /></div>
                                My Portal 
                                </a>  
                            </li>
                            <li className="site-header__user--det__acc">
                                <a href="/set">
                                    <div><i className="fas fa-cogs icon icon__site-header--user__set"></i></div>
                                    Account Settings
                                </a>
                            </li>
                            <li className="site-header__user--det__logout">
                                <a href="/logout">
                                    <div><i className="fas fa-angle-double-right icon icon__site-header--user__log"></i> </div>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                    <ul className="site-header__no-acc">
                        <li><a href="/login" className="site-header__no-acc--login"><i className="fas fa-lock icon icon__site-header--no-acc"></i> Login</a></li>
                        <li><a href="/signup" className="site-header__no-acc--sign">Signup</a></li>
                    </ul>
                    
                    <form className="site-header__sm-form">
                        <div className="site-header__sm-form--logo">
                            <div className="site-header__sm-form--logo__graphics">
                                LOGO 
                            </div>
                        </div>
                        <div className="site-header__sm-form--srch">
                        <input type="text" className="site-header__sm-form--srch__input" autoComplete="on" />
                            <div className="site-header__sm-form--srch__icn">
                                <i className="fas fa-search icon icon__site-header--search"></i>
                            </div>
                        </div> 
                        <div className="site-header__sm-form--close">
                            <i className="fas fa-times icon icon__site-header--sm-form__close"></i>
                        </div>
                    </form>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        expand: state.header.expand,
        addNew: state.header.addNew
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNew: () => dispatch(actions.headerAddNew())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);