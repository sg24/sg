import React from 'react';
import arraySort from 'array-sort';

import QuestionContent from './QuestionContent/QuestionContent';

const question = props => {
    let content = arraySort(props.content, 'queCreated', {reverse: true})
    const allQuestion = content.map((que, index) => (
        <QuestionContent 
             key={index} 
             que={que} 
             media={props.media}
             userOpt={props.userOpt.bind(this, que._id)} 
             showCnt={props.showCntOpt}
             fav={props.fav.bind(this, que._id, que.liked, que.favorite, 'question')}
             changedFav={props.changedFav}
             favChange={props.favChange}
             share={props.share.bind(this, que._id)}
             nextMedia={props.nextMedia.bind(this, que._id, que.snapshot.length+que.image.length , 'next')}
             prevMedia={props.prevMedia.bind(this, que._id, que.snapshot.length+que.image.length, 'prev')}
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
             deleteCnt={props.changeCnt.bind(this, que._id, que.title, 'delete')}
             changeCnt={props.changeCnt.bind(this, que._id, que.title, 'draft')}
             changeCntPublish={props.changeCnt.bind(this, que._id, que.title, 'publish')}
             preview={props.preview}/>
    ));

    return allQuestion;
}

export default question;