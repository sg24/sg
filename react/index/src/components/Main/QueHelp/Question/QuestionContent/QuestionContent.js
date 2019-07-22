import React from 'react';

import './QuestionContent.css';
import '../../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber, transformString } from '../../../../../shared/utility';
import Aux from '../../../../../hoc/Auxs/Aux';

const questionContent = props => {
    let desc = (
        <p className="reuse-que__content--title">
            <a href={'/view/' + props.que.id}> {transformString(props.que.desc)} </a>
        </p>
    );

    let userOpt = null;
    let userOptDetClass = ['reuse-que__footer--details'];
    let userOptClass = ['reuse-que__footer--details__options reuse-que__footer--details__options--helpme'];

    let fav = (
        <i className="far fa-heart icon icon__reuse-que--footer__heart"></i>
    );

    if (props.que.queImage) {
        desc = (
            <Aux>
                <p className="reuse-que__content--title reuse-que__content--title__que-img">
                    <a href={'/view/' + props.que.id}> {transformString(props.que.desc)} </a>
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
                    <li className="reuse-que__footer--details__options--status"><i className="fas fa-user-slash icon icon__reuse-que--options__dft"></i> Block</li>
                    <li><i className="far fa-trash-alt icon icon__reuse-que--options"></i>Delete </li>
                </ul>
            </div>
        )
    }

    if (props.que.liked) {
        fav = (
            <i className="fas fa-heart icon icon__reuse-que--footer__heart"></i>
        );
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
                    <p className="reuse-que__header--share__category"><i className="fas fa-tag icon icon__reuse-que--header__tag"></i><a href="/"> { props.que.category } </a></p>
                    <div className="reuse-share">
                        <div className="reuse-share__icn" onClick={props.share}>
                            <i className="fas fa-location-arrow icon icon__reuse-share--icn"></i>
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
                    <li><i className="far fa-thumbs-up icon icon__reuse-que--footer__thumbup"></i> {transformNumber(props.que.helpFull)}</li>
                    <li className="reuse-que__footer--list__item-middle"><i className="far fa-thumbs-down icon icon__reuse-que--footer__thumbdown"></i>  {transformNumber(props.que.notHelpFull)}</li>
                    <li onClick={props.fav}>{fav} {transformNumber(props.que.favorite)}</li>
                </ul>
                {userOpt}
            </div>
        </div>
    );
};

export default questionContent;