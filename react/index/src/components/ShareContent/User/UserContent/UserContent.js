import React from 'react';

import './UserContent.css';

const userContent = props => {
    let userClass = ["reuse-share__user"];
    let statusClass = ["reuse-share__user--det__img--status reuse-share__user--det__img--status__on"];
    let userSelectClass = ["reuse-share__user--det__selec"];

    if (props.user.status === 'off') {
        statusClass = ["reuse-share__user--det__img--status reuse-share__user--det__img--status__off"]
    };
    
    for(let user of props.selectedUser) {
        if (user.authorID === props.authorID) {
            userClass = ["reuse-share__user reuse-share__user--clk"]
            userSelectClass = ["reuse-share__user--det__selec reuse-share__user--det__selec--clk > svg"];
        }
    }

    return (
        <div className={userClass.join(' ')}
            onMouseEnter={props.select} 
            onMouseLeave={props.deselect}
            onClick={props.selected}>
            <div className="reuse-share__user--det">
                <div className="reuse-share__user--det__img">
                    <img src={ props.user.userImage } alt="" />
                    <div className={statusClass.join(' ')}>
                    </div>
                </div>
                <ul className="reuse-share__user--det__info">
                    <li>  
                        <a href="/">{ props.user.author }</a>
                    </li>
                    <li><div>{ props.user.students }</div> Student</li> 
                </ul>
                <div className={userSelectClass.join(' ')}>
                    <i className="fas fa-check-circle icon icon__reuse-share--selec"></i>
                </div>
            </div>
        </div>
    );
};

export default userContent;