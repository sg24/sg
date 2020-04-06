import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { updateObject } from '../../../../shared/utility';

class Conversation extends Component {
    state = {
        convOpt: null
    }

    showUserOptHandler = (index) => {
        if (this.state.convOpt && this.state.convOpt.index === index) {
            this.setState((prevState, props) => {
                return {
                    convOpt: updateObject(prevState.convOpt, {visible: !prevState.convOpt.visible})
                }
            });
            return
        }

        const newConvOpt = {visible: true, index}
        this.setState({convOpt: newConvOpt})
    }

    render() {
        let convs = null;

        if (this.props.conv) {
        }

        return (
            <div className="reuse-conv">
            <div className="reuse-conv__title">
               <div className="reuse-conv__title--wrapper">
                   <div>
                        <FontAwesomeIcon 
                            icon={['far', 'comment-dots']} 
                            className="icon icon__reuse-conv--comment" /> 
                    </div> 
                    Conversations
               </div>
            </div>
            { convs }
        </div>
        );
    }
}


export default Conversation;