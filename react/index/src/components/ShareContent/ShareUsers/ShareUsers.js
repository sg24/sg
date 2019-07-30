import React from 'react';

import './ShareUsers.css'
import Aux from '../../../hoc/Auxs/Aux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const shareUsers = props =>  {

    let viewUsers = (
        <Aux>
            <FontAwesomeIcon 
                icon={['far', 'eye']} 
                className="icon__reuse-share--view" />
            Users
        </Aux>
    );
 
    if (props.viewAllUsers) {
        viewUsers = (
            <Aux>
                <FontAwesomeIcon 
                    icon={['far', 'eye']} 
                    className="icon__reuse-share--view" />
                View 
            </Aux>
        );
    }
    
    return (
        <div className="reuse-share__user-counter reuse-share__user-counter--more-opt">
            <div className="reuse-share__user-counter--share" onClick={props.shareUser}>
                <FontAwesomeIcon 
                    icon={['fas', 'location-arrow']} 
                    className="icon icon__reuse-share--share" />
                Share 
                <div className="reuse-share__user-counter--share__select">
                    {props.userSelect.length}
                </div>
            </div>
            <div className="reuse-share__user-counter--view" onClick={props.viewUsers}>
                {viewUsers}
            </div>
        </div>       
    );
}


export default shareUsers;