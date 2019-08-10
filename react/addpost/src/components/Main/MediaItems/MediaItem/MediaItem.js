import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mediaItem = props => {
    let imgWrapperClass = ['reuse-form__itm--det__view-select--media__wrapper--img'];
    let mediaCloseClass = ['reuse-form__itm--det__view-select--media__wrapper--close'];
    let vidWrapperClass = ['reuse-form__itm--det__view-select--media__wrapper--vid'];

    let mediaType = (
            <img 
                src={props.link} 
                alt="post"
                className={imgWrapperClass.join(' ')}/>
    );

    if (props.index === props.removeMediaItemIndex) {
        imgWrapperClass.push('reuse-form__itm--det__view-select--media__wrapper--img__active');
        vidWrapperClass.push('reuse-form__itm--det__view-select--media__wrapper--vid__active');
        mediaCloseClass.push('reuse-form__itm--det__view-select--media__wrapper--close__active');
    }

    if (props.mediaType === 'video') {
        mediaType = (
            <video 
                src={props.link} 
                controls
                className={vidWrapperClass.join(' ')}>
                <p>our browser doesn't support embedded videos</p>
            </video>
        );
    }

    return (
        <div className="reuse-form__itm--det__view-select--media">
            <div className="reuse-form__itm--det__view-select--media__wrapper">
                { mediaType }
                <div 
                    className={mediaCloseClass.join(' ')}
                    onClick={props.removeMediaItem}
                    onMouseEnter={props.removeMediaItemEnable}
                    onMouseLeave={props.removeMediaItemDisable}>
                    <FontAwesomeIcon 
                        icon={['fas', 'times']} 
                        className="icon icon__reuse-form--view-select__close"/>
                </div>
            </div>
        </div>
    );
};

export default mediaItem;