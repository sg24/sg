import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './User.css';

const User = props => {
    return (
        <div className="reuse-prf">
            <div className="reuse-prf__user">
                <div className="reuse-prf__user--img">
                    <div className="reuse-prf__user--img__wrapper">

                    </div>
                    <div className="reuse-prf__user--img__status">
                        {/* {{!-- <div class="reuse-prf__user--img__status--on"></div> online --}} */}
                        <div className="reuse-prf__user--img__status--off"></div> 3m ago
                    </div>
                </div>
                <div className="reuse-prf__user--det">
                    <div className="reuse-prf__user--det__name">TheUser User</div>
                    <ul className="reuse-prf__user--det__exp">
                        <li>Expertise : </li>
                        <li>Poem</li>
                        <li>Prose</li>
                        <li>Poet</li>
                        <li>Poem</li>
                        <li>Prose</li>
                        <li>Poet</li>
                        <li>Poem</li>
                        <li>Prose</li>
                        <li>Poet</li>
                        <li>Poem</li>
                        <li>Prose</li>
                    </ul>
                    <ul className="reuse-prf__user--det__opt">
                        <li className="reuse-prf__user--det__opt--chat">
                            <div>
                                <FontAwesomeIcon 
                                    icon={['fas', 'comment-alt']} 
                                    className="icon icon__reuse-prf--comment" />
                            </div> 
                            Chat
                        </li>
                        <li className="reuse-prf__user--det__opt--add">
                            <div>
                                <FontAwesomeIcon 
                                    icon={['fas', 'plus']} 
                                    className="icon icon__reuse-prf--add" />    
                            </div> 
                            Add
                        </li>
                    </ul>
                </div>
            </div>
            <div className="reuse-prf__about">
                <span className="reuse-prf__about--title">
                About Me
                </span>
                <div className="reuse-prf__about--cnt">
                    Just always ready to assits and to share my knowledge
                    Just always ready to assits and to share my knowledge
                    Just always ready to assits and to share my knowledge
                    Just always ready to assits and to share my knowledge
                    Just always ready to assits and to share my knowledge
                </div>
            </div>
            {/* {{!-- <ul className="reuse-prf__tab">
                <li>Details</li>
                <li><div><i className="fas fa-store icon icon__reuse-prf--tab"></i></div> Reviews</li>
            </ul> --}} */}
            <div className="reuse-prf__outlet">
                <div class="reuse-prf__det">
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'user']} 
                                className="icon icon__reuse-prf--user" />    
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__sntaccept"> Student Accepted <span>2222</span></li>
                            <li className="reuse-prf__det--cnt__sntreject"> Student Rejected <span>0</span></li>
                        </ul>
                    </div>
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'coffee']} 
                                className="icon icon__reuse-prf--onlineque" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__onlineque"> Online Questions <span>222K</span></li>
                        </ul>
                    </div>
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'edit']} 
                                className="icon icon__reuse-prf--que" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li class="reuse-prf__det--cnt__que"> Questions Answered <span>222K</span></li>
                        </ul>
                    </div>
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'clone']} 
                                className="icon icon__reuse-prf--pt" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__pt"> Post Published <span>222K</span></li>
                        </ul>
                    </div>
                        <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn">
                            <FontAwesomeIcon 
                                icon={['fas', 'users']} 
                                className="icon icon__reuse-prf--grp" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__grp"> Groups <span>222K</span></li>
                        </ul>
                    </div>
                    <div className="reuse-prf__det--wrapper">
                        <div className="reuse-prf__det--icn reuse-prf__det--icn__itm">
                            <FontAwesomeIcon 
                                icon={['fas', 'store']} 
                                className="icon icon__reuse-prf--itm" /> 
                        </div>
                        <ul className="reuse-prf__det--cnt">
                            <li className="reuse-prf__det--cnt__itm"> Items in stock <span>222K</span></li>
                        </ul>
                    </div>
                </div>
                <div className="reuse-prf__rev">
                    <div className="reuse-prf__rev--wrapper">
                        <div className="reuse-prf__rev--img">
                            
                        </div>
                        <div className="reuse-prf__rev--name">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;