import React from 'react';

import Category from './Category/Category';

const setQueCateg = props => {
    
    const allCategory = props.category.map((category, index) => (
        <Category 
            key={index}
            categ={category}
            queCateg={props.queCateg.bind(this, category)}
        />
    ));


    return allCategory;
};

export default setQueCateg;