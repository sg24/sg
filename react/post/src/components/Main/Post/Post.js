import React from 'react';
import arraySort from 'array-sort';

import PostContent from './PostContent/PostContent';

const post = props => {    
    let content= arraySort(props.content, 'postCreated', {reverse: true})
    const allPost = content.map( (pt, index) => (
        <PostContent 
            key={index} 
            pt={pt} 
            media={props.media}
            userOpt={props.userOpt.bind(this, index)} 
            showPt={props.showPtOpt}
            index={index}
            fav={props.fav.bind(this, pt._id, pt.liked, pt.favorite, 'post')}
            changedFav={props.changedFav}
            favChange={props.favChange}
            share={props.share.bind(this, pt._id)}
            nextMedia={props.nextMedia.bind(this, pt._id, pt.snapshot.length+pt.image.length , 'next')}
            prevMedia={props.prevMedia.bind(this, pt._id, pt.snapshot.length+pt.image.length, 'prev')}
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
            video={props.video}
            deletePt={props.changePt.bind(this, pt._id, pt.title, 'delete')}
            changePt={props.changePt.bind(this, pt._id, pt.title, 'draft')}
            changePtPublish={props.changePt.bind(this, pt._id, pt.title, 'publish')}/>
    ));

    return allPost;
};

export default post;