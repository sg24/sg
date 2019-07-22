import React from 'react';

import './PoetContent.css'; 
import '../../../UI/ShareIcn/ShareIcn.css'; 
import Aux from '../../../../hoc/Auxs/Aux';
import { transformNumber, transformString } from '../../../../shared/utility';

const poetContent = props => {
    let userOpt = null;
    let userOptDetClass = ['reuse-pwt__content--det__user--det'];
    let userOptClass = ['reuse-pwt__content--det__user--det__opt'];

    let fav = (
        <i className="far fa-heart icon icon__reuse-pwt--footer__heart"></i>
    );

    if (props.showPwt && props.showPwt.visible && props.showPwt.index === props.index)  {
        userOptDetClass.push('reuse-pwt__content--det__user--det__clk');
        userOptClass.push('reuse-pwt__content--det__user--det__opt--visible');
    }

    if (props.pwt.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
                <div className="reuse-pwt__content--det__user--det__mid"></div>
                <ul className={userOptClass.join(' ')}>
                    <li><a href="/"><i className="far fa-edit icon icon__reuse-pwt--options"></i>Edit </a></li>
                    <li className="reuse-pwt__content--det__user--det__opt--status"><i className="far fa-eye-slash icon icon__reuse-pwt--options__dft"></i> Draft</li>
                    <li><i className="far fa-trash-alt icon icon__reuse-pwt--options"></i>Delete </li>
                </ul>
            </div>
        );
    };

    if (props.pwt.liked) {
        fav = (
            <i className="fas fa-heart icon icon__reuse-pwt--footer__heart"></i>
        );
    }

    let pwtType = (
        <div className="reuse-pwt">
        <div className="reuse-share">
            <div className="reuse-share__icn" onClick={props.share}>
                <i className="fas fa-location-arrow icon icon__reuse-share--icn"></i>
            </div>
        </div>
        <div className="reuse-pwt__content">
            <div className="reuse-pwt__content--tag">
                <span><a href="/"><i className="fas fa-tag icon icon__reuse-pwt--tag"></i> {props.pwt.category}</a></span>
            </div>
            <div className="reuse-pwt__content--title">
                <div className="reuse-pwt__content--title__wrapper">
                    <a href="/"> { transformString(props.pwt.desc)} </a>
                </div>
            </div>
            <div className="reuse-pwt__content--det">
                <div className="reuse-pwt__content--det__user">
                    <div className="reuse-pwt__content--det__user--img">
                        <img src={props.pwt.userImage} alt="" />
                    </div> 
                    <a href="/"> {props.pwt.author} </a>
                        <div className="reuse-pwt__content--det__user--time">
                        @ {props.pwt.poetCreated}
                    </div>
                    {userOpt}
                </div>
            </div> 
        </div>
        <ul className="reuse-pwt__footer">
            <li><i className="far fa-smile icon icon__reuse-pwt--footer__smile"></i> { transformNumber(props.pwt.helpFull) } </li>
            <li onClick={props.fav}>{fav} { transformNumber(props.pwt.favorite) } </li>
            <li><i className="far fa-comment-dots icon icon__reuse-pwt--footer__comments"></i> { transformNumber(props.pwt.comment) } </li>
        </ul>
    </div>
    );

    if (props.pwt.category && props.pwt.category === 'Quote') {
        pwtType = (
            <div className="reuse-pwt">
            <div className="reuse-share">
                <div className="reuse-share__icn" onClick={props.share}>
                    <i className="fas fa-location-arrow icon icon__reuse-share--icn"></i>
                </div>
            </div>
            <div className="reuse-pwt__content">
                    <div className="reuse-pwt__content--tag">
                    <span><a href="/"><i className="fas fa-tag icon icon__reuse-pwt--tag"></i> {props.pwt.category} </a></span>
                    </div>
                <div className="reuse-pwt__content--title reuse-pwt__content--title__mt">
                    <div className="reuse-pwt__content--firstptwritIcon">
                        <i className="fas fa-quote-left icon icon__reuse-pwt--quote"></i>
                    </div>
                    <div className="reuse-pwt__content--title__wrapper">
                        <a href="/">{ transformString(props.pwt.desc) } </a>
                    </div>
                </div>
                <div className="reuse-pwt__content--det reuse-pwt__content--det__quoteright">
                    <div className="reuse-pwt__content--det__user">
                        <div className="reuse-pwt__content--det__user--img">
                            <img src={props.pwt.userImage} alt="" />
                        </div> 
                        <a href="/"> { props.pwt.author } </a>
                            <div className="reuse-pwt__content--det__user--time">
                            @ {props.pwt.poetCreated}
                        </div>
                        {userOpt}
                    </div>
                    <div className="reuse-pwt__content--det__quote-wrapper">
                        <i className="fas fa-quote-right icon icon__reuse-pwt--quoteright"></i>
                    </div>
                </div>
            </div>
            <ul className="reuse-pwt__footer">
                <li><i className="far fa-smile icon icon__reuse-pwt--footer__smile"></i> { transformNumber(props.pwt.helpFull) } </li>
                <li onClick={props.fav}> {fav} { transformNumber(props.pwt.favorite) } </li>
                <li><i className="far fa-comment-dots icon icon__reuse-pwt--footer__comments"></i> { transformNumber(props.pwt.comment) } </li>
            </ul>
        </div>
        );
    }


    if (props.pwt.category && props.pwt.category.length > 1 && typeof(props.pwt.category) === 'object') {
        const pwtCategArray = [];
        let key = 1;
        for (let pwtCateg of props.pwt.category) {
            key = key + 1
            pwtCategArray.push(
                <span key={key}><a href="/"><i className="fas fa-tags icon icon__reuse-pwt--tag"></i> {pwtCateg}</a></span>
            )
        }

        pwtType = (
            <div className="reuse-pwt">
                <div className="reuse-share">
                    <div className="reuse-share__icn" onClick={props.share}>
                        <i className="fas fa-location-arrow icon icon__reuse-share--icn"></i>
                    </div>
                </div>
                <div className="reuse-pwt__content">
                    <div className="reuse-pwt__content--tag">
                   {pwtCategArray}
                    </div>
                    <div className="reuse-pwt__content--title">
                        <div className="reuse-pwt__content--title__wrapper">
                            <a href="/">{ transformString(props.pwt.desc) } </a>
                        </div>
                    </div>
                    <div className="reuse-pwt__content--det">
                        <div className="reuse-pwt__content--det__user">
                            <div className="reuse-pwt__content--det__user--img">
                                <img src={props.pwt.userImage} alt="" />
                            </div> 
                            <a href="/">{props.pwt.author}</a>
                            <div className="reuse-pwt__content--det__user--time">
                                @ {props.pwt.poetCreated}
                            </div>
                            {userOpt}
                        </div>
                    </div>  
                </div>
                <ul className="reuse-pwt__footer">
                    <li><i className="far fa-smile icon icon__reuse-pwt--footer__smile"></i> { transformNumber(props.pwt.helpFull) } </li>
                    <li onClick={props.fav}>{fav} { transformNumber(props.pwt.favorite) }</li>
                    <li><i className="far fa-comment-dots icon icon__reuse-pwt--footer__comments"></i> { transformNumber(props.pwt.comment) } </li>
                </ul>
            </div>
        );
    }

    return (
        <Aux>
            {pwtType}
        </Aux>
    );
};

export default poetContent;