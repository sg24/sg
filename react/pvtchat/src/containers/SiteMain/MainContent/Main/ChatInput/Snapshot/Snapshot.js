import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';

import './Snapshot.css';
import { getImageURL } from '../../../../../../shared/utility';
import * as actions from '../../../../../../store/actions/index';
import Loader from '../../../../../../components/UI/Loader/Loader';
import Backdrop from '../../../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../../../components/UI/Modal/Modal';

let videoRef = React.createRef(null);
class Snapshot extends Component {
    state = {
        start: false,
        err: null,
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
    };

    componentDidMount() {
        if (!('mediaDevices' in navigator)) {
            navigator.mediaDevices = {};
        }
        let these = this;
        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
            if (!getUserMedia) {
                return these.setState({err: 'getUserMedia is not implemented!'});
            }
        
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
            }
        }
    
        navigator.mediaDevices.getUserMedia({video: true})
            .then(function(stream) {
                videoRef.current.srcObject= stream;
                these.setState({start: true})
            })
            .catch(function(err) {
                these.setState({err, start: false})
            });
    }

    componentWillUnmount() {
        if (videoRef && videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
    }

    stopRecHandler = () => {
        if (videoRef && videoRef.current) {
            getImageURL(videoRef.current).then(imageData => {
                videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                    track.stop();
                });
                this.props.history.goBack()
                this.props.onUploadMedia([{file: imageData, type: 'image', format: 'png',chatID: uuid()}], this.state.id, this.state.categ)
            }).catch(err => {
                this.setState({err})
            })
        }
    }

    render() {
        let cnt = <Loader 
            bg/>

        let err = null;

        if (this.state.start) {
            cnt = null
        }

        if (this.state.err) {
            err = (
                <Backdrop 
                    component={ Modal }
                    close={this.closeModelBackdropHandler}
                    err={  this.state.err }
                    media />
            )
        }

       return(
           <div className="site-main__chat--cam">
               { err }
               <div className="site-main__chat--cam__wrapper">
                    {cnt }
                    <video 
                        ref={videoRef}
                        autoPlay
                        className="site-main__chat--cam__video--wrapper">
                        <p>our browser doesn't support embedded videos</p>
                    </video>
                    <button 
                        onClick={this.stopRecHandler}
                        className="site-main__chat--cam__control"
                        disabled={!this.state.start}>
                        <FontAwesomeIcon icon={['fas', 'camera']} className="icon icon__site-main--chat__footer--camera"/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshot)); 