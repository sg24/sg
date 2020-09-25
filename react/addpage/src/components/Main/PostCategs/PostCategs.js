import React from 'react';

import PostCateg from './PostCateg/PostCateg';

const postCategs = props => {
    let allCategs = props.categs.map((categ, index) => (
        <PostCateg 
            key={index} 
            categ={categ}
            selecCateg={props.selecCateg.bind(this, categ)}/>
    ));
    return allCategs;
}

export default postCategs;