import React from 'react';

import Categ from './Categ/Categ';

const categs = props => {
    let allCategs = props.categs.map((categ, index) => (
        <Categ 
            key={index}
            categ={categ}/>
    ));
    return allCategs;
};

export default categs;