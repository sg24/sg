import React from 'react';

import PostContent from './PostContent/PostContent';

const post = props => {

    const allPost = props.content.map( (pt, index) => (
        <PostContent 
            key={index} 
            pt={pt} 
            media={props.media}
            userOpt={props.userOpt.bind(this, index)} 
            showPt={props.showPtOpt}
            index={index}
            fav={props.fav.bind(this, pt._id)}
            share={props.share.bind(this, index)}
            nextMedia={props.nextMedia.bind(this, pt._id, [...pt.snapshot, ...pt.postImage].length , 'next')}
            prevMedia={props.prevMedia.bind(this, pt._id, [...pt.snapshot, ...pt.postImage].length, 'prev')}
            mediaItms={props.mediaItms}
            removeAnim={props.removeAnim}
            disableAnim={props.disableAnim}
            animateItm={props.animateItm}
            removePrevMedia={props.removePrevMedia}
            playVideo={props.playVideo}
            videoErr={props.videoErr}
            playerIcnId={props.playerIcnId}
            slidePlay={props.slidePlay}
            moveSlidePlay={props.moveSlidePlay}
            clearSlidePlay={props.clearSlidePlay}
            video={props.video}/>
    ));

    return allPost;
};

export default post;