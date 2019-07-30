import React from 'react';

import './PoetContent.css'; 
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aux from '../../../../hoc/Auxs/Aux';
import { transformNumber, transformString } from '../../../../shared/utility';

const poetContent = props => {
    let userOpt = null;
    let userOptDetClass = ['reuse-pwt__content--det__user--det'];
    let userOptClass = ['reuse-pwt__content--det__user--det__opt'];
    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-pwt--footer__heart" />


    if (props.showPwt && props.showPwt.visible && props.showPwt.index === props.index)  {
        userOptDetClass.push('reuse-pwt__content--det__user--det__clk');
        userOptClass.push('reuse-pwt__content--det__user--det__opt--visible');
    }

    if (props.pwt.userOpt) {
        userOpt = (
            <div className={userOptDetClass.join(' ')} onClick={props.userOpt}>
                <div className="reuse-pwt__content--det__user--det__mid"></div>
                <ul className={userOptClass.join(' ')}>
                    <li>
                        <a href="/">
                            <FontAwesomeIcon 
                                icon={['far', 'edit']} 
                                className="icon icon__reuse-pwt--options" />
                            Edit 
                        </a>
                    </li>
                    <li className="reuse-pwt__content--det__user--det__opt--status">
                        <FontAwesomeIcon 
                            icon={['far', 'eye-slash']} 
                            className="icon icon__reuse-pwt--options__dft" />
                        Draft
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'trash-alt']} 
                            className="icon icon__reuse-pwt--options" />
                        Delete 
                    </li>
                </ul>
            </div>
        );
    };

    if (props.pwt.liked) {
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
                <span>
                    <a href="/"> 
                    <FontAwesomeIcon 
                        icon={['fas', 'tag']} 
                        className="icon icon__reuse-pwt--tag" />
                    {props.pwt.category}
                    </a> 
                </span>
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
            <li>
                <FontAwesomeIcon 
                    icon={['far', 'smile']} 
                    className="icon icon__reuse-pwt--footer__smile" />
                { transformNumber(props.pwt.helpFull) } 
            </li>
            <li onClick={props.fav}>{fav} { transformNumber(props.pwt.favorite) } </li>
            <li>
                <FontAwesomeIcon 
                    icon={['far', 'comment-dots']} 
                    className="icon icon__reuse-pwt--footer__comments" />
                { transformNumber(props.pwt.comment) } 
            </li>
        </ul>
    </div>
    );

    if (props.pwt.category && props.pwt.category === 'Quote') {
        pwtType = (
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
                    <span>
                        <a href="/">
                            <FontAwesomeIcon 
                                icon={['fas', 'tag']} 
                                className="icon icon__reuse-pwt--tag" />
                            {props.pwt.category} 
                        </a>
                    </span>
                </div>
                <div className="reuse-pwt__content--title reuse-pwt__content--title__mt">
                    <div className="reuse-pwt__content--firstptwritIcon">
                        <FontAwesomeIcon 
                            icon={['fas', 'quote-left']} 
                            className="icon icon__reuse-pwt--quote" />
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
                        <FontAwesomeIcon 
                            icon={['fas', 'quote-right']} 
                            className="icon icon__reuse-pwt--quoteright" />
                    </div>
                </div>
            </div>
            <ul className="reuse-pwt__footer">
                <li>
                    <FontAwesomeIcon 
                        icon={['far', 'smile']} 
                        className="icon icon__reuse-pwt--footer__smile" />
                    { transformNumber(props.pwt.helpFull) } 
                </li>
                <li onClick={props.fav}> {fav} { transformNumber(props.pwt.favorite) } </li>
                <li>
                    <FontAwesomeIcon 
                        icon={['far', 'comment-dots']} 
                        className="icon icon__reuse-pwt--footer__comments" />
                    { transformNumber(props.pwt.comment) } 
                </li>
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
                <span key={key}>
                    <a href="/">
                        <FontAwesomeIcon 
                            icon={['fas', 'tags']} 
                            className="icon icon__reuse-pwt--tag" />
                        {pwtCateg}
                    </a>
                </span>
            )
        }

        pwtType = (
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
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'smile']} 
                            className="icon icon__reuse-pwt--footer__smile" />
                        { transformNumber(props.pwt.helpFull) } 
                    </li>
                    <li onClick={props.fav}>{fav} { transformNumber(props.pwt.favorite) }</li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'comment-dots']} 
                            className="icon icon__reuse-pwt--footer__comments" />
                        { transformNumber(props.pwt.comment) } 
                    </li>
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