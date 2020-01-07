import React from 'react';

import QuestionContent from './QuestionContent/QuestionContent';

const question = props => {
   
    const allQuestion = props.content.map((que, index) => (
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
             deleteCnt={props.changeCnt.bind(this, que._id, que.title, 'delete', 'question')}
             changeCnt={props.changeCnt.bind(this, que._id, que.title, 'draft', 'question')}/>
    ));

    return allQuestion;
}

export default question;