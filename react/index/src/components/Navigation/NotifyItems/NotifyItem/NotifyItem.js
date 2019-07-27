import React from 'react';

import { transformNumber, transformString } from '../../../../shared/utility';

const notifyItem = props => {
    let notify = null;

    if (props.notify.cntGrp === 'post') {
        notify = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__notify">
                <div className="reuse-trd__cnt--categ"><i className="fas fa-clone icon icon__reuse-trd--categ"></i> { props.notify.category } </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.notify.id }>{ transformString(props.notify.title) }</a>   
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li><i className="far fa-eye icon icon__reuse-trd--view"></i> { transformNumber(props.notify.view) } </li>
                    <li><i className="far fa-comments icon icon__reuse-trd--comment"></i> { transformNumber(props.notify.comment) } </li>
                    <li onClick={props.fav}><i className="far fa-heart icon icon__reuse-trd--fav"></i>{ transformNumber(props.notify.favorite) } </li>
                </ul>
            </div> 
        );
    }

    if (props.notify.cntGrp === 'poet') { 
        notify = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__notify">
                <div className="reuse-trd__cnt--categ"><i className="fas fa-book icon icon__reuse-trd--categ"></i> { props.notify.category }</div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.notify.id }>{ transformString(props.notify.desc) }</a>    
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li><i className="far fa-smile icon icon__reuse-trd--smile"></i> { transformNumber(props.notify.helpFull) } </li>
                    <li onClick={props.fav}><i className="far fa-heart icon icon__reuse-trd--fav"></i> { transformNumber(props.notify.favorite) } </li>
                    <li><i className="far fa-comment-dots icon icon__reuse-trd--pwt-comment"></i>{ transformNumber(props.notify.comment) } </li>
                </ul>
            </div> 
        );
    }

    if (props.notify.cntGrp === 'question') {
        notify = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__notify">
                <div className="reuse-trd__cnt--categ"><i className="fas fa-book icon icon__reuse-trd--categ"></i>  { props.notify.category }</div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.notify.id }>{ transformString(props.notify.desc) }</a>    
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li><i className="far fa-thumbs-up icon icon__reuse-trd--smile"></i> { transformNumber(props.notify.helpFull) } </li>
                    <li><i className="far fa-thumbs-down icon icon__reuse-trd--view"></i> { transformNumber(props.notify.notHelpFull) } </li>
                    <li onClick={props.fav}><i className="far fa-heart icon icon__reuse-trd--fav"></i> { transformNumber(props.notify.favorite) } </li>
                </ul>
            </div> 
        );
    }

    if (props.notify.cntGrp === 'group') {
        notify = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__notify">
                <div className="reuse-trd__cnt--categ"><i className="fas fa-users icon icon__reuse-trd--categ"></i> { props.notify.category }</div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.notify.id }>{ transformString(props.notify.desc) }</a>   
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li><div className="reuse-trd__cnt--footer__det"><div><i className="fas fa-users icon icon__reuse-trd--users"></i></div> { transformNumber(props.notify.users) } </div></li>
                    <li><div className="reuse-trd__cnt--footer__det"><div className="reuse-trd__cnt--footer__det--status"><i className="fas fa-user-friends icon icon__reuse-trd--user-frnd"></i></div> { transformNumber(props.notify.userOnline) } </div></li>
                    <li className="reuse-trd__cnt--footer__add-grp"><i className="fas fa-comments icon icon__reuse-trd--add"></i> Chat</li>
                </ul>
            </div> 
        );
    }


    return notify
};

export default notifyItem