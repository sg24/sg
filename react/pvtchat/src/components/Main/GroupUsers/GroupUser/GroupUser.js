import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';

import './GroupUser.css';
const groupUser = props => {
    let userClass = ['reuse-user__det'];
    let accClass = ['reuse-user__det--opt__acc'];
    let rejClass = ['reuse-user__det--opt__rej'];
    let disable = false;

    let userImg = <img src={props.userDet.image} alt=""/>;
    let userOpt = (
        <li><div>{ props.userDet.studenttotal }</div> Student</li> 
    );

    let userStatus = (
        <div className="reuse-user__det--img__status reuse-user__det--img__status--on">
        </div>
    );

    if (props.disable && props.disable.length > 0) {
        for (let id of props.disable) {
            if (id === props.userDet._id) {
                accClass.push('reuse-user__det--opt__acc--disable');
                rejClass.push('reuse-user__det--opt__acc--disable');
                disable = true;
            }
        }
    }

    if (props.userOpt) {
        if (props.curTab === 'request') {
            userOpt = (
                <div className="reuse-user__det--opt">
                    <button 
                        className={accClass.join(' ')}
                        onClick={props.accept}
                        disabled={disable}>
                        Accept
                    </button>
                    <button 
                        className={rejClass.join(' ')}
                        onClick={props.reject}
                        disabled={disable}>
                        Reject
                    </button>
                </div>
            )
        } else {
            userOpt = (
                <div className="reuse-user__det--opt">
                    <button 
                        className="reuse-user__det--opt__blk"
                        onClick={props.remove}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']}
                            className="icon icon__reuse-user--det__opt" />
                        Remove
                    </button>
                </div>
            )
        }
    }

    if (!props.userDet.status) {
        userStatus = (
            <div className="reuse-user__det--img__status reuse-user__det--img__status--off">
            </div>
        );
    }

    
    if (props.userDet.username && !props.userDet.image) {
        userImg = <Avatar  name={props.userDet.username} size='60' round />;
    }

    return (
            <div  
                className="reuse-user">
                <div className={userClass.join(' ')}>
                    <div className="reuse-user__det--img">
                        {userImg}
                        { userStatus }
                    </div>
                    <ul className="reuse-user__det--user">
                        <li className="reuse-user__det--user__info">  
                            <a href={'/user/profile/' + props.userDet._id}>{ props.userDet.username }</a>
                        </li>
                        { userOpt }
                    </ul>
                </div>
        </div>
    );
};

export default groupUser;