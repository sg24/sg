import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Avatar from 'react-avatar';

import './PoetContent.css'; 
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aux from '../../../../hoc/Auxs/Aux';
import { transformNumber, engStrings } from '../../../../shared/utility';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';

const poetContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-pwt__content--det__user--det'];
    let userOptClass = ['reuse-pwt__content--det__user--det__opt'];
    let favAdd = null;
    let isLiked = null;
    let userOptMode = (
        <li 
            className="reuse-pwt__content--det__user--det__opt--status"
            onClick={props.changeCnt}>
            <FontAwesomeIcon 
                icon={['far', 'eye-slash']} 
                className="icon icon__reuse-pwt--options__dft" />
            Draft
        </li>
    );
    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-pwt--footer__heart" />

    let userImage = <img src={props.pwt.userImage} alt="" />

    if (props.pwt.mode === 'draft') {
      userOptMode = (
        <li 
            className="reuse-pwt__content--det__user--det__opt--status"
            onClick={props.changeCntPublish}>
            <FontAwesomeIcon 
                icon={['far', 'eye']} 
                className="icon icon__reuse-pwt--options__dft" />
            Publish
        </li>
      )
    }
    
    if (props.pwt.username && !props.pwt.userImage) {
        userImage = <Avatar  name={props.pwt.username} size='50' round />;
    }

    for (let changedFav of props.changedFav) {
        if (props.pwt._id === changedFav.id) {
            favAdd = changedFav.favAdd;
            isLiked= changedFav.liked;
        }
    }

    if (props.showCnt && props.showCnt.visible && props.showCnt.id === props.pwt._id)  {
        userOptDetClass.push('reuse-pwt__content--det__user--det__clk');
        userOptClass.push('reuse-pwt__content--det__user--det__opt--visible');
    }

    if (props.pwt.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
                <div className="reuse-pwt__content--det__user--det__mid"></div>
                <ul className={userOptClass.join(' ')}>
                    <li>
                        <a href={`/edit/poet/${props.pwt._id}`}>
                            <FontAwesomeIcon 
                                icon={['far', 'edit']} 
                                className="icon icon__reuse-pwt--options" />
                            Edit 
                        </a>
                    </li>
                    { userOptMode }
                    <li
                        onClick={props.deleteCnt}>
                        <FontAwesomeIcon 
                            icon={['far', 'trash-alt']} 
                            className="icon icon__reuse-pwt--options" />
                        Delete 
                    </li>
                </ul>
            </div>
        );
    };

    if (props.pwt.liked && isLiked === null) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-pwt--footer__heart" />
    }

    if (isLiked) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-pwt--footer__heart" />
    }

    let pwtType = (
        <div className="reuse-pwt">
        <div className="reuse-share">
            <div className="reuse-share__icn" onClick={props.share}>
                <FontAwesomeIcon 
                    icon={['fas', 'location-arrow']} 
                    className="icon icon__reuse-share--icn" />
            </div>
        </div>
        <div className="reuse-pwt__content">
        <div className="reuse-pwt__content--tag">
                {/* <span className="reuse-pwt__content--tag__cntgrp">Poet</span> */}
                <span>
                    <FontAwesomeIcon 
                        icon={['fas', 'tag']} 
                        className="icon icon__reuse-pwt--header__tag" />
                    Write Up
                </span>
            </div>
            <div className="reuse-pwt__content--title">
                <div className="reuse-pwt__content--title__wrapper">
                    <a href={"/view/poet/" + props.pwt._id}> 
                      {String(props.pwt.title).length > 149 ? String(props.pwt.title).substr(0, 150) + '...' : props.pwt.title} 
                     </a>
                </div>
            </div>
            <div className="reuse-pwt__content--det">
                <div className="reuse-pwt__content--det__user">
                    <div className="reuse-pwt__content--det__user--img">
                        { userImage }
                    </div> 
                    <a href={"/user/profile/"+props.pwt.authorID}> {String(props.pwt.username).substr(0, 8)} </a>
                        <div className="reuse-pwt__content--det__user--time">
                        @ { <TimeAgo date={props.pwt.pwtCreated} live={false} formatter={formatter} />}
                    </div>
                    {userOpt}
                </div>
            </div> 
        </div>
        <ul className="reuse-pwt__footer">
            <li>
                <a href={"/view/poet/" + props.pwt._id}>
                    <FontAwesomeIcon 
                        icon={['far', 'smile']} 
                        className="icon icon__reuse-pwt--footer__smile" />
                    { transformNumber(props.pwt.helpFull) } 
                </a>
            </li>
            <li>
                <span onClick={props.fav}>{fav}</span>
                {transformNumber(favAdd !== null ? favAdd : props.pwt.favorite)} 
                {props.favChange && props.favChange.id === props.pwt._id ? <FavoriteActive 
                    liked={props.favChange.isLiked}/> : null}
            </li>
            <li>
                <a href={"/view/poet/" + props.pwt._id}>
                    <FontAwesomeIcon 
                        icon={['far', 'comment-dots']} 
                        className="icon icon__reuse-pwt--footer__comments" />
                    { transformNumber(props.pwt.comment) }
                </a> 
            </li>
        </ul>
    </div>
    );

    return (
        <Aux>
            {pwtType}
        </Aux>
    );
};

export default poetContent;