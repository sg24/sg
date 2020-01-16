import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AddImage.css';
import * as actions from '../../../../../store/actions/index';
import MediaItem from './MediaItem/MediaItem';
import { getImageURL, dataURLtoBlob } from '../../../../../shared/utility';

const videoRef = React.createRef(null);

class AddImage extends Component {
    state = {
        inputValue: '',
        mediaUrl: null,
        err: null,
        startCapture: false
    };

    linkVerifyHandler = (event) => {
        let inputValue =  event.target.value;
        this.setState({inputValue});
        this.props.onCheckLink(inputValue);
        if (this.state.startCapture) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
          });
          this.setState({startCapture: false});
        }
    }

    componentDidUpdate() {
        if (this.props.linkValid && !this.props.linkValid.err) {
            this.setState({mediaUrl: this.state.inputValue});
            this.props.onResetLink()
        }
    }

    openCameraHandler = () => {
        if (!('mediaDevices' in navigator)) {
            navigator.mediaDevices = {};
        }
        
        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented!'));
            }
        
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
            }
        }
        let these = this;
        navigator.mediaDevices.getUserMedia({video: true})
            .then(function(stream) {
                videoRef.current.srcObject= stream;
                these.setState({startCapture: true, mediaUrl: null})
            })
            .catch(function(err) {
                these.setState({err, startCapture: false})
            });
    }

    captureImageHandler = () => {
        getImageURL(videoRef.current).then(imageData => {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                  track.stop();
            });
            let imageFile = dataURLtoBlob(imageData);
            let url = window.URL.createObjectURL(imageFile)
            this.setState({mediaUrl: url, startCapture: false})
        }).catch(err => {
            this.setState({err})
        })
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

    handleFiles = (files) => {
        if (this.state.startCapture) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
          });
          this.setState({startCapture: false});
        }
        const file = files[0];
        if(file.type.startsWith('image/')) {
            let url = window.URL.createObjectURL(file)
            this.setState({mediaUrl: url})
        }
    }

    submitMediaHandler = () => {
        if (this.props.profileImage) {
            this.props.onSubmitImage(this.props.profileImage, this.props.imageUrl);
        }
    }

    closeMediaBoxHandler = () => {
        this.props.onChangeImage();
    }


    render() {
        let mediaPreview = null;
        let mediaAddedViewer = null;
        let streamVideoCLass = ["reuse-form__itm--det__view-select--media__wrapper--video"];
        let captureBtn = null;

        if (this.props.linkValid || this.state.err) {
            mediaPreview = this.props.linkValid && this.props.linkValid.err ?
            <div className="reuse-form__err">{ this.props.linkValid.err.message}</div> : 
            this.state.err ? <div className="reuse-form__err">{ this.state.err.message }</div> : null
        }
        if (this.state.mediaUrl) {
            mediaAddedViewer = (
                <div className="reuse-form__itm--det__view-select">
                    <MediaItem
                       url={this.state.mediaUrl }/>
                </div>
            ); 
        }

        if (!this.state.err && this.state.startCapture) {
            streamVideoCLass.push('reuse-form__itm--det__view-select--media__wrapper--video__show');
            captureBtn = (
                <div className="reuse-form__itm--footer reuse-form__btn">
                <button 
                    type="button" 
                    className="reuse-form__btn--add"
                    onClick={this.captureImageHandler}>Capture</button>
            </div>
            )
        }

        return (
            <div className="reuse-form__itm">
                <h4 className="reuse-form__itm--title">
                    <FontAwesomeIcon 
                        icon={['fas', 'image']}
                        className="icon icon__reuse-form--itm--title" />
                  Change Profile Image
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
                        </div>
                    </div>
                    <div className="reuse-form__itm--det__view">
                        { mediaPreview }
                    </div>
                    <div className="reuse-form__itm--det__alt">
                        OR
                    </div>
                    <div 
                        className="reuse-form__itm--det__camera"
                        onClick={this.openCameraHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'camera']}
                            className="icon icon__reuse-form--itm--camera" />
                        Take Snapshot 
                    </div>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--det">
                            <div className="reuse-form__cnt--det__fil">
                                Upload Image
                                <input 
                                    type="file" 
                                    name=""
                                    className="reuse-form__cnt--det__fil--input"
                                    onChange={this.selectMediaHandler}
                                    onDragEnter={this.dragEnterMediaHandler}
                                    onDragOver={this.dragOverMediaHandler}
                                    onDrop={this.dropMediaHandler}
                                    accept="image/*" />
                            </div>
                        </div>
                    </div>
                    <video 
                        ref={videoRef}
                        autoPlay
                        className={streamVideoCLass.join(' ')}>
                        <p>our browser doesn't support embedded videos</p>
                    </video>
                    { captureBtn }
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
                        disabled={!this.props.profileImage || this.props.startUpload || this.state.startCapture}
                        onClick={this.submitMediaHandler}>Change</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        linkValid: state.cnt.linkValid,
        profileImage: state.cnt.profileImage,
        imageUrl: state.cnt.imageUrl,
        startUpload: state.cnt.startUpload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckLink: (imageLink) => dispatch(actions.checkLinkInit(imageLink, 'image')),
        onResetLink: () => dispatch(actions.resetLink()),
        onSubmitImage: (image, url) => dispatch(actions.submitImageInit(image, url)),
        onChangeImage: () => dispatch(actions.changeImage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddImage)