import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class PrivateMain extends Component {
    render() {
        return (
            <div className="site-main__chat--header">
                <div className="site-main__chat--header__img">
                </div>
                <h3 className="site-main__chat--header__title">
                User User USer
                </h3>
                <div className="site-main__chat--header__det">
                    <div className="site-main__chat--header__det--status site-main__chat--header__det--status__on">
                        <div></div> online
                    </div>
                    {/* {{!-- <div className="site-main__chat--header__det--status site-main__chat--header__det--status__off">
                        <div></div> offline
                    </div> --}} */}
                    <div className="site-main__chat--header__det--cnt site-main__chat--header__det--cnt__prf">
                        Profile
                    </div>
                    <div className="site-main__chat--header__det--users site-main__chat--header__det--users__pvt">
                        <div className="site-main__chat--header__det--users__icn"><FontAwesomeIcon  icon={['fas', 'user-friends']} className="icon icon__site-main--chat__header--user"/></div>
                        <span>222k</span>
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
                        <li className="site-main__chat--header__user-opt--list__srch-user"> Users <FontAwesomeIcon icon={['fas', 'caret-right']} className="icon icon__site-main--chat__header--angle"/></li>
                        <li className="site-main__chat--header__user-opt--list__prf">Profile</li>
                    </ul>
                </div>
            </div>

        )
    }
};

export default PrivateMain;