import React from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Avatar from 'react-avatar';

import './Around.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from '../../../UI/Media/Media';

const aroundContent = props => {
    const formatter = buildFormatter(engStrings);
    let userOpt = null;
    let userOptDetClass = ['reuse-around__footer--details'];
    let userOptClass = ['reuse-around__footer--details__options'];
    let title = String(props.cnt.post).length > 149 ? String(props.cnt.post).substr(0, 150) + '...' : props.cnt.post;

    let userImage = <img src={props.cnt.userImage} alt="" />
    
    if (props.cnt.username && !props.cnt.userImage) {
        userImage = <Avatar  name={props.cnt.username} size='36' round />;
    }
    
    let media = null;
    let mediaCnt =  [...props.cnt.snapshot, ...props.cnt.image];

    if (mediaCnt.length > 0) {
        media = (
            <div className="reuse-around__media">
                <div 
                    className="reuse-around__media--main-wrapper"
                     onClick={props.preview.bind(this, mediaCnt)}>
                    <Carousel
                        images={mediaCnt}
                        wrapperClass="reuse-around__media--wrapper"
                        prevClass="reuse-around__media--cnt reuse-around__media--cnt__prev"
                        prevIcnClass="icon icon__reuse-around--media__prev"
                        nextClass="reuse-around__media--cnt reuse-around__media--cnt__nxt"
                        nextIcnClass="icon icon__reuse-around--media__nxt"
                        playClass="reuse-around__media--wrapper__icn"
                        playIcnClass="icon icon__reuse-around--media__play"/>
                </div>
            </div>
        )
    }

    if (props.showCnt && props.showCnt.visible && props.index === props.showCnt.id) {
        userOptDetClass.push('reuse-around__footer--details__clk');
        userOptClass.push('reuse-around__footer--details__options--visible')
    }

    if (props.cnt.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
            <div className="reuse-around__footer--details__mid"></div>
            <ul className={userOptClass.join(' ')}>
                <li
                    onClick={props.deleteCnt}>
                    <FontAwesomeIcon 
                        icon={['far', 'trash-alt']} 
                        className="icon icon__reuse-around--options" /> 
                    Delete 
                </li>
            </ul>
        </div>
        )
    }

    return (
      
        <div className="reuse-around">
            <div className="reuse-around__overlaywrapper">
                <div className="reuse-around__wrapper">
                    <ul className="reuse-around__header">
                        <li>
                            <div className="reuse-around__header--category__img">
                                { userImage }
                            </div>
                            <div className="reuse-around__header--category__det">
                                <div className="reuse-around__header--category__det--name"><a href={`/user/profile/${props.cnt.authorID}`}> {props.cnt.username} </a></div>
                                <div className="reuse-around__header--category__det--timePosted">
                                    @ { <TimeAgo date={props.cnt.created} live={false} formatter={formatter}/> }
                                </div> 
                            </div>
                        </li>
                        <li>
                            {/* <p className="reuse-around__header--share__category"> 
                                <FontAwesomeIcon 
                                    icon={['fas', 'map-marker-alt']} 
                                    className="icon icon__reuse-around--header__tag" />
                                { props.cnt.location }
                            </p> */}
                        </li>
                    </ul>
                    {media}
                    <p 
                        className="reuse-around__title"
                        onClick={props.showChat}> {title}</p>
                    <div className="reuse-around__footer">
                        <ul className="reuse-around__footer--list">
                            <li
                              onClick={props.showChat}>
                                <FontAwesomeIcon 
                                    icon={['far', 'eye']} 
                                    className="icon icon__reuse-around--footer__eye" /> 
                                {transformNumber(props.cnt.view)} 
                            </li>
                            <li 
                                className="reuse-around__footer--list__item-middle"
                                onClick={props.showChat}>
                                <FontAwesomeIcon 
                                    icon={['far', 'comments']} 
                                    className="icon icon__reuse-around--footer__chats" /> 
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

export default aroundContent;