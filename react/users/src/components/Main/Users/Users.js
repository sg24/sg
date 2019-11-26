import React from 'react';

import User from './User/User';

const users = props => {
    const allUser = props.content.map((user, index) => (
        <User 
            key={index} 
            user={user}/>
    ));

    return allUser;
}

export default users;