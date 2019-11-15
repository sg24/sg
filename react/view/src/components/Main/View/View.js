import React from 'react';

import ViewContent from './ViewContent/ViewContent';

const View = props => {
    const allView = props.content.map((cnt, index) => (
        <ViewContent 
             key={index} 
             cnt={cnt} 
             media={props.media}
             userOpt={props.userOpt.bind(this, cnt._id)} 
             showCnt={props.showCntOpt}
             fav={props.fav.bind(this, cnt._id, cnt.liked, cnt.favorite, 'question')}
             changedFav={props.changedFav}
             favChange={props.favChange}
             share={props.share.bind(this, cnt._id)}
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
             deleteCnt={props.changeCnt.bind(this, cnt._id, cnt.title, 'delete')}
             changeCnt={props.changeCnt.bind(this, cnt._id, cnt.title, 'mode')}/>
    ));

    return allView;
}

export default View;