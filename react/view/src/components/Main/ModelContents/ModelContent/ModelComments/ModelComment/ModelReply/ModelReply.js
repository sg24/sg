import React from 'react';
import Avatar from 'react-avatar';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import draftToHtml from 'draftjs-to-html'

import '../../../../../../../react-draft-wysiwyg.css';
import { transformNumber, engStrings } from '../../../../../../../shared/utility';
import Aux from '../../../../../../../hoc/Auxs/Aux';

const modelReply = props => {
    const formatter = buildFormatter(engStrings);
    const comment = props.comment;
    let cnt =  JSON.parse(comment.comment)
    const htmlContent = draftToHtml(cnt,{ trigger: '#',separator: ' '}, true);
    let footerCnt = null;

   
    let status = (
        <div className="reuse-view__comments--box__header--det__status">
            <div className="reuse-view__comments--box__header--det__status--off"></div>
            <span>{<TimeAgo date={comment.offline} live={false} formatter={formatter}/>}</span>
        </div>               
    )
    let userImage = <img src={comment.image} alt="" />
    let likeClass = ["reuse-view__comments--box__footer--user-like__total"];
    let dislikeClass = ["reuse-view__comments--box__footer--user-like__total"];
    let smileClass = ["reuse-view__comments--box__footer--user-like__total"]

    if (comment.status) {
        status = (
            <div className="reuse-view__comments--box__header--det__status">
                <div className="reuse-view__comments--box__header--det__status--on"></div>
                <span>online</span>
            </div>
        ) 
    }

    if (comment.username && !comment.image) {
        userImage = <Avatar  name={comment.username} size='40' round />;
    }
    
    if (comment.like) {
        likeClass.push("reuse-view__comments--box__footer--user-like__liked")
    }
    
    if (comment.dislike) {
        dislikeClass.push("reuse-view__comments--box__footer--user-like__disliked")
    }

    if (comment.smile) {
        smileClass.push("reuse-view__comments--box__footer--user-like__liked")
    }

    if (props.cntGrp === 'poet') {
        footerCnt = (
            <Aux>
                <div className="reuse-view__comments--box__footer--user-det">
                    <div onClick={!comment.disabled ? props.smile.bind(this, props.commentID, 'smilereply', comment._id) : null}>
                        <FontAwesomeIcon 
                            icon={['far', 'smile']} 
                            className="icon icon__reuse-view--comments__like" />
                        <div className={smileClass.join(' ')}>
                            { comment.smiled }
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
    

    if (props.cntGrp === 'question') {
        footerCnt = (
            <Aux>
                <div className="reuse-view__comments--box__footer--user-like">
                    <div onClick={!comment.disabled ? props.wrong.bind(this, props.commentID, 'reply', comment._id) : null}>
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-down']} 
                            className="icon icon__reuse-view--comments__like" />
                        <div className={dislikeClass.join(' ')}> 
                            { comment.disliked } 
                        </div>
                    </div>
                </div>
                <div className="reuse-view__comments--box__footer--user-det">
                    <div onClick={!comment.disabled ? props.correct.bind(this, props.commentID, 'reply', comment._id) : null}>
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-up']} 
                            className="icon icon__reuse-view--comments__like" />
                        <div className={likeClass.join(' ')}>
                            { comment.liked }
                        </div>
                   </div>
                </div>
            </Aux>
        )
    }

    return (
        <div className="reuse-view__comments--box__reply-wrapper">
            <div className="reuse-view__comments--box reuse-view__comments--box__reply-cnt">
                <div className="reuse-view__comments--box__reply-cnt--header">
                    <FontAwesomeIcon 
                        icon={['fas', 'angle-double-down']} 
                        className="icon icon__reuse-view--comments__arrow" />
                        reply
                    <FontAwesomeIcon 
                        icon={['fas', 'angle-double-down']} 
                        className="icon icon__reuse-view--comments__arrow" />
                </div>
                <ul className="reuse-view__comments--box__header">
                    <li>
                        <div className="reuse-view__comments--box__header--img">
                            { userImage }
                        </div>
                        <div className="reuse-view__comments--box__header--det">
                            <div><a href={`/user/profile/${comment.authorID}`} className="reuse-view__comments--box__header--det__title">{ comment.username }</a></div>
                            { status }
                        </div>
                    </li>
                    <li className="reuse-view__comments--box__header--soln"> 
                        <span className="reuse-view__comments--box__header--soln__time">
                            <FontAwesomeIcon 
                                icon={['far', 'clock']}
                                className="icon icon__reuse-view--time"/>
                            { <TimeAgo date={comment.commentCreated} live={false} formatter={formatter}/> }
                        </span>
                    </li>
                </ul>
                <p 
                    className="reuse-view__comments--box__content"
                    dangerouslySetInnerHTML={{
                        __html: htmlContent
                    }}>
                    {/* <span className="reuse-view__comments--box__content--chats">
                        <FontAwesomeIcon 
                            icon={['far', 'comments']} 
                            className="icon icon__reuse-view--comments__chats" /> 
                    <span className="reuse-view__comments--box__content--chats__title">chats</span></span> */}
                </p>
                <div className="reuse-view__comments--box__footer">
                    <div className="reuse-view__comments--box__footer--user-opt">
                        <span 
                            className="reuse-view__comments--box__footer--user-opt__reply"
                            onClick={props.reply}>
                            <FontAwesomeIcon 
                                icon={['fas', 'reply']} 
                                className="icon icon__reuse-view--comments__reply" /> 
                        </span>
                    </div>
                    { footerCnt }
                </div>
            </div>
        </div> 
    )
    
};

export default modelReply;