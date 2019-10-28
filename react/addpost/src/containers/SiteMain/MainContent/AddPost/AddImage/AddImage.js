import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../../../store/actions/index';
import { updateObject, getImageURL } from '../../../../../shared/utility';
import MediaItems from '../../../../../components/Main/MediaItems/MediaItems';

class AddImage extends Component {
    state = {
        inputValue: '',
        media: [],
        removeMediaItemIndex: null,
        snapshotErr: null
    };

    componentWillMount() {
        if (this.props.media.image) {
            this.setState({media: [...this.props.media.image]});
        }
    }

    linkVerifyHandler = (event) => {
        let inputValue =  event.target.value;
        this.setState({inputValue, snapshotErr: null});
        this.props.onCheckLink(inputValue);
    }

    addMediaHandler = () => {
        if (this.props.linkValid && this.props.linkValid.media) {
            let media = [...this.state.media];
            getImageURL(this.props.linkValid.media.url).then(dataUrl => {
                media.push({file: dataUrl, url: this.props.linkValid.media.url});
                this.setState({
                    media: media,  inputValue: ''});
                this.props.onResetLink();
            }).catch(err => {
                let reader = new FileReader();
                let these = this;
                reader.readAsDataURL(this.props.linkValid.media.file)
                reader.addEventListener('loadend', function() {
                    media.push({file: reader.result, url: this.props.linkValid.media.url});
                    these.setState({
                        media: media,  inputValue: '',
                        snapshotErr: err});
                    these.props.onResetLink();
                })
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
    
    removeMediaItemHandler = (index) => {
        let media = [...this.state.media];
        let updatedMedia = media.filter((link, CurIndex)=>  CurIndex !== index);
        this.setState({media:  updatedMedia});
        if (this.props.media.image && this.props.media.image.length > 0) {
            this.props.onRemoveMedia(updateObject(this.props.media, {image: updatedMedia}))
        }
    }

    handleFiles = (files) => {
        let media = [...this.state.media];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if(file.type.startsWith('image/')) {
                let url = window.URL.createObjectURL(file)
                getImageURL(url).then(dataUrl => {
                    media.push({file: dataUrl, url});
                    this.setState({media});
                }).catch(err => {
                    let reader = new FileReader();
                    let these = this;
                    reader.readAsDataURL(file)
                    reader.addEventListener('loadend', function() {
                        media.push({file: reader.result, url});
                        these.setState({media, snapshotErr: err});
                    })
                })
            }
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
        let mediaPreview = null;
        let mediaAddedViewer = null;

        if (this.props.linkValid) {
            mediaPreview = this.props.linkValid.media ? (
                <img src={this.props.linkValid.media.url}  alt="post" />
            ): <div className="reuse-form__err">{ this.props.linkValid.err.message}</div>
        }

        if (this.state.media.length > 0) {
            mediaAddedViewer = (
                <div className="reuse-form__itm--det__view-select">
                    <MediaItems 
                       media={this.state.media}
                       mediaType="image"
                       removeMediaItemEnable={this.removeMediaItemEnableHandler}
                       removeMediaItemDisable={this.removeMediaItemDisableHandler}
                       removeMediaItemIndex={this.state.removeMediaItemIndex}
                       removeMediaItem={this.removeMediaItemHandler}/>
                </div>
            ); 
        }

        return (
            <div className="reuse-form__itm">
                <h4 className="reuse-form__itm--title">
                    <FontAwesomeIcon 
                        icon={['fas', 'images']}
                        className="icon icon__reuse-form--itm--title" />
                  Add Image
                </h4>
                <div className="reuse-form__itm--det">
                    <div className="reuse-form__cnt">
                        <label className="reuse-form__cnt--title">Image Link</label>
                        <div className="reuse-form__cnt--det">
                            <input 
                                type="url" 
                                name="" 
                                className="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" 
                                placeholder="paste link"
                                onChange={this.linkVerifyHandler}
                                value={this.state.inputValue}
                                spellCheck={false}
                                pattern="https://.*"/>
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
                    <div className="reuse-form__itm--det__alt">
                        OR
                    </div>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--det">
                            <div className="reuse-form__cnt--det__fil">
                                Drag and Drop Images
                                <input 
                                    type="file" 
                                    name=""
                                    multiple
                                    className="reuse-form__cnt--det__fil--input"
                                    onChange={this.selectMediaHandler}
                                    onDragEnter={this.dragEnterMediaHandler}
                                    onDragOver={this.dragOverMediaHandler}
                                    onDrop={this.dropMediaHandler}
                                    accept="image/*" />
                            </div>
                        </div>
                    </div>
                    { this.state.snapshotErr ? 
                        <div className="reuse-form__err">Some features are not available in your browser, { this.state.snapshotErr }</div> : null}
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
        onCheckLink: (imageLink) => dispatch(actions.checkLinkInit(imageLink, 'image')),
        onResetLink: () => dispatch(actions.resetLink()),
        onRemoveMedia: (media) => dispatch(actions.removeMedia(media)),
        onSubmitMedia: (media) => dispatch(actions.submitMedia(media)),
        onhideMediaBox: () => dispatch(actions.hideMediaBox())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddImage)