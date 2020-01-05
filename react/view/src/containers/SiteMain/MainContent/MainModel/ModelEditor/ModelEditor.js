import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ModelEditor.css';
import '../../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { transformNumber, engStrings } from '../../../../../shared/utility';
import Aux from '../../../../../hoc/Auxs/Aux';
import * as actions from '../../../../../store/actions/index';

class ModelEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: EditorState.createEmpty(),
            submitStart: false
        }
    }
    componentDidUpdate() {
        if (this.state.submitStart && this.props.resetInput){
            this.setState({inputValue: EditorState.createEmpty(), submitStart: false})
            this.props.onResetInput();
            this.props.history.goBack();
        }
    }

    inputChangedHandler = (editorState) => {
        this.setState({inputValue: editorState})
    }

    closeEditorHandler = () => {
        this.props.history.goBack();
    }

    submitReplyHandler = () => {
        let cnt = JSON.stringify(convertToRaw(this.state.inputValue.getCurrentContent()))
        this.props.onSubmitComment(this.props.location.search.split('=')[1], this.props.match.params.categ, cnt, 'reply')
        this.setState({submitStart: true})
    }

    render() {
        return (
            <div className="reuse-view__editor--wrapper">
                <div className="reuse-view__editor--backdrop">
                    <div className="reuse-view__editor">
                        <div 
                            className="reuse-view__editor--main-close"
                            onClick={this.closeEditorHandler}>
                            <FontAwesomeIcon 
                                icon={['fas', 'times']} 
                                className="" />
                            </div>
                            {/* <ul class="reuse-view__comments--box__reply--header">
                                <li><div class="reuse-view__comments--box__reply--header__iconholder"><i class="fas fa-image icon icon__reuse-view--reply__header"></i></div></li>
                                <li><div class="reuse-view__comments--box__reply--header__iconholder"><i class="fas fa-camera icon icon__reuse-view--reply__header"></i></div></li>
                                <li><div class="reuse-view__comments--box__reply--header__iconholder"><i class="fas fa-microphone icon icon__reuse-view--reply__mic"></i></div></li>
                                <li><div class="reuse-view__comments--box__reply--header__iconholder"><i class="fas fa-file icon icon__reuse-view--reply__header"></i></div></li>
                            </ul> */}
                            <div className="reuse-view__editor--content">
                                <div className="reuse-view__form--field__wrapper">
                                    <Editor 
                                        id="Add-Comment" 
                                        data-matching-link="#Add-Comment-link"
                                        wrapperClassName=""
                                        editorClassName="reuse-view__form--field__textarea"
                                        toolbarClassName="reuse-view__form--field__textarea--toolbar"
                                        editorState={this.state.inputValue}
                                        onEditorStateChange={this.inputChangedHandler} 
                                        toolbar={{
                                            options: ['inline', 'blockType', 'emoji', 'remove', 'history'],
                                            inline: { inDropdown: true }
                                    }}/>
                                </div>
                            </div>
                            <div className="reuse-view__editor--footer">
                                <button 
                                    type="button"
                                    disabled={this.props.submitStart || String(convertToRaw(this.state.inputValue.getCurrentContent()).blocks[0].text).length < 6} 
                                    onClick={this.submitReplyHandler}>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'reply']} 
                                        className="icon icon__reuse-view--reply" />
                                    Reply
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};


const mapStateToProps = state => {
    return {
        submitStart: state.cnt.submitStart,
        resetInput: state.cnt.resetInput
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitComment: (id, cntGp, cnt, modelType) => dispatch(actions.submitCommentInit(id, cntGp, cnt, modelType)),
        onResetInput: () => dispatch(actions.resetInput())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModelEditor));