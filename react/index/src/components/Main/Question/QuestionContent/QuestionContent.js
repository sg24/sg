import React from 'react';

import './QuestionContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber } from '../../../../shared/utility';
import Aux from '../../../../hoc/Auxs/Aux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const questionContent = props => {
    let desc = (
        <p className="reuse-que__content--title">
            <a href={"/view/" + props.que.id}> {props.que.desc} </a>
        </p>
    );

    let userOpt = null;
    let userOptDetClass = ['reuse-que__footer--details'];
    let userOptClass = ['reuse-que__footer--details__options'];

    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-que--footer__heart" />

    if (props.que.queImage) {
        desc = (
            <Aux>
                <p className="reuse-que__content--title reuse-que__content--title__que-img">
                    <a href={"/view/" + props.que.id}> {props.que.desc} </a>
                </p>
                <div className="reuse-que__content--img">
                    <img  alt="" src={props.que.queImage} />
                </div>
            </Aux>
        );
    }

    if (props.showQue && props.showQue.visible && props.index === props.showQue.index) {
        userOptDetClass.push('reuse-que__footer--details__clk');
        userOptClass.push('reuse-que__footer--details__options--visible')
    }

    if (props.que.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
                <div className="reuse-que__footer--details__mid"></div>
                <ul className={userOptClass.join(' ')}>
                    <li>
                        <a href="/">
                            <FontAwesomeIcon 
                                icon={['far', 'edit']} 
                                className="icon icon__reuse-que--options" />
                            Edit 
                        </a>
                    </li>
                    <li className="reuse-que__footer--details__options--status">
                        <FontAwesomeIcon 
                            icon={['far', 'eye-slash']} 
                            className="icon icon__reuse-que--options__dft" />
                        Draft
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'trash-alt']} 
                            className="icon icon__reuse-que--options" />
                        Delete 
                    </li>
                </ul>
            </div>
        )
    }

    if (props.que.liked) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-que--footer__heart" />
    }

    return (
        <div className="reuse-que">
            <ul className="reuse-que__header">
                <li>
                    <div className="reuse-que__header--category__img">
                        <img src={props.que.userImage} alt="" />
                    </div>
                    <div className="reuse-que__header--category__det">
                        <div className="reuse-que__header--category__det--name"><a href="/">{props.que.author}</a></div>
                        <div className="reuse-que__header--category__det--timePosted">@ {props.que.queCreated}</div> 
                    </div>
                </li>
                <li>
                    <p className="reuse-que__header--share__category">
                        <FontAwesomeIcon 
                            icon={['fas', 'tag']} 
                            className="icon icon__reuse-que--header__tag" />
                        <a href="/"> { props.que.category } </a>
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
                    <div className="reuse-que__ans--total">{props.que.answers}</div> 
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
                    <li onClick={props.fav}>{fav} {transformNumber(props.que.favorite)}</li>
                </ul>
                {userOpt}
            </div>
        </div>
    );
};

export default questionContent;