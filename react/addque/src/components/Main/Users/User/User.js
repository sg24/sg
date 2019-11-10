import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const user = props => {
    let userClass = ['reuse-user__det'];
    let userSelectClass = ['reuse-user__det--select'];

    let userStatus = (
        <div className="reuse-user__det--img__status reuse-user__det--img__status--on">
        </div>
    );

    if (props.userDet.userStatus === 'offline') {
        userStatus = (
            <div className="reuse-user__det--img__status reuse-user__det--img__status--off">
            </div>
        );
    }

    if (props.selectedUser.length > 0) {
        for (let userID of props.selectedUser) {
            if (userID === props.id) {
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
                        <img src={ props.userDet.userImage }  alt="" />
                        { userStatus }
                    </div>
                    <ul className="reuse-user__det--user">
                        <li className="reuse-user__det--user__info">  
                            <a href={'/users/' + props.userDet.id}>{ props.userDet.user }</a>
                        </li>
                        <li><div>{ props.userDet.students }</div> Student</li> 
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