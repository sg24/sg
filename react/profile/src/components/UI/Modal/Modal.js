import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loader from '../Loader/Loader';

const modal = props => {
    let modalCnt = <h3>{ props.err ? 
        props.err.response ? props.err.response.data.name : props.err.message : null }</h3>;
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
                        className={(props.warn.det && (props.warn.det === 'publish' || props.warn.det === 'acceptUser')) ? "reuse-modal__btn--success" :"reuse-modal__btn--del" }
                        type="button"
                        onClick={props.changeCnt}>
                        <FontAwesomeIcon 
                            icon={props.warn.det && props.warn.det === 'delete'? ['far', 'trash-alt'] : 
                            props.warn.det && props.warn.det === 'publish' ?  ['fas', 'eye'] : 
                            props.warn.det && props.warn.det === 'draft' ?  ['fas', 'eye-slash'] : 
                            props.warn.det && props.warn.det === 'blockUser' ? ['fas', 'eye-slash']: 
                                props.warn.det && props.warn.det === 'acceptUser' ? ['fas', 'user-friends'] :
                                props.warn.det && props.warn.det === 'rejUser' ? ['fas', 'user-slash'] : ['fas', 'user-slash']} 
                            className="icon icon__reuse-modal--btn"/>
                        {props.warn.det && props.warn.det === 'delete' ? 'Delete': 
                        (props.warn.det && (props.warn.det === 'draft' || props.warn.det === 'publish')) ? 'Change' : 
                        props.warn.det && props.warn.det === 'blockUser' ? 'Block': 
                        props.warn.det && props.warn.det === 'acceptUser' ? 'Accept' :
                        props.warn.det && props.warn.det === 'rejUser' ? 'Reject' : 
                        props.warn.det && props.warn.det === 'cancelReq' ? 'Cancel' : 'Unfriend'}
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
                <Loader 
                   cnt={props.warn.det === 'addUser' ? 'Adding ....' :'Loading ....' }/>
            ): null}   
            { modalCnt } 
        </div>
    );
};

export default modal;