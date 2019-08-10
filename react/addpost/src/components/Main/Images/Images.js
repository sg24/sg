import React from 'react';

import Image from './Image/Image';

const images = props => {
    const allImages = props.images.map((image, index) => (
        <Image 
            key={image.index}
            link={image.link}
            removeImage={props.removeImage.bind(this, index)}
            index={image.index}
            addActive={props.addActive.bind(this, image.index)}
            removeActive={props.removeActive}
            removeImgIndex={props.removeImgIndex}/>
    ));
    return allImages;
}

export default images;