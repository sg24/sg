import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GroupMain extends Component {
    render() {
        return (
            <div className="site-main__chat--header">
                <div className="site-main__chat--header__img">
                </div>
                <h3 className="site-main__chat--header__title">
                    Peom and prose group to help all who have grim for it
                    Peom and prose group to help all who have grim for it
                    Peom and prose group to help all who have grim for it
                </h3>
                <div className="site-main__chat--header__det">
                    <div className="site-main__chat--header__det--users site-main__chat--header__det--users__grp">
                        <div className="site-main__chat--header__det--users__icn"><FontAwesomeIcon  icon={['fas', 'users']} className="icon icon__site-main--chat__header--user"/></div>
                        <span>222k</span>
                    </div>
                    <div className="site-main__chat--header__det--cnt site-main__chat--header__det--cnt__lg">
                        Details
                        <div></div>
                    </div>
                    <div className="site-main__chat--header__det--cnt site-main__chat--header__det--cnt__sm">
                        Chat Room
                    </div>
                    <div className="site-main__chat--header__det--calend">
                        <FontAwesomeIcon  icon={['far', 'calendar-alt']} className="icon icon__site-main--chat__header--calend"/> 23/4/18
                    </div>
                </div>    
                <div className="site-main__chat--header__user-opt">
                    <div className="site-main__chat--header__user-opt--circle">
                        <div className="site-main__chat--header__user-opt--circle__middle"></div>
                    </div>
                    <div className="active__main active__main--chat-opt"><div>99</div></div>
                    <ul className="site-main__chat--header__user-opt--list">
                        <li className="site-main__chat--header__user-opt--list__srch"> Search Chat </li>
                        <li className="site-main__chat--header__user-opt--list__grp"> Groups <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/></li>
                        <li className="site-main__chat--header__user-opt--list__chat"> Current Chats <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/></li>
                        <li className="site-main__chat--header__user-opt--list__srch-user"> Users <FontAwesomeIcon  icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/></li>
                        <li className="site-main__chat--header__user-opt--list__grp-det">Group Details</li>
                    </ul>
                </div>
            </div>

        )
    }
};

export default GroupMain;