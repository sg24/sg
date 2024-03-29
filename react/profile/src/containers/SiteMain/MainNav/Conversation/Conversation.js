import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConvItems from '../../../../components/Main/Nav/ConvItems/ConvItems';
import * as actions from '../../../../store/actions/index';
import { updateObject } from '../../../../shared/utility';
import Loader from '../../../../components/UI/Loader/Loader';

class Conversation extends Component {
    state = {
        convOpt: null
    }

    componentDidMount() {
        this.props.onFetchConv();
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
        let convs = <Loader />;

        if (this.props.conv) {
            convs = <ConvItems 
                convs={this.props.conv}/>
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
            <div className="reuse-conv__cnt">
                { convs }
            </div>
        </div>
        );
    }
}

const mapStateToPros = state => {
    return {
        conv: state.conv.conv
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConv: () => dispatch(actions.fetchConvInit())
    };
}

export default connect(mapStateToPros, mapDispatchToProps)(Conversation);