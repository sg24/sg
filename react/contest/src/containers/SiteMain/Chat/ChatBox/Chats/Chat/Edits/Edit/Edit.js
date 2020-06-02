import React from 'react';
import FileIcon, { defaultStyles } from 'react-file-icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const edit = (props) => {
    let hstClass = ['site-main__chat--box__hst--cnt__wrapper'];
    let replyClass = ['site-main__chat--box__reply--cnt__wrapper'];
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

    if (props.filterChat && props.cnt.cntType === 'typedPlain') {
        typedCnt = typedPlain.replace(props.filterChat, `<span class="site-main__chat--srch__highlight">${props.filterChat}</span>`);
        typedPlain = null;
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

    if (props.selected && props.selected.length > 0)  {
        for (let cnt of props.selected) {
            if ((cnt.chatID  === props.cnt.chatID)) {
                hstClass.push('site-main__chat--box__highlight')
                replyClass.push('site-main__chat--box__highlight')
            }
        }
        
    }

    if (props.editChat && props.editChat.chatID) {
        if ((props.editChat.chatID  === props.cnt.chatID)) {
            hstClass.push('site-main__chat--box__highlight-edit')
            replyClass.push('site-main__chat--box__highlight-edit')
        }
    }

    if (props.cnt.delete) {
        hstClass.push('site-main__chat--box__chat-del');
        replyClass.push('site-main__chat--box__chat-del');
    }

    let chatCnt = (
        <div 
            className={hstClass.join(' ')}
            onDoubleClick={!props.cnt.upload && !props.cnt.delete && !props.cnt.pending ? props.hold.bind(this, props.cntID, props.cnt.chatID, props.cnt.ID) : null}>
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
    )
   
    if (props.cnt.position % 2 !== 0) {
        chatCnt = (
            <div 
                className={replyClass.join(' ')}
                onDoubleClick={!props.cnt.upload && !props.cnt.delete && !props.cnt.pending ? props.hold.bind(this, props.cntID, props.cnt.chatID, props.cnt.ID) : null}>
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
        )
    }
    
    return (
        <>
            { chatCnt }
        </>
    )
}

export default edit;