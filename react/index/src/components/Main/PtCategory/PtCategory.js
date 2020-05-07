import React from 'react';

import Category from './Category/Category';

const ptCatgory = props => {
    
    const allCategory = props.category.map((category, index) => (
        <Category 
            key={index}
            categ={category}
            path={props.path}
        />
    ));


    return allCategory;
};

export default ptCatgory;