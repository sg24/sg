import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Modal.css';

const modal = props => {
    let modalCnt = <h3>{ props.err ? props.err.message : null }</h3>;
    if (!props.err && props.warn && props.exit && !props.exit.close) {
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
                        className="reuse-modal__btn--del" 
                        type="button"
                        onClick={props.changeCnt}>
                        <FontAwesomeIcon 
                            icon={props.warn.det && props.warn.det === 'delete'? ['far', 'trash-alt'] : ['fas', 'eye-slash']} 
                            className="icon icon__reuse-modal--btn"/>
                        {props.warn.det && props.warn.det === 'delete' ? 'Delete': 'Change'}
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
            { modalCnt } 
        </div>
    );
};

export default modal;