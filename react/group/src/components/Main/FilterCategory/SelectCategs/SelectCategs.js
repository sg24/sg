import React from 'react';

import SelectCateg from './SelectCateg/SelectCateg';

const selectCategs = props => {
    let allSelectCategs = props.selectCategs.map(selectCateg => (
        <SelectCateg
            key={selectCateg.id}
            category={selectCateg.category}
            removeSelectCateg={props.removeSelectCateg.bind(this,selectCateg.id)}/>
    ));

    return allSelectCategs;
}

export default selectCategs;