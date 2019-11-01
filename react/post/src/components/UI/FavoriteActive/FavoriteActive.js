import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const favoriteActive = props => {
    return (
        <div className="site-main__content--fav-change">
            <FontAwesomeIcon 
                icon={props.liked ? ['fas', 'heart'] : ['far', 'heart']}
                className="icon icon__site-main--content__fav" />
        </div>
    );
};

export default favoriteActive;