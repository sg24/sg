import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';

import './User.css';
const user = props => {
    let userClass = ['share-user__det'];
    let userSelectClass = ['share-user__det--select'];
    let userImg = <img src={props.userDet.image} alt=""/>;

    let userStatus = (
        <div className="share-user__det--img__status share-user__det--img__status--on">
        </div>
    );

    if (!props.userDet.status) {
        userStatus = (
            <div className="share-user__det--img__status share-user__det--img__status--off">
            </div>
        );
    }

    
    if (props.userDet.username && !props.userDet.image) {
        userImg = <Avatar  name={props.userDet.username} size='60' round />;
    }

    if (props.selectedUser.length > 0) {
        for (let user of props.selectedUser) {
            if (user.id === props.id) {
                userClass.push('share-user__det--clk');
                userSelectClass.push('share-user__det--select__clk > svg')
            }
        }
    }

    return (
            <div  
                className="share-user"
                onClick={props.selected}>
                <div className={userClass.join(' ')}>
                    <div className="share-user__det--img">
                        {userImg}
                        { userStatus }
                    </div>
                    <ul className="share-user__det--user">
                        <li className="share-user__det--user__info">  
                            <a href={'/user/profile/' + props.userDet.id}>{ props.userDet.username }</a>
                        </li>
                        <li><div>{ props.userDet.studenttotal }</div> Friend</li> 
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