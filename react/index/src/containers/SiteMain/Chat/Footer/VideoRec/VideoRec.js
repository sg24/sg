import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';

import './VideoRec.css';
import { socket, webCameraApi } from '../../shared/utility';
import Loader from '../../Loader/Loader';
import axios from '../../axios';

let videoRef = React.createRef(null);
class VideoCam extends Component {
    state = {
        start: false,
        mediaRecorder: null,
        id: this.props.match.params.id,
        editChat: this.props.editChat,
        err: null
    };

    componentDidMount() {
        webCameraApi(socket, this.state.mediaRecorder, this.state.start, {video: true, audio: true}, 
            'video/mp4', 'mp4','media', 'pvtMediaRecChat').then(media => {
        videoRef.current.srcObject = media.stream
        this.setState({mediaRecorder: media.mediaRecorder, start: true})
        }).catch(err => {
            this.setState({start: false, err})
        })
    }

    componenetDidUpdate() {
        if (JSON.stringify(this.state.editChat) !== JSON.stringify(this.props.editChat)) {
            this.setState({editChat: this.props.editChat})
        }
    }

    componentWillUnmount() {
        if (this.state.mediaRecorder) {
            this.state.mediaRecorder.stream.getTracks().forEach( track => 
                track.stop())
        }
    }

    stopRecHandler = () => {
        webCameraApi(socket, this.state.mediaRecorder, this.state.start, {video: true, audio: true}, 
            'video/mp4', 'mp4','media', 'pvtMediaRecChat').then(media => {
            this.setState({mediaRecorder: null, start: false})
            if (this.state.editChat) {
                this.uploadMedia([{file: media[0].file, type: media[0].type, format: media[0].format, chatID: {mainID: this.state.editChat.mainID, chatID: this.state.editChat.chatID}}])
            } else {
                this.uploadMedia(media)
            }
            this.props.closeMedia()
        }).catch(err => {
            this.setState({start: false})
        })
    }


    closeRecHandler = () => {
        if (videoRef && videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
        this.props.closeMedia()
    }

    uploadMedia = (cnt) => {
        let these = this;
         for (let media of cnt) {
            let type = media.type === 'media' ?  'video' : media.type;
            this.props.uploadMediaStart({chatID: media.chatID, type, percentage: 0})
        }

        submit(cnt, 0);

        function submit(media, index) {
            let formContent = new FormData();
            let ext = media[index].file.type.split('/').pop();
            formContent.append('media', media[index].file, `${media[index].chatID}.${ext.split(';')[0]}`);
            formContent.append('type', media[index].type === 'video' ? 'media' : media[index].type);
            formContent.append('format', media[index].format);
            formContent.append('chatID', JSON.stringify(media[index].chatID));
            formContent.append('id', these.state.id);
            axios.post(`/aroundme`, formContent, {
                headers: {'data-categ': 'uploadmedia'},
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        let type = media[index].type === 'media' ?  'video' : media[index].type;
                        these.props.uploadMediaStart({chatID: media[index].chatID, type , percentage})
                    }
                }  
            }).then((res) => {
                socket.emit('pvtMediaRecChat', res.data, (err) => {
                    these.setState({err})
                })
                ++index;
                these.props.mediaUploaded();
                if (index < media.length) {
                    submit(media, index)
                } 
            }).catch((err) => {
                ++index;
                these.props.mediaUploaded();
                these.setState({err})
            });
        }
    }
    render() {
        let cnt = <Loader 
        bg/>

        if (this.state.start) {
            cnt = null
        }

        return(
        <div className="site-main__chat--vidcam">
            {this.state.err ? <div className="site-main__chat--err">{this.state.err.message ? this.state.err.message : this.state.err.toString()}</div> : null }
            <div className="site-main__chat--vidcam__wrapper">
                {cnt }
                <video 
                    ref={videoRef}
                    autoPlay
                    className="site-main__chat--vidcam__video--wrapper">
                    <p>our browser doesn't support embedded videos</p>
                </video>
                <div className="site-main__chat--vidcam__opt">
                    <button 
                        onClick={this.stopRecHandler}
                        className="site-main__chat--vidcam__opt--control"
                        disabled={!this.state.start}>
                        <FontAwesomeIcon icon={['fas', 'video']} className="icon icon__site-main--chat__footer--camera"/>
                    </button>
                    <button 
                        onClick={this.closeRecHandler}
                        className="site-main__chat--vidcam__opt--close">
                        <FontAwesomeIcon icon={['fas', 'times']}/>
                    </button>
                </div>
            </div>
        </div>
        )
    }
}


export default withRouter(VideoCam); 