import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import uuid from 'uuid';
import { connect } from 'react-redux';

import './Form.css';
import { updateObject, getImageURL } from '../../../../shared/utility';
import MediaItems from './MediaItems/MediaItems';
import Loader from './Loader/Loader';
import Auth from './Auth/Auth';

let videoRef = React.createRef(null);
class Form extends Component {
    state = {
        loc: {
            value: '',
            touched: false,
            valid: false
        },
        disableInput: false,
        start: false,
        err: null,
        loading: false,
        media: [],
        chunks: [],
        auth: false,
        status: false,
        disable: false,
        upload: 0,
        mediaRecorder: null
    }

    inputChangedHandler = (event) => {
        let value = event.target.value;
        let loc = updateObject(this.state.loc, {value, valid: value !== '', touched: true});
        this.setState({loc, err: null})
    }

    locationHandler = () => {
        let these = this
        this.setState({disableInput: true, err: null})
        if (('navigator' in window) && ('geolocation' in navigator)) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let fetchedLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${fetchedLocation.lat},${fetchedLocation.lng}&key=AIzaSyDIbF8oQh1APAzLLXoeLynN8vMsAKSav2g`).then(locFnd => {
                    if (!locFnd.data.error_message) {
                        let loc = updateObject(these.state.loc, {value: `In ${locFnd.data.results[0].formatted_address}`})
                        these.setState({loc, disableInput: false})
                    }
                }).catch(err => {
                    these.setState({err: 'Network Error', disableInput: false})
                })
              }, function(err) {
                these.setState({err: 'Network Error', disableInput: false})
              }, {timeout: 10000})
        }
    }

    cameraHandler = () => {
        this.setState({loading: true})
        if (!('mediaDevices' in navigator)) {
            navigator.mediaDevices = {};
        }
        let these = this;
        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
            if (!getUserMedia) {
                return these.setState({err: 'Camera access not supported by Browser!'});
            }
        
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
            }
        }
    
        navigator.mediaDevices.getUserMedia({video: true})
            .then(function(stream) {
                videoRef.current.srcObject= stream;
                these.setState({start: true, loading: false})
            })
            .catch(function(err) {
                these.setState({err, start: false, loading: false})
            });
    }

    captureHandler = () => {
        console.log(videoRef)
        if (videoRef && videoRef.current) {
            getImageURL(videoRef.current).then(imageData => {
                videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                    track.stop();
                });
                let media = [...this.state.media];
                let url = window.URL.createObjectURL(imageData);
                media.push({file: imageData, type: 'image', id: uuid(), url})
                this.setState({media, start: false, err: null})
            }).catch(err => {
                this.setState({err})
            })
        }
    }

    closeCameraHandler = () => {
        if (videoRef && videoRef.current) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
            this.setState({start: false, err: null, loading: false})
        }
    }

    removeMediaHandler = (id) => {
        let media = [...this.state.media];
        let updateMedia = media.filter(cnt => cnt.id !== id);
        this.setState({media: updateMedia})
    }

    videoRecHandler = () => {
        this.setState({loading: true, rec: true})
        let these = this;
        if (!('mediaDevices' in navigator)) {
            navigator.mediaDevices = {};
        }
        
        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
            if (!getUserMedia) {
                return these.setState({err: 'Camera access not supported by browser!', rec: false});
            }
        
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
            }
        }
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
            .then(function(stream) {
                let mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.ondataavailable = function(e) {
                    these.state.chunks.push(e.data);
                }
                videoRef.current.srcObject = stream;
                these.setState({mediaRecorder, start: true, loading: false})
            })
            .catch(function(err) {
                these.setState({err, start: false, loading: false, rec: false})
            }); 
        
    }

    stopRecHandler = () => {
        let mediaRecorder = this.state.mediaRecorder;
        let these = this;
        mediaRecorder.stop();
        mediaRecorder.onstop = function(e) {
            var blob = new Blob(these.state.chunks, { 'type' : 'mp4' });
            mediaRecorder.stream.getTracks().forEach( track => 
                track.stop())
            let media = [...these.state.media];
            let url = window.URL.createObjectURL(blob);
            media.push({file: blob, type: 'video', id: uuid(), url})
            these.setState({mediaRecorder: null, chunks: [], media, start: false, err: null, rec: false})
        }
    }

    cancelRecHandler = () => {
        let mediaRecorder = this.state.mediaRecorder;
        if (mediaRecorder) {
            mediaRecorder.stream.getTracks().forEach( track => 
                track.stop())
                this.setState({mediaRecorder: null, start: false, err: null, loading: false, rec: false})
        }
    }

    componentWillUnmount() {
        if (videoRef && videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
    }

    uploadMediaHandler = () => {
        document.querySelector('.reuse-form--itm__file').click()
    }

    selectMediaHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.files) {
            const files = event.target.files;
            this.handleFiles(files)
        }
    }

    handleFiles = (files) => {
        let media = [...this.state.media]
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.split('/')[0] === 'video' || file.type.split('/')[0] === 'image') {
                let url = window.URL.createObjectURL(file);
                media.push({file, type: file.type.split('/')[0], id: uuid(), url})
            }
        }
        this.setState({media})
    }

    userAuthHandler = () => {
        this.setState({auth: false, status: true})
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        if (this.props.status || this.state.status) {
            this.uploadCnt()
            this.setState({disable: true})
        } else {
            this.setState({auth: true})
        }
    }

    uploadCnt = () => {
        let these = this;
        let formContent = new FormData();
        formContent.append('location', this.state.loc.value);
        for (let media of this.state.media) {
            let ext = media.file.type.split('/').pop();
            if (media.file.type.split('/')[0] === 'video') {
                formContent.append('video', media.file, `${media.id}.${ext}`);
            } else {
                formContent.append('image', media.file, `${media.id}.${ext}`);
            }
        }

        axios.post('https://www.slodge24.com/add/aroundme', formContent, {
            onUploadProgress: function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    these.setState({upload: percentage})
                }
            }  
        }).then((res) => {
            window.location.assign('/aroundme/chat/'+res.data)
        }).catch((err) => {
            this.setState({err, disable: false})
        });
    }

    closeAroundmeHandler = () => {
        if (videoRef && videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
    }

    render() {
        let locClass = ['reuse-form--cnt__det--loc'];
        let mediaCnt = null;
        let mediaClass = ['reuse-form--media'];
        let mediaVidClass = ['reuse-form--media__vid-hide'];
        let loader = null;
        let upload = null;

        if (this.state.upload > 0) {
            upload = (
                <div style={{
                    height: 2,
                    width: `${this.state.upload}%`,
                    backgroundColor: '#ff1600',
                    position: 'absolute',
                    top: 0
                }}></div>
            )
        }

        let mediaOpt = (
            <ul className="reuse-form--opt">
                <li 
                    className="reuse-form--opt__camera"
                    onClick={this.cameraHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'camera']} />
                </li>
                <li 
                    className="reuse-form--opt__rec"
                    onClick={this.videoRecHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'video']} />
                </li>
                <li 
                    className="reuse-form--opt__file"
                    onClick={this.uploadMediaHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'upload']} />
                </li>
            </ul>
        )

        if (!this.state.loading && !this.state.start && this.state.media.length > 0) {
             mediaCnt = (
                <MediaItems
                    cnt={this.state.media}
                    removeMedia={this.removeMediaHandler}/>
             )
        }

        if (this.state.loading ){
            loader = (
                <div className="reuse-form--media__loading">
                    <Loader 
                        cnt="Initializing camera ..."
                        bg/>
                </div>

            )
        }

        if (this.state.start || this.state.loading) {
            mediaVidClass = ['reuse-form--media__vid-show'];
            mediaClass.push('reuse-form--media__show')
            mediaOpt = null
        }

        if (this.state.disableInput) {
            locClass.push('reuse-form--cnt__det--loc__disable')
        }

        let cnt = (
            <>
                <div className="reuse-form--cnt">
                    <div className="reuse-form--cnt--wrapper">
                        <label className="reuse-form--cnt__title">Location</label>
                        <div className="reuse-form--cnt__det">
                            <input 
                                type="text" 
                                name=""
                                required
                                minLength="1"
                                value={this.state.disableInput ? 'Please wait ....' : this.state.loc.value}
                                className="reuse-form--cnt__det--input reuse-form--cnt__det--input__lg"
                                disabled={this.state.disableInput}
                                onChange={this.inputChangedHandler} />
                            <div 
                                className={locClass.join(' ')}
                                onClick={this.state.disableInput ? null: this.locationHandler}>Location Me</div>
                        </div>
                        { !this.state.loc.valid && this.state.loc.touched ?
                            <div className="reuse-form--err">Location must not be empty</div>
                            : null
                        }
                        { this.state.err ?
                            <div className="reuse-form--err">{this.state.err.toString()}</div>
                            : null
                        }
                    </div>
                </div>
                { mediaOpt }
                <div className="reuse-form--itm">
                    <div className="reuse-form--itm__wrapper">
                        <input 
                            type="file" 
                            multiple
                            className="reuse-form--itm__file"
                            onChange={this.selectMediaHandler}
                            accept="image/*,video/*"/>
                        { mediaCnt }
                    </div>
                </div>
                <div className="reuse-form--footer">
                    <button 
                        type="submit" 
                        className="reuse-form--footer__btn"
                        disabled={!this.state.loc.value || this.state.media.length < 1 || this.state.disable}>
                            Chat 
                    </button>
                </div>
            </>
        )

        if (this.state.auth) {
            cnt = (
                <Auth 
                    userAuth={this.userAuthHandler}/>
            )
        }

        return (
            <form 
                className="reuse-form"
                onSubmit={this.submitFormHandler}>  
                <div className="reuse-form--wrapper">
                    {/* <div className="reuse-form--backdrop"  onClick={this.closeAroundmeHandler}>
                    </div> */}
                    <h3 className="reuse-form--title">
                        <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'map-marker-alt']} />
                        </div> 
                        what's going on around you now!!!!!  -  Share Selfie/video 
                    </h3>
                    { upload }
                    { cnt }
                    <div className={mediaClass.join(' ')}>
                        <video 
                            ref={videoRef}
                            autoPlay
                            className={mediaVidClass.join(' ')}>
                            <p>our browser doesn't support embedded videos</p>
                        </video> 
                        { loader }
                        {this.state.start ?
                        <div className="reuse-form--media__snap">
                        {!this.state.rec ? (
                            <>
                                <div 
                                    className="reuse-form--media__snap--wrapper"
                                    onClick={this.captureHandler}>
                                        <FontAwesomeIcon 
                                            icon={['fas', 'camera']} />
                                </div>
                                <div 
                                    className="reuse-form--media__snap--close"
                                    onClick={this.closeCameraHandler}>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'times']} />
                                </div> 
                            </>
                        ) :
                            <>
                                <div 
                                    className="reuse-form--media__snap--wrapper reuse-form--media__snap--wrapper__rec"
                                    onClick={this.stopRecHandler}>
                                        <FontAwesomeIcon 
                                            icon={['fas', 'video']} />
                                </div>
                                <div 
                                    className="reuse-form--media__snap--close"
                                    onClick={this.cancelRecHandler}>
                                    <FontAwesomeIcon 
                                    icon={['fas', 'times']} />
                                </div> 
                            </>
                        }
                        </div> : null}
                    </div>
                    
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
       status: state.auth.status
    };
};

export default connect(mapStateToProps, null)(Form);