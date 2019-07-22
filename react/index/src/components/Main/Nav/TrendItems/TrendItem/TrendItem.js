import React from 'react';

import { transformNumber, transformString } from '../../../../../shared/utility';

const trendItem = props => {
    let trend = null;

    if (props.trd.cntGrp === 'post') {
        trend = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav">
                <div className="reuse-trd__cnt--categ"><i className="fas fa-clone icon icon__reuse-trd--categ"></i> { props.trd.category } </div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.trd.id }>{ transformString(props.trd.title) }</a>   
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li><i className="far fa-eye icon icon__reuse-trd--view"></i> { transformNumber(props.trd.view) } </li>
                    <li><i className="far fa-comments icon icon__reuse-trd--comment"></i> { transformNumber(props.trd.comment) } </li>
                    <li onClick={props.fav}><i className="far fa-heart icon icon__reuse-trd--fav"></i>{ transformNumber(props.trd.favorite) } </li>
                </ul>
            </div> 
        );
    }

    if (props.trd.cntGrp === 'poet') { 
        trend = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav">
                <div className="reuse-trd__cnt--categ"><i className="fas fa-book icon icon__reuse-trd--categ"></i> { props.trd.category }</div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.trd.id }>{ transformString(props.trd.desc) }</a>    
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li><i className="far fa-smile icon icon__reuse-trd--smile"></i> { transformNumber(props.trd.helpFull) } </li>
                    <li onClick={props.fav}><i className="far fa-heart icon icon__reuse-trd--fav"></i> { transformNumber(props.trd.favorite) } </li>
                    <li><i className="far fa-comment-dots icon icon__reuse-trd--pwt-comment"></i>{ transformNumber(props.trd.comment) } </li>
                </ul>
            </div>
        );
    }

    if (props.trd.cntGrp === 'question') {
        trend = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav">
                <div className="reuse-trd__cnt--categ"><i className="fas fa-book icon icon__reuse-trd--categ"></i>  { props.trd.category }</div>
                <h4 className="reuse-trd__cnt--title">
                    <a href={'/view/' + props.trd.id }>{ transformString(props.trd.desc) }</a>    
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li><i className="far fa-thumbs-up icon icon__reuse-trd--smile"></i> { transformNumber(props.trd.helpFull) } </li>
                    <li><i className="far fa-thumbs-down icon icon__reuse-trd--view"></i> { transformNumber(props.trd.notHelpFull) } </li>
                    <li onClick={props.fav}><i className="far fa-heart icon icon__reuse-trd--fav"></i> { transformNumber(props.trd.favorite) } </li>
                </ul>
            </div> 
        );
    }

    if (props.trd.cntGrp === 'group') {
        trend = (
            <div className="reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav">
                <div className="reuse-trd__cnt--categ"><i className="fas fa-users icon icon__reuse-trd--categ"></i> { props.trd.category } </div>
                <h4 className="reuse-trd__cnt--title">
                <a href={'/view/' + props.trd.id }>{ transformString(props.trd.desc) }</a>   
                </h4>
                <ul className="reuse-trd__cnt--footer">  
                    <li><div className="reuse-trd__cnt--footer__det"><div><i className="fas fa-users icon icon__reuse-trd--users"></i></div> { transformNumber(props.trd.users) } </div></li>
                    <li><div className="reuse-trd__cnt--footer__det"><div className="reuse-trd__cnt--footer__det--status"><i className="fas fa-user-friends icon icon__reuse-trd--user-frnd"></i></div> { transformNumber(props.trd.userOnline) } </div></li>
                    <li className="reuse-trd__cnt--footer__add-grp"><i className="fas fa-plus icon icon__reuse-trd--add"></i> Join</li>
                </ul>
            </div> 
        );
    }


    return trend
};

export default trendItem