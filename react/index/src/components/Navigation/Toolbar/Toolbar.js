import React from 'react';

const toolbar = props => (
    <header className="site-header">
        <div className="wrapper">
            <div className="site-header__logo">
                <div className="site-header__logo--graphics">
                    LOGO
                </div>
            </div>
            <form className="site-header__form">
                <input type="text" className="site-header__form--input" autoComplete="on" />
                <div className="site-header__form--search">
                    <i className="fas fa-search icon icon__site-header--search"></i>
                </div>
            </form>
            <div className="site-header__form-sm"><i className="fas fa-search icon icon__site-header--search"></i></div>
            <div className="site-header__add-new">
                <h4 className="site-header__add-new--title">Add <i className="fas fa-angle-down icon__site-header--add-new"></i></h4>
                <ul className="site-header__add-new--opt">
                    <li><a href="/">Post</a></li>
                    <li><a href="/">Question</a></li>
                    <li><a href="/">Group</a></li>
                    <li><a href="/">Timed Question</a></li>
                    <li><a href="/">Answer</a></li>
                    <li><a href="/">Poet/Writer</a></li>
                </ul>
            </div>
            <ul className="site-header__nav-opt">
                <li><a href="/">Question</a></li>
                <li><a href="/">Post</a></li>
                <li><a href="/">chat</a></li>
                <li><a href="/">Poet/Writer</a></li>
            </ul>
            <div className="site-header__menu">
                <a className="site-header__menu--fav" href="/">
                    <i className="fas fa-heart icon icon__site-header--favorites"></i>
                    <div className="site-header__tool-tip site-header__tool-tip--fav">
                        Favorites 
                    </div>
                </a>
                <a className="site-header__menu--share" href="/">
                    <div className="active__main active__main--header">
                        <div>9</div>
                    </div>
                    <i className="fas fa-location-arrow icon icon__site-header--shares"></i>
                    <div className="site-header__tool-tip site-header__tool-tip--share">
                        Shared with me
                    </div>
                </a> 
                <div className="site-header__menu--notify">
                    <div className="active__main active__main--header site-header__menu--notify__num">
                        <div>9</div>
                    </div>
                    <div className="site-header__menu--notify__icn"><i className="fas fa-bell icon icon__site-header--bell"></i></div>
                    <div className="site-header__tool-tip site-header__tool-tip--notify">
                        Notifications
                    </div>
                    <div className="site-header__menu--notify__cnt">
                        <div className="site-header__menu--notify__cnt--set"><i className="fas fa-cogs icon icon__site-header--notify__set"></i></div>
                        <div className="site-header__menu--notify__cnt--det">
                            {/* {{> partialtrd}} */}
                        </div>
                    </div>
                </div>
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
            </div>
            <div className="site-header__user">
                <div className="site-header__user--img">

                </div>
                <ul className="site-header__user--det">
                    <li className="site-header__user--det__portal">
                    <a href="/">
                        <div className="site-header__user--det__portal--img"><img src="/" alt="" /></div>
                        My Portal 
                        </a>  
                    </li>
                    <li className="site-header__user--det__acc">
                        <a href="/">
                            <div><i className="fas fa-cogs icon icon__site-header--user__set"></i></div>
                            Account Settings
                        </a>
                    </li>
                    <li className="site-header__user--det__logout">
                        <a href="/">
                            <div><i className="fas fa-angle-double-right icon icon__site-header--user__log"></i> </div>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            <ul className="site-header__no-acc">
                <li><a href="/" className="site-header__no-acc--login"><i className="fas fa-lock icon icon__site-header--no-acc"></i> Login</a></li>
                <li><a href="/" className="site-header__no-acc--sign">Signup</a></li>
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

export default toolbar;