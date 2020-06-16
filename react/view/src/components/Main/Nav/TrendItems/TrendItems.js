import React from 'react';

import TrendItem from './TrendItem/TrendItem';

const trendItems = props => {
    console.log(props.content)
    const allTrends = props.content.map((trd, index) => (
        <TrendItem 
            key={index}
            trd={trd}
            fav={props.fav.bind(this, trd.id, trd.liked, trd.favorite, trd.cntGrp)}
            changedFav={props.changedFav}
            favChange={props.favChange}
            show={props.show}/>
    ));

    return allTrends
}

export default trendItems;