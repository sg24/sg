import React from 'react';

import PoetContent from './PoetContent/PoetContent';

const poet = props => {

    let poet = props.content.map((pwt, index) => (
        <PoetContent 
            key={index}
            pwt={pwt}
            userOpt={props.userOpt.bind(this, index)}
            showPwt={props.showPwtOpt}
            index={index}
            fav={props.fav.bind(this, pwt.id)}
            share={props.share.bind(this, index)}/>
    ))

    return poet;
};

export default poet;