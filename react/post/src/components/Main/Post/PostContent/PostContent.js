import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Avatar from 'react-avatar';

import './PostContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';
import Carousel from '../../../UI/Media/Media';

const postContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-pt__footer--details'];
    let userOptClass = ['reuse-pt__footer--details__options'];
    let favAdd = null;
    let isLiked = null;
    // let mediaTotal = props.pt.snapshot.length+props.pt.image.length;
    let userOptMode = (
            <li 
                className="reuse-pt__footer--details__options--status"
                onClick={props.changePt}>
                <FontAwesomeIcon 
                    icon={['far', 'eye-slash']} 
                    className="icon icon__reuse-pt--options__dft" /> 
                Draft
            </li>
    );

    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-pt--footer__heart" />
    
    let userImage = <img src={props.pt.userImage} alt="" />

    if (props.pt.mode === 'draft') {
      userOptMode = (
        <li 
            className="reuse-pt__footer--details__options--status"
            onClick={props.changePtPublish}>
            <FontAwesomeIcon 
                icon={['far', 'eye']} 
                className="icon icon__reuse-pt--options__dft" /> 
            Publish
        </li>
      )
    }
    
    if (props.pt.username && !props.pt.userImage) {
        userImage = <Avatar  name={props.pt.username} size='36' round />;
    }
    
    for (let changedFav of props.changedFav) {
        if (props.pt._id === changedFav.id) {
            favAdd = changedFav.favAdd;
            isLiked= changedFav.liked;
        }
    }

    let media = null;
    let mediaCnt =  [...props.pt.snapshot, ...props.pt.image];
    
    if (mediaCnt.length > 0) {
        media = (
            <div className="reuse-pt__media">
			    <div className="reuse-pt__media--main-wrapper">
                    <Carousel
                        images={mediaCnt}
                        wrapperClass="reuse-pt__media--wrapper"
                        prevClass="reuse-pt__media--cnt reuse-pt__media--cnt__prev"
                        prevIcnClass="icon icon__reuse-pt--media__prev"
                        nextClass="reuse-pt__media--cnt reuse-pt__media--cnt__nxt"
                        nextIcnClass="icon icon__reuse-pt--media__nxt"
                        playClass="reuse-pt__media--wrapper__icn"
                        playIcnClass="icon icon__reuse-pt--media__play"/>
                </div>
            </div>
        )
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
                    <a href={`/edit/post/${props.pt._id}`}>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-pt--options" /> 
                        Edit 
                    </a>
                </li>
                {userOptMode}
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
                                { userImage }
                            </div>
                            <div className="reuse-pt__header--category__det">
                                <div className="reuse-pt__header--category__det--name"><a href={`/user/profile/${props.pt.authorID}`}> {props.pt.username} </a></div>
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
                                { props.pt.category[0] }
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
                    <p className="reuse-pt__title"> <a href={"/view/post/" + props.pt._id}>{props.pt.title}</a></p>
                    <p className="reuse-pt__description">
                        <a href={"/view/post/" + props.pt._id}>
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