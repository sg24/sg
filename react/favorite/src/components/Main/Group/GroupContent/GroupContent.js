import React from 'react';

import './GroupContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transformNumber } from '../../../../shared/utility';

const groupContent = props => {
    let cntClass = ['reuse-group__cnt'];
    let userOpt = null;
    let userOptDetClass = ['reuse-group__footer--user-det'];
    let userOptClass = ['reuse-group__footer--user-det__opt'];
    let notify = null;

    let groupOpt = (
        <div className="reuse-group__cnt--desc__opt">
        <div className="reuse-group__cnt--desc__opt--join">
            <FontAwesomeIcon 
                icon={['fas', 'plus']} 
                className="icon icon__reuse-group--cnt__comment" />
            Join
        </div>
    </div>
    );

    if (props.showOpt &&  props.showOpt.index === props.index && props.showOpt.visible) {
        userOptDetClass.push('reuse-group__footer--user-det__clk');
        userOptClass.push('reuse-group__footer--user-det__opt--visible');
    }

    
    if (props.grp.authUser) {
        notify = <div className="active__main active__main--chat"><div>9</div></div>
        groupOpt = null;
        cntClass.push('reuse-group__cnt--chat');
        userOpt = ( 
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
                <div className="reuse-group__footer--user-det__mid"></div>
                <ul className={userOptClass.join(' ')}>
                    <li>
                        <FontAwesomeIcon 
                            icon={['fas', 'eye-slash']} 
                            className="icon icon__reuse-group--footer__mute" /> 
                        Mute
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['fas', 'angle-double-right']} 
                            className="icon icon__reuse-group--footer__exit" /> 
                        Exit
                    </li>
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
                            <FontAwesomeIcon 
                                icon={['fas', 'calendar-check']} 
                                className="icon icon__reuse-group--header__calend" />
                            <span>{props.grp.groupCreated}</span>
                        </div>
                    </li>
                    <li>
                        <div className="reuse-group__header--categ">
                            <FontAwesomeIcon 
                                icon={['fas', 'tag']} 
                                className="icon icon__reuse-group--header__tag" />
                            <a href={"/group/" + props.grp.category}> {props.grp.category}</a>
                        </div>
                    </li>
                </ul>
                <div className={cntClass.join(' ')}> 
                    <div className="reuse-group__cnt--img">
                        <img src={props.grp.groupImage} alt="" />
                    </div>
                    <div className="reuse-group__cnt--desc">
                        <div className="reuse-group__cnt--desc__title">
                            <a href={"/group/" + props.grp.category + "/" + props.grp.id}>{props.grp.desc}</a>
                            { notify }
                        </div>
                        { groupOpt }
                    </div>
                </div>
                <div className="reuse-group__footer">
                    <ul className="reuse-group__footer--grp-det">
                        <li className="reuse-group__footer--grp-det__users">
                            <div className="reuse-group__footer--grp-det__users--wrapper">
                                <div className="reuse-group__footer--grp-det__users--icn">
                                    <FontAwesomeIcon 
                                        icon={['fas', 'users']} 
                                        className="icon icon__reuse-group--footer__users" />
                                </div> 
                                {transformNumber(props.grp.users)}
                            </div>
                        </li>
                        <li className="reuse-group__footer--grp-det__status"> 
                            <div className="reuse-group__footer--grp-det__status--wrapper">
                                <div className="reuse-group__footer--grp-det__status--icn">
                                    <FontAwesomeIcon 
                                        icon={['fas', 'user-friends']} 
                                        className="icon icon__reuse-group--footer__users-on" />
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