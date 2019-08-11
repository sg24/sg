import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../../../store/actions/index';
import { updateObject } from '../../../../../shared/utility';
import MediaItems from '../../../../../components/Main/MediaItems/MediaItems';

class AddVideo extends Component {
    state = {
        inputValue: '',
        link: null,
        disabled: true,
        default: false,
        media: [],
        removeMediaItemIndex: null,
        addMediaButton: true
    };

    componentDidUpdate() {
        if (!this.state.default && this.props.linkValid) {
            this.setState({default: true, disabled: false})
        }
    }

    linkVerifyHandler = (event) => {
        let inputValue =  event.target.value;
        this.setState({link: inputValue, inputValue, disabled: true, default: false});
        this.props.onCheckLink(inputValue);
    }

    addMediaHandler = () => {
        if (this.props.linkValid) {
            let media = [...this.state.media];
            media.push(this.state.link);
            this.setState({
                media: media, disabled: true, inputValue: '', default: false});
            this.props.onResetLink();
        }
    }

    selectMediaHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.files) {
            const files = event.target.files;
            this.handleFiles(files)
        }
    }

    dragEnterMediaHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    dragOverMediaHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    dropMediaHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.dataTransfer) {
            const dt = event.dataTransfer;
            const files = dt.files;
            this.handleFiles(files)
        }
    }

    removeMediaItemEnableHandler = (index) => {
        this.setState({removeMediaItemIndex: index})
    }

    removeMediaItemDisableHandler = () => {
        this.setState({removeMediaItemIndex: null})
    }
    
    removeMediaItemHandler = (index) => {
        let media = [...this.state.media];
        let updatedMedia = media.filter((link, CurIndex)=>  CurIndex !== index);
        this.setState({media:  updatedMedia});
    }

    handleFiles = (files) => {
        let media = [...this.state.media];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if(file.type.startsWith('video/')) {
                media.push(window.URL.createObjectURL(file));
                window.URL.revokeObjectURL(file);
            }
        }
        this.setState({media});
    }

    submitMediaHandler = () => {
        let media = {...this.props.media};
        for (let mediaType in media) {
            if (mediaType === 'video') {
                let updateMedia = [...this.props.media.video];
                updateMedia.push(...this.state.media);
                this.props.onSubmitMedia(updateObject(media, {video: updateMedia}));
                return
            }
        }
        this.props.onSubmitMedia(updateObject(media, {video: [...this.state.media]}));
    }

    closeMediaBoxHandler = () => {
        if (!this.state.media.length > 0 ) {
            this.props.onhideMediaBox();
        }  
    }

    render() {
        let mediaPreview = null;
        let mediaAddedViewer = null;

        if (this.props.linkValid && this.state.default) {
            mediaPreview = (
                <video src={this.state.link} controls>
                    <p>our browser doesn't support embedded videos</p>
                </video>
            )
        }

        if (this.state.media.length > 0) {
            mediaAddedViewer = (
                <div className="reuse-form__itm--det__view-select">
                    <MediaItems 
                       media={this.state.media}
                       mediaType="video"
                       removeMediaItemEnable={this.removeMediaItemEnableHandler}
                       removeMediaItemDisable={this.removeMediaItemDisableHandler}
                       removeMediaItemIndex={this.state.removeMediaItemIndex}
                       removeMediaItem={this.removeMediaItemHandler}/>
                </div>
            ); 
        }

        return(
            <div className="reuse-form__itm reuse-form__itm--vid">
                <h4 className="reuse-form__itm--title">
                    <FontAwesomeIcon 
                        icon={['fas', 'video']}
                        className="icon icon__reuse-form--itm--title" />
                    Add Video
                </h4>
                <div className="reuse-form__itm--det">
                    <div className="reuse-form__cnt">
                        <label className="reuse-form__cnt--title">Video Link</label>
                        <div className="reuse-form__cnt--det">
                            <input 
                                type="url" 
                                name="" 
                                className="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" 
                                placeholder="paste link"
                                onChange={this.linkVerifyHandler}
                                value={this.state.inputValue}
                                spellCheck={false}
                                pattern="https://.*" />
                            <button
                                type="button"
                                onClick={this.addMediaHandler}
                                disabled={this.state.disabled}
                                className="reuse-form__cnt--det__btn">
                                <FontAwesomeIcon 
                                icon={['fas', 'plus']} />
                            </button>
                        </div>
                    </div>
                    <div className="reuse-form__itm--det__view">
                        { mediaPreview }
                    </div>
                    <div className="reuse-form__itm--det__alt reuse-form__itm--det__alt--vid">
                        OR
                    </div>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--det">
                            <div className="reuse-form__cnt--det__fil">
                                Add Video
                                <input 
                                    type="file" 
                                    name="" 
                                    multiple
                                    className="reuse-form__cnt--det__fil--input"
                                    onChange={this.selectMediaHandler}
                                    onDragEnter={this.dragEnterMediaHandler}
                                    onDragOver={this.dragOverMediaHandler}
                                    onDrop={this.dropMediaHandler}
                                    accept="video/*" />
                            </div>
                        </div>
                    </div>
                    { mediaAddedViewer }
                </div>
                <div className="reuse-form__itm--footer reuse-form__btn">
                    <button 
                        type="button" 
                        className="reuse-form__btn--close"
                        onClick={this.closeMediaBoxHandler}>Exit</button>
                    <button 
                        type="button" 
                        className="reuse-form__btn--add"
                        onClick={this.submitMediaHandler}
                        disabled={!this.state.media.length > 0}>Add</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        linkValid: state.addPost.linkValid,
        media: state.addPost.media
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckLink: (videoLink) => dispatch(actions.checkLinkInit(videoLink)),
        onResetLink: () => dispatch(actions.resetLink()),
        onSubmitMedia: (media) => dispatch(actions.submitMedia(media)),
        onhideMediaBox: () => dispatch(actions.hideMediaBox())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVideo)