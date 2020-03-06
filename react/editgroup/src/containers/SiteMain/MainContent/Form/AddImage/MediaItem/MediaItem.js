import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { connect } from 'react-redux';
import 'cropperjs/dist/cropper.css';
import uuid from 'uuid';

import { dataURLtoBlob } from '../../../../../../shared/utility';
import * as actions from '../../../../../../store/actions/index';

const cropper = React.createRef(null);
class mediaItem extends Component {
    state= {
        url: null
    };

    cropHandler = () => {
        let image = cropper.current.cropper.getCroppedCanvas({ imageSmoothingQuality: 'high'}).toDataURL()
        let file = dataURLtoBlob(image);
        let url = window.URL.createObjectURL(file);
        this.setState({url});
        this.props.onImageCapture({imageUrl: this.props.url, imageCapture: file, id: uuid()})
    }
    
  render() {
      let preview = null
      if (this.state.url) {
        preview = (
            <img src={this.state.url} alt="" className="reuse-form__itm--det__view-select--media__wrapper--preview "/>
        )
      }

    return (
        <div className="reuse-form__itm--det__view-select--media">
            <div className="reuse-form__itm--det__view-select--media__wrapper">
            { preview }
            <Cropper
                ref={cropper}
                src={this.props.url}
                className="reuse-form__itm--det__view-select--media__wrapper--cnt"
                guides={false}
                cropBoxResizable={false}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                dragMode="none"
                ready={() => {
                    cropper.current.cropper.setCropBoxData({width: 100, height: 100});
                }}
                crop={this.cropHandler} />
            </div>
        </div>
    );
  }
};


const mapDispatchToProps = dispatch => {
    return {
        onImageCapture: (imageCapture) => dispatch(actions.groupImage(imageCapture))
    };
};

export default connect(null, mapDispatchToProps)(mediaItem);