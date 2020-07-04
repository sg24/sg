import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head'

import * as actions from '../../store/actions/index';
import Logo from '../../components/UI/Logo/Logo';
import Aux from '../../hoc/Auxs/Auxs';
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
        let inputLastElem = document.documentElement.querySelector('.site-header__sm-form--srch__icn');
        this.props.onHeaderFilter(event.target.value, inputElem.offsetLeft, window.innerWidth-inputLastElem.offsetLeft-150);
        this.setState({inputValue: event.target.value})
    }

    render() {
        let addNewClass = ["site-header__add-new"];
        let formSmClass = ["site-header__sm-form"]
        let navOpt = <NavigationOptions />
        let userDet = (
            <ul className="site-header__no-acc site-header__no-acc--visible">
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
        );
        let isAuth = null;

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

        if (this.props.status) {
            userDet = <UserOption /> ;
            isAuth= (
                <Aux>
                    <Favorite />
                    <Share />
                    <NavigationNotify />
                </Aux>
            )
        }

        return (
            <header className="site-header">
                <Head>
                <meta charSet="utf-8" />
                    <meta description="Share knowledge, Acquire new Knowledge, Free Computer based exam, Avertise product, Join and create groups, Add friends and connects with people all over the world" />
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700" />
                    <link rel="icon" type="image/x-icon" href="%PUBLIC_URL%/favicon.ico?v=00B9kxEwyY" />
                    <link rel="apple-touch-icon" href="/icons/sg-icon-apple-180x180.png?v=00B9kxEwyY" sizes="180x180" />
                    <link rel="icon" type="image/png"  sizes="192x192" href="/icons/sg-icon-192x192.png?v=00B9kxEwyY" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=00B9kxEwyY" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=00B9kxEwyY" />
                    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg?v=00B9kxEwyY" color="#5bbad5" />
                    <meta name="apple-mobile-web-app-title" content="slodge24" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                    <meta name="application-name" content="slodge24" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="msapplication-config" content="/favicon/browserconfig.xml?v=00B9kxEwyY" />
                    <meta name="theme-color" content="#ffffff" />
                    <link rel="manifest" href="/manifest.json?v=00B9kxEwyY" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.slodge24.com" />
                    <meta property="og:image" content="https://www.slodge24.com/icons/sg-icon-512x512.png" />
                    <meta property="og:site_name" content="slodge24" />
                    <meta property="og:see_also" content="https://www.slodge24.com/qchat" />
                    <meta property="og:see_also" content="https://www.slodge24.com/group" />
                    <meta property="og:see_also" content="https://www.slodge24.com/advert"  />
                    <meta property="og:see_also" content="https://www.slodge24.com/post" />
                    <meta property="fb:app_id"	content="1419681334861541" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@slodge24" />
                    <meta name="twitter:creator" content="@philipmayowa03"/>
                    <meta name="twitter:title" content="slodge24"  />
                    <meta name="twitter:url" content="https://www.slodge24.com" />
                    <meta name="twitter:image:src" content="https://www.slodge24.com/icons/sg-icon-512x512.png" />
                    <title>S lodge24</title>
                </Head>
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
                        { isAuth }
                        <NavigationList />
                    </div>

                    { userDet }
                    
                    <form className={formSmClass.join(' ')}>
                        <div className="site-header__sm-form--logo">
                            <div className="site-header__sm-form--logo__graphics">
                                <Logo /> 
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
        hideFormSm: state.header.hideFormSm,
        status: state.auth.status
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNew: () => dispatch(actions.headerAddNew()),
        onShowForm: () => dispatch(actions.headerFormSm()),
        onHeaderFilter: (filterCnt, filterPos, filterLastPost) => dispatch(actions.headerFilterInit(filterCnt, filterPos, filterLastPost)),
        onCloseHeaderFilter: () => dispatch(actions.headerFilterClose())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);