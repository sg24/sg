import React from 'react';

import PrivateUser from './PrivateUser/PrivateUser';

const privateUsers = props => {
    const allUsers = props.content.map((user, index) => (
        <PrivateUser
            key={index}
            userDet={user}
            id={user._id}/> 
    ));

    return allUsers;
};

export default privateUsers;