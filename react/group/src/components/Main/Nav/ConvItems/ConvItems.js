import React from 'react';

import ConvItem from './ConvItem/ConvItem';

const convItems = props => {
    const allConv = props.convs.map((conversation, index) => (
        <ConvItem 
            key={index}
            conv={conversation}
            userOpt={props.userOpt.bind(this, index)}
            showConv={props.showConvOpt}
            index={index}/>
    ))

    return allConv;
}

export default convItems;