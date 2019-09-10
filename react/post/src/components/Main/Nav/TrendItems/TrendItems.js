import React from 'react';

import TrendItem from './TrendItem/TrendItem';

const trendItems = props => {
    const allTrends = props.content.map((trd, index) => (
        <TrendItem 
            key={index}
            trd={trd}
            fav={props.fav.bind(this, trd.id)}/>
    ));

    return allTrends
}

export default trendItems;