import React from 'react';

import './ShareUsers.css'
import Aux from '../../../hoc/Auxs/Aux';

const shareUsers = props =>  {

    let viewUsers = (
        <Aux>
            <i className="far fa-eye icon__reuse-share--view"></i> Users
        </Aux>
    );
 
    if (props.viewAllUsers) {
        viewUsers = (
            <Aux>
                 <i className="far fa-eye icon__reuse-share--view"></i> View 
            </Aux>
        );
    }
    
    return (
        <div className="reuse-share__user-counter reuse-share__user-counter--more-opt">
            <div className="reuse-share__user-counter--share" onClick={props.shareUser}>
                <i className="fas fa-location-arrow icon icon__reuse-share--share"></i> Share 
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