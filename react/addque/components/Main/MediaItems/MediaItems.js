import React from 'react';

import MediaItem from './MediaItem/MediaItem';

const mediaItems = props => {
    const allMedia = props.media.map((link, index) => (
        <MediaItem
            key={index}
            link={link.url}
            index={index}
            mediaType={props.mediaType}
            removeMediaItem={props.removeMediaItem.bind(this, link.id)}
            removeMediaItemEnable={props.removeMediaItemEnable.bind(this, index)}
            removeMediaItemDisable={props.removeMediaItemDisable.bind(this, index)}
            removeMediaItemIndex={props.removeMediaItemIndex}/>
    ));
    return allMedia;
}

export default mediaItems;