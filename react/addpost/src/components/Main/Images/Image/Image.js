import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const image = props => {
    console.log(props.index, props.removeImgIndex)
    let imgWrapperClass = ['reuse-form__itm--det__view-select--img-wrapper__wrapper--img'];
    let imgCloseClass = ['reuse-form__itm--det__view-select--img-wrapper__wrapper--close'];

    if (props.index === props.removeImgIndex) {
        imgWrapperClass.push('reuse-form__itm--det__view-select--img-wrapper__wrapper--img__active');
        imgCloseClass.push('reuse-form__itm--det__view-select--img-wrapper__wrapper--close__active');
    }

    return (
        <div className="reuse-form__itm--det__view-select--img-wrapper">
            <div className="reuse-form__itm--det__view-select--img-wrapper__wrapper">
                <img 
                    src={props.link} 
                    alt="post"
                    className={imgWrapperClass.join(' ')}/>
                <div 
                    className={imgCloseClass.join(' ')}
                    onClick={props.removeImage}
                    onMouseEnter={props.addActive}
                    onMouseLeave={props.removeActive}>
                    <FontAwesomeIcon 
                        icon={['fas', 'times']} 
                        className="icon icon__reuse-form--view-select__close"/>
                </div>
            </div>
        </div>
    );
};

export default image;