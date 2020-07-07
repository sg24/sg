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
import Carousel from '../../../UI/Media/Media';

const questionContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-que__footer--details'];
    let userOptClass = ['reuse-que__footer--details__options'];
    let favAdd = null;
    let isLiked = null;
    let title = String(props.que.title).length > 149 ? String(props.que.title).substr(0, 150) + '...' : props.que.title;
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

    if (mediaCnt.length > 0) {
        media = (
            <div className="reuse-que__media">
                <div 
                    className="reuse-que__media--main-wrapper"
                    onClick={props.preview.bind(this, mediaCnt)}>
                    <Carousel
                        images={mediaCnt}
                        wrapperClass="reuse-que__media--wrapper"
                        prevClass="reuse-que__media--cnt reuse-que__media--cnt__prev"
                        prevIcnClass="icon icon__reuse-que--media__prev"
                        nextClass="reuse-que__media--cnt reuse-que__media--cnt__nxt"
                        nextIcnClass="icon icon__reuse-que--media__nxt"
                        playClass="reuse-que__media--wrapper__icn"
                        playIcnClass="icon icon__reuse-que--media__play"/>
                </div>
            </div>
        )
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
                        <div className="reuse-que__header--category__det--name"><a href={`/user/profile/${props.que.authorID}`}>{props.que.username}</a></div>
                        <div className="reuse-que__header--category__det--timePosted">
                            @ { <TimeAgo date={props.que.queCreated} live={false} formatter={formatter}/> }
                        </div> 
                    </div>
                </li>
                <li>
                    {/* <p className="reuse-que__header--share__category">
                        <FontAwesomeIcon 
                            icon={ props.que.category.length > 1 ? ['fas', 'tags'] : ['fas', 'tag']} 
                            className="icon icon__reuse-que--header__tag" />
                        { props.que.category[0] }
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
                        <a href={"/view/question/" + props.que._id}> 
                            <FontAwesomeIcon 
                                icon={['far', 'thumbs-up']} 
                                className="icon icon__reuse-que--footer__thumbup" />
                            {transformNumber(props.que.helpFull)}
                        </a>
                    </li>
                    <li className="reuse-que__footer--list__item-middle">
                        <a href={"/view/question/" + props.que._id}> 
                            <FontAwesomeIcon 
                                icon={['far', 'thumbs-down']} 
                                className="icon icon__reuse-que--footer__thumbdown" />
                            {transformNumber(props.que.notHelpFull)}
                        </a>
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