import React from 'react';
import Avatar from 'react-avatar';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { engStrings } from '../../../../shared/utility';

const user = props => {
    const formatter = buildFormatter(engStrings);
    let lastMsgClass = [];
    let userImg = <img src={props.userDet.image} alt=""/>;
    if (!props.userDet.msg) {
        lastMsgClass.push('site-main__chat--nav__cnt--user__wrapper-msg')
    }
    let isAdmin = <FontAwesomeIcon  icon={['fas', 'cogs']} className="icon icon__site-main--chat__box--dwn"/>
    let cnt = (
        <>
             <li>
                <a href={`/chat/user/${props.userDet.id}`}>
                    { props.userDet.isAdmin ? 
                        isAdmin  : props.userDet.username}
                    { props.userDet.isAdmin ? 
                        props.userDet.username  : null}
                    {props.userDet.msg ? <span>@ { <TimeAgo date={props.userDet.created} live={false} formatter={formatter}/> }</span> : null}
                </a>
            </li>
            <li className={lastMsgClass.join(' ')}>
                {props.userDet.msg ? 
                    <a href={`/chat/user/${props.userDet.id}`}>{ props.userDet.msg }</a> : '...'}
            </li>
        </>
    );
    let userStatus = (
        <div className="site-main__chat--nav__cnt--user__img--status site-main__chat--nav__cnt--user__img--status__on"></div>
    );

    if (!props.userDet.status) {
        userStatus = (
            <div className="site-main__chat--nav__cnt--user__img--status site-main__chat--nav__cnt--user__img--status__off"></div>
        );
    }

    if (props.typing && props.typing.length > 0) {
        for (let user of props.typing) {
            if (user.id === props.userDet.id) {
                cnt = (
                    <>
                         <li>
                            <a href={`/chat/user/${props.userDet.id}`}>
                                { props.userDet.isAdmin ? props.userDet.username + '(Admin)' : props.userDet.username}
                                {props.userDet.msg ? <span>@ { <TimeAgo date={props.userDet.created} live={false} formatter={formatter}/> }</span> : null}
                            </a>
                        </li>
                        <li><a href={`/chat/user/${props.userDet.id}`}><span>Typing . . .</span></a></li>
                    </>
                )
            }
        }
    }

    
    if (props.userDet.username && !props.userDet.image) {
        userImg = <Avatar  name={props.userDet.username} size='50' round />;
    }

    return (
        <div className="site-main__chat--nav__cnt--user__wrapper">
            <div className="site-main__chat--nav__cnt--user__img">
                { userImg }
                { userStatus }
            </div>
            <ul className="site-main__chat--nav__cnt--user__det">
                { cnt }
            </ul>
        </div>
    );
};

export default user;