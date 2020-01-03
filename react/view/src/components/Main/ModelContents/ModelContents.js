import React from 'react';

import ModelContent from './ModelContent/ModelContent';

const modelContents = props => {
    const contents = (
        <ModelContent 
            cnt={props.cnt}
            userOpt={props.userOpt.bind(this, props.cnt._id)} 
            showCnt={props.showCntOpt}
            cntGrp={props.cntGrp}
            fav={props.fav.bind(this, props.cnt._id, props.cnt.liked, props.cnt.favorite)}
            changedFav={props.changedFav}
            favChange={props.favChange}
            share={props.share.bind(this, props.cnt._id)}
            nextMedia={props.nextMedia.bind(this, props.cnt._id, props.cnt.snapshot.length+props.cnt.image.length , 'next')}
            prevMedia={props.prevMedia.bind(this, props.cnt._id, props.cnt.snapshot.length+props.cnt.image.length, 'prev')}
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
            deleteCnt={props.changeCnt.bind(this, props.cnt._id, props.cnt.title, 'delete')}
            changeCnt={props.changeCnt.bind(this, props.cnt._id,props.cnt.title, 'draft')}
            changeCntPublish={props.changeCnt.bind(this, props.cnt._id,props.cnt.title, 'publish')}
            comments={props.comments}
            inputValue={props.inputValue}
            inputChanged={props.inputChanged}
            submitComment={props.submitComment}
            submitEnable={props.submitEnable}
            reply={props.reply}
            correct={props.correct}
            wrong={props.wrong}/>
    )
    return contents;
}

export default modelContents;