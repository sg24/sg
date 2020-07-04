import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Avatar from 'react-avatar';

import './AdvertContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';
import Carousel from '../../../UI/Media/Media';

const advertContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-ads__footer--details'];
    let userOptClass = ['reuse-ads__footer--details__options'];
    let favAdd = null;
    let isLiked = null;
    // let mediaTotal = props.cnt.snapshot.length+props.cnt.image.length;
    let userOptMode = (
            <li 
                className="reuse-ads__footer--details__options--status"
                onClick={props.changeCnt}>
                <FontAwesomeIcon 
                    icon={['far', 'eye-slash']} 
                    className="icon icon__reuse-ads--options__dft" /> 
                Draft
            </li>
    );

    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-ads--footer__heart" />
    
    let userImage = <img src={props.cnt.userImage} alt="" />

    if (props.cnt.mode === 'draft') {
      userOptMode = (
        <li 
            className="reuse-ads__footer--details__options--status"
            onClick={props.changeCntPublish}>
            <FontAwesomeIcon 
                icon={['far', 'eye']} 
                className="icon icon__reuse-ads--options__dft" /> 
            Publish
        </li>
      )
    }
    
    if (props.cnt.username && !props.cnt.userImage) {
        userImage = <Avatar  name={props.cnt.username} size='36' round />;
    }
    
    for (let changedFav of props.changedFav) {
        if (props.cnt._id === changedFav.id) {
            favAdd = changedFav.favAdd;
            isLiked= changedFav.liked;
        }
    }

    let media = null;
    let mediaCnt =  [...props.cnt.snapshot, ...props.cnt.image];

    if (mediaCnt.length > 0) {
        media = (
            <div className="reuse-ads__media">
			    <div className="reuse-ads__media--main-wrapper">
                    <Carousel
                        images={mediaCnt}
                        wrapperClass="reuse-ads__media--wrapper"
                        prevClass="reuse-ads__media--cnt reuse-ads__media--cnt__prev"
                        prevIcnClass="icon icon__reuse-ads--media__prev"
                        nextClass="reuse-ads__media--cnt reuse-ads__media--cnt__nxt"
                        nextIcnClass="icon icon__reuse-ads--media__nxt"
                        playClass="reuse-ads__media--wrapper__icn"
                        playIcnClass="icon icon__reuse-ads--media__play"/>
                </div>
            </div>
        )
    }

    if (props.showCnt && props.showCnt.visible && props.index === props.showCnt.id) {
        userOptDetClass.push('reuse-ads__footer--details__clk');
        userOptClass.push('reuse-ads__footer--details__options--visible')
    }

    if (props.cnt.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
            <div className="reuse-ads__footer--details__mid"></div>
            <ul className={userOptClass.join(' ')}>
                <li>
                    <a href={`/edit/advert/${props.cnt._id}`}>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-ads--options" /> 
                        Edit 
                    </a>
                </li>
                {userOptMode}
                <li
                    onClick={props.deleteCnt}>
                    <FontAwesomeIcon 
                        icon={['far', 'trash-alt']} 
                        className="icon icon__reuse-ads--options" /> 
                    Delete 
                </li>
            </ul>
        </div>
        )
    }

    if (props.cnt.liked && isLiked === null) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-ads--footer__heart" />
    }

    if (isLiked) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-ads--footer__heart" />
    }

    return (
      
        <div className="reuse-ads">
            <div className="reuse-ads__overlaywrapper">
                <div className="reuse-ads__wrapper">
                    <ul className="reuse-ads__header">
                        <li>
                            <div className="reuse-ads__header--category__img">
                                { userImage }
                            </div>
                            <div className="reuse-ads__header--category__det">
                                <div className="reuse-ads__header--category__det--name"><a href={`/user/profile/${props.cnt.authorID}`}> {props.cnt.username} </a></div>
                                <div className="reuse-ads__header--category__det--timePosted">
                                    @ { <TimeAgo date={props.cnt.created} live={false} formatter={formatter}/> }
                                </div> 
                            </div>
                        </li>
                        <li>
                            {/* <p className="reuse-ads__header--share__category"> 
                                <FontAwesomeIcon 
                                    icon={ props.cnt.category.length > 1 ? ['fas', 'tags'] : ['fas', 'tag']} 
                                    className="icon icon__reuse-ads--header__tag" />
                                { props.cnt.category[0] }
                            </p> */}
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
                    <p className="reuse-ads__title"> <a href={"/view/advert/" + props.cnt._id}>{props.cnt.title}</a></p>
                    <p className="reuse-ads__description">
                        <a href={"/view/advert/" + props.cnt._id}>
                            {String(props.cnt.desc).length > 149 ? String(props.cnt.desc).substr(0, 150) + '...' : props.cnt.desc} 
                        </a>
                    </p>
                
                    <div className="reuse-ads__footer">
                        <ul className="reuse-ads__footer--list">
                            <li>
                                <a href={"/view/advert/" + props.cnt._id}>
                                    <FontAwesomeIcon 
                                        icon={['far', 'eye']} 
                                        className="icon icon__reuse-ads--footer__eye" /> 
                                    {transformNumber(props.cnt.view)} 
                                </a>
                            </li>
                            <li className="reuse-ads__footer--list__item-middle">
                                <a href={"/view/advert/" + props.cnt._id}>
                                    <FontAwesomeIcon 
                                        icon={['far', 'comments']} 
                                        className="icon icon__reuse-ads--footer__chats" /> 
                                    {transformNumber(props.cnt.comment)} 
                                </a>
                            </li>
                            <li>
                                <span onClick={props.fav}>{fav}</span>
                                {transformNumber(favAdd !== null ? favAdd : props.cnt.favorite)} 
                                {props.favChange && props.favChange.id === props.cnt._id ? <FavoriteActive 
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

export default advertContent;