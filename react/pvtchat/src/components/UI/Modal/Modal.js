import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loader from '../Loader/Loader';
import './Modal.css';

const modal = props => {
    let modalCnt = <h3>{ props.err ? 
        props.err.response ? 'Network Error' : 'Network Error' : null }</h3>;
    if (!props.err && props.warn && props.warn.cnt && props.exit && !props.exit.close) {
        modalCnt = (
            <div className="reuse-modal__warn">
                <h4 >{props.warn.msg}</h4>
                <p>{props.warn.cnt}</p>
                <div className="reuse-modal__btn">
                    <button 
                        className="reuse-modal__btn--cancel" 
                        type="button"
                        onClick={props.closeChangeCnt}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="icon icon__reuse-modal--btn"/>
                        Cancel
                    </button>
                    <button 
                        className={(props.warn.det && (props.warn.det === 'reject' || props.warn.det === 'remove')) ? "reuse-modal__btn--del" :"reuse-modal__btn--del" }
                        type="button"
                        onClick={props.changeCnt}>
                        <FontAwesomeIcon 
                            icon={(props.warn.det && (props.warn.det === 'reject' || props.warn.det === 'remove')) ? ['fas', 'user-slash'] : ['fas', 'eye-slash']} 
                            className="icon icon__reuse-modal--btn"/>
                        {(props.warn.det && (props.warn.det === 'reject' || props.warn.det === 'remove')) ? props.warn.det : 'Change'}
                    </button>
                </div>
            </div>
        );
    }

    if (!props.err && props.exit && props.exit.close) {
        modalCnt = <p className="reuse-modal__success">{ props.exit.msg }</p>
    }

    return (
        <div className="reuse-modal">
            {
                props.err ? (
                    <div className="reuse-modal__icn">
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="icon icon__reuse-modal--icn"/>
                    </div>
                ) : null
            }
            { !props.err && !props.warn.cnt ? (
                <Loader />
            ): null}   
            { modalCnt } 
        </div>
    );
};

export default modal;