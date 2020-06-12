import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';

import * as actions from '../../../../../store/actions/index';
import { updateObject, readData, writeData } from '../../../../../shared/utility';
import MediaItems from '../../../../../components/Main/MediaItems/MediaItems';

class AddVideo extends Component {
    state = {
        inputValue: '',
        snapshot: this.props.media.video ? [...this.props.snapshot] : [],
        media: this.props.media.video ? [...this.props.media.video] : [],
        removeMediaItemIndex: null,
        mediaRemoved: false,
        snapshotErr: null,
        position: this.props.position
    };


    linkVerifyHandler = (event) => {
        let inputValue =  event.target.value;
        this.setState({inputValue, snapshotErr: null});
        this.props.onCheckLink(inputValue);
    }

    addMediaHandler = () => {
        if (this.props.linkValid && this.props.linkValid.media) {
            let id = uuid();
            let media = [...this.state.media];
            media.push(updateObject(this.props.linkValid.media, {id}));
            this.setState({media: media, inputValue: ''});
            this.props.onResetLink();
        }
    }
    selectMediaHandler = (event) => {
        this.setState({snapshotErr: null});
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
    
    removeMediaItemHandler = (id) => {
        let media = [...this.state.media];
        let snapshot = [...this.state.snapshot];
        let updatedMedia = media.filter(link=>  link.id !== id);
        let updatedSnapshots = snapshot.filter(snapshot => snapshot.id !== id);
        this.setState({media:  updatedMedia, snapshot: updatedSnapshots, mediaRemoved: true});
        if (this.props.media.video && this.props.media.video.length > 0) {
            this.props.onRemoveMedia(updateObject(this.props.media, {video: updatedMedia}));
        }
    }

    handleFiles = (files) => {
        let media = [...this.state.media];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];  
            
            if(file.type.startsWith('video/')) {
                let id = uuid();
                let url = window.URL.createObjectURL(file);
                media.push({file, url, id});
                this.setState({media});
            }
        }
    }

    submitMediaHandler = () => {
        let media = {...this.props.media};
        this.saveMedia();
        this.props.onSubmitMedia(updateObject(media, {video: [...this.state.media]}));
    }

    closeMediaBoxHandler = () => {
        if (this.state.mediaRemoved) {
            this.saveMedia();
        }
        this.props.onhideMediaBox();
    }

    saveMedia = () => {
        if ('indexedDB' in window) {
            readData('media', this.state.position).then(media => {
                let image = [];
                let video = [...this.state.media];
                if (media) {
                    for (let cnt of media.image) {
                        image.push({file: cnt.file, id: cnt.id, url: window.URL.createObjectURL(cnt.file)})
                    }
                }
                writeData('media', {position: this.state.position, image, video})
            })
        }
    };

    render() {
        let mediaPreview = null;
        let mediaAddedViewer = null;

        if (this.props.linkValid ) {
            mediaPreview = this.props.linkValid.media ? (
                <video src={this.props.linkValid.media.url} controls>
                    <p>our browser doesn't support embedded videos</p>
                </video>
            ) : <div className="reuse-form__err">{ this.props.linkValid.err.message}</div>
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
                                disabled={this.props.linkValid ? this.props.linkValid.err !== null : true}
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
                            <div>Upload / Drag and Drop Videos</div>
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
                    { this.state.snapshotErr ? 
                        <div className="reuse-form__err">{ this.state.snapshotErr }</div> : null}
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
        linkValid: state.form.linkValid,
        snapshot: state.form.snapshot,
        media: state.form.media,
        position: state.form.position
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckLink: (videoLink) => dispatch(actions.checkLinkInit(videoLink, 'video')),
        onResetLink: () => dispatch(actions.resetLink()),
        onAddSnapshot: (snapshot) => dispatch(actions.addSnapshot(snapshot)),
        onRemoveSnapshot: (snapshot) => dispatch(actions.removeSnapshot(snapshot)),
        onRemoveMedia: (media) => dispatch(actions.removeMedia(media)),
        onSubmitMedia: (media) => dispatch(actions.submitMedia(media)),
        onhideMediaBox: () => dispatch(actions.hideMediaBox())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVideo)