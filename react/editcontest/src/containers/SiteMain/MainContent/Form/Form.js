import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Form.css';
import { updateObject, getImageURL, checkValidity } from '../../../../shared/utility';
import MediaItems from './MediaItems/MediaItems';
import Loader from './Loader/Loader';
import Auth from './Auth/Auth';
import FSvg from './border.svg';

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
        deleteMedia: [],
        video: [],
        image: [],
        snapshot: [],
        chunks: [],
        auth: false,
        status: false,
        disable: false,
        upload: 0,
        mediaRecorder: null,
        cntFetch: false
    }

    componentDidMount() {
        axios.post('https://www.slodge24.com/contest', {id: this.props.match.params.id }, {
            headers: {'data-categ':`editform`}
        }).then((res) => {
            let email = this.state.email;
            let name = this.state.name;
            let accIsValid = false;
            let accdet = {...this.state.accdet};
            let formElement = this.state.formElement;
            let phone = updateObject(formElement.phone, {value: res.data.phone, valid: true, touched: true})
            formElement = updateObject(formElement, {phone})
            if (res.data.paypal) {
                email = updateObject(email, {value: res.data.paypal, valid: true, touched: true})
            }
            if (res.data.nickname) {
                name = updateObject(name, {value: res.data.nickname, valid: true, touched: true})
            }
            if (res.data.bank) {
                let bank = updateObject(accdet.bank, {value: res.data.bank, touched: true, valid: true});
                let acc = updateObject(accdet.acc, {value: res.data.account, touched: true, valid: true})
                accdet = updateObject(accdet, {bank, acc})
                accIsValid = true;
            }
            let media = [...this.state.media]
            if (res.data.snapshot && res.data.snapshot.length > 0) {
                for (let cnt of res.data.snapshot) {
                    media.push({...cnt, uploaded: true, type: 'video', url: `https://www.slodge24.com/media/video/${cnt.videoCnt}`})
                }
            }
            if (res.data.image && res.data.image.length > 0) {
                for (let cnt of res.data.image) {
                    media.push({uploaded: true, id: cnt.id, type: 'image', url: `https://www.slodge24.com/media/image/${cnt.id}`})
                }
            }
            this.setState({cntFetch: true, email, name, accIsValid, 
                accdet, formIsValid: true, formElement, media, video: res.data.video, image: res.data.image, snapshot: res.data.snapshot})
        }).catch((err) => {
            this.setState({err})
        });
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
        let deleteMedia = [...this.state.deleteMedia]
        let updateMedia = media.filter(cnt => cnt.id !== id);
        let removedCnt = media.filter(cnt => cnt.id === id)[0];
        let video = this.state.video.filter(cnt => cnt.id !== removedCnt.videoCnt)
        let snapshot = this.state.snapshot.filter(cnt => cnt.id !== id)
        let image = this.state.image.filter(cnt => cnt.id !== id)
        if (removedCnt.uploaded) {
            if (removedCnt.type === 'video') {
                deleteMedia.push({id, videoCnt: removedCnt.videoCnt, type: removedCnt.type})
            } else {
                deleteMedia.push({id, type: removedCnt.type})
            }
        }
        this.setState({media: updateMedia, deleteMedia, video, image, snapshot})
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
        formContent.append('id', this.props.match.params.id);
        formContent.append('phone', this.state.formElement.phone.value);
        formContent.append('account', this.state.accdet.acc.value);
        formContent.append('bank', this.state.accdet.bank.value);
        if (this.state.email.valid) {
            formContent.append('paypal', this.state.email.value);
        }

        for (let media of this.state.media) {
            if (!media.uploaded) {
                let ext = media.file.type.split('/').pop();
                if (media.file.type.split('/')[0] === 'video') {
                    formContent.append('video', media.file, `${media.id}.${ext}`);
                } else {
                    formContent.append('image', media.file, `${media.id}.${ext}`);
                }
            }
        }

        formContent.append('uploadedimage', JSON.stringify(this.state.image));
        formContent.append('uploadedvideo', JSON.stringify(this.state.video));
        formContent.append('uploadedsnap', JSON.stringify(this.state.snapshot));
        formContent.append('removedmedia', JSON.stringify(this.state.deleteMedia))

        axios.post('https://www.slodge24.com/edit/contest', formContent, {
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

    render() {
        let locClass = ['reuse-form--cnt__det--loc'];
        let mediaCnt = null;
        let mediaClass = ['reuse-form--media'];
        let mediaVidClass = ['reuse-form--media__vid-hide'];
        let loader = null;
        let upload = null;
        let cnt = <Loader />
        let det = (
            <h3 
                className="reuse-form--title"
                style={{
                    backgroundImage: `url('${FSvg}')`,
                    backgroundRepeat: 'repeat',
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

        if (this.state.cntFetch) {
            cnt = (
                <>
                    <div className="reuse-form--main">
                        <div className="reuse-form--cnt">
                            <div className="reuse-form--cnt--wrapper">
                                <label className="reuse-form--cnt__title">Nickname (optional) </label>
                                <div className="reuse-form--cnt__det">
                                    <input 
                                        type="text" 
                                        name=""
                                        required
                                        minLength="1"
                                        value={this.state.name.value}
                                        className="reuse-form--cnt__det--input"
                                        onChange={this.nameChangedHandler} />
                                </div>
                                { !this.state.name.valid && this.state.name.touched ?
                                    <div className="reuse-form--err">Nickname must not be empty</div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="reuse-form--cnt">
                            <div className="reuse-form--cnt--wrapper">
                                <label className="reuse-form--cnt__title">Phone Number</label>
                                <div className="reuse-form--cnt__det">
                                    <input 
                                        type="number" 
                                        name=""
                                        required
                                        minLength="1"
                                        value={this.state.formElement.phone.value}
                                        className="reuse-form--cnt__det--input"
                                        onChange={(event) => this.inputChangedHandler(event, 'phone')} />
                                </div>
                                { !this.state.formElement.phone.valid && this.state.formElement.phone.touched ?
                                    <div className="reuse-form--err">Phone Number must not be empty</div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="reuse-form--cnt">
                            <div className="reuse-form--cnt--wrapper">
                                <label className="reuse-form--cnt__title">Bank Name</label>
                                <div className="reuse-form--cnt__det">
                                    <input 
                                        type="text" 
                                        name=""
                                        required
                                        minLength="1"
                                        value={this.state.accdet.bank.value}
                                        className="reuse-form--cnt__det--input"
                                        onChange={(event) => this.accChangedHandler(event, 'bank')} />
                                </div>
                                { !this.state.accdet.bank.valid && this.state.accdet.bank.touched ?
                                    <div className="reuse-form--err">Bank Name must not be empty</div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="reuse-form--cnt">
                            <div className="reuse-form--cnt--wrapper">
                                <label className="reuse-form--cnt__title">Account Number</label>
                                <div className="reuse-form--cnt__det">
                                    <input 
                                        type="number" 
                                        name=""
                                        required
                                        minLength="1"
                                        value={this.state.accdet.acc.value}
                                        className="reuse-form--cnt__det--input"
                                        onChange={(event) => this.accChangedHandler(event, 'acc')} />
                                </div>
                                { !this.state.accdet.acc.valid && this.state.accdet.acc.touched ?
                                    <div className="reuse-form--err">Account Number must not be empty</div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="reuse-form--alt">OR </div>
                        <div className="reuse-form--cnt">
                            <div className="reuse-form--cnt--wrapper">
                                <label className="reuse-form--cnt__title">Paypal Email address</label>
                                <div className="reuse-form--cnt__det">
                                    <input 
                                        type="email" 
                                        name=""
                                        required
                                        minLength="1"
                                        value={this.state.email.value}
                                        className="reuse-form--cnt__det--input"
                                        onChange={(event) => this.emailChangedHandler(event)} />
                                </div>
                                { !this.state.email.valid && this.state.email.touched ?
                                    <div className="reuse-form--err">Email must not be empty</div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="reuse-form--footer reuse-form--footer__term">
                        <div><span>Terms/Conditions:</span> Highest number of comments and views with atleast 5000 each wins</div>
                        <button 
                            type="button" 
                            className="reuse-form--footer__btn"
                            onClick={this.showMediaHandler}
                            disabled={this.state.formIsValid ?  this.state.accIsValid && !this.state.email.valid ? false : 
                                !this.state.accIsValid && this.state.email.valid ? false : true : true }>
                                Next 
                        </button>
                    </div>
                </>
            )
        }

        if (this.state.startMedia) {
            det = (
                <h3 
                    className="reuse-form--title"
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
                    <div className="reuse-form--itm">
                        <div 
                            className="reuse-form--itm__wrapper"
                            >
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
                    className="reuse-form--title"
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
                className="reuse-form"
                onSubmit={this.submitFormHandler}>
                <div className="reuse-form--main-wrapper" >
                    <div 
                        className="reuse-form--wrapper">
                        { det }
                        { this.state.err ?
                            <div className="reuse-form--err">{this.state.err.toString()}</div>
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