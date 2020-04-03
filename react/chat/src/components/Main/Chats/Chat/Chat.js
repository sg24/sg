import React from 'react';
import Avatar from 'react-avatar';
import Moment from 'react-moment';
import FileIcon, { defaultStyles } from 'react-file-icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const chats = (props) => {
    let time = null;
    let hstClass = ['site-main__chat--box__hst'];
    let replyClass = ['site-main__chat--box__reply'];

    const calendarStrings = {  
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
    };

        
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

    let userImage = <img src={props.cnt.image} alt="" />
    if (props.cnt.username && !props.cnt.image) {
        userImage = <Avatar  name={props.cnt.username.substr(0,7)} size='40' round />;
    }
    let status = (
        <div className="site-main__chat--box__hst--footer__user--img__status site-main__chat--box__hst--footer__user--img__status--off">
        </div>
    )
    let audioCnt = (
        <audio controls src={` ${window.location.protocol + '//' + window.location.host}/media/audio/${props.cnt.msg}.${props.cnt.format}`}>
            <p>Your browser does not support this feature</p>
        </audio>
    );
    let videoCnt = (
        <video controls src={` ${window.location.protocol + '//' + window.location.host}/media/video/${props.cnt.msg}.${props.cnt.format}`}>
            <p>Your browser does not support this feature</p>
        </video>
    );

    let imageCnt =(
        <img src={` ${window.location.protocol + '//' + window.location.host}/media/image/${props.cnt.msg}.${props.cnt.format}`} alt=""/>
    )
    
    let typedPlain = props.cnt.msg;

    let docContent = null;
    let typedCnt = null;

    if (props.selected && props.selected.length > 0)  {
        for (let id of props.selected) {
            if (id  === props.cnt.chatID) {
                hstClass.push('site-main__chat--box__highlight')
                replyClass.push('site-main__chat--box__highlight')
            }
        }
    }

    if (props.cnt.cntType !== 'audio' && props.cnt.cntType !== 'media' &&
    props.cnt.cntType !== 'image' && props.cnt.cntType !== 'typedPlain') {
        docContent = (
            <>
                <FileIcon 
                    extension={props.cnt.format ? props.cnt.format.substr(0, 7) : props.cnt.format} 
                    {...defaultStyles[props.cnt.format]} 
                    size={100}/>
                <a 
                    href={` ${window.location.protocol + '//' + window.location.host}/media/${props.cnt.cntType}/${props.cnt.msg}.${props.cnt.format}`}  
                    downloads="true"
                    className="site-main__chat--box__download"> 
                    <FontAwesomeIcon  icon={['fas', 'download']} className="icon icon__site-main--chat__box--dwn"/> 
                    download
                </a>
            </>
        )
    }

    if (props.filterChat && props.cnt.cntType === 'typedPlain') {
        typedCnt = typedPlain.replace(props.filterChat, `<span class="site-main__chat--srch__highlight">${props.filterChat}</span>`);
        typedPlain = null;
    }

    // if (props.cnt.created && props.timeCapture) {
    //     for ()
    // }

    if (props.users && props.users) {
        for (let user of props.users) {
            if ((user.id === props.cnt.ID) && user.status) {
                status = (
                    <div className="site-main__chat--box__hst--footer__user--img__status site-main__chat--box__hst--footer__user--img__status--on">
                    </div>
                )
            }
        }
    }

    let chatCnt = (
        <div
             className={hstClass.join(' ')}>
            <div 
                className="site-main__chat--box__hst--wrapper"
                onMouseDown={props.hold}
                onMouseUp={props.released}>
                <div className="site-main__chat--box__hst--cnt">
                <div dangerouslySetInnerHTML={{
                            __html: typedCnt
                        }}></div>
            { props.cnt.cntType === 'audio' ? audioCnt :
                        props.cnt.cntType === 'media' ? videoCnt :
                        props.cnt.cntType === 'image' ? imageCnt : 
                        props.cnt.cntType === 'typedPlain' ? typedPlain : null}
                    {docContent }  
                </div>
                <ul className="site-main__chat--box__hst--footer">
                    <li className="site-main__chat--box__hst--footer__chat-tm">
                        <Moment date={props.cnt.created} format="h:mm a"/>
                    </li>
                    <li className="site-main__chat--box__hst--footer__user">
                        <a href={`/user/profile/${props.cnt.ID}`}>{ props.cnt.username.substr(0,7) }</a>   
                        <div className="site-main__chat--box__hst--footer__user--img">
                            { userImage }
                            { status }
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
    
    if (props.curPos % 2 !== 0) {
        chatCnt = (
            <div className={replyClass.join(' ')}>
                <div 
                    className="site-main__chat--box__reply--wrapper"
                    onMouseDown={props.hold}
                    onMouseUp={props.released}>
                    <div  className="site-main__chat--box__reply--cnt">
                    <div dangerouslySetInnerHTML={{
                            __html: typedCnt
                        }}></div>
                    { props.cnt.cntType === 'audio' ? audioCnt :
                        props.cnt.cntType === 'media' ? videoCnt :
                        props.cnt.cntType === 'image' ? imageCnt : 
                        props.cnt.cntType === 'typedPlain' ? typedPlain : null}
                    {docContent }             
                    </div>
                    <ul className="site-main__chat--box__reply--footer">
                        <li className="site-main__chat--box__reply--footer__user">
                            <a href={`/user/profile/${props.cnt.ID}`}>{ props.cnt.username.substr(0,7) }</a>   
                            <div className="site-main__chat--box__reply--footer__user--img">
                                { userImage }
                                { status }
                            </div>
                        </li>
                        <li className="site-main__chat--box__reply--footer__chat-tm">
                        <Moment date={props.cnt.created} format="h:mm a"/>
                        </li>
                    </ul>
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