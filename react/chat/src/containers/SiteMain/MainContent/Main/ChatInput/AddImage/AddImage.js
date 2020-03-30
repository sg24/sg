import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';

import * as actions from '../../../../../../store/actions/index';
import { updateObject } from '../../../../../../shared/utility';
import './AddImage.css';

class AddImage extends Component {
    state = {
        inputValue: '',
        snapshotErr: null
    };

    linkVerifyHandler = (event) => {
        let inputValue =  event.target.value;
        this.setState({inputValue, snapshotErr: null});
        this.props.onCheckLink(inputValue);
    }

    addMediaHandler = () => {
        if (this.props.linkValid && this.props.linkValid.media) {
            
        }
    }

    

    submitMediaHandler = () => {
        let media = {...this.props.media};
        this.props.onSubmitMedia(updateObject(media, {image: [...this.state.media]}));
    }

    closeMediaBoxHandler = () => {
        this.props.onhideMediaBox();
    }


    render() {
        let errPreview = null;
        if (this.props.linkValid) {
            errPreview = this.props.linkValid.media ? (
                <img src={this.props.linkValid.media.url}  alt="post" />
            ): <div className="site-main__chat--form__err">{ this.props.linkValid.err.message}</div>
        }
        
        return (
            <div className="site-main__chat--form">
                <h4 className="site-main__chat--form--title">
                    <FontAwesomeIcon 
                        icon={['fas', 'images']}
                        className="icon icon__site-main__chat--form--itm--title" />
                  Add Image
                </h4>
                <div className="site-main__chat--form--det">
                    <div className="site-main__chat--form__cnt">
                        <label className="site-main__chat--form__cnt--title">Image Link</label>
                        <div className="site-main__chat--form__cnt--det">
                            <input 
                                type="url" 
                                name="" 
                                className="site-main__chat--form__cnt--det__input site-main__chat--form__cnt--det__input--lg" 
                                placeholder="paste link"
                                onChange={this.linkVerifyHandler}
                                value={this.state.inputValue}
                                spellCheck={false}
                                pattern="https://.*"/>
                                <button
                                    type="button"
                                    onClick={this.addMediaHandler}
                                    disabled={this.props.linkValid ? this.props.linkValid.err !== null : true}
                                    className="site-main__chat--form__cnt--det__btn">
                                    <FontAwesomeIcon 
                                    icon={['fas', 'plus']} />
                                </button>
                        </div>
                    </div>
                    <div className="site-main__chat--form--det__view">
                        { errPreview }
                    </div>
                    <div className="site-main__chat--form--det__alt">
                        OR
                    </div>
                    <div className="site-main__chat--form__cnt">
                        <div className="site-main__chat--form__cnt--det">
                            <div className="site-main__chat--form__cnt--det__fil">
                                <div>Upload / Drag and Drop Images</div>
                                <input 
                                    type="file" 
                                    name=""
                                    multiple
                                    className="site-main__chat--form__cnt--det__fil--input"
                                    onChange={this.selectMediaHandler}
                                    onDragEnter={this.dragEnterMediaHandler}
                                    onDragOver={this.dragOverMediaHandler}
                                    onDrop={this.dropMediaHandler}
                                    accept="image/*" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        linkValid: state.form.linkValid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckLink: (imageLink) => dispatch(actions.checkLinkInit(imageLink, 'image')),
        onResetLink: () => dispatch(actions.resetLink())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddImage)