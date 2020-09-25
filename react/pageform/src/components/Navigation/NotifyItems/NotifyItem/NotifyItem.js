import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const notifyItem = props => {
    let icn = props.notify.category === 'post'|| props.notify.category === 'question' ? 'clone' : 
    props.notify.category === 'poets' ? 'book' : props.notify.category === 'chat' ? 'user-friends' :
    props.notify.category === 'group' ? 'user-graduate' : 'user-plus';
    let cnt = (
        <>
            <div className="reuse-notify__categ">
                <FontAwesomeIcon 
                icon={['fas', `${icn}`]} 
                className="icon icon__reuse-notify--categ" />
                {props.notify.category}
                <div className="reuse-notify__categ--active">{props.notify.total}</div>
            </div>
            <div className="reuse-notify__title">
                <div>Latest</div>
                <h4>
                    <a href={`/view/${props.notify.category}/${props.notify.id}`}>{props.notify.title}</a>   
                </h4>
            </div> 
        </>
    )

    if (props.notify.category === 'chat') {
        cnt = (
            <>
            <div className="reuse-notify__categ">
                <FontAwesomeIcon 
                icon={['fas', `${icn}`]} 
                className="icon icon__reuse-notify--categ" />
                {props.notify.category}
                {/* <div className="reuse-notify__categ--active">{props.notify.total}</div> */}
            </div>
            <div className="reuse-notify__title">
                <h4>
                    <a href={`/chat/user/${props.notify.id}`}>{props.notify.notifications} new message from {props.notify.username}</a>   
                </h4>
            </div> 
        </>
        )
    }

    if (props.notify.category === 'group') {
        cnt = (
            <>
            <div className="reuse-notify__categ">
                <FontAwesomeIcon 
                icon={['fas', `${icn}`]} 
                className="icon icon__reuse-notify--categ" />
                    Chat Room
                {/* <div className="reuse-notify__categ--active">{props.notify.total}</div> */}
            </div>
            <div className="reuse-notify__title">
                <h4>
                    <a href={`/chat/group/${props.notify.id}`}>{props.notify.notifications} new message from {props.notify.title} Group</a>   
                </h4>
            </div> 
        </>
        )
    }

    if (props.notify.category === 'grpreq') {
        cnt = (
            <>
            <div className="reuse-notify__categ">
                <FontAwesomeIcon 
                icon={['fas', `${icn}`]} 
                className="icon icon__reuse-notify--categ" />
                Member Request
                {/* <div className="reuse-notify__categ--active">{props.notify.total}</div> */}
            </div>
            <div className="reuse-notify__title">
                <h4>
                    <a href={`/chat/group/${props.notify.id}`}>{props.notify.notifications} member request from {props.notify.title} Group</a>   
                </h4>
            </div> 
        </>
        )
    }

    if (props.notify.category === 'userReq') {
        cnt = (
            <>
            <div className="reuse-notify__categ">
                <FontAwesomeIcon 
                icon={['fas', `${icn}`]} 
                className="icon icon__reuse-notify--categ" />
                Friend Request
                {/* <div className="reuse-notify__categ--active">{props.notify.total}</div> */}
            </div>
            <div className="reuse-notify__title">
                <h4>
                    <a href={`/users/request`}>{props.notify.notifications} friend request </a>   
                </h4>
            </div> 
        </>
        )
    }

    return  (
        <div className="reuse-notify">
            { cnt }
        </div>
    )
};

export default notifyItem