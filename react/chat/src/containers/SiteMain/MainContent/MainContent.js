import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Main from './Main/Main';
import Nav from './Nav/Nav';

class MainContent extends Component {
    render() {
        return (
            <div className="site-main__chat">
                <div className="site-main__chat--overlay"></div>
                <div className="site-main__chat--cnt-overlay"></div>
                <div className="site-main__chat--main">
                    <div className="site-main__chat--main__wrapper">
                        <Main />
                        <ul className="site-main__chat--opt">
                            <li ><FontAwesomeIcon  icon={['far', 'trash-alt']} className="icon icon icon__site-main--chat__header--opt"/></li>
                            <li className="site-main__chat--opt__edit"><FontAwesomeIcon  icon={['far', 'edit']} className="icon icon__site-main--chat__header--opt"/></li>
                            <li className="site-main__chat--opt__fav"><FontAwesomeIcon  icon={['far', 'heart']} className="icon icon__site-main--chat__header--opt__fav"/></li>
                            <li className="site-main__chat--opt__share"><FontAwesomeIcon  icon={['fas', 'location-arrow']} className="icon icon icon__site-main--chat__header--opt"/></li>
                        </ul>

                        <div className="site-main__chat--box">
                            <div className="site-main__chat--box__wrapper">  
                                <div className="site-main__chat--box__date">
                                    <div className="site-main__chat--box__date--cur">today</div> 
                                </div>
                                <div className="site-main__chat--box__hst">
                                    <div className="site-main__chat--box__hst--wrapper">
                                        <div className="site-main__chat--box__hst--cnt">
                                            Am i speaking with the guy n red today?
                                            immediate response pls... 
                                            Am i speaking with the guy n red today?
                                            immediate response pls... 
                                            Am i speaking with the guy n red today?
                                            immediate response pls... 
                                        </div>
                                        <ul className="site-main__chat--box__hst--footer">
                                            <li className="site-main__chat--box__hst--footer__chat-tm">11: 12pm</li>
                                            <li className="site-main__chat--box__hst--footer__user">
                                                <a href="">user user</a>   
                                                <div className="site-main__chat--box__hst--footer__user--img">
                                                    <img src="/" alt="" />
                                                    <div className="site-main__chat--box__hst--footer__user--img__status site-main__chat--box__hst--footer__user--img__status--on">
                                                    </div>
                                                    {/* {{!-- <div className="site-main__chat--box__hst--footer__user--img__status site-main__chat--box__hst--footer__user--img__status--off">
                                                    </div> --}} */}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="site-main__chat--box__reply">
                                    <div className="site-main__chat--box__reply--wrapper">
                                        <div className="site-main__chat--box__reply--cnt">
                                            Sure i am the one that was speaking with you yesterday,
                                                do you remember pls ?
                                        </div>
                                        <ul className="site-main__chat--box__reply--footer">
                                            <li className="site-main__chat--box__reply--footer__user">
                                                <a href="">user user</a> 
                                                <div className="site-main__chat--box__reply--footer__user--img">
                                                    <img src="/" alt="" />
                                                    {/* {{!-- <div className="site-main__chat--box__reply--footer__user--img__status site-main__chat--box__reply--footer__user--img__status--on">
                                                    </div> --}} */}
                                                    <div className="site-main__chat--box__reply--footer__user--img__status site-main__chat--box__reply--footer__user--img__status--off">
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="site-main__chat--box__reply--footer__chat-tm">11: 12pm</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="site-main__chat--box__usr-typing">
                                    <div className="site-main__chat--box__usr-typing--cir-up"></div>
                                    <div className="site-main__chat--box__usr-typing--cir-dwn"></div>
                                    <div className="site-main__chat--box__usr-typing--cir-up"></div>
                                    <div className="site-main__chat--box__usr-typing--cir-dwn"></div>
                                    <div className="site-main__chat--box__usr-typing--cir-up"></div>
                                    <div className="site-main__chat--box__usr-typing--cir-dwn"></div>
                                </div>
                            </div>
                        </div>

                        <div className="site-main__chat--srch">
                            <div className="site-main__chat--srch__wrapper">
                                <div className="site-main__chat--srch__close">
                                    <FontAwesomeIcon  icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                                </div>
                                <div className="site-main__chat--srch__cnt">
                                    <div className="site-main__chat--srch__cnt--calend">
                                        <FontAwesomeIcon icon={['far', 'calendar-alt']} className="icon icon__site-main--chat__srch--calend"/>
                                    </div>
                                    <input type="text" placeholder="search chat" className="site-main__chat--srch__cnt--input"/>
                                </div>
                            </div>
                        </div> 

                        <div className="site-main__chat--grp">
                            <div className="site-main__chat--grp__wrapper">
                                <div className="site-main__chat--grp__close">
                                    <span>close</span>
                                    <div className="site-main__chat--grp__close--wrapper">
                                        <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                                    </div>
                                </div>
                                <input type="text" className="site-main__chat--grp__input" placeholder="Enter group name..."/>
                                <div className="site-main__chat--grp__cnt">
                                    <div className="reuse-grp-chat">
                                        <div className="active__main active__main--chat-cnt"><div>9</div></div>
                                        <div className="reuse-grp-chat__img"><img src="/" alt=""/></div>
                                        <ul className="reuse-grp-chat__det">
                                            <li className="reuse-grp-chat__det--title"><a href="">The real community for programmers The real community for programmers The real community for programmers</a></li>
                                            <li className="reuse-grp-chat__det--last-msg">Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while</li>
                                            <li className="reuse-grp-chat__det--status"><div className="reuse-grp-chat__det--status__on"> online <span>22k</span></div> <div className="reuse-grp-chat__det--status__off"> offline <span>2k</span></div> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="site-main__chat--cur-chat">
                            <div className="site-main__chat--cur-chat__wrapper">
                                <div className="site-main__chat--cur-chat__close">
                                    <span>close</span>
                                    <div className="site-main__chat--cur-chat__close--wrapper">
                                        <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                                    </div>
                                </div>
                                <ul className="site-main__chat--cur-chat__tab">
                                    <li>
                                        Private Chat
                                        <div className="active__main active__main--chat-tab"><div>9</div></div>
                                    </li>
                                    <li>Public Chat</li>
                                </ul>
                                <div className="site-main__chat--cur-chat__outlet">
                                    <div className="reuse-pvt-chat">
                                        <div className="active__main active__main--chat-cnt"><div>9</div></div>
                                        <div className="reuse-pvt-chat__img">
                                            <img src="/" alt=""/>
                                            {/* {{!-- <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"></div> --}} */}
                                            <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off"></div>
                                        </div>
                                        <ul className="reuse-pvt-chat__det">
                                            <li><a href="">User user <span>@ 2m ago</span></a></li>
                                            <li><a href="">What is the real defination pls, i need it</a></li>
                                        </ul>
                                    </div>
                                    <div className="reuse-grp-chat">
                                        <div className="active__main active__main--chat-cnt"><div>9</div></div>
                                        <div className="reuse-grp-chat__img"><img src="/" alt=""/></div>
                                        <ul className="reuse-grp-chat__det">
                                            <li className="reuse-grp-chat__det--title"><a href="">The real community for programmers The real community for programmers The real community for programmers</a></li>
                                            <li className="reuse-grp-chat__det--last-msg"><a href="">Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while</a></li>
                                            <li className="reuse-grp-chat__det--status"><div className="reuse-grp-chat__det--status__on"> online <span>22k</span></div> <div className="reuse-grp-chat__det--status__off"> offline <span>2k</span></div> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="site-main__chat--srch-user">
                            <div className="site-main__chat--srch-user__wrapper">
                                <div className="site-main__chat--srch-user__close">
                                    <span>close</span>
                                    <div className="site-main__chat--srch-user__close--wrapper">
                                        <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                                    </div>
                                </div>
                                <input type="text" className="site-main__chat--srch-user__input" placeholder="Enter user name..." />
                                <div className="site-main__chat--srch-user__cnt">
                                <div className="reuse-pvt-chat">
                                    <div className="active__main active__main--chat-cnt"><div>9</div></div>
                                        <div className="reuse-pvt-chat__img">
                                            <img src="/" alt=""/>
                                            {/* {{!-- <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"></div> --}} */}
                                            <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off"></div>
                                        </div>
                                        <ul className="reuse-pvt-chat__det">
                                            <li><a href="">User user <span>@ 2m ago</span></a></li>
                                            <li><a href="">What is the real defination pls, i need it</a></li>
                                        </ul>
                                    </div> 

                                    <div className="reuse-pvt-chat">
                                        <div className="reuse-pvt-chat__img">
                                            <img src="/" alt=""/>
                                            <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"></div>
                                            {/* {{!-- <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off"></div> --}} */}
                                        </div>
                                        <ul className="reuse-pvt-chat__det">
                                            <li><a href="">User user</a></li>
                                            <li><span><FontAwesomeIcon icon={['fas', 'comment-alt']} className="icon icon__site-main--chat__srh-user"/> chat</span></li>
                                        </ul>
                                    </div> 
                                </div>
                            </div>
                        </div>

                        <div className="site-main__chat--grp-det">
                            <div className="site-main__chat--grp-det__wrapper">
                                <div className="site-main__chat--grp-det__close">
                                    <span>close</span>
                                    <div className="site-main__chat--grp-det__close--wrapper">
                                        <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                                    </div>
                                </div>
                                <div className="site-main__chat--grp-det__header">
                                    <div className="site-main__chat--grp-det__header--img">
                                        <img src="/" alt=""/>
                                    </div>
                                    <div className="site-main__chat--grp-det__header--info">
                                        <h4><a href="">The Peom and Peot Group</a></h4>
                                        <ul>
                                            <li>Tags</li>
                                            <li>Poeters</li>
                                            <li>Writes</li>
                                            <li>Poeters</li>
                                            <li>Writes</li>
                                            <li>Poeters</li>
                                            <li>Writes</li>
                                            <li>Poeters</li>
                                            <li>Writes</li>
                                            <li>Poeters</li>
                                            <li>Writes</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="site-main__chat--grp-det__desc">
                                    <h4 className="site-main__chat--grp-det__desc--title">
                                        Purpose
                                    </h4>
                                    <div className="site-main__chat--grp-det__desc--cnt">
                                        This group is meants for best peoms only, it is the 
                                        best group fon those interested in peom writing only
                                    </div>
                                </div>
                                <div className="site-main__chat--grp-det__admin">
                                    <h4>ADMIN</h4>
                                    <div className="site-main__chat--grp-det__admin--info">
                                        <div className="site-main__chat--grp-det__admin--info__img">
                                            <img src="/" alt="" />
                                            <div className="site-main__chat--grp-det__admin--info__img--status site-main__chat--grp-det__admin--info__img--status__on"> </div>
                                            {/* {{!-- <div className="site-main__chat--grp-det__admin--info__img--status site-main__chat--grp-det__admin--info__img--status__off"></div> --}} */}
                                        </div>
                                        <ul>
                                            <li><a href="">User user</a></li>
                                            <li>
                                                online <span>222k</span>
                                            </li>
                                            <li>
                                                Offline <span>2</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="site-main__chat--user-prf">
                            <div className="site-main__chat--user-prf__close">
                                <span>close</span>
                                <div className="site-main__chat--user-prf__close--wrapper">
                                    <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                                </div>
                            </div>
                            {/* {{> reuseprf}} */}
                        </div>
                        <div className="site-main__chat--footer">
                            <div className="site-main__chat--footer__mic">
                            <FontAwesomeIcon icon={['fas', 'microphone']} className="icon icon__site-main--chat__footer--mic"/>
                            </div>
                            <div className="site-main__chat--footer__input">
                                <textarea  className="site-main__chat--footer__input--field" placeholder="Type something ....." autofocus></textarea>
                                <div className="site-main__chat--footer__input--share"><FontAwesomeIcon icon={['fas', 'location-arrow']} className="icon icon__site-main--chat__footer--input__share"/></div>
                                <div className="site-main__chat--footer__input--clip"><FontAwesomeIcon icon={['fas', 'paperclip']} className="icon icon__site-main--chat__footer--input__clip"/></div>
                                <div className="site-main__chat--footer__input--smiles"><FontAwesomeIcon icon={['far', 'smile']} className="icon icon__site-main--chat__footer--input__smile"/></div>
                            </div>
                            <div className="site-main__chat--footer__camera">
                                <FontAwesomeIcon icon={['fas', 'camera']} className="icon icon___site-main--chat__footer--camera"/>
                            </div>
                            <div className="site-main__chat--footer__clip">
                                <FontAwesomeIcon icon={['fas', 'paperclip']} className="icon icon__site-main--chat__footer--clip"/>
                            </div>
                            <div className="site-main__chat--footer__clip-itm">
                                <div className="site-main__chat--footer__clip-itm--wrapper">
                                    <div className="site-main__chat--footer__clip-itm--cam">
                                        <FontAwesomeIcon icon={['fas', 'camera']} className="icon icon__site-main__chat--clip-itm"/>
                                    </div>
                                    <h4>Camera</h4>
                                </div>
                                <div className="site-main__chat--footer__clip-itm--wrapper">
                                    <div className="site-main__chat--footer__clip-itm--rec">
                                    <FontAwesomeIcon icon={['fas', 'video']} className="icon icon__site-main__chat--clip-itm"/>
                                    </div>
                                    <h4>Video Recorder</h4>
                                </div>
                                <div className="site-main__chat--footer__clip-itm--wrapper">
                                    <div className="site-main__chat--footer__clip-itm--img-pic">
                                    <FontAwesomeIcon icon={['fas', 'images']} className="icon icon__site-main__chat--clip-itm"/>
                                    </div>
                                    <h4>Image Picker</h4>
                                </div>
                                <div className="site-main__chat--footer__clip-itm--wrapper">
                                    <div className="site-main__chat--footer__clip-itm--loc">
                                        <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="icon icon__site-main__chat--clip-itm"/>
                                    </div>
                                    <h4>Share Location</h4>
                                </div>
                                <div className="site-main__chat--footer__clip-itm--wrapper">
                                    <div className="site-main__chat--footer__clip-itm--doc">
                                        <FontAwesomeIcon icon={['fas', 'file']} className="icon icon__site-main__chat--clip-itm"/>
                                    </div>
                                    <h4>Documents</h4>
                                </div>
                                <div className="site-main__chat--footer__clip-itm--wrapper">
                                    <div className="site-main__chat--footer__clip-itm--aud">
                                        <FontAwesomeIcon icon={['fas', 'headphones']} className="icon icon__site-main__chat--clip-itm"/>
                                    </div>
                                    <h4>Audio Picker</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Nav />
            </div>
        )
    }
};

export default MainContent;