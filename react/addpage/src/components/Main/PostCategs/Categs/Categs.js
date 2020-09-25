import React from 'react';

import Categ from './Categ/Categ';

const categs = props => {
    let allCategs = props.categs.map((categ, index) => (
        <Categ 
            key={index}
            categ={categ}
            index={index}
            categActive={props.categActive.bind(this, index)}
            categActiveProps={props.categActiveProps}
            categDefault={props.categDefault}
            removeCategSelect={props.removeCategSelect.bind(this, index)}/>
    ));
    return allCategs;
};

export default categs;