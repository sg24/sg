import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import Avatar from 'react-avatar';

import './QuestionContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import Aux from '../../../../hoc/Auxs/Aux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';

const questionContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-que__footer--details'];
    let userOptClass = ['reuse-que__footer--details__options'];
    let favAdd = null;
    let isLiked = null;
    let title = String(props.que.title).length > 149 ? String(props.que.title).substr(0, 150) + '...' :' props.que.title';
    let mediaTotal = props.que.snapshot.length+props.que.image.length;
    let desc = (
        <p className="reuse-que__content--title">
            <a href={"/view/question/" + props.que._id}> 
                {title} 
            </a>
        </p>
    );
    let userOptMode = (
        <li 
            className="reuse-que__footer--details__options--status"
            onClick={props.changeCnt}>
            <FontAwesomeIcon 
                icon={['far', 'eye-slash']} 
                className="icon icon__reuse-que--options__dft" />
            Draft
        </li>
    );

    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-que--footer__heart" />

    let userImage = <img src={props.que.userImage} alt="" />

    if (props.que.mode === 'draft') {
      userOptMode = (
        <li 
            className="reuse-que__footer--details__options--status"
            onClick={props.changeCntPublish}>
            <FontAwesomeIcon 
                icon={['far', 'eye']} 
                className="icon icon__reuse-que--options__dft" />
            Publish
        </li>
      )
    }
    
    if (props.que.username && !props.que.userImage) {
        userImage = <Avatar  name={props.que.username} size='36' round />;
    }

    for (let changedFav of props.changedFav) {
        if (props.que._id === changedFav.id) {
            favAdd = changedFav.favAdd;
            isLiked= changedFav.liked;
        }
    }

    let media = null;
    let mediaCnt =  [...props.que.snapshot, ...props.que.image];
    let playVideo = null;
    let mediaWrapperClass = ['reuse-que__media--wrapper'];

    if (mediaCnt.length > 0) {
        let isShowned = false;
        for (let mediaItm of props.mediaItms) {
            if (mediaItm.id === props.que._id) {
                isShowned = true;
                if (props.animateItm.id === props.que._id) {
                    if (props.animateItm.direction === 'next' && !props.removePrevAnim) {
                        mediaWrapperClass.push('reuse-que__media--wrapper__anim');
                    } 
                    if (props.animateItm.direction === 'prev' && !props.removePrevAnim) {
                        mediaWrapperClass.push('reuse-que__media--wrapper__anim-rev');
                    }
                }

                if (props.animateItm === null) {
                    mediaWrapperClass.push('reuse-que__media--wrapper__anim');
                }

                if (props.removePrevMedia && props.removePrevMedia.id === props.que._id) {
                    showPrevAnim(props.removePrevMedia);
                }
                displayMedia(mediaItm.position);
            }
        }
        if (!isShowned) {
            if (props.removePrevMedia && props.removePrevMedia.id === props.que._id) {
                showPrevAnim(props.removePrevMedia);
            }
            displayMedia(0)
        }
    }

    function showPrevAnim(prevAnim) {
        if (prevAnim.type === 'next') {
            mediaWrapperClass.push('reuse-que__media--wrapper__anim-exit');
        } else {
            mediaWrapperClass.push('reuse-que__media--wrapper__anim-exit-rev')
        }
    }

    function displayMedia(position) {
        let curMedia = mediaCnt[position];
        if (curMedia && typeof curMedia === "object") {
            playVideo = (
                props.video && props.video.id !== curMedia.id ? 
                <div 
                    className={props.playerIcnId && props.playerIcnId === props.que._id ? 
                        'reuse-que__media--wrapper__icn reuse-que__media--wrapper__icn-move' : 'reuse-que__media--wrapper__icn'}
                    onClick={props.playVideo.bind(this, curMedia.id, props.que.video)}>
                    <FontAwesomeIcon 
                        icon={['fas', 'play-circle']} 
                        className="icon icon__reuse-que--media__play" /> 
                </div>: null
            );
        }

        media = (
            <div className="reuse-que__media">
                <div className={props.video && props.video.id === curMedia.id ? 
                        'reuse-que__media--main-wrapper reuse-que__media--main-wrapper__load' : 'reuse-que__media--main-wrapper'}>
                    <div 
                        onDragStart={() => false }
                        touch-action="pan-y"
                        className={props.disableAnim ? 'reuse-que__media--wrapper' : mediaWrapperClass.join(' ')} onAnimationEnd={props.removeAnim}>
                        { playVideo }
                        { props.video && props.video.id === curMedia.id && props.video.url ? 
                            <video 
                                onPointerDown={(event) => props.slidePlay(props.que._id, mediaTotal, event)}
                                onPointerMove={(event) => props.moveSlidePlay(props.que._id, mediaTotal, event)}
                                onPointerUp={(event) => props.clearSlidePlay(event)}
                                src={props.video.url} controls autoPlay>
                                <p>our browser doesn't support embedded videos</p>
                            </video> :
                        props.video && props.video.id === curMedia.id ? null : 
                        <img 
                            draggable="false"
                            onDragStart={() => false }
                            src={typeof curMedia === "object" ? curMedia.snapshot : curMedia}  alt="question"
                            onPointerDown={(event) => props.slidePlay(props.que._id, mediaTotal, event)}
                            onPointerMove={(event) => props.moveSlidePlay(props.que._id, mediaTotal, event)}
                            onPointerUp={(event) => props.clearSlidePlay(event)} />
                        }
                        { props.videoErr && props.videoErr.id === curMedia.id ? 
                            <div 
                                className="reuse-que__video-err"
                                onPointerDown={(event) => props.slidePlay(props.que._id, mediaTotal, event)}
                                onPointerMove={(event) => props.moveSlidePlay(props.que._id, mediaTotal, event)}
                                onPointerUp={(event) => props.clearSlidePlay(event)}>
                                <div 
                                    className="reuse-que__video-err--icn"
                                    onClick={props.playVideo.bind(this, curMedia.id, props.que.video)}>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'redo']} 
                                        className="icon icon__reuse-que--video-err__icn"/>
                                </div>
                                <h3> {props.videoErr.err.message} </h3> 
                            </div> : null}
                    </div>
                </div>
                
                {
                    mediaCnt && mediaCnt.length > 1 ? 
                    <Aux>
                        <div 
                            className="reuse-que__media--cnt reuse-que__media--cnt__nxt"
                            onClick={props.nextMedia}>
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-right']} 
                                className="icon icon__reuse-que--media__nxt" />
                        </div>
                        <div 
                            className="reuse-que__media--cnt reuse-que__media--cnt__prev"
                            onClick={props.prevMedia}>
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-left']} 
                                className="icon icon__reuse-que--media__prev" />
                        </div>
                    </Aux> : null
                }
            </div>
        );
    } 

    if (mediaTotal > 0) {
        desc = (
            <Aux>
                <p className="reuse-que__content--title reuse-que__content--title__que-img">
                    <a href={"/view/question/" + props.que._id}> 
                        {title} 
                    </a>
                </p>
                <div className="reuse-que__content--wrapper">
                {media}
                </div>
            </Aux>
        );
    }

    if (props.showCnt && props.showCnt.visible && props.que._id === props.showCnt.id) {
        userOptDetClass.push('reuse-que__footer--details__clk');
        userOptClass.push('reuse-que__footer--details__options--visible')
    }

    if (props.que.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
                <div className="reuse-que__footer--details__mid"></div>
                <ul className={userOptClass.join(' ')}>
                    <li>
                        <a href={`/edit/question/${props.que._id}`}>
                            <FontAwesomeIcon 
                                icon={['far', 'edit']} 
                                className="icon icon__reuse-que--options" />
                            Edit 
                        </a>
                    </li>
                    { userOptMode }
                    <li 
                        onClick={props.deleteCnt}>
                        <FontAwesomeIcon 
                            icon={['far', 'trash-alt']} 
                            className="icon icon__reuse-que--options" />
                        Delete 
                    </li>
                </ul>
            </div>
        )
    }

    if (props.que.liked && isLiked === null) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-que--footer__heart" />
    }

    if (isLiked) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-que--footer__heart" />
    }

    return (
        <div className="reuse-que">
            <ul className="reuse-que__header">
                <li>
                    <div className="reuse-que__header--category__img">
                        { userImage }
                    </div>
                    <div className="reuse-que__header--category__det">
                        <div className="reuse-que__header--category__det--name"><a href="/">{props.que.username}</a></div>
                        <div className="reuse-que__header--category__det--timePosted">
                            @ { <TimeAgo date={props.que.queCreated} live={false} formatter={formatter}/> }
                        </div> 
                    </div>
                </li>
                <li>
                    <p className="reuse-que__header--share__category">
                        <FontAwesomeIcon 
                            icon={ props.que.category.length > 1 ? ['fas', 'tags'] : ['fas', 'tag']} 
                            className="icon icon__reuse-pt--header__tag" />
                        <a href="/"> { props.que.category[0] } </a>
                    </p>
                    <div className="reuse-share">
                        <div className="reuse-share__icn" onClick={props.share}>
                            <FontAwesomeIcon 
                                icon={['fas', 'location-arrow']} 
                                className="icon icon__reuse-share--icn" />
                        </div> 
                    </div>
                </li>
            </ul>
            <div className="reuse-que__content">
               {desc}
            </div>
            <div className="reuse-que__ans">
                <div className="reuse-que__ans--wrapper">
                    <div className="reuse-que__ans--total">{props.que.comment}</div> 
                    Answer
                </div>
            </div> 
            <div className="reuse-que__footer">
                <ul className="reuse-que__footer--list">
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-up']} 
                            className="icon icon__reuse-que--footer__thumbup" />
                        {transformNumber(props.que.helpFull)}
                    </li>
                    <li className="reuse-que__footer--list__item-middle">
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-down']} 
                            className="icon icon__reuse-que--footer__thumbdown" />
                        {transformNumber(props.que.notHelpFull)}
                    </li>
                    <li>
                    <span onClick={props.fav}>{fav}</span>
                        {transformNumber(favAdd !== null ? favAdd : props.que.favorite)} 
                        {props.favChange && props.favChange.id === props.que._id ? <FavoriteActive 
                            liked={props.favChange.isLiked}/> : null}
                    </li>
                </ul>
                {userOpt}
            </div>
        </div>
    );
};

export default questionContent;