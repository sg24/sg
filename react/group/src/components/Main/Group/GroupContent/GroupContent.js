import React from 'react';
import Moment from 'react-moment';
import Avatar from 'react-avatar';

import './GroupContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const groupContent = props => {
    let userOpt = null;
    let joinClass = ['reuse-group__cnt--desc__opt--join'];
    let joined = false;
    let cancelClass = ["reuse-group__cnt--desc__opt--cancel reuse-group__cnt--desc__opt--cancel"]
    let userInfoClass = ['reuse-group__footer--info__options'];
    let deletOpt = null;
    let exit = null

    let groupImage = <Avatar  name={props.cnt.title} size='60' round />;
    if (props.cnt.image && props.cnt.image.length > 0) {
        groupImage = <img src={`${window.location.protocol + '//' + window.location.host}/media/image/${props.cnt.image[0].id}`} alt="group" />
    }

    if (props.joinStartID && props.joinStartID.length > 0) {
        for (let id of props.joinStartID) {
            if (id === props.cnt._id) {
                joinClass.push('reuse-group__cnt--desc__opt--join__start');
                cancelClass.push('reuse-group__cnt--desc__opt--join__start');
            }
        }
    }
    
    if (props.joined && props.joined.length > 0) {
        for (let grpID of props.joined) {
            if (props.cnt._id === grpID) {
                joined = true;
            }
        }
    }

    if (props.cnt.userOpt && props.cnt.requestTotal > 0) {
        userOpt = (
            <div className="reuse-group__footer--info__active">{ props.cnt.requestTotal }</div>
        );
    };

    let memOpt = (
        <div 
            className={joinClass.join(' ')}
            onClick={props.join}>
            <FontAwesomeIcon 
                icon={['fas', 'plus']}
                className="icon icon__reuse-group--cnt__join" />
            Join
        </div>
    );

    if (props.showOpt && props.showOpt.visible && props.cnt._id === props.showOpt.id) {
        userInfoClass.push('reuse-group__footer--info__options--visible');
    }

    if ( props.cnt.member || props.cnt.userOpt) {
        memOpt = (
            <div className="reuse-group__cnt--desc__opt--chat">
                <a href={`/chat/group/${props.cnt._id}`}>
                    <FontAwesomeIcon 
                        icon={['fas', 'comment-dots']}
                        className="icon icon__reuse-group--cnt__comment" />
                    Chat
                </a>
            </div>
        );
        
    }

    if (props.cnt.member) {
        exit = (
            <li
                onClick={props.exitGrp}
                className="reuse-group__footer--info__options--del">
                Exit Group
            </li>
        )
    }

    if (props.cnt.userOpt) {
        deletOpt = (
            <>
                <li className="reuse-group__footer--info__options--edit">
                    <a href={`/edit/group/${props.cnt._id}`}>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-grp--options" /> 
                        Edit 
                    </a>
                </li>
                <li
                    onClick={props.deleteGrp}
                    className="reuse-group__footer--info__options--del">
                    <FontAwesomeIcon 
                        icon={['far', 'trash-alt']} 
                        className="icon icon__reuse-grp--options" /> 
                    Delete 
                </li>
            </>
        )
    }

    if (joined || props.cnt.request) {
        memOpt = (
            <div 
                className={cancelClass.join(' ')}
                onClick={props.cancelReq}>
                <FontAwesomeIcon 
                    icon={['fas', 'times']}
                    className="icon icon__reuse-group--cnt__cancel" />
                Cancel
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
                            <span>
                                <Moment format="MMM YYYY">
                                    {props.cnt.groupCreated}
                                </Moment>
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="reuse-group__header--categ">
                            <FontAwesomeIcon 
                                icon={['fas', 'tag']} 
                                className="icon icon__reuse-group--header__tag--mode" />
                            { String(props.cnt.groupMode).substr(0, 1).toUpperCase() +  String(props.cnt.groupMode).substr(1).toLowerCase()}
                        </div>
                        {/* <div className="reuse-group__header--categ">
                            <FontAwesomeIcon 
                                icon={ props.cnt.category.length > 1 ? ['fas', 'tags'] : ['fas', 'tag']} 
                                className="icon icon__reuse-group--header__tag" />
                            { props.cnt.category[0] }
                        </div> */}
                    </li>
                </ul>
                <div className="reuse-group__cnt">
                    <div className="reuse-group__cnt--img">
                        { groupImage }
                    </div>
                    <div className="reuse-group__cnt--desc">
                        <div className="reuse-group__cnt--desc__title">
                            { props.cnt.member || props.cnt.userOpt ? 
                                <a href={`/chat/group/${props.cnt._id}`}>
                                { props.cnt.title }
                            </a> :  props.cnt.title }
                        </div>
                        <div className="reuse-group__cnt--desc__opt">
                            { memOpt }
                        </div>
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
                                { transformNumber(props.cnt.members)  }
                            </div>
                        </li>
                        {/* <li className="reuse-group__footer--grp-det__status"> 
                            <div className="reuse-group__footer--grp-det__status--wrapper">
                                <div className="reuse-group__footer--grp-det__status--icn">
                                    <FontAwesomeIcon 
                                        icon={['fas', 'user-friends']}
                                        className="icon icon__reuse-group--footer__users-on" />
                                    <div className="reuse-group__footer--grp-det__status--icn__on"></div>
                                </div> 
                                { transformNumber(props.cnt.online) }
                            </div>
                        </li> */}
                    </ul>
                    {props.clipboard && props.clipboard.id === props.cnt._id ? 
                        <div className="reuse-group__footer--tooltip">
                        { props.clipboard.msg }
                    </div> : null}
                    <div 
                        className="reuse-group__footer--info"
                        onClick={props.userOpt}>
                         <div className="reuse-group__footer--info__mid"></div>
                         <ul className={userInfoClass.join(' ')}>
                            <li 
                                className="reuse-group__footer--info__options--status"
                                onClick={props.groupInfo}>
                                <FontAwesomeIcon 
                                    icon={['fas', 'info']} 
                                    className="icon icon__reuse-grp--options__info" /> 
                                Info
                            </li>
                            <li 
                                className="reuse-group__footer--info__options--status"
                                onClick={props.copyLink}>
                                <FontAwesomeIcon 
                                    icon={['fas', 'clipboard']} 
                                    className="icon icon__reuse-grp--options" /> 
                                Invite
                            </li>
                            {deletOpt }
                            {exit}
                        </ul>
                        { userOpt }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default groupContent;