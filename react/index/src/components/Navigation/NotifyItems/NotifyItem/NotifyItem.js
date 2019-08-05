import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transformNumber, transformString } from '../../../../shared/utility';
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';

const notifyItem = props => {
    let notify = null;
    let fav = <FontAwesomeIcon 
        icon={['far', 'heart']} 
        className="icon icon__reuse-trd--fav" />

    if (props.notify.liked) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-trd--fav" />
    }

    if (props.notify.cntGrp === 'post') {
        notify = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__notify">
                <div className="reuse-trd__cnt--categ">
                    <FontAwesomeIcon 
                        icon={['fas', 'clone']} 
                        className="icon icon__reuse-trd--categ" /> 
                    { props.notify.category } 
                </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.notify.id }>{ transformString(props.notify.title) }</a>   
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'eye']} 
                            className="icon icon__reuse-trd--view" /> 
                        { transformNumber(props.notify.view) } 
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'comments']} 
                            className="icon icon__reuse-trd--comment" /> 
                        { transformNumber(props.notify.comment) } </li>
                    <li>
                        <span onClick={props.fav}>{fav}</span>
                        { transformNumber(props.notify.favorite) } 
                        {props.notify.changeFavActive !== undefined ? <FavoriteActive 
                            active={props.notify.changeFavActive}/> : null}
                    </li>
                </ul>
            </div> 
        );
    }

    if (props.notify.cntGrp === 'poet') { 
        notify = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__notify">
                <div className="reuse-trd__cnt--categ">
                    <FontAwesomeIcon 
                        icon={['fas', 'book']} 
                        className="icon icon__reuse-trd--categ" />
                    { props.notify.category }
                </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.notify.id }>{ transformString(props.notify.desc) }</a>    
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'smile']} 
                            className="icon icon__reuse-trd--smile" />
                        { transformNumber(props.notify.helpFull) } 
                    </li>
                    <li>
                        <span onClick={props.fav}>{fav}</span>
                        { transformNumber(props.notify.favorite) } 
                        {props.notify.changeFavActive !== undefined ? <FavoriteActive 
                            active={props.notify.changeFavActive}/> : null}
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'comment-dots']} 
                            className="icon icon__reuse-trd--pwt-comment" />
                        { transformNumber(props.notify.comment) } 
                    </li>
                </ul>
            </div> 
        );
    }

    if (props.notify.cntGrp === 'question') {
        notify = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__notify">
                <div className="reuse-trd__cnt--categ">
                    <FontAwesomeIcon 
                        icon={['fas', 'book']} 
                        className="icon icon__reuse-trd--categ" /> 
                    { props.notify.category }
                </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.notify.id }>{ transformString(props.notify.desc) }</a>    
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-up']} 
                            className="icon icon__reuse-trd--smile" /> 
                        { transformNumber(props.notify.helpFull) } 
                    </li>
                    <li>
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-down']} 
                            className="icon icon__reuse-trd--view" /> 
                        { transformNumber(props.notify.notHelpFull) } 
                    </li>
                    <li>
                        <span onClick={props.fav}>{fav}</span>
                        { transformNumber(props.notify.favorite) } 
                        {props.notify.changeFavActive !== undefined ? <FavoriteActive 
                            active={props.notify.changeFavActive}/> : null}
                    </li>
                </ul>
            </div> 
        );
    }

    if (props.notify.cntGrp === 'group') {
        notify = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__notify">
                <div className="reuse-trd__cnt--categ">
                    <FontAwesomeIcon 
                        icon={['fas', 'users']} 
                        className="icon icon__reuse-trd--categ" /> 
                    { props.notify.category }
                </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.notify.id }>{ transformString(props.notify.desc) }</a>   
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li>
                        <div className="reuse-trd__cnt--footer__det"><div>
                            <FontAwesomeIcon 
                                icon={['fas', 'users']} 
                                className="icon icon__reuse-trd--users" /> 
                        </div> { transformNumber(props.notify.users) } </div>
                    </li>
                    <li>
                        <div className="reuse-trd__cnt--footer__det">
                            <div className="reuse-trd__cnt--footer__det--status">
                                <FontAwesomeIcon 
                                    icon={['fas', 'user-friends']} 
                                    className="icon icon__reuse-trd--user-frnd" /> 
                            </div> { transformNumber(props.notify.userOnline) } 
                        </div>
                    </li>
                    <li className="reuse-trd__cnt--footer__add-grp">
                        <FontAwesomeIcon 
                            icon={['fas', 'comments']} 
                            className="icon icon__reuse-trd--add" /> 
                        Chat
                    </li>
                </ul>
            </div> 
        );
    }


    return notify
};

export default notifyItem