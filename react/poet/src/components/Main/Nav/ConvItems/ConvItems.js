import React from 'react';
import arraySort from 'array-sort';

import ConvContent from './ConvItem/ConvItem';

const convItems = props => {    
    let content= arraySort(props.convs, 'created', {reverse: true})
    const allConv = content.map( (conv, index) => (
        <ConvContent 
            key={index} 
            conv={conv} 
            curTab={props.curTab}
           />
    ));

    return allConv;
};

export default convItems;