import React from 'react';

import './GroupContent.css';
import { transformNumber } from '../../../../shared/utility';

const groupContent = props => {
    let cntClass = ['reuse-group__cnt'];
    let userOpt = null;
    let userOptDetClass = ['reuse-group__footer--user-det'];
    let userOptClass = ['reuse-group__footer--user-det__opt'];

    let groupOpt = (
        <div className="reuse-group__cnt--desc__opt">
        <div className="reuse-group__cnt--desc__opt--join">
            <i className="fas fa-plus icon icon__reuse-group--cnt__comment"></i>Join
        </div>
    </div>
    );

    if (props.showOpt &&  props.showOpt.index === props.index && props.showOpt.visible) {
        userOptDetClass.push('reuse-group__footer--user-det__clk');
        userOptClass.push('reuse-group__footer--user-det__opt--visible');
    }

    
    if (props.grp.authUser) {
        groupOpt = null;
        cntClass.push('reuse-group__cnt--chat');
        userOpt = ( 
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
                <div className="reuse-group__footer--user-det__mid"></div>
                <ul className={userOptClass.join(' ')}>
                    <li><i className="fas fa-eye-slash icon icon__reuse-group--footer__mute"></i> Mute</li>
                    <li><i className="fas fa-angle-double-right icon icon__reuse-group--footer__exit"></i>Exit</li>
                </ul>
            </div>
        );
    }

    return (  
        <div className="reuse-group">
            <div className="reuse-group__wrapper">
                <ul className="reuse-group__header">
                    <li>
                        <div className="reuse-group__header--tm">
                            <i className="fas fa-calendar-check icon icon__reuse-group--header__calend"></i>
                            <span>{props.grp.groupCreated}</span>
                        </div>
                    </li>
                    <li>
                        <div className="reuse-group__header--categ"><i className="fas fa-tag icon icon__reuse-group--header__tag"></i><a href="/"> Social</a></div>
                    </li>
                </ul>
                <div className={cntClass.join(' ')}> 
                    <div className="reuse-group__cnt--img">
                        <img src={props.grp.groupImage} alt="" />
                    </div>
                    <div className="reuse-group__cnt--desc">
                        <div className="reuse-group__cnt--desc__title">
                            <a href="/">{props.grp.desc}</a>
                        </div>
                        { groupOpt }
                    </div>
                </div>
                <div className="reuse-group__footer">
                    <ul className="reuse-group__footer--grp-det">
                        <li className="reuse-group__footer--grp-det__users">
                            <div className="reuse-group__footer--grp-det__users--wrapper">
                                <div className="reuse-group__footer--grp-det__users--icn">
                                    <i className="fas fa-users icon icon__reuse-group--footer__users"></i>
                                </div> 
                                {transformNumber(props.grp.users)}
                            </div>
                        </li>
                        <li className="reuse-group__footer--grp-det__status"> 
                            <div className="reuse-group__footer--grp-det__status--wrapper">
                                <div className="reuse-group__footer--grp-det__status--icn">
                                    <i className="fas fa-user-friends icon icon__reuse-group--footer__users-on"></i>
                                    <div className="reuse-group__footer--grp-det__status--icn__on"></div>
                                </div> 
                                {transformNumber(props.grp.userOnline)}
                            </div>
                        </li>
                    </ul>
                    { userOpt }
                </div>
            </div>
        </div>
    );
}

export default groupContent;