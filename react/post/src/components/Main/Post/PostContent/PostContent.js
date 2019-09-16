import React from 'react';

import './PostContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';

const postContent = props => {

    let userOpt = null;
    let userOptDetClass = ['reuse-pt__footer--details'];
    let userOptClass = ['reuse-pt__footer--details__options'];

    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-pt--footer__heart" />
    
    let postImage = null;

    if (props.pt.postImage) {
        postImage = (
            <div className="reuse-pt__img">
                <div className="reuse-pt__img--wrapper">
                    <img  alt="" src={props.pt.postImage} />
                </div>
            </div>
        );
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
                    <a href="/">
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-pt--options" /> 
                        Edit 
                    </a>
                </li>
                <li className="reuse-pt__footer--details__options--status">
                    <FontAwesomeIcon 
                        icon={['far', 'eye-slash']} 
                        className="icon icon__reuse-pt--options__dft" /> 
                    Draft
                </li>
                <li>
                    <FontAwesomeIcon 
                        icon={['far', 'trash-alt']} 
                        className="icon icon__reuse-pt--options" /> 
                    Delete 
                </li>
            </ul>
        </div>
        )
    }

    if (props.pt.liked) {
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
                                <img src={props.pt.userImage} alt="" />
                            </div>
                            <div className="reuse-pt__header--category__det">
                                <div className="reuse-pt__header--category__det--name"><a href="/"> {props.pt.author} </a></div>
                                <div className="reuse-pt__header--category__det--timePosted">@ { props.pt.postCreated }</div> 
                            </div>
                        </li>
                        <li>
                            <p className="reuse-pt__header--share__category"> 
                                <FontAwesomeIcon 
                                    icon={['fas', 'tag']} 
                                    className="icon icon__reuse-pt--header__tag" />
                                <a href="/"> {props.pt.category} </a>
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
                    {postImage}
                    <p className="reuse-pt__title">{props.pt.title}</p>
                    <p className="reuse-pt__description">
                        <a href={"/view/" + props.pt.id}>
                            {props.pt.desc} 
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
                                {transformNumber(props.pt.favorite)} 
                                {props.pt.changeFavActive !== undefined ? <FavoriteActive 
                                    active={props.pt.changeFavActive}/> : null}
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