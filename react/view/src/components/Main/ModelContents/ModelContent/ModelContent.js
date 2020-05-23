import React from 'react';
import MetaTags from 'react-meta-tags';
import Avatar from 'react-avatar';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from 'react-draft-wysiwyg';
import ModelComments from './ModelComments/ModelComments';
import draftToHtml from 'draftjs-to-html'

import '../../../../react-draft-wysiwyg.css';
import './ModelContent.css'; 
import { transformNumber, engStrings } from '../../../../shared/utility';
import '../../../UI/ShareIcn/ShareIcn.css'; 
import FavoriteActive from '../../../UI/FavoriteActive/FavoriteActive';
import Carousel from '../../../UI/Media/Media';

const modelContent = props => {
    const formatter = buildFormatter(engStrings);
    let desc =  JSON.parse(props.cnt.desc)
    if (props.cntGrp !== 'post' && props.cntGrp !== 'advert') {
        desc.blocks[0].text = props.cnt.title;
    }
    const htmlContent = draftToHtml(desc,{ trigger: '#',separator: ' '}, true);

    let edit = null;
    let userStatus = (
        <li className="reuse-view__main--det__user--status">
            <div className="reuse-view__main--det__user--status__off"></div>
            {<TimeAgo date={props.cnt.offline} live={false} formatter={formatter}/>}
        </li>
    )
    let favAdd = null;
    let isLiked = null;
    let userImage = <img src={props.cnt.userImage} alt="" />
    let fav = <FontAwesomeIcon 
            icon={['far', 'heart']} 
            className="icon icon__reuse-view--fav"  />
    let userOpt = null;
    let userOptDetClass = ['reuse-view__main--footer__user-det'];
    let userOptClass = ['reuse-view__main--footer__user-det--opt'];
    let userOptMode = (
         <li
            onClick={props.changeCnt}> 
            <FontAwesomeIcon 
                icon={['far', 'eye-slash']} 
                className="icon icon__reuse-view--options" />
            Draft
        </li>
    );
    let header = null;
    let comments = null;


    let media = null;
    let mediaTotal = props.cnt.snapshot.length+props.cnt.image.length;
    let mediaCnt =  [...props.cnt.snapshot, ...props.cnt.image];
    let playVideo = null;
    let mediaWrapperClass = ['reuse-pt__media--wrapper'];

let meta = null;
    let metaCateg = props.cnt.category && props.cnt.category.length > 0 ? props.cnt.category.filter(categ => categ === 'facebook game') : null; 
    if (metaCateg.length > 0) {
        let yrs = Math.floor(Math.random()*20);
        meta = (
             <MetaTags>
                <meta property="og:title" content={`This is when you marry, next ${yrs} ${yrs > 1 ? 'years' : 'year'}`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`${props.url}`} />
                <meta property="og:image" content={`https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1200`} />
                <meta property="og:description" content="slodge24 | Knowledge sharing platform."/>
                <meta property="og:site_name" content={`https://www.slodge24.com - When will you get married?`}/>	
            </MetaTags>
        )
    } else {
        meta = (
             <MetaTags>
                <meta property="og:title" content={`${props.cnt.title}`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`${props.url}`} />
                {mediaCnt.length > 0 ?  <meta property="og:image" content={`${mediaCnt[0].url}`} /> : null}
                <meta property="og:description" content={`${props.cntGrp === 'post' ? desc.blocks[0].text : props.cntGrp === 'advert' ? 'Advertise your product free on www.slodge24.com' : 'slodge24 | Knowledge sharing platform'}`}/>
                <meta property="og:site_name" content={`https://www.slodge24.com`}/>	
            </MetaTags>
        )
    }

    if (mediaCnt.length > 0 && props.cntGrp !== 'poet') {
        media = (
            <div className="reuse-pt__media">
			    <div className="reuse-pt__media--main-wrapper">
                    <Carousel
                        images={mediaCnt}
                        wrapperClass="reuse-pt__media--wrapper"
                        prevClass="reuse-pt__media--cnt reuse-pt__media--cnt__prev"
                        prevIcnClass="icon icon__reuse-pt--media__prev"
                        nextClass="reuse-pt__media--cnt reuse-pt__media--cnt__nxt"
                        nextIcnClass="icon icon__reuse-pt--media__nxt"
                        playClass="reuse-pt__media--wrapper__icn"
                        playIcnClass="icon icon__reuse-pt--media__play"/>
                </div>
            </div>
        )
    }

    if (props.cntGrp === 'post' || props.cntGrp === 'advert') {
        header = (
            <div className="reuse-view__main--header">
            <p className="reuse-view__main--header__title">
                {props.cnt.title}
            </p> 
            <ul className="reuse-view__main--header__det">
                <li>
                    <FontAwesomeIcon 
                        icon={['far', 'clock']} 
                        className="icon icon__reuse-view--main__tm" />
                    {<TimeAgo date={props.cntGrp === 'advert' ? props.cnt.created : props.cnt.postCreated} live={false} formatter={formatter}/>}
                </li>
                <li className="reuse-view__main--header__det--ans">Comments <div>{ props.commentTotal }</div></li>
                <li>
                    <div>
                        <FontAwesomeIcon 
                            icon={['far', 'eye']} 
                            className="icon icon__reuse-view--main__eye" />
                    </div> 
                    { props.cnt.view }
                </li>
            </ul>
        </div>
        );
    }

    if (props.cnt.edit) {
        edit = (
            <div className="reuse-view__main--det__edit">
                <div className="reuse-view__main--det__edit--title">
                    <div>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-view--main__edit" />
                    </div> 
                    edit
                </div>
                <div className="reuse-view__main--det__edit--tm">
                {<TimeAgo date={props.cnt.edit} live={false} formatter={formatter}/>}
                </div>
            </div>
        );
    }

    if (props.cnt.status) {
        userStatus = (
            <li className="reuse-view__main--det__user--status">
                <div className="reuse-view__main--det__user--status__on"></div> online
            </li>
        )
    }

    if (props.cnt.username && !props.cnt.userImage) {
        userImage = <Avatar  name={props.cnt.username} size='40' round />;
    }

    for (let changedFav of props.changedFav) {
        if (props.cnt._id === changedFav.id) {
            favAdd = changedFav.favAdd;
            isLiked= changedFav.liked;
        }
    }

    if (props.cnt.liked && isLiked === null) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-view--fav"  />
    }

    if (isLiked) {
        fav = <FontAwesomeIcon 
            icon={['fas', 'heart']} 
            className="icon icon__reuse-view--fav"  />
    }

    if (props.cnt.mode === 'draft') {
        userOptMode = (
            <li
                onClick={props.changeCntPublish}> 
                <FontAwesomeIcon 
                    icon={['far', 'eye']} 
                    className="icon icon__reuse-view--options" />
                Publish
            </li>
        )
      }

      if (props.showCnt && props.showCnt.visible && props.showCnt.id === props.cnt._id)  {
            userOptDetClass.push('reuse-view__main--footer__user-det--clk');
            userOptClass.push('reuse-view__main--footer__user-det--opt__visible');
        }

      if (props.cnt.userOpt) {
        userOpt = (
            <div 
                className={userOptDetClass.join(' ')}
                onClick={props.userOpt}>
            <FontAwesomeIcon 
                icon={['fas', 'circle']} 
                className="icon icon__reuse-view--circle" />
            <FontAwesomeIcon 
                icon={['fas', 'circle']} 
                className="icon icon__reuse-view--circle" />
            <FontAwesomeIcon 
                icon={['fas', 'circle']} 
                className="icon icon__reuse-view--circle" />
            <ul className={userOptClass.join(' ')}>
                <li>
                    <a href={`/edit/${props.cntGrp}/${props.cnt._id}`}>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-view--options" />
                        Edit 
                    </a>
                </li>
                { userOptMode }
            </ul>
            </div>
        );
    };

    if (props.comments.length > 0) {
        comments = <ModelComments 
            comments={props.comments}
            cntGrp={props.cntGrp}
            reply={props.reply}
            correct={props.correct}
            wrong={props.wrong}/>
    }

    return (
        <div className="reuse-view">
            { meta }
        <div className="reuse-view__main">
            { header }
            {/* <ul className="site-main__content--tab">
                <li>image</li>
            </ul> */}
            {media}
            <p 
                className="reuse-view__main--cnt" 
                dangerouslySetInnerHTML={{
                    __html: htmlContent
                }}>
                {/* {temp} */}
            </p>
            <div id="container-dffffc92010aa4b3e92727c5c765a170"></div>
            <div className="reuse-view__main--det">
                { edit }
                <div className="reuse-view__main--det__user">
                    <div className="reuse-view__main--det__user--img">
                        { userImage }
                    </div>
                    <ul>
                        <li><a href={"/user/profile/"+props.cnt.authorID}> {props.cnt.username}</a></li>
                        {userStatus}
                    </ul>
                </div>
            </div>
            <div className="reuse-view__main--footer">
                <div className="reuse-view__main--footer__user-opt">
                    <div>
                        <div className="reuse-share">
                            <div className="reuse-share__icn" onClick={props.share}>
                                <FontAwesomeIcon 
                                    icon={['fas', 'location-arrow']} 
                                    className="icon icon__reuse-share--icn" />
                            </div> 
                        </div>
                    </div>
                    <div>
                        <span 
                            className="reuse-view__main--footer__user-opt--fav"
                            onClick={props.fav}>{fav}</span>
                        {transformNumber(favAdd !== null ? favAdd : props.cnt.favorite)} 
                        {props.favChange && props.favChange.id === props.cnt._id ? <FavoriteActive 
                            liked={props.favChange.isLiked}/> : null}
                    </div>
                </div>
                <div 
                    className="reuse-view__main--footer__add"
                    onClick={props.scroll}> 
                    <FontAwesomeIcon 
                        icon={['fas', 'pencil-alt']} 
                        className="icon icon__reuse-view--main__add" />
                    Comment
                </div>
                { userOpt }
            </div>
        </div>

        <div className="reuse-view__comments">
            <div className="reuse-view__comments--header">
                <div className="reuse-view__comments--header__ans">Comment Section 
                    <a href={"/add/"+props.cntGrp} className="reuse-view__comments--header__ask">Add {props.cntGrp !== 'poet' ? props.cntGrp : 'Write Up'}</a>
                    <div className="reuse-view__comments--box__footer--user-like__total reuse-view__comments--header__total">
                        { props.commentTotal }
                    </div>
                </div>
            </div> 
            { comments }
        </div>

            {/* {{!-- <div className="viewall__tips">
                <h3 class="viewall__tips--title">
                    Tips
                </h3>
                <h4 className="viewall__tips--subtitle">Not satisfied with the solution</h4>
                <ul>
                    <li>Check <span>chats</span> for related question and answers or chat to ask question inside the chats</li>
                    <li>For Items released by the teacher, click the teacher image or name for options</li>
                </ul>
                <p className="viewall__tips--note"><span> Notes</span> No direct chats </p>
                <p className="viewall__tips--note__details">All question should be asked by clicking <span><i class="fas fa-reply"></i> reply </span> or <span><i class="fas fa-comments"></i> chats</span> </p>
            </div> --}} */}

        <div className="reuse-view__form">
            <p className="reuse-view__form--header">
                <FontAwesomeIcon 
                    icon={['fas', 'pen-square']} 
                    className="icon icon__reuse-view--form__pen" />  
                Add Comment
            </p>
            <form action="" className="reuse-view__form--field">
                {/* <textarea className="reuse-view__form--field__textarea" name="editor" ></textarea> */}
                <div className="reuse-view__form--field__wrapper">
                    <Editor 
                        wrapperClassName=""
                        editorClassName="reuse-view__form--field__textarea"
                        toolbarClassName="reuse-view__form--field__textarea--toolbar"
                        editorState={props.inputValue}
                        onEditorStateChange={props.inputChanged} 
                        toolbar={{
                            options: ['inline', 'blockType', 'emoji', 'remove', 'history'],
                            inline: { inDropdown: true }
                    }}/>
                </div>
                <button 
                    type="button"
                    onClick={props.submitComment}
                    disabled={props.submitEnable}>
                    {/* <FontAwesomeIcon 
                        icon={['fas', 'plus-circle']} 
                        className="icon icon__reuse-view--form__add" />    */}
                    Submit
                </button>
            </form>
        </div>
    </div>
    );
};

export default modelContent;