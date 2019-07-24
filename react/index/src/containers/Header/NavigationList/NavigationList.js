import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class NavigationOpt extends Component {

    render() {

        return (
            <div className="site-header__menu--nav">
                <div className="site-header__menu--nav__icn">
                    <i className="fas fa-bars icon icon__site-header--list"></i>
                </div>
                <div className="site-header__tool-tip site-header__tool-tip--nav">
                    Options
                </div>
                <nav className="nav">
                    <div className="nav__wrapper">
                        <div className="nav__pt">
                            <h4>
                                <i className="fas fa-clone icon icon__site-header--nav__itm"></i> Post
                                <span><i className="fas fa-angle-down icon icon__site-header--nav__angle"></i></span>
                            </h4>
                            <ul>
                                <li><a href="/post/news">News</a></li>
                                <li><a href="/">Social</a></li>
                                <li><a href="/">Entertainment</a></li>
                            </ul>
                        </div>
                        <div className="nav__que">
                            <h4>
                                <i className="fas fa-clone icon icon__site-header--nav__itm"></i> Questions
                                <span><i className="fas fa-angle-down icon icon__site-header--nav__angle"></i></span>
                            </h4>
                            <ul>
                                <li><a href="/">News</a></li>
                                <li><a href="/">Social</a></li>
                                <li><a href="/">Entertainment</a></li>
                            </ul>
                        </div>
                        <div className="nav__online-que">
                            <h4>
                                <i className="fas fa-coffee icon icon__site-header--nav__itm"></i> Online Exam
                                <span><i className="fas fa-angle-down icon icon__site-header--nav__angle"></i></span>
                            </h4>
                            <ul>
                                <li><a href="/">News</a></li>
                                <li><a href="/">Social</a></li>
                                <li><a href="/">Entertainment</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="nav__wrapper"> 
                        <div className="nav__grp">
                            <h4>
                                <i className="fas fa-users icon icon__site-header--nav__itm"></i> Group
                                <span><i className="fas fa-angle-down icon icon__site-header--nav__angle"></i></span>
                            </h4>
                            <ul>
                                <li><a href="/">News</a></li>
                                <li><a href="/">Social</a></li>
                                <li><a href="/">Entertainment</a></li>
                            </ul>
                        </div>
                        <div className="nav__pwt">
                            <h4>
                                <i className="fas fa-book icon icon__site-header--nav__itm"></i> Poet/Writers
                                <span><i className="fas fa-angle-down icon icon__site-header--nav__angle"></i></span>
                            </h4>
                            <ul>
                                <li><a href="/">News</a></li>
                                <li><a href="/">Social</a></li>
                                <li><a href="/">Entertainment</a></li>
                            </ul>
                        </div>
                        <div className="nav__other">
                            <h4>
                                <i className="fas fa-book icon icon__site-header--nav__itm"></i> Others
                                <span><i className="fas fa-angle-down icon icon__site-header--nav__angle"></i></span>
                            </h4>
                            <ul>
                                <li><a href="/">News</a></li>
                                <li><a href="/">Social</a></li>
                                <li><a href="/">Entertainment</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="nav__wrapper"> 
                        <div className="nav__other-sm">
                            <h4>
                                <i className="fas fa-book icon icon__site-header--nav__itm"></i> Others
                                <span><i className="fas fa-angle-down icon icon__site-header--nav__angle"></i></span>
                            </h4>
                            <ul>
                                <li><a href="/">News</a></li>
                                <li><a href="/">Social</a></li>
                                <li><a href="/">Entertainment</a></li>
                            </ul>
                        </div>
                        <div className="nav__online-que-sm"> 
                            <h4>
                                <i className="fas fa-coffee icon icon__site-header--nav__itm"></i> Online Exam
                                <span><i className="fas fa-angle-down icon icon__site-header--nav__angle"></i></span>
                            </h4>
                            <ul>
                                <li><a href="/">News</a></li>
                                <li><a href="/">Social</a></li>
                                <li><a href="/">Entertainment</a></li>
                            </ul>
                        </div>
                    </div>
                </nav> 
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationOpt);