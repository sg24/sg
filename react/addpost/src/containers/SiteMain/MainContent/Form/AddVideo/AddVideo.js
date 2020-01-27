import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';

import * as actions from '../../../../../store/actions/index';
import { updateObject, getSnapshot } from '../../../../../shared/utility';
import MediaItems from '../../../../../components/Main/MediaItems/MediaItems';

class AddVideo extends Component {
    state = {
        inputValue: '',
        snapshot: this.props.media.video ? [...this.props.snapshot] : [],
        media: this.props.media.video ? [...this.props.media.video] : [],
        removeMediaItemIndex: null,
        snapshotErr: null
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
            getSnapshot(this.props.linkValid.media.url, 'video').then(() => {
                media.push(updateObject(this.props.linkValid.media, {id}));
                this.setState({media: media, inputValue: ''});
                this.props.onResetLink();
            }).catch(err => {
                this.setState({snapshotErr: err});
            })
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
        this.setState({media:  updatedMedia, snapshot: updatedSnapshots});
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
                getSnapshot(url, 'video').then(() => {
                    media.push({file, url, id});
                    this.setState({media});
                }).catch(err => {
                    this.setState({snapshotErr: err});
                })
            }
        }
    }

    submitMediaHandler = () => {
        let media = {...this.props.media};
        this.props.onSubmitMedia(updateObject(media, {video: [...this.state.media]}));
    }

    closeMediaBoxHandler = () => {
        this.props.onhideMediaBox();
    }

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
                                Drag and Drop Videos
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
        media: state.form.media
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