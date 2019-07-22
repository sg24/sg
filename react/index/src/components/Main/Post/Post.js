import React from 'react';

import PostContent from './PostContent/PostContent';

const post = props => {

    const allPost = props.content.map( (pt, index) => (
        <PostContent 
            key={index} 
            pt={pt} 
            userOpt={props.userOpt.bind(this, index)} 
            showPt={props.showPtOpt}
            index={index}
            fav={props.fav.bind(this, pt.id)}
            share={props.share.bind(this, index)}/>
    ));

    return allPost;
};

export default post;