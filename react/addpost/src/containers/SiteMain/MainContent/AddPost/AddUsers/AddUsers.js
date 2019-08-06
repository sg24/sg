import React, { Component } from 'react';

class AddUsers extends Component {
    render() {
        return (
            <div className="reuse-form__itm reuse-form__itm--user">
                <ul className="reuse-form__itm--tab">
                    <li><div></div> Online</li>
                    <li><div></div> Offline</li>
                    <li className="reuse-form__itm--tab__srch">
                        <i class="fas fa-search icon icon__reuse-form--srch"></i>
                    </li>
                </ul>

                <div className="reuse-form__itm--srch">
                    <div className="reuse-form__itm--srch__close">
                        <i class="fas fa-times"></i>
                    </div>
                    <div className="reuse-form__itm--srch__wrapper">
                        <div><i className="far fa-calendar-alt"></i></div>
                        <input type="text" className="reuse-form__itm--srch__input" placeholder="search..." />
                    </div>
                </div>
                
                <div className="reuse-form__itm--det">
                    <div className="reuse-form__itm--det__user">
                        <div className="reuse-pvt-chat">
                            <div className="active__main active__main--chat-cnt"><div>9</div></div>
                            <div className="reuse-pvt-chat__img">
                                <img src="/" alt="" />
                                <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off"></div>
                            </div>
                            <ul className="reuse-pvt-chat__det">
                                <li><a href="">User user <span>@ 2m ago</span></a></li>
                                <li><span> Add </span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="reuse-form__itm--det__user">
                        <div className="reuse-pvt-chat">
                            <div className="active__main active__main--chat-cnt"><div>9</div></div>
                            <div className="reuse-pvt-chat__img">
                                <img src="/" alt="" />
                                <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"></div>
                            </div>
                            <ul className="reuse-pvt-chat__det">
                                <li><a href="">User user <span>@ 2m ago</span></a></li>
                                <li><span> Add </span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="reuse-form__itm--footer reuse-form__btn">
                    <button type="button" className="reuse-form__btn--close">Exit</button>
                    <button type="submit" className="reuse-form__btn--add">Share</button>
                </div>
            </div>
        )
    }
}

export default AddUsers;