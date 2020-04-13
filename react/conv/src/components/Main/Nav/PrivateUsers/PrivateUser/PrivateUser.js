import React from 'react';
import Avatar from 'react-avatar';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import './PrivateUser.css';
import { engStrings } from '../../../../../shared/utility';

const user = props => {
    const formatter = buildFormatter(engStrings);
    let userImg = <img src={props.userDet.image} alt=""/>;
    let msgCreated = null;
    let msg = (
        <li><a href={`/chat/user/${props.userDet.id}`}>{ props.userDet.msg } </a></li>
    )
    let active = null;

    let userStatus = (
        <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off">
        </div>
    );

    if (props.userDet.status) {
        userStatus = (
            <div className="reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"></div>
        );
    }

    
    if (props.userDet.username && !props.userDet.image) {
        userImg = <Avatar  name={props.userDet.username} size='50' round />;
    }

    if (!props.userDet.msg) {
        msg = (
            <li><a href={`/chat/user/${props.userDet.id}`}><span>chat</span></a></li>
        )
    }

    if (props.userDet.created) {
        msgCreated = (
            <span>
                @ <TimeAgo date={props.userDet.created} live={false} formatter={formatter} />
            </span>
        )
    }

    if(props.userDet.notifications && props.userDet.notifications > 0) {
        active = (
        <div className="active__main active__main--chat-cnt"><div>{ props.userDet.notifications }</div></div>
        )
    }

    return (
        <div className="reuse-pvt-chat">
            { active }
            <div className="reuse-pvt-chat__img">
                { userImg }
                { userStatus }
            </div>
            <ul className="reuse-pvt-chat__det">
                <li><a href={`/chat/user/${props.userDet.id}`}>{ props.userDet.username }{ msgCreated }</a></li>
                { msg }
            </ul>
        </div> 
    );
};

export default user;