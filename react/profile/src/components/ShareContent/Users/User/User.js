import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';

import './User.css';
const user = props => {
    let userClass = ['reuse-user__det'];
    let userSelectClass = ['reuse-user__det--select'];
    let userImg = <img src={props.userDet.image} alt=""/>;

    let userStatus = (
        <div className="reuse-user__det--img__status reuse-user__det--img__status--on">
        </div>
    );

    if (!props.userDet.status) {
        userStatus = (
            <div className="reuse-user__det--img__status reuse-user__det--img__status--off">
            </div>
        );
    }

    
    if (props.userDet.username && !props.userDet.image) {
        userImg = <Avatar  name={props.userDet.username} size='60' round />;
    }

    if (props.selectedUser.length > 0) {
        for (let user of props.selectedUser) {
            if (user.id === props.id) {
                userClass.push('reuse-user__det--clk');
                userSelectClass.push('reuse-user__det--select__clk > svg')
            }
        }
    }

    return (
            <div  
                className="reuse-user"
                onClick={props.selected}>
                <div className={userClass.join(' ')}>
                    <div className="reuse-user__det--img">
                        {userImg}
                        { userStatus }
                    </div>
                    <ul className="reuse-user__det--user">
                        <li className="reuse-user__det--user__info">  
                            <a href={'/users/profile/' + props.userDet.id}>{ props.userDet.username }</a>
                        </li>
                        <li><div>{ props.userDet.student }</div> Student</li> 
                    </ul>
                    <div className={userSelectClass.join(' ')}>
                        <FontAwesomeIcon
                            icon={['fas', 'check-circle']} />
                    </div>
                </div>
        </div>
    );
};

export default user;