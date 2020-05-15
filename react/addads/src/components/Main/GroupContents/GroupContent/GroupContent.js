import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';

const groupContent = props => {
    let groupClass = ['reuse-user__det'];
    let groupSelectClass = ['reuse-user__det--select'];
    let groupImg = <img src={props.cnt.image} alt=""/>;

    
    if (props.cnt.title && !props.cnt.image) {
        groupImg = <Avatar  name={props.cnt.title} size='60' round />;
    }

    if (props.selectedUser.length > 0) {
        for (let userID of props.selectedUser) {
            if (userID === props.id) {
                groupClass.push('reuse-user__det--clk');
                groupSelectClass.push('reuse-user__det--select__clk > svg')
            }
        }
    }

    return (
            <div  
                className="reuse-user"
                onClick={props.selected}>
                <div className={groupClass.join(' ')}>
                    <div className="reuse-user__det--img">
                        {groupImg}
                    </div>
                    <ul className="reuse-user__det--user">
                        <li className="reuse-user__det--user__info">  
                            <a href={'/chat/group/' + props.cnt.id}>{ props.cnt.title }</a>
                        </li>
                        <li className="reuse-user__det--user__msg"> { props.cnt.lastMsg } </li> 
                    </ul>
                    <div className={groupSelectClass.join(' ')}>
                        <FontAwesomeIcon
                            icon={['fas', 'check-circle']} />
                    </div>
                </div>
        </div>
    );
};

export default groupContent;