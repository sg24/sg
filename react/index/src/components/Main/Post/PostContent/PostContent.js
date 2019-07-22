import React from 'react';

import './PostContent.css';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import { transformNumber } from '../../../../shared/utility';
 
const postContent = props => {

    let userOpt = null;
    let userOptDetClass = ['reuse-pt__footer--details'];
    let userOptClass = ['reuse-pt__footer--details__options'];

    let fav = (
        <i className="far fa-heart icon icon__reuse-pt--footer__heart"></i>
    );
    
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
                <li><a href="/"><i className="far fa-edit icon icon__reuse-pt--options"></i>Edit </a></li>
                <li className="reuse-pt__footer--details__options--status"><i className="far fa-eye-slash icon icon__reuse-pt--options__dft"></i> Draft</li>
                <li><i className="far fa-trash-alt icon icon__reuse-pt--options"></i>Delete </li>
            </ul>
        </div>
        )
    }

    if (props.pt.liked) {
        fav = (
            <i className="fas fa-heart icon icon__reuse-pt--footer__heart"></i>
        );
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
                            <p className="reuse-pt__header--share__category"><i className="fas fa-tag icon icon__reuse-pt--header__tag"></i><a href="/"> {props.pt.category} </a></p>
                            <div className="reuse-share">
                                <div className="reuse-share__icn" onClick={props.share}>
                                    <i className="fas fa-location-arrow icon icon__reuse-share--icn"></i>
                                </div>
                             </div>
                        </li>
                    </ul>
                    {postImage}
                    <p className="reuse-pt__title">{props.pt.title}</p>
                    <p className="reuse-pt__description">
                        <a href={"/view/" + props.pt.id}>
                            {props.pt.desc} <span>...</span>
                        </a>
                    </p>
                
                    <div className="reuse-pt__footer">
                        <ul className="reuse-pt__footer--list">
                            <li><i className="far fa-eye icon icon__reuse-pt--footer__eye"></i>  {transformNumber(props.pt.view)} </li>
                            <li className="reuse-pt__footer--list__item-middle"><i className="far fa-comments icon icon__reuse-pt--footer__chats"></i> {transformNumber(props.pt.comment)} </li>
                            <li onClick={props.fav}><span>{fav}</span> {transformNumber(props.pt.favorite)} </li>
                        </ul>
                        {userOpt}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default postContent;