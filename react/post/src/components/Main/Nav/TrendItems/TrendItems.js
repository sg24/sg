import React from 'react';

import TrendItem from './TrendItem/TrendItem';

const trendItems = props => {
    const allTrends = props.content.map((trd, index) => (
        <TrendItem 
            key={index}
            trd={trd}
            fav={props.fav.bind(this, trd._id, trd.liked, trd.favorite)}
            changedFav={props.changedFav}
            favChange={props.favChange}/>
    ));

    return allTrends
}

export default trendItems;