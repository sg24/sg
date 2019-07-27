import React from 'react';

import Aux from '../../../../hoc/Auxs/Aux';

const navigationList = props => {
    return (
        <Aux>
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
        </Aux>
    );
}

export default navigationList