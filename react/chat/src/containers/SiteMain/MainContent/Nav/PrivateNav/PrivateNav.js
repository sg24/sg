import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PrivateNav extends Component {
    render() {
        return (
        <div className="site-main__chat--nav">
            <div className="site-main__chat--nav__wrapper">
                <div className="site-main__chat--nav__shad"></div>
                <div className="site-main__chat--nav__close">
                    <FontAwesomeIcon  icon={['fas', 'times']} className="icon icon__site-main--chat__nav--close"/>
                </div> 
                <div className="site-main__chat--nav__header site-main__chat--nav__header--teach">
                    <div className="site-main__chat--nav__header--det">
                        <div className="site-main__chat--nav__header--det__on">
                            22 
                        </div>
                        <div className="site-main__chat--nav__header--det__off">
                            22
                        </div>
                        <h4 className="site-main__chat--nav__header--det__title site-main__chat--nav__header--det__title--teach">
                            Teachers
                        </h4>
                    </div>
                    <div className="site-main__chat--nav__header--srch">
                        <input type="text" className="site-main__chat--nav__header--srch__input" placeholder="Search Users" />
                        <div>
                            <FontAwesomeIcon  icon={['fas', 'search']} className="icon icon__site-main--chat__nav--srch"/>
                        </div>
                    </div>
                </div>

                <div className="site-main__chat--nav__cnt">
                    <div className="site-main__chat--nav__cnt--wrapper">
                        <ul className="site-main__chat--nav__cnt--tab site-main__chat--nav__cnt--tab__rm">
                            <li className="site-main__chat--nav__cnt--tab__active">
                                Online
                            </li>
                            <li>Offline</li>
                        </ul> 
                        <div className="site-main__chat--nav__cnt--user">
                            <div className="site-main__chat--nav__cnt--user__wrapper">
                                <div className="site-main__chat--nav__cnt--user__img">
                                    <img src="/" alt=""/>
                                {/* {{!-- <div className="site-main__chat--nav__cnt--user__img--status site-main__chat--nav__cnt--user__img--status__on"></div> --}} */}
                                    <div className="site-main__chat--nav__cnt--user__img--status site-main__chat--nav__cnt--user__img--status__off"></div>
                                </div>
                                <ul className="site-main__chat--nav__cnt--user__det">
                                    <li><a href="">User user <span>@ 2m ago</span></a></li>
                                    <li><a href="">Pls do you know the response Pls do you i know the response</a></li>
                                </ul>
                            </div>
                            <div className="site-main__chat--nav__cnt--user__wrapper">
                                <div className="site-main__chat--nav__cnt--user__img">
                                    <img src="/" alt="" />
                                    <div className="site-main__chat--nav__cnt--user__img--status site-main__chat--nav__cnt--user__img--status__on"></div>
                                    {/* {{!-- <div className="site-main__chat--nav__cnt--user__img--status site-main__chat--nav__cnt--user__img--status__off"></div> --}} */}
                                </div>
                                <ul className="site-main__chat--nav__cnt--user__det">
                                    <li><a href="">User user</a></li>
                                    {/* {{!-- <li><a href="">Pls do you know the response Pls do you i know the response</a></li> --}} */}
                                    <li><a href=""><span>Typing . . .</span></a></li>
                                </ul>
                            </div>
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

export default PrivateNav;