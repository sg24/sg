import React from 'react';

import UserContent from './UserContent/UserContent';

const user = props => {

    const user = props.content.map((user, index) => (
        <UserContent 
            key={index}
            user={user}
            authorID={user.authorID}
            selected={props.selected.bind(this, user)}
            selectedUser={props.selectedUser}/>
    ));
   
    return user
}

export default user;