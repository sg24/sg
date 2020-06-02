import React from 'react';
import arraySort from 'array-sort';

import Contest from './Contest/Contest';

const contest = props => {
    let content = arraySort(props.content, 'created', {reverse: true})
    const allContest = content.map((cnt, index) => (
        <Contest 
             key={index}
             index={cnt._id}
             cnt={cnt} 
             media={props.media}
             userOpt={props.userOpt.bind(this, cnt._id)} 
             showCnt={props.showCntOpt}
             nextMedia={props.nextMedia.bind(this, cnt._id, cnt.snapshot.length+cnt.image.length , 'next')}
             prevMedia={props.prevMedia.bind(this, cnt._id, cnt.snapshot.length+cnt.image.length, 'prev')}
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
             deleteCnt={props.changeCnt.bind(this, cnt._id, 'content', 'delete', 'contest')}
             showChat={props.showChat.bind(this, cnt._id)}
             preview={props.preview}/>
    ));

    return allContest;
}

export default contest;