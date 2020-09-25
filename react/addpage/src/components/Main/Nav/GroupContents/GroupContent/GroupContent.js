import React from 'react';
import Avatar from 'react-avatar';

import './GroupContent.css';
import { transformNumber } from '../../../../../shared/utility'

const chat = props => {
    let groupImage = <Avatar name={props.cnt.title} size='50' round />;
    let notify = null;
    if (props.cnt.image && props.cnt.image.length > 0) {
        groupImage = <img src={`${window.location.protocol + '//' + window.location.host}/media/image/${props.cnt.image[0].id}`} alt="group" />
    }
    if (props.cnt.notify && props.cnt.notify !== 0) {
        notify = <div className="active__main active__main--chat-cnt"><div>{ props.cnt.notify }</div></div>
    }
    return (
        <div className="reuse-grp-chat">
            { notify }
            <div className="reuse-grp-chat__img">
                { groupImage }
            </div>
            <ul className="reuse-grp-chat__det">
                <li className="reuse-grp-chat__det--title">
                    <a href={`/chat/group/${ props.cnt._id }`}>
                        { props.cnt.title }
                    </a>
                </li>
                <li className="reuse-grp-chat__det--last-msg">{ props.cnt.lastChat } </li>
                <li className="reuse-grp-chat__det--status">
                    <div className="reuse-grp-chat__det--status__on"> Online 
                    <div> { transformNumber(props.cnt.online) }</div></div> 
                    <div className="reuse-grp-chat__det--status__off"> offline 
                    <div>{ transformNumber(props.cnt.offline) }</div></div> 
                </li>
            </ul>
        </div>
    )
}

export default chat;