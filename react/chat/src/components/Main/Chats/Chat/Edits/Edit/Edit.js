import React from 'react';
import FileIcon, { defaultStyles } from 'react-file-icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const edit = (props) => {
 
    let audioCnt = (
        <audio controls src={`${window.location.protocol + '//' + window.location.host}/media/audio/${props.cnt.msg}.${props.cnt.format}`}>
            <p>Your browser does not support this feature</p>
        </audio>
    );
    let videoCnt = (
        <video controls src={`${window.location.protocol + '//' + window.location.host}/media/video/${props.cnt.msg}.${props.cnt.format}`}>
            <p>Your browser does not support this feature</p>
        </video>
    );

    let imageCnt =(
        <img src={`${window.location.protocol + '//' + window.location.host}/media/image/${props.cnt.msg}.${props.cnt.format}`} alt=""/>
    )
    
    let typedPlain = props.cnt.msg;

    let docContent = null;
    let typedCnt = null;

    if (props.cnt.cntType !== 'audio' && props.cnt.cntType !== 'media' &&
    props.cnt.cntType !== 'image' && props.cnt.cntType !== 'typedPlain' && !props.cnt.upload) {
        docContent = (
            <>
                <FileIcon 
                    extension={props.cnt.format ? props.cnt.format.substr(0, 7) : props.cnt.format} 
                    {...defaultStyles[props.cnt.format]} 
                    size={100}/>
                <a 
                    href={`${window.location.protocol + '//' + window.location.host}/media/${props.cnt.cntType}/${props.cnt.msg}.${props.cnt.format}`}  
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

    let chatCnt = (
        <div className="site-main__chat--box__hst--cnt__wrapper">
            <div dangerouslySetInnerHTML={{
                    __html: typedCnt
                }}></div>
                { !props.cnt.upload ? !props.cnt.delete ? props.cnt.cntType === 'audio' ? audioCnt :
                        props.cnt.cntType === 'media' ? videoCnt :
                        props.cnt.cntType === 'image' ? imageCnt : 
                        props.cnt.cntType === 'typedPlain' ? typedPlain : null : 'Deleted': null}
                {docContent }  
        </div>
    )
   
    if (props.cnt.position % 2 !== 0) {
        chatCnt = (
            <div className="site-main__chat--box__reply--cnt__wrapper">
                <div dangerouslySetInnerHTML={{
                        __html: typedCnt
                    }}></div>
                { !props.cnt.upload ? !props.cnt.delete ? props.cnt.cntType === 'audio' ? audioCnt :
                    props.cnt.cntType === 'media' ? videoCnt :
                    props.cnt.cntType === 'image' ? imageCnt : 
                    props.cnt.cntType === 'typedPlain' ? typedPlain : null : 'Deleted' : null}
                {docContent }  
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