import React from 'react';

import NotifyItem from './NotifyItem/NotifyItem';

const notifyItems = props => {
    const allTrends = props.content.map((notify, index) => (
        <NotifyItem 
            key={index}
            notify={notify}
            fav={props.fav.bind(this, notify.id)} />
    ));

    return allTrends
}

export default notifyItems;