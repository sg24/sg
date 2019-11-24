import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const modal = props => {
    let modalCnt = <h3>{ props.err ? props.err.message : null }</h3>;
    if (!props.err && props.warn && props.exit && !props.exit.close) {
        modalCnt = (
            <div className="reuse-pwt__modal--warn">
                <h4 >{props.warn.msg}</h4>
                <p>{props.warn.cnt}</p>
                <div className="reuse-pwt__modal--btn">
                    <button 
                        className="reuse-pwt__modal--btn__cancel" 
                        type="button"
                        onClick={props.closeChangeCnt}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="icon icon__reuse-pwt--modal__btn"/>
                        Cancel
                    </button>
                    <button 
                        className="reuse-pwt__modal--btn__del" 
                        type="button"
                        onClick={props.changeCnt}>
                        <FontAwesomeIcon 
                            icon={props.warn.det && props.warn.det === 'delete'? ['far', 'trash-alt'] : ['fas', 'eye-slash']} 
                            className="icon icon__reuse-pwt--modal__btn"/>
                        {props.warn.det && props.warn.det === 'delete' ? 'Delete': 'Change'}
                    </button>
                </div>
            </div>
        );
    }

    if (!props.err && props.exit && props.exit.close) {
        modalCnt = <p className="reuse-pwt__modal--success">{ props.exit.msg }</p>
    }

    return (
        <div className="reuse-pwt__modal">
            {
                props.err ? (
                    <div className="reuse-pwt__modal--icn">
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="icon icon__reuse-pwt--modal__icn"/>
                    </div>
                ) : null
            }
            { modalCnt } 
        </div>
    );
};

export default modal;