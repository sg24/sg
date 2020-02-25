import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mediaItem = props => {
    let mediaCntClass = ['reuse-form__itm--det__view-select--media__wrapper'];
    let mediaCloseClass = ['reuse-form__itm--det__view-select--media__wrapper--close'];

    let mediaType = (
            <img 
                src={props.link} 
                alt="post"
                className="reuse-form__itm--det__view-select--media__wrapper--cnt"/>
    );

    if (props.index === props.removeMediaItemIndex) {
        mediaCntClass.push('reuse-form__itm--det__view-select--media__wrapper--active');
        mediaCloseClass.push('reuse-form__itm--det__view-select--media__wrapper--close__active');
    }

    if (props.mediaType === 'video' || props.mediaType === 'snapvideo') {
        mediaType = (
            <video 
                src={props.link} 
                controls
                autoPlay={props.mediaType === 'snapvideo'}
                className="reuse-form__itm--det__view-select--media__wrapper--cnt">
                <p>our browser doesn't support embedded videos</p>
            </video>
        );
    }

    return (
        <div className="reuse-form__itm--det__view-select--media">
            <div className={mediaCntClass.join(' ')}>
                { mediaType }
                { props.mediaType === 'snapshot' ? 
                    <div 
                        className="reuse-form__itm--det__view-select--media__play" 
                        onClick={props.playVideo}>
                        <FontAwesomeIcon 
                            icon={['fas', 'play-circle']} 
                            className="icon icon__reuse-form--media__play" /> 
                    </div>: null}
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