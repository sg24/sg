import React from 'react';
import arraySort from 'array-sort';

import AdvertContent from './AdvertContent/AdvertContent';

const advert = props => {
    let content = arraySort(props.content, 'cntCreated', {reverse: true})
    const allAdvert = content.map((cnt, index) => (
        <AdvertContent 
             key={index}
             index={cnt._id}
             cnt={cnt} 
             media={props.media}
             userOpt={props.userOpt.bind(this, cnt._id)} 
             showCnt={props.showCntOpt}
             fav={props.fav.bind(this, cnt._id, cnt.liked, cnt.favorite, 'advert')}
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
             changeCnt={props.changeCnt.bind(this, cnt._id, cnt.title, 'draft')}
             changeCntPublish={props.changeCnt.bind(this, cnt._id, cnt.title, 'publish')}
             preview={props.preview}/>
    ));

    return allAdvert;
}

export default advert;