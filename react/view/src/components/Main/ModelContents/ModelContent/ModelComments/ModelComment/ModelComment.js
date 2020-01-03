import React from 'react';
import Avatar from 'react-avatar';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from "draft-js-export-html";

import '../../../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { transformNumber, engStrings } from '../../../../../../shared/utility';
import ModelReply from './ModelReply/ModelReply';
import Aux from '../../../../../../hoc/Auxs/Aux';

const modelComment = props => {
    const formatter = buildFormatter(engStrings);
    const comment = props.comment;
    let cnt =  JSON.parse(comment.comment)
    let raw = convertFromRaw(cnt);
    const htmlContent = stateToHTML(raw);
    let footerCnt = null;

    let reply = null;
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
 
    if (comment.reply) {
        reply = comment.reply.map((reply, index) => (
            <ModelReply 
                key={index}
                comment={reply}
                commentID={comment._id}
                cntGrp={props.cntGrp}
                reply={props.reply}
                correct={props.correct}
                wrong={props.wrong}
                smile={props.correct}/>
        ))
    } 
    
    if (comment.like) {
        likeClass.push("reuse-view__comments--box__footer--user-like__liked")
    }
    
    if (comment.dislike) {
        dislikeClass.push("reuse-view__comments--box__footer--user-like__disliked")
    }
    console.log(comment.disabled)
    if (comment.smile) {
        smileClass.push("reuse-view__comments--box__footer--user-like__liked")
    }
    
    if (props.cntGrp === 'poet') {
        footerCnt = (
            <Aux>
                <div className="reuse-view__comments--box__footer--user-det">
                    <div onClick={props.smile.bind(this, comment._id, 'smile', null)}>
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
                    <div onClick={props.wrong.bind(this, comment._id, 'comment', null)}>
                        <FontAwesomeIcon 
                            icon={['far', 'thumbs-down']} 
                            className="icon icon__reuse-view--comments__like" />
                        <div className={dislikeClass.join(' ')}> 
                            { comment.disliked } 
                        </div>
                    </div>
                </div>
                <div className="reuse-view__comments--box__footer--user-det">
                    <div onClick={props.correct.bind(this, comment._id, 'comment', null)}>
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
    <div className="reuse-view__comments--wrapper">  
        <div className="reuse-view__comments--box">
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
        { reply }
    </div>
    )
    
};

export default modelComment;