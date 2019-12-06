import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const notifyItem = props => {
    let icn = props.notify.category === 'post'|| props.notify.category === 'question' ? 'clone' : 'book';

    return (
        <div className="reuse-notify">
        <div className="reuse-notify__categ">
            <FontAwesomeIcon 
            icon={['fas', `${icn}`]} 
            className="icon icon__reuse-notify--categ" />
            {props.notify.category}
            <div className="reuse-notify__categ--active">{props.notify.total}</div>
        </div>
        <div className="reuse-notify__title">
            <div>Latest</div>
            <h4>
                <a href={`/view/${props.notify.category}/${props.notify.id}`}>{props.notify.title}</a>   
            </h4>
        </div> 
    </div>
    )
};

export default notifyItem