import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const favoriteActive = props => {
    let activeIcn = props.active ?  
        <FontAwesomeIcon 
            icon={['fas', 'heart']}
            className="icon icon__site-main--content__fav" />
        : <FontAwesomeIcon 
        icon={['far', 'heart']}
        className="icon icon__site-main--content__fav" />
    return (
        <div className="site-main__content--favorite">
            { activeIcn }
        </div>
    );
};

export default favoriteActive;