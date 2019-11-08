import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import './PostContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import Aux from '../../../../hoc/Auxs/Aux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';

const postContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-pt__footer--details'];
    let userOptClass = ['reuse-pt__footer--details__options'];
    let favAdd = null;
    let isLiked = null;

    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-pt--footer__heart" />
    
    for (let changedFav of props.changedFav) {
        if (props.pt._id === changedFav.id) {
            favAdd = changedFav.favAdd;
            isLiked= changedFav.liked;
        }
    }

    let media = null;
    let mediaCnt =  [...props.pt.snapshot, ...props.pt.postImage];
    let playVideo = null;
    let mediaWrapperClass = ['reuse-pt__media--wrapper'];

    if (mediaCnt.length > 0) {
        let isShowned = false;
        for (let mediaItm of props.mediaItms) {
            if (mediaItm.id === props.pt._id) {
                isShowned = true;
                if (props.animateItm.id === props.pt._id) {
                    if (props.animateItm.direction === 'next' && !props.removePrevAnim) {
                        mediaWrapperClass.push('reuse-pt__media--wrapper__anim');
                    } 
                    if (props.animateItm.direction === 'prev' && !props.removePrevAnim) {
                        mediaWrapperClass.push('reuse-pt__media--wrapper__anim-rev');
                    }
                }

                if (props.animateItm === null) {
                    mediaWrapperClass.push('reuse-pt__media--wrapper__anim');
                }

                if (props.removePrevMedia && props.removePrevMedia.id === props.pt._id) {
                    showPrevAnim(props.removePrevMedia);
                }

                displayMedia(mediaItm.position);
            }
        }
        if (!isShowned) {
            if (props.removePrevMedia && props.removePrevMedia.id === props.pt._id) {
                showPrevAnim(props.removePrevMedia);
            }
            displayMedia(0)
        }
    }

    function showPrevAnim(prevAnim) {
        if (prevAnim.type === 'next') {
            mediaWrapperClass.push('reuse-pt__media--wrapper__anim-exit');
        } else {
            mediaWrapperClass.push('reuse-pt__media--wrapper__anim-exit-rev')
        }
    }

    function displayMedia(position) {
        let curMedia = mediaCnt[position];
        if (curMedia && typeof curMedia === "object") {
            playVideo = (
                props.video && props.video.id !== curMedia.id ? 
                <div 
                    className={props.playerIcnId && props.playerIcnId === props.pt._id ? 
                        'reuse-pt__media--wrapper__icn reuse-pt__media--wrapper__icn-move' : 'reuse-pt__media--wrapper__icn'}
                    onClick={props.playVideo.bind(this, curMedia.id, props.pt.postVideo)}>
                    <FontAwesomeIcon 
                        icon={['fas', 'play-circle']} 
                        className="icon icon__reuse-pt--media__play" /> 
                </div>: null
            );
        }

        media = (
            <div className="reuse-pt__media">
                <div className={props.video && props.video.id === curMedia.id ? 
                        'reuse-pt__media--main-wrapper reuse-pt__media--main-wrapper__load' : 'reuse-pt__media--main-wrapper'}>
                    <div 
                        onDragStart={() => false }
                        touch-action="pan-y"
                        className={props.disableAnim ? 'reuse-pt__media--wrapper' : mediaWrapperClass.join(' ')} onAnimationEnd={props.removeAnim}>
                        { playVideo }
                        { props.video && props.video.id === curMedia.id && props.video.url ? 
                            <video 
                                onPointerDown={(event) => props.slidePlay(props.pt._id, [...props.pt.snapshot, ...props.pt.postImage].length, event)}
                                onPointerMove={(event) => props.moveSlidePlay(props.pt._id, [...props.pt.snapshot, ...props.pt.postImage].length, event)}
                                onPointerUp={(event) => props.clearSlidePlay(event)}
                                src={props.video.url} controls autoPlay>
                                <p>our browser doesn't support embedded videos</p>
                            </video> :
                        props.video && props.video.id === curMedia.id ? null : 
                        <img 
                            draggable="false"
                            onDragStart={() => false }
                            src={typeof curMedia === "object" ? curMedia.snapshot : curMedia}  alt="post"
                            onPointerDown={(event) => props.slidePlay(props.pt._id, [...props.pt.snapshot, ...props.pt.postImage].length, event)}
                            onPointerMove={(event) => props.moveSlidePlay(props.pt._id, [...props.pt.snapshot, ...props.pt.postImage].length, event)}
                            onPointerUp={(event) => props.clearSlidePlay(event)} />
                        }
                        { props.videoErr && props.videoErr.id === curMedia.id ? 
                            <div 
                                className="reuse-pt__video-err"
                                onPointerDown={(event) => props.slidePlay(props.pt._id, [...props.pt.snapshot, ...props.pt.postImage].length, event)}
                                onPointerMove={(event) => props.moveSlidePlay(props.pt._id, [...props.pt.snapshot, ...props.pt.postImage].length, event)}
                                onPointerUp={(event) => props.clearSlidePlay(event)}>
                                <div 
                                    className="reuse-pt__video-err--icn"
                                    onClick={props.playVideo.bind(this, curMedia.id, props.pt.postVideo)}>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'redo']} 
                                        className="icon icon__reuse-pt--video-err__icn"/>
                                </div>
                                <h3> {props.videoErr.err.message} </h3> 
                            </div> : null}
                    </div>
                </div>
                
                {
                    mediaCnt && mediaCnt.length > 0 ? 
                    <Aux>
                        <div 
                            className="reuse-pt__media--cnt reuse-pt__media--cnt__nxt"
                            onClick={props.nextMedia}>
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-right']} 
                                className="icon icon__reuse-pt--media__nxt" />
                        </div>
                        <div 
                            className="reuse-pt__media--cnt reuse-pt__media--cnt__prev"
                            onClick={props.prevMedia}>
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-left']} 
                                className="icon icon__reuse-pt--media__prev" />
                        </div>
                    </Aux> : null
                }
            </div>
        );
    } 

    if (props.showPt && props.showPt.visible && props.index === props.showPt.index) {
        userOptDetClass.push('reuse-pt__footer--details__clk');
        userOptClass.push('reuse-pt__footer--details__options--visible')
    }

    if (props.pt.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
            <div className="reuse-pt__footer--details__mid"></div>
            <ul className={userOptClass.join(' ')}>
                <li>
                    <a href="/">
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-pt--options" /> 
                        Edit 
                    </a>
                </li>
                <li 
                    className="reuse-pt__footer--details__options--status"
                    onClick={props.changePt}>
                    <FontAwesomeIcon 
                        icon={['far', 'eye-slash']} 
                        className="icon icon__reuse-pt--options__dft" /> 
                    Draft
                </li>
                <li
                    onClick={props.deletePt}>
                    <FontAwesomeIcon 
                        icon={['far', 'trash-alt']} 
                        className="icon icon__reuse-pt--options" /> 
                    Delete 
                </li>
            </ul>
        </div>
        )
    }

    if (props.pt.liked && isLiked === null) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-pt--footer__heart" />
    }

    if (isLiked) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-pt--footer__heart" />
    }

    return (
      
        <div className="reuse-pt">
            <div className="reuse-pt__overlaywrapper">
                <div className="reuse-pt__wrapper">
                    <ul className="reuse-pt__header">
                        <li>
                            <div className="reuse-pt__header--category__img">
                                <img src={props.pt.userImage} alt="" />
                            </div>
                            <div className="reuse-pt__header--category__det">
                                <div className="reuse-pt__header--category__det--name"><a href="/"> {props.pt.author} </a></div>
                                <div className="reuse-pt__header--category__det--timePosted">
                                    @ { <TimeAgo date={props.pt.postCreated} live={false} formatter={formatter}/> }
                                </div> 
                            </div>
                        </li>
                        <li>
                            <p className="reuse-pt__header--share__category"> 
                                <FontAwesomeIcon 
                                    icon={ props.pt.category.length > 1 ? ['fas', 'tags'] : ['fas', 'tag']} 
                                    className="icon icon__reuse-pt--header__tag" />
                                <a href="/"> { props.pt.category[0] } </a>
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
                    {media}
                    <p className="reuse-pt__title">{props.pt.title}</p>
                    <p className="reuse-pt__description">
                        <a href={"/view/" + props.pt._id}>
                            {String(props.pt.desc).length > 149 ? String(props.pt.desc).substr(0, 150) + '...' : props.pt.desc} 
                        </a>
                    </p>
                
                    <div className="reuse-pt__footer">
                        <ul className="reuse-pt__footer--list">
                            <li>
                                <FontAwesomeIcon 
                                    icon={['far', 'eye']} 
                                    className="icon icon__reuse-pt--footer__eye" /> 
                                {transformNumber(props.pt.view)} 
                            </li>
                            <li className="reuse-pt__footer--list__item-middle">
                                <FontAwesomeIcon 
                                    icon={['far', 'comments']} 
                                    className="icon icon__reuse-pt--footer__chats" /> 
                                {transformNumber(props.pt.comment)} 
                            </li>
                            <li>
                                <span onClick={props.fav}>{fav}</span>
                                {transformNumber(favAdd !== null ? favAdd : props.pt.favorite)} 
                                {props.favChange && props.favChange.id === props.pt._id ? <FavoriteActive 
                                    liked={props.favChange.isLiked}/> : null}
                            </li>
                        </ul>
                        {userOpt}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default postContent;