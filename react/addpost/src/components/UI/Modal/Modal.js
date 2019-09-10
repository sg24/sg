import React from 'react';

import Aux from '../../../hoc/Auxs/Aux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const modal = props => {
    let icnType = (
        <FontAwesomeIcon 
            icon={['fas', 'server']} 
            className="reuse-form__modal--icn__loading"/>
    );

    let modalContent = null;
    let isSubmitted = false;
    let mediaLengthPercent;
    let mediaLength;

    if (props.media) {
        let videoLength = props.media.video ? props.media.video.length : 0;
        let imageLength = props.media.image ? props.media.image.length : 0;
        mediaLength = videoLength + imageLength + 1;
        isSubmitted = props.uploadFile === mediaLength;
        mediaLengthPercent = 100 / mediaLength;
    }
    
    if (isSubmitted || props.uploadErr) {
        
        icnType =  props.uploadErr ? <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__reuse-form--modal__err"/>
        : <FontAwesomeIcon icon={['fas', 'clone']} className="icon icon__reuse-form--modal__upload"/>;

         modalContent = props.uploadErr ?  (
            <Aux>
                <h3 className="reuse-form__modal--err"> { 
                    props.uploadErr.code === 'ECONNABORTED' && props.uploadErr.message ? 'Network Error' : props.uploadErr.message } </h3>
                {props.uploadFile !== undefined ? <div className="reuse-form__btn">
                    <button 
                        type="button"  
                        className="reuse-form__btn--close"
                        onClick={props.closeModal}> Close </button>
                    <button 
                        type="button" 
                        className="reuse-form__btn--add"
                        onClick={props.resend}> Resend </button>
                </div> : null
                }
            </Aux>
        ) 
        : (
            <Aux>
                <h3 className="reuse-form__modal--success">Form Submitted Successfully </h3>
                <div className="reuse-form__btn">
                    <button 
                            type="button"  
                            className="reuse-form__btn--close"
                            onClick={props.view}> View Post</button>
                    <button 
                        type="button" 
                        className="reuse-form__btn--add"
                        onClick={props.closeModal}> Add New </button>
                </div>
            </Aux>
        )
    }

    if ((props.uploadFile === 0 || props.uploadFile > 0)  && !isSubmitted && !props.uploadErr) {
        modalContent = (
            <h3 className="reuse-form__modal--upload">Uploading Data.... <span>{Math.round(mediaLengthPercent * props.uploadFile)}%</span> </h3>
        )
    }

    return (
        <div className="reuse-form__modal">
            <div className="reuse-form__modal--icn">
                { icnType }
            </div>
            { modalContent }
        </div>
    );
}

export default modal