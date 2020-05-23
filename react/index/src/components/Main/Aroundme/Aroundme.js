import React from 'react';
import arraySort from 'array-sort';

import Around from './Around/Around';

const aroundme = props => {
    let content = arraySort(props.content, 'created', {reverse: true})
    const allAround = content.map((cnt, index) => (
        <Around 
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
             deleteCnt={props.changeCnt.bind(this, cnt._id, cnt.location, 'delete', 'aroundme')}
             showChat={props.showChat.bind(this, cnt._id)}/>
    ));

    return allAround;
}

export default aroundme;