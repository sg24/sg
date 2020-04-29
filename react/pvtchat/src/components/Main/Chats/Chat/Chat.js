import React from 'react';
import Moment from 'react-moment';
import FileIcon, { defaultStyles } from 'react-file-icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'react-avatar';

import Edits from './Edits/Edits';
import './Chat.css';

const chats = (props) => {
    let time = null;
    let hstClass = ['site-main__chat--box__hst--cnt__wrapper'];
    let replyClass = ['site-main__chat--box__reply--cnt__wrapper'];
    let footerReplyClass = ['site-main__chat--box__reply--footer__user'];
    let footerHstClass = ['site-main__chat--box__hst--footer__user'];
    let edit = null;

    const calendarStrings = {  
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
    };

    if (props.cnt.reply) {
        edit = <Edits
            cnts={props.cnt.reply}
            users={props.users}
            userImage={props.userImage}
            filterChat={props.filterChat}
            cntID={props.cnt.chatID}
            hold={props.hold}
            selected={props.selected}
            userID={props.userID}
            editChat={props.editChat}
            download={props.download}/>
    }

        
    if (props.cnt.timeFrame) {
        time =  (
            <div className="site-main__chat--box__date">
                <div className="site-main__chat--box__date--wrapper">
                    <div className="site-main__chat--box__date--cur">
                    <Moment calendar={calendarStrings}>
                        { props.cnt.timeFrame }
                    </Moment>
                    </div> 
                </div>
            </div>
        )
    } 

    let userImage = null
    
    let status = (
        <div className="site-main__chat--box__hst--footer__user--img__status site-main__chat--box__hst--footer__user--img__status--off">
        </div>
    )
  
    let audioCnt = (
        <audio controls src={`https://www.slodge24.com/media/audio/${props.cnt.msg}.${props.cnt.format}`}>
            <p>Your browser does not support this feature</p>
        </audio>
    );
    let videoCnt = (
        <video controls src={`https://www.slodge24.com/media/video/${props.cnt.msg}.${props.cnt.format}`}>
            <p>Your browser does not support this feature</p>
        </video>
    );

    let imageCnt =(
        <img src={`https://www.slodge24.com/media/image/${props.cnt.msg}.${props.cnt.format}`} alt=""/>
    )
    
    let typedPlain = props.cnt.msg;

    let docContent = null;
    let typedCnt = null;

    if (props.selected && props.selected.length > 0)  {
        for (let cnt of props.selected) {
            if ((cnt.mainID  === props.cnt.chatID) && !cnt.chatID) {
                hstClass.push('site-main__chat--box__highlight')
                replyClass.push('site-main__chat--box__highlight')
            }
        }
    }

    if (props.editChat && props.editChat.mainID && !props.editChat.chatID) {
        if ((props.editChat.mainID  === props.cnt.chatID) && !props.editChat.chatID) {
            hstClass.push('site-main__chat--box__highlight-edit')
            replyClass.push('site-main__chat--box__highlight-edit')
        }
    }

    if (props.cnt.cntType !== 'audio' && props.cnt.cntType !== 'media' &&
    props.cnt.cntType !== 'image' && props.cnt.cntType !== 'typedPlain' && !props.cnt.delete && !props.cnt.upload && !props.cnt.pending) {
        docContent = (
            <>
                <FileIcon 
                    extension={props.cnt.format ? props.cnt.format.substr(0, 7) : props.cnt.format} 
                    {...defaultStyles[props.cnt.format]} 
                    size={100}/>
                <div 
                    href={`https://www.slodge24.com/media/${props.cnt.cntType}/${props.cnt.msg}.${props.cnt.format}`}  
                    onClick={props.download.bind(this, `https://www.slodge24.com/media/${props.cnt.cntType}/${props.cnt.msg}.${props.cnt.format}`, `${props.cnt.msg}.${props.cnt.format}`)}
                    className="site-main__chat--box__download"> 
                    <FontAwesomeIcon  icon={['fas', 'download']} className="icon icon__site-main--chat__box--dwn"/> 
                    download
                </div>
            </>
        )
    }

    if (props.cnt.upload) {
        docContent = (
            <div className="site-main__chat--box__upload">
                <div className="site-main__chat--box__upload--loader">
                    {/* <div className="site-main__chat--box__upload--loader__close">
                        <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                    </div> */}
                     <div className={`c100 p${props.cnt.percentage}`}>
                        <span>{props.cnt.percentage}%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>
                </div>
                <h4 className="site-main__chat--box__upload--cnt">
                    { props.cnt.cntType }
                </h4>
            </div>
        )
    }

    if (props.filterChat && props.cnt.cntType === 'typedPlain') {
        typedCnt = typedPlain.replace(props.filterChat, `<span class="site-main__chat--srch__highlight">${props.filterChat}</span>`);
        typedPlain = null;
    }

    if (props.users) {
        for (let user of props.users) {
            if ((user.id === props.cnt.ID) && user.status) {
                status = (
                    <div className="site-main__chat--box__hst--footer__user--img__status site-main__chat--box__hst--footer__user--img__status--on">
                    </div>
                )
            }
        }
    }

    if (props.cnt.image && (props.cnt.position % 2 !== 0)) {
        let img = <img src={props.userImage} alt="" />
        if (!props.userImage) {
            img = <Avatar name={props.cnt.username} size='40' round />
        }
        userImage = (
            <div className="site-main__chat--box__reply--footer__user--img">
                { img }
                { status }
            </div>
        )
        footerReplyClass.push('site-main__chat--box__reply--footer__user-img')
    }

    if (props.cnt.image && (props.cnt.position % 2 === 0)) {
        let img = <img src={props.userImage} alt="" />
        if (!props.userImage) {
            img = <Avatar name={props.cnt.username} size='40' round />
        }
        userImage = (
            <div className="site-main__chat--box__hst--footer__user--img">
                { img }
                { status }
            </div>
        )
        footerHstClass.push('site-main__chat--box__hst--footer__user-img')
    }

    if (props.cnt.delete) {
        hstClass.push('site-main__chat--box__chat-del');
        replyClass.push('site-main__chat--box__chat-del');
    }

    let chatCnt = (
        <div className="site-main__chat--box__hst">
            <div  className="site-main__chat--box__hst--wrapper">
                <div className="site-main__chat--box__hst--cnt">
                    <div 
                        className={hstClass.join(' ')}
                        onDoubleClick={!props.cnt.upload && !props.cnt.delete && !props.cnt.pending ? props.hold.bind(this, props.cnt.chatID, null, props.cnt.ID) : null}>
                        <div dangerouslySetInnerHTML={{
                                __html: typedCnt
                            }}></div>
                             { !props.cnt.upload ? !props.cnt.delete ? props.cnt.cntType === 'audio' ? audioCnt :
                                    props.cnt.cntType === 'media' ? videoCnt :
                                    props.cnt.cntType === 'image' ? imageCnt : 
                                    props.cnt.cntType === 'typedPlain' ? typedPlain : null : 'Deleted': null}
                            {docContent } 
                            {!props.cnt.delete && props.cnt.ID === props.userID ? 
                            <div className={!props.cnt.pending ? "site-main__chat--box__check-hst site-main__chat--box__check--mark" : "site-main__chat--box__check-hst"}>
                                <FontAwesomeIcon  icon={['fas', 'check-circle']}/> 
                            </div> : null}
                    </div>
                    { edit }
                </div>
                { !props.cnt.upload && !props.cnt.pending ? 
                    <ul className="site-main__chat--box__hst--footer">
                        <li className={footerHstClass.join(' ')}>
                            <a href={`/user/profile/${props.cnt.ID}`}>{ props.cnt.username.substr(0,7) }</a>   
                        { userImage }
                        </li>
                        <li className="site-main__chat--box__hst--footer__chat-tm">
                            <Moment date={props.cnt.created} format="h:mm a"/> ,
                        </li>
                    </ul> : null }
            </div>
        </div>
    )
   
    if (props.cnt.position % 2 !== 0) {
        chatCnt = (
            <div className="site-main__chat--box__reply">
                <div className="site-main__chat--box__reply--wrapper">
                    <div className="site-main__chat--box__reply--cnt">
                        <div 
                            className={replyClass.join(' ')}
                            onDoubleClick={!props.cnt.upload && !props.cnt.delete && !props.cnt.pending ? props.hold.bind(this, props.cnt.chatID, null, props.cnt.ID) : null}>
                            <div dangerouslySetInnerHTML={{
                                    __html: typedCnt
                                }}></div>
                            { !props.cnt.upload ? !props.cnt.delete ? props.cnt.cntType === 'audio' ? audioCnt :
                                props.cnt.cntType === 'media' ? videoCnt :
                                props.cnt.cntType === 'image' ? imageCnt : 
                                props.cnt.cntType === 'typedPlain' ? typedPlain : null : 'Deleted' : null}
                              {docContent }  
                              {!props.cnt.delete && props.cnt.ID === props.userID ? 
                                <div className={!props.cnt.pending ? "site-main__chat--box__check-reply site-main__chat--box__check--mark" : "site-main__chat--box__check-reply"}>
                                    <FontAwesomeIcon  icon={['fas', 'check-circle']}/> 
                                </div> : null} 
                        </div>    
                        { edit }      
                    </div>
                    { !props.cnt.upload && !props.cnt.pending ? 
                        <ul className="site-main__chat--box__reply--footer">
                            <li className={footerReplyClass.join(' ')}>
                                <a href={`/user/profile/${props.cnt.ID}`}>{ props.cnt.username.substr(0,7) }</a>   
                                { userImage }
                            </li>
                            <li className="site-main__chat--box__reply--footer__chat-tm">
                             , <Moment date={props.cnt.created} format="h:mm a"/>
                            </li>
                        </ul> : null}
                </div>
            </div>
        )
    }
    
    return (
        <>
            { chatCnt }
            { time }
        </>
    )
}

export default chats;