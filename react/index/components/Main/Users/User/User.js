import React from 'react';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './User.css'; 

const user = props => {
    let status = ['reuse-user__det--img__status--off'];
    let userImg = <img src={props.user.image} alt=""/>
    let userOpt = (
        <ul className="reuse-user__opt">
            <li>
                <div 
                    className="reuse-user__opt--add"
                    onClick={props.addUser}>
                     Add
                </div>
            </li>
            {/* <li>
                <div 
                    className="reuse-user__opt--blk"
                    onClick={props.blockUser}>
                    <FontAwesomeIcon 
                        icon={['fas', 'eye-slash']} 
                        className="icon icon__reuse-user--opt" />
                    Block
                </div>
            </li> */}
        </ul>
    );

    if (props.user.status) {
        status.push('reuse-user__det--img__status--on')
    }

    if (props.user.image === '') {
        userImg = <Avatar name={props.user.username} size='60' round />
    }

    if (props.user.request) {
        userOpt = (
            <ul className="reuse-user__opt">
                <li>
                    <div 
                        className="reuse-user__opt--acc"
                        onClick={props.acceptUser}>
                        Accept
                    </div>
                </li>
                <li>
                    <div 
                        className="reuse-user__opt--rej"
                        onClick={props.rejUser}>
                        <FontAwesomeIcon 
                            icon={['fas', 'user-slash']} 
                            className="icon icon__reuse-user--opt" />
                        Reject
                    </div>
                </li>
            </ul>
        );
    }

    if (props.user.pending) {
        userOpt = (
            <ul className="reuse-user__opt">
                <li 
                    onClick={props.cancelReq}>
                    <div className="reuse-user__opt--cancel">
                        Cancel
                    </div>
                </li>
                {/* <li>
                    <div 
                        className="reuse-user__opt--blk"
                        onClick={props.blockUser}>
                        <FontAwesomeIcon 
                            icon={['fas', 'eye-slash']} 
                            className="icon icon__reuse-user--opt" />
                        Block
                    </div>
                </li> */}
            </ul>
        );
    }

    if (props.user.accept) {
        userOpt = (
            <ul className="reuse-user__opt">
                <li 
                    onClick={props.unfriend}>
                    <div className="reuse-user__opt--rej">
                    <FontAwesomeIcon 
                        icon={['fas', 'user-slash']} 
                        className="icon icon__reuse-user--opt" />
                        Unfriend
                    </div>
                </li>
            </ul>
        );
    }

    return (
    <div className="reuse-user">
        <div className="reuse-user__det">
            <div className="reuse-user__det--img">
                { userImg }
                <div className={`reuse-user__det--img__status ${status.join(' ')}`}>
                </div>
            </div>
            <ul className="reuse-user__det--user">
                <li className="reuse-user__det--user__info">  
                    <a href={`/user/profile/${props.user.id}`}>{props.user.username}</a>
                </li>
                <li><div>{props.user.studenttotal}</div> Friend</li> 
            </ul>
        </div>
       {userOpt}
    </div>
    );
};

export default user;