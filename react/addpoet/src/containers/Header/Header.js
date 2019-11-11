import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../store/actions/index';
import Logo from '../../components/UI/Logo/Logo';
import NavigationInput from './NavigationInput/NavigationInput';
import NavigationList from './NavigationList/NavigationList'
import NavigationNotify from './NavigationNotify/NavigationNotify'
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import NavigationOptions from '../../components/Navigation/NavigationOptions/NavigationOptions';
import Favorite from './Favorite/Favorite';
import Share from './Share/Share';
import UserOption from './UserOption/UserOption'; 

class Header extends Component {
    state = {
        showFormSm: false,
        default: false,
        inputValue: ''
    }

    componentDidUpdate() {
        if (this.state.showFormSm && !this.state.default && this.props.hideFormSm) {
            this.setState({
                showFormSm: false,
                inputValue: '',
                default: true,
            })
        }
    }

    showFormSmHandler = () => {
        this.setState((prevState, props) => {
            return {
                showFormSm: !prevState.showFormSm,
                default: false,
                inputValue: ''
            }
        });
        this.props.onShowForm();
        this.props.onCloseHeaderFilter();
    }

    filterContentHandler = (event) => {
        let inputElem = document.documentElement.querySelector('.site-header__sm-form--srch');
        this.props.onHeaderFilter(event.target.value, inputElem.offsetLeft);
        this.setState({inputValue: event.target.value})
    }

    render() {
        let addNewClass = ["site-header__add-new"];
        let formSmClass = ["site-header__sm-form"]
        let navOpt = <NavigationOptions />

        if (this.props.expand) {
            addNewClass.push("site-header__add-new--hidden");
            navOpt = null;
        }

        if (this.state.showFormSm  && !this.props.hideFormSm) {
            formSmClass.push('site-header__sm-form--visible')
        }

        if (this.props.addNew) {
            addNewClass.push("icon--rotate")
        }

        return (
            <header className="site-header">
                <div className="wrapper">
                    <Logo />
                    <NavigationInput />
                    <div 
                        className="site-header__form-sm"
                        onClick={this.showFormSmHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'search']} 
                            className="icon icon__site-header--search" /> 
                    </div>
                    <div className={addNewClass.join(' ')} onClick={this.props.onAddNew}>
                        <h4 className="site-header__add-new--title">
                            Add 
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-down']} 
                                className="icon__site-header--add-new" /> 
                        </h4>
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
                    <UserOption /> 
                    <ul className="site-header__no-acc">
                        <li>
                            <a href="/login" className="site-header__no-acc--login">
                                <FontAwesomeIcon 
                                    icon={['fas', 'lock']} 
                                    className="icon icon__site-header--no-acc" /> 
                                Login
                            </a>
                        </li>
                        <li><a href="/signup" className="site-header__no-acc--sign">Signup</a></li>
                    </ul>
                    
                    <form className={formSmClass.join(' ')}>
                        <div className="site-header__sm-form--logo">
                            <div className="site-header__sm-form--logo__graphics">
                                LOGO 
                            </div>
                        </div>
                        <div className="site-header__sm-form--srch">
                        <input 
                            type="text" 
                            className="site-header__sm-form--srch__input" 
                            autoComplete="on"
                            onChange={this.filterContentHandler}
                            value={this.state.inputValue} />
                            <div className="site-header__sm-form--srch__icn">
                                <FontAwesomeIcon 
                                    icon={['fas', 'search']} 
                                    className="icon icon__site-header--search" /> 
                            </div>
                        </div> 
                        <div 
                            className="site-header__sm-form--close"
                            onClick={this.showFormSmHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'times']} 
                                className="icon icon__site-header--sm-form__close" /> 
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
        addNew: state.header.addNew,
        hideFormSm: state.header.hideFormSm
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNew: () => dispatch(actions.headerAddNew()),
        onShowForm: () => dispatch(actions.headerFormSm()),
        onHeaderFilter: (filterCnt, filterPos) => dispatch(actions.headerFilterInit(filterCnt, filterPos)),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);