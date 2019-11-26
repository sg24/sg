import React from 'react';

import './User.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const user = props => {
    console.log(props)
    let status = ['reuse-user__det--img__status--off'];

    if (props.user.status) {
        status.push('reuse-user__det--img__status--on')
    }
    return (
    <div className="reuse-user">
        <div className="reuse-user__det">
            <div className="reuse-user__det--img">
                <div className={`reuse-user__det--img__status ${status.join(' ')}`}>
                </div>
            </div>
            <ul className="reuse-user__det--user">
                <li className="reuse-user__det--user__info">  
                    <a href="/">{props.user.username}</a>
                </li>
                <li><div>{props.user.student}</div> Student</li> 
            </ul>
        </div>
        <ul className="reuse-user__opt">
            <li><span className="reuse-user__opt--add"><span> Add</span></span></li>
            <li>
                <span className="reuse-user__opt--blk">
                    <FontAwesomeIcon 
                        icon={['fas', 'user-slash']} 
                        className="icon icon__reuse-user--opt" />
                    Block
                </span>
            </li>
        </ul>
    </div>
    );
};

export default user;