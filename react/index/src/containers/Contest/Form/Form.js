import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Form.css';
import { updateObject, getImageURL, checkValidity } from '../utility/utility';
import MediaItems from './MediaItems/MediaItems';
import Loader from './Loader/Loader';
import Auth from './Auth/Auth';
import FSvg from '../border.svg';

let videoRef = React.createRef(null);
class Form extends Component {
    state = {
        name: {
            value: '',
            validation: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },
        formElement: {
            phone: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
        },
        accdet: {
            acc: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            bank: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            }
        },
        email: {
            value: '',
            validation: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },
        accIsValid: false,
        formIsValid: false,
        disableInput: false,
        start: false,
        startMedia: false,
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

    inputChangedHandler = (event, inputType) => {
        let value = event.target.value;
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value,
            valid: checkValidity(value, this.state.formElement[inputType].validation),
            touched: true
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            formIsValid = updateFormElement[inputType].valid && formIsValid;
        }

        this.setState({formElement: updateFormElement, formIsValid, err: null})
    }

    accChangedHandler = (event, inputType) => {
        let value = event.target.value;
        let updateFormType = updateObject(this.state.accdet[inputType], {
            value,
            valid: checkValidity(value, this.state.accdet[inputType].validation),
            touched: true
        });
        
        let accIsValid = true;
        let updateFormElement = updateObject(this.state.accdet, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            accIsValid = updateFormElement[inputType].valid && accIsValid;
        }
        let email = updateObject(this.state.email, {value: '', touched: false, valid: false})
        this.setState({accdet: updateFormElement, accIsValid, err: null, email})
    }

    emailChangedHandler = (event) => {
        let accdet = {...this.state.accdet};
        let bank = updateObject(accdet.bank, {value: '', touched: false, valid: false});
        let acc = updateObject(accdet.acc, {value: '', touched: false, valid: false})
        let resetAcc = updateObject(accdet, {bank, acc})
        let email = updateObject(this.state.email, {value: event.target.value, touched: true, valid: event.target.value !== ''})
        this.setState({accdet: resetAcc, accIsValid: false, err: null, email})
    }

    nameChangedHandler = (event) => {
        let name = updateObject(this.state.name, {value: event.target.value, touched: true, valid: event.target.value !== ''})
        this.setState({name})
    }

    showMediaHandler = () => {
        this.setState({startMedia: !this.state.startMedia})
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
        document.querySelector('.aroundme__form--itm__file').click()
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
            this.setState({disable: true, err: null})
        } else {
            this.setState({auth: true, err: null})
        }
    }

    uploadCnt = () => {
        let these = this;
        let formContent = new FormData();
        if (this.state.name.valid) {
            formContent.append('nickname', this.state.name.value)
        };
        formContent.append('phone', this.state.formElement.phone.value);
        formContent.append('account', this.state.accdet.acc.value);
        formContent.append('bank', this.state.accdet.bank.value);
        if (this.state.email.valid) {
            formContent.append('paypal', this.state.email.value);
        }

        for (let media of this.state.media) {
            let ext = media.file.type.split('/').pop();
            if (media.file.type.split('/')[0] === 'video') {
                formContent.append('video', media.file, `${media.id}.${ext}`);
            } else {
                formContent.append('image', media.file, `${media.id}.${ext}`);
            }
        }

        axios.post('https://www.slodge24.com/add/contest', formContent, {
            onUploadProgress: function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    these.setState({upload: percentage})
                }
            }  
        }).then((res) => {
            window.location.assign('/contest/chat/'+res.data)
        }).catch((err) => {
            this.setState({err, disable: false})
        });
    }

    closeAroundmeHandler = () => {
        this.props.history.goBack();
        if (videoRef && videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
    }

    render() {
        let locClass = ['aroundme__form--cnt__det--loc'];
        let mediaCnt = null;
        let mediaClass = ['aroundme__form--media'];
        let mediaVidClass = ['aroundme__form--media__vid-hide'];
        let loader = null;
        let upload = null;
        let det = (
            <h3 
                className="aroundme__form--title"
                style={{
                    backgroundImage: `url('${FSvg}')`,
                    backgroundRepeat: 'repeat',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: "right"
                }}>
                <div>
                    <FontAwesomeIcon 
                        icon={['fas', 'mask']} />
                </div> 
                Face of slodge24 Contest (<span> Ten Thousand Naira / $27 </span>)
            </h3>
        )

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
            <ul className="aroundme__form--opt">
                <li 
                    className="aroundme__form--opt__camera"
                    onClick={this.cameraHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'camera']} />
                </li>
                <li 
                    className="aroundme__form--opt__rec"
                    onClick={this.videoRecHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'video']} />
                </li>
                <li 
                    className="aroundme__form--opt__file"
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
                <div className="aroundme__form--media__loading">
                    <Loader 
                        cnt="Initializing camera ..."
                        bg/>
                </div>

            )
        }

        if (this.state.start || this.state.loading) {
            mediaVidClass = ['aroundme__form--media__vid-show'];
            mediaClass.push('aroundme__form--media__show')
            mediaOpt = null
        }

        if (this.state.disableInput) {
            locClass.push('aroundme__form--cnt__det--loc__disable')
        }

        let cnt = (
            <>
                <div className="aroundme__form--main">
                    <div className="aroundme__form--cnt">
                        <div className="aroundme__form--cnt--wrapper">
                            <label className="aroundme__form--cnt__title">Nickname (optional) </label>
                            <div className="aroundme__form--cnt__det">
                                <input 
                                    type="text" 
                                    name=""
                                    required
                                    minLength="1"
                                    value={this.state.name.value}
                                    className="aroundme__form--cnt__det--input"
                                    onChange={this.nameChangedHandler} />
                            </div>
                            { !this.state.name.valid && this.state.name.touched ?
                                <div className="aroundme__form--err">Nickname must not be empty</div>
                                : null
                            }
                        </div>
                    </div>
                    <div className="aroundme__form--cnt">
                        <div className="aroundme__form--cnt--wrapper">
                            <label className="aroundme__form--cnt__title">Phone Number</label>
                            <div className="aroundme__form--cnt__det">
                                <input 
                                    type="number" 
                                    name=""
                                    required
                                    minLength="1"
                                    value={this.state.formElement.phone.value}
                                    className="aroundme__form--cnt__det--input"
                                    onChange={(event) => this.inputChangedHandler(event, 'phone')} />
                            </div>
                            { !this.state.formElement.phone.valid && this.state.formElement.phone.touched ?
                                <div className="aroundme__form--err">Phone Number must not be empty</div>
                                : null
                            }
                        </div>
                    </div>
                    <div className="aroundme__form--cnt">
                        <div className="aroundme__form--cnt--wrapper">
                            <label className="aroundme__form--cnt__title">Bank Name</label>
                            <div className="aroundme__form--cnt__det">
                                <input 
                                    type="text" 
                                    name=""
                                    required
                                    minLength="1"
                                    value={this.state.accdet.bank.value}
                                    className="aroundme__form--cnt__det--input"
                                    onChange={(event) => this.accChangedHandler(event, 'bank')} />
                            </div>
                            { !this.state.accdet.bank.valid && this.state.accdet.bank.touched ?
                                <div className="aroundme__form--err">Bank Name must not be empty</div>
                                : null
                            }
                        </div>
                    </div>
                    <div className="aroundme__form--cnt">
                        <div className="aroundme__form--cnt--wrapper">
                            <label className="aroundme__form--cnt__title">Account Number</label>
                            <div className="aroundme__form--cnt__det">
                                <input 
                                    type="number" 
                                    name=""
                                    required
                                    minLength="1"
                                    value={this.state.accdet.acc.value}
                                    className="aroundme__form--cnt__det--input"
                                    onChange={(event) => this.accChangedHandler(event, 'acc')} />
                            </div>
                            { !this.state.accdet.acc.valid && this.state.accdet.acc.touched ?
                                <div className="aroundme__form--err">Account Number must not be empty</div>
                                : null
                            }
                        </div>
                    </div>
                    <div className="aroundme__form--alt">OR </div>
                    <div className="aroundme__form--cnt">
                        <div className="aroundme__form--cnt--wrapper">
                            <label className="aroundme__form--cnt__title">Paypal Email address</label>
                            <div className="aroundme__form--cnt__det">
                                <input 
                                    type="email" 
                                    name=""
                                    required
                                    minLength="1"
                                    value={this.state.email.value}
                                    className="aroundme__form--cnt__det--input"
                                    onChange={(event) => this.emailChangedHandler(event)} />
                            </div>
                            { !this.state.email.valid && this.state.email.touched ?
                                <div className="aroundme__form--err">Email must not be empty</div>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className="aroundme__form--footer aroundme__form--footer__term">
                    <div><span>Terms/Conditions:</span> Highest number of comments and views with atleast 5000 each wins</div>
                    <button 
                        type="button" 
                        className="aroundme__form--footer__btn"
                        onClick={this.showMediaHandler}
                        disabled={this.state.formIsValid ?  this.state.accIsValid && !this.state.email.valid ? false : 
                            !this.state.accIsValid && this.state.email.valid ? false : true : true }>
                            Next 
                    </button>
                </div>
            </>
        )

        if (this.state.startMedia) {
            det = (
                <h3 
                    className="aroundme__form--title"
                    style={{
                        backgroundImage: `url('${FSvg}')`,
                        backgroundRepeat: 'repeat',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: "right"
                    }}>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'mask']} />
                    </div> 
                    Take Snapshot/Record video
                </h3>
            )
            cnt = (
                <>
                    { mediaOpt }
                    <div className="aroundme__form--itm">
                        <div 
                            className="aroundme__form--itm__wrapper"
                            >
                            <input 
                                type="file" 
                                multiple
                                className="aroundme__form--itm__file"
                                onChange={this.selectMediaHandler}
                                accept="image/*,video/*"/>
                            { mediaCnt }
                        </div>
                    </div>
                    <div className="aroundme__form--footer">
                        <button 
                            type="submit" 
                            className="aroundme__form--footer__btn"
                            disabled={this.state.media.length < 1 || this.state.disable}>
                                Next 
                        </button>
                    </div>
                </>
            )
        }

        if (this.state.auth) {
            det = (
                <h3 
                    className="aroundme__form--title"
                    style={{
                        backgroundImage: `url('${FSvg}')`,
                        backgroundRepeat: 'repeat',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: "right"
                    }}>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'mask']} />
                    </div> 
                    Login / Signup
                </h3>
            )
            cnt = (
                <Auth 
                    userAuth={this.userAuthHandler}/>
            )
        }

        return (
            <form 
                className="aroundme__form"
                onSubmit={this.submitFormHandler}>
                <div 
                    className="aroundme__form--main-wrapper"
                    >
                    <div className="aroundme__form--backdrop"  onClick={this.closeAroundmeHandler}>
                    </div>  
                    <div 
                        className="aroundme__form--wrapper">
                        { det }
                        { this.state.err ?
                            <div className="aroundme__form--err">{this.state.err.toString()}</div>
                            : null
                        }
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
                            <div className="aroundme__form--media__snap">
                            {!this.state.rec ? (
                                <>
                                    <div 
                                        className="aroundme__form--media__snap--wrapper"
                                        onClick={this.captureHandler}>
                                            <FontAwesomeIcon 
                                                icon={['fas', 'camera']} />
                                    </div>
                                    <div 
                                        className="aroundme__form--media__snap--close"
                                        onClick={this.closeCameraHandler}>
                                        <FontAwesomeIcon 
                                            icon={['fas', 'times']} />
                                    </div> 
                                </>
                            ) :
                                <>
                                    <div 
                                        className="aroundme__form--media__snap--wrapper aroundme__form--media__snap--wrapper__rec"
                                        onClick={this.stopRecHandler}>
                                            <FontAwesomeIcon 
                                                icon={['fas', 'video']} />
                                    </div>
                                    <div 
                                        className="aroundme__form--media__snap--close"
                                        onClick={this.cancelRecHandler}>
                                        <FontAwesomeIcon 
                                        icon={['fas', 'times']} />
                                    </div> 
                                </>
                            }
                            </div> : null}
                        </div>
                        
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

export default withRouter(connect(mapStateToProps, null)(Form));