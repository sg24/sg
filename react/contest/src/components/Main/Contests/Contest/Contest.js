import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Avatar from 'react-avatar';

import './Contest.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from '../../../UI/Media/Media';

const contestContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-contest__footer--details'];
    let userOptClass = ['reuse-contest__footer--details__options'];

    let userImage = <img src={props.cnt.userImage} alt="" />
    
    if (props.cnt.username && !props.cnt.userImage) {
        userImage = <Avatar  name={props.cnt.nickname ? props.cnt.nickname : props.cnt.username} size='36' round />;
    }
    
    let media = null;
    let mediaCnt =  [...props.cnt.snapshot, ...props.cnt.image];

    if (mediaCnt.length > 0) {
        media = (
            <div className="reuse-contest__media">
                <div 
                    className="reuse-contest__media--main-wrapper"
                    onClick={props.preview.bind(this, mediaCnt)}>
                    <Carousel
                        images={mediaCnt}
                        wrapperClass="reuse-contest__media--wrapper"
                        prevClass="reuse-contest__media--cnt reuse-contest__media--cnt__prev"
                        prevIcnClass="icon icon__reuse-contest--media__prev"
                        nextClass="reuse-contest__media--cnt reuse-contest__media--cnt__nxt"
                        nextIcnClass="icon icon__reuse-contest--media__nxt"
                        playClass="reuse-contest__media--wrapper__icn"
                        playIcnClass="icon icon__reuse-contest--media__play"/>
                </div>
            </div>
        )
    }

    if (props.showCnt && props.showCnt.visible && props.index === props.showCnt.id) {
        userOptDetClass.push('reuse-contest__footer--details__clk');
        userOptClass.push('reuse-contest__footer--details__options--visible')
    }

    if (props.cnt.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
            <div className="reuse-contest__footer--details__mid"></div>
            <ul className={userOptClass.join(' ')}>
                <li
                    onClick={props.deleteCnt}>
                    <FontAwesomeIcon 
                        icon={['far', 'trash-alt']} 
                        className="icon icon__reuse-contest--options" /> 
                    Delete 
                </li>
                <li>
                    <a href={`/edit/contest/${props.cnt._id}`}>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-contest--options" /> 
                        Edit
                    </a>
                </li>
            </ul>
        </div>
        )
    }

    return (
      
        <div className="reuse-contest">
            <div className="reuse-contest__overlaywrapper">
                <div className="reuse-contest__wrapper">
                    <ul className="reuse-contest__header">
                        <li>
                            <div className="reuse-contest__header--category__img">
                                { userImage }
                            </div>
                            <div className="reuse-contest__header--category__det">
                                <div className="reuse-contest__header--category__det--name"><a href={`/user/profile/${props.cnt.authorID}`}> {props.cnt.nickname ? props.cnt.nickname : props.cnt.username} </a></div>
                                <div className="reuse-contest__header--category__det--timePosted">
                                    @ { <TimeAgo date={props.cnt.created} live={false} formatter={formatter}/> }
                                </div> 
                            </div>
                        </li>
                        <li>
                            {/* <p className="reuse-contest__header--share__category"> 
                                <FontAwesomeIcon 
                                    icon={['fas', 'map-marker-alt']} 
                                    className="icon icon__reuse-contest--header__tag" />
                                { props.cnt.location }
                            </p> */}
                        </li>
                    </ul>
                    {media}
                    <div className="reuse-contest__footer">
                        <ul className="reuse-contest__footer--list">
                            <li>
                                <FontAwesomeIcon 
                                    icon={['far', 'eye']} 
                                    className="icon icon__reuse-contest--footer__eye" /> 
                                {transformNumber(props.cnt.view)} 
                            </li>
                            <li 
                                className="reuse-contest__footer--list__item-middle"
                                onClick={props.showChat}>
                                <FontAwesomeIcon 
                                    icon={['far', 'comments']} 
                                    className="icon icon__reuse-contest--footer__chats" /> 
                                {transformNumber(props.cnt.comment)} 
                            </li>
                        </ul>
                        {userOpt}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default contestContent;