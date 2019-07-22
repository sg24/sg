import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConvItems from '../../../components/Main/Nav/ConvItems/ConvItems';
import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';

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
        let convs = null;

        if (this.props.conv) {
            convs = <ConvItems 
                convs={this.props.conv}
                userOpt={this.showUserOptHandler}
                showConvOpt={this.state.convOpt}/>
        }

        return (
            <div className="reuse-conv">
            <div className="reuse-conv__title">
               <div className="reuse-conv__title--wrapper">
                   <div><i className="far fa-comment-dots icon icon__reuse-conv--comment"></i></div> Conversations
               </div>
            </div>
            { convs }
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