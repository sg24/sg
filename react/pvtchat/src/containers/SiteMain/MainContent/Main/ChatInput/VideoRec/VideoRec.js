import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './VideoRec.css';
import { socket, webCameraApi } from '../../../../../../shared/utility';
import * as actions from '../../../../../../store/actions/index';
import Loader from '../../../../../../components/UI/Loader/Loader';

let videoRef = React.createRef(null);
class VideoCam extends Component {
    state = {
        start: false,
        mediaRecorder: null,
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
    };

    componentDidMount() {
        webCameraApi(socket, this.state.mediaRecorder, this.state.start, {video: true, audio: true}, 
            'video/mp4', 'mp4','media', 'pvtMediaRecChat').then(media => {
        videoRef.current.srcObject = media.stream
        this.setState({mediaRecorder: media.mediaRecorder, start: true})
        }).catch(err => {
            this.setState({start: false})
        })
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
            this.props.onUploadMedia(media, this.state.id, this.state.categ)
            this.props.history.goBack();
        }).catch(err => {
            this.setState({start: false})
        })
    }

    render() {
        let cnt = <Loader 
        bg/>

        if (this.state.start) {
            cnt = null
        }

        if (this.state.err) {
            this.props.onTypingErr(this.state.err)
        }

        return(
        <div className="site-main__chat--vidcam">
            <div className="site-main__chat--vidcam__wrapper">
                {cnt }
                <video 
                    ref={videoRef}
                    autoPlay
                    className="site-main__chat--vidcam__video--wrapper">
                    <p>our browser doesn't support embedded videos</p>
                </video>
                <button 
                    onClick={this.stopRecHandler}
                    className="site-main__chat--vidcam__control"
                    disabled={!this.state.start}>
                    <FontAwesomeIcon icon={['fas', 'video']} />
                </button>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vidRecBackdrop: state.cnt.vidRecBackdrop
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onTypingErr: (err) => dispatch(actions.fetchCntFail(err)),
        onUploadMedia: (cnt, id, categ) => dispatch(actions.uploadMediaInit(cnt, id, categ))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoCam)); 