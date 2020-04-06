import React from 'react';
import arraySort from 'array-sort';

import ConvContent from './ConvContent/ConvContent';

const post = props => {    
    let content= arraySort(props.content, 'created', {reverse: true})
    const allConv = content.map( (conv, index) => (
        <ConvContent 
            key={index} 
            conv={conv} 
            curTab={props.curTab}
           />
    ));

    return allConv;
};

export default post;