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
    let isSubmitted = props.uploadPercent === 100 && props.isValid;
    
    if (isSubmitted || props.uploadErr) {
        icnType =  props.uploadErr ? <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__reuse-form--modal__err"/>
        : <FontAwesomeIcon icon={['fas', 'clone']} className="icon icon__reuse-form--modal__upload"/>;

         modalContent = props.uploadErr ?  (
            <Aux>
                <h3 className="reuse-form__modal--err"> { 
                    props.uploadErr.code === 'ECONNABORTED' && props.uploadErr.message ? 'Network Error' : 'Network Error' } </h3>
                {props.uploadErr && !props.type ? <div className="reuse-form__btn">
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
                            onClick={props.view}> View </button>
                    <button 
                        type="button" 
                        className="reuse-form__btn--add"
                        onClick={props.closeModal}> Re-Edit </button>
                </div>
            </Aux>
        )
    }

    if (!isSubmitted && !props.uploadErr) {
        modalContent = (
            <h3 className="reuse-form__modal--upload">
                Uploading Data.... 
                <span>{props.uploadPercent ? props.uploadPercent : 0}%</span> 
            </h3>
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