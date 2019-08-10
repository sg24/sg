import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../../../store/actions/index';
import Images from '../../../../../components/Main/Images/Images';

class AddImage extends Component {
    state = {
        value: '',
        imageLink: null,
        disabled: true,
        imglinkValid: false,
        images: [],
        multiImage: [],
        removeImgIndex: null
    };

    componentDidUpdate() {
        if (!this.state.imglinkValid && this.props.imgValid) {
            this.setState({imglinkValid: true, disabled: false})
        }
    }

    hidAddItemHandler = () => {
        this.props.onHidAddItm();
    }

    imageLinkHandler = (event) => {
        let value =  event.target.value;
        this.setState({imageLink: value, value, disabled: true, imglinkValid: false});
        this.props.onCheckImage(value);
    }

    addImageHandler = () => {
        if (this.props.imgValid) {
            let images = [...this.state.images];
            let index = images.length + this.state.multiImage.length;
            images.push({index ,link: this.state.imageLink});
            this.setState({
                images: images, disabled: true, value: '', imglinkValid: false});
            this.props.onSelectImage();
        }
    }

    removeImageHandler = (index) => {
        let images = [...this.state.images];
        let updatedImage = images.filter((image, imageIndex) => imageIndex !== index);
        this.setState({images: updatedImage})
    }

    imageAddedHandler =  (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.files) {
            const files = event.target.files;
            this.handleFiles(files)
        }
    }

    addMultiImageHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.dataTransfer) {
            const dt = event.dataTransfer;
            const files = dt.files;
            this.handleFiles(files)
        }
        
    }

    removeMultiImageHandler = (index) => {
        let multiImages = [...this.state.multiImage];
        let updatedMultiImage = multiImages.filter((image, imageIndex) => imageIndex !== index);
        this.setState({multiImage: updatedMultiImage})
    }
    
    handleFiles = (files) => {
        let multiImage = [...this.state.multiImage];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if(file.type.startsWith('image/')) {
                let index = this.state.images.length + multiImage.length;
                multiImage.push({index , link: window.URL.createObjectURL(file)});
                window.URL.revokeObjectURL(file);
            }
        }
        this.setState({
            multiImage
        });
    }

    dragMultiImageHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        
    }

    dropMultiImageHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    addActiveHandler = (index) => {
        this.setState({removeImgIndex: index})
    }

    removeActiveHandler = () => {
        this.setState({removeImgIndex: null})
    }

    submitImageHandler = () => {
        let imageArray = [...this.state.images, ...this.state.multiImage];
        this.props.onAddImage(imageArray);
    }

    render() {
        let imageLink = null;
        let imageViewer = null;
        let multiImageViewer = null;

        if (this.props.imgValid && this.state.imglinkValid) {
            imageLink = <img src={this.state.imageLink} alt="post" />
        }

        if (this.state.images.length > 0) {
            imageViewer = (
                <div className="reuse-form__itm--det__view-select">
                    <Images 
                        images={this.state.images}
                        removeImage={this.removeImageHandler}
                        addActive={this.addActiveHandler}
                        removeActive={this.removeActiveHandler}
                        removeImgIndex={this.state.removeImgIndex}/>
                </div>
            ); 
        }

        if (this.state.multiImage.length > 0) {
            multiImageViewer = (
                <div className="reuse-form__itm--det__view-select">
                    <Images 
                        images={this.state.multiImage}
                        removeImage={this.removeMultiImageHandler}
                        addActive={this.addActiveHandler}
                        removeActive={this.removeActiveHandler}
                        removeImgIndex={this.state.removeImgIndex}/>
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
                                type="text" 
                                name="" 
                                className="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg" 
                                placeholder="paste link"
                                onChange={this.imageLinkHandler}
                                value={this.state.value} />
                                <button
                                    type="button"
                                    onClick={this.addImageHandler}
                                    disabled={this.state.disabled}
                                    className="reuse-form__cnt--det__btn">
                                    <FontAwesomeIcon 
                                    icon={['fas', 'plus']} />
                                </button>
                        </div>
                    </div>
                    <div className="reuse-form__itm--det__view">
                        { imageLink }
                    </div>
                    { imageViewer }
                    <div className="reuse-form__itm--det__alt">
                        OR
                    </div>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--det">
                            <div className="reuse-form__cnt--det__fil">
                                Drag and Drop Files
                                <input 
                                    type="file" 
                                    name=""
                                    multiple
                                    className="reuse-form__cnt--det__fil--input"
                                    onChange={this.imageAddedHandler}
                                    onDragEnter={this.dragMultiImageHandler}
                                    onDragOver={this.dropMultiImageHandler}
                                    onDrop={this.addMultiImageHandler}
                                    accept="image/*" />
                            </div>
                        </div>
                    </div>
                    { multiImageViewer }
                </div>
                <div className="reuse-form__itm--footer reuse-form__btn">
                    <button 
                        type="button" 
                        className="reuse-form__btn--close"
                        onClick={this.hidAddItemHandler}>Exit</button>
                    <button 
                        type="button" 
                        className="reuse-form__btn--add"
                        onClick={this.submitImageHandler}>Add</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        imgValid: state.addPost.imgValid
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onHidAddItm: () => dispatch(actions.hidAddItm()),
        onCheckImage: (imageLink) => dispatch(actions.checkImageInit(imageLink)),
        onSelectImage: () => dispatch(actions.selectImage()),
        onAddImage: (image) => dispatch(actions.addImage(image))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddImage)