import React from 'react';

import Category from './Category/Category';

const filterCategory = props => {
    let allFilterOpt = props.filterCategs.map((category, index) => (
        <Category
            key={index}
            category={category}
            categSelect={props.categSelect.bind(this, category, index)}
            categSelectGrp={props.categSelectGrp}/>
    ));

    return allFilterOpt;
}

export default filterCategory;