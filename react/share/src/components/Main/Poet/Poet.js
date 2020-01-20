import React from 'react';
import arraySort from 'array-sort';

import PoetContent from './PoetContent/PoetContent';

const poet = props => {
    let content = arraySort(props.content, 'pwtCreated', {reverse: true})
    const allPwt = content.map((pwt, index) => (
        <PoetContent 
             key={index} 
             pwt={pwt} 
             media={props.media}
             userOpt={props.userOpt.bind(this, pwt._id)} 
             showCnt={props.showCntOpt}
             fav={props.fav.bind(this, pwt._id, pwt.liked, pwt.favorite, 'poet')}
             changedFav={props.changedFav}
             favChange={props.favChange}
             share={props.share.bind(this, pwt._id)}
             deleteCnt={props.changeCnt.bind(this, pwt._id, pwt.title, 'delete', 'poet')}
             changeCnt={props.changeCnt.bind(this, pwt._id, pwt.title, 'draft', 'poet')}/>
    ));

    return allPwt;
}

export default poet;