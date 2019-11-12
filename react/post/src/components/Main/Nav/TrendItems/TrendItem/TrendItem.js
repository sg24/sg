import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transformNumber, transformString } from '../../../../../shared/utility';
import FavoriteActive from '../../../../UI/FavoriteActive/FavoriteActive';

const trendItem = props => {
    let trend = null;
    let favAdd = null;
    let isLiked = null;

    for (let changedFav of props.changedFav) {
        if (props.trd.id === changedFav.id) {
            favAdd = changedFav.favAdd;
            isLiked = changedFav.liked;
        }
    }

    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-trd--fav" />

    if (props.trd.liked && isLiked === null) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-trd--fav" />
    }

    if (isLiked) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-trd--fav" />
    }
    
    if (props.trd.cntGrp === 'post') {
        trend = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav">
                <div className="reuse-trd__cnt--categ">
                    <FontAwesomeIcon icon={['fas', 'clone']} className="icon icon__reuse-trd--categ" />
                    { props.trd.category } 
                </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/post/' + props.trd.id }>{ transformString(props.trd.title) }</a>   
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'eye']} 
                            className="icon icon__reuse-trd--view" />
                        { transformNumber(props.trd.view) } 
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'comments']} 
                            className="icon icon__reuse-trd--comment" />
                        { transformNumber(props.trd.comment) } 
                    </li>
                    <li>
                        <span onClick={props.fav}>{fav}</span>
                        { transformNumber(favAdd !== null ? favAdd : props.trd.favorite) } 
                        {props.favChange && props.favChange.id === props.trd.id ? <FavoriteActive 
                            liked={props.favChange.isLiked}/> : null}
                    </li>
                </ul>
            </div> 
        );
    }

    if (props.trd.cntGrp === 'poet') { 
        trend = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav">
                <div className="reuse-trd__cnt--categ">
                    <FontAwesomeIcon 
                        icon={['fas', 'book']} 
                        className="icon icon__reuse-trd--categ" />
                    { props.trd.category }
                </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/poet/' + props.trd.id }>{ transformString(props.trd.title) }</a>    
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'smile']} 
                            className="icon icon__reuse-trd--smile" />
                        { transformNumber(props.trd.helpFull) } 
                    </li>
                    <li>
                        <span onClick={props.fav}>{fav}</span>
                        { transformNumber(favAdd !== null ? favAdd : props.trd.favorite) } 
                        {props.favChange && props.favChange.id === props.trd.id ? <FavoriteActive 
                            liked={props.favChange.isLiked}/> : null}
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'comment-dots']} 
                            className="icon icon__reuse-trd--pwt-comment" />
                        { transformNumber(props.trd.comment) } 
                    </li>
                </ul>
            </div>
        );
    }

    if (props.trd.cntGrp === 'question') {
        trend = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav">
                <div className="reuse-trd__cnt--categ">
                    <FontAwesomeIcon 
                        icon={['fas', 'book']} 
                        className="icon icon__reuse-trd--categ" />
                    { props.trd.category }
                </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/question/' + props.trd.id }>{ transformString(props.trd.title) }</a>    
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-up']} 
                            className="icon icon__reuse-trd--smile" />
                        { transformNumber(props.trd.helpFull) } 
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-down']} 
                            className="icon icon__reuse-trd--view" />
                        { transformNumber(props.trd.notHelpFull) } 
                    </li>
                    <li>
                        <span onClick={props.fav}>{fav}</span>
                        { transformNumber(favAdd !== null ? favAdd : props.trd.favorite) } 
                        {props.favChange && props.favChange.id === props.trd.id ? <FavoriteActive 
                            liked={props.favChange.isLiked}/> : null}
                    </li>
                </ul>
            </div> 
        );
    }

    if (props.trd.cntGrp === 'group') {
        trend = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav">
                <div className="reuse-trd__cnt--categ">
                    <FontAwesomeIcon 
                        icon={['fas', 'users']} 
                        className="icon icon__reuse-trd--categ" />
                    { props.trd.category } 
                </div>
                <h4 className="reuse-trd__cnt--title">
                <a href={'/view/' + props.trd.id }>{ transformString(props.trd.desc) }</a>   
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li>
                        <div className="reuse-trd__cnt--footer__det">
                            <div>
                                <FontAwesomeIcon 
                                    icon={['fas', 'users']} 
                                    className="icon icon__reuse-trd--users" />
                            </div> 
                            { transformNumber(props.trd.users) } 
                        </div>
                    </li>
                    <li>
                        <div className="reuse-trd__cnt--footer__det">
                            <div className="reuse-trd__cnt--footer__det--status">
                                <FontAwesomeIcon 
                                    icon={['fas', 'user-friends']} 
                                    className="icon icon__reuse-trd--user-frnd" />
                            </div> 
                            { transformNumber(props.trd.userOnline) } 
                        </div>
                    </li>
                    <li className="reuse-trd__cnt--footer__add-grp">
                        <FontAwesomeIcon 
                            icon={['fas', 'plus']} 
                            className="icon icon__reuse-trd--add" /> 
                        Join
                    </li>
                </ul>
            </div> 
        );
    }


    return trend
};

export default trendItem