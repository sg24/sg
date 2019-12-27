import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const favoriteActive = props => {
    let favChangeClass = ['site-main__content--fav-change'];
    if (props.isHeader) {
        favChangeClass.push('site-main__content--fav-change__main')
    }
    return (
        <div className={favChangeClass.join(' ')}>
            <FontAwesomeIcon 
                icon={props.liked ? ['fas', 'heart'] : ['far', 'heart']}
                className="icon icon__site-main--content__fav" />
        </div>
    );
};

export default favoriteActive;